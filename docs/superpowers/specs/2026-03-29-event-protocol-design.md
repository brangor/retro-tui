# Event Protocol & Emitter Kit Design

## What This Is / What This Isn't

**Retro-TUI is:**
- A web component library with terminal aesthetics
- A documented event protocol for structured app-to-UI communication
- A set of convenience emitters that apps can use (or not)
- A dumb-but-beautiful rendering layer — components receive data and render it, no more
- Target-agnostic in protocol design (web today, theoretically terminal later)

**Retro-TUI is not:**
- An application framework — it doesn't manage app lifecycle, orchestrate processes, or make architectural decisions
- A state store — apps own their data, retro-tui holds only the last-known render values
- A message broker — the push server relays, it doesn't queue, persist, or guarantee delivery
- A terminal emulator — it looks terminal, it isn't one
- An access control layer — no auth, no privileged clients, no multi-tenancy

**The guiding principle:** "Is this about *what to show* or *what to do*?" Retro-tui handles the former. The app handles the latter.

### Alignment of Existing Examples

The Paint app demonstrates the target architecture: central decision engine, dumb components, structured events. Tarot Flashcards is close (state object + pure render, needs event formalization). Quiltsketch and IsoSketch would benefit from refactoring scattered event handlers into a central coordinator — the same pattern the protocol formalizes.

Paint's `emit()` pattern is the reference architecture for consumer apps.

---

## The Event Protocol

### Message Format

```json
{
  "channel": "spotify-dl",
  "type": "progress",
  "id": "track-4",
  "data": {
    "value": 0.73,
    "label": "Heart - These Dreams",
    "total": 6,
    "current": 4
  },
  "timestamp": "auto"
}
```

### Core Fields

| Field | Required | Description |
|-------|----------|-------------|
| `channel` | Yes | Groups messages by app/session |
| `type` | Yes | Maps to a component or behavior |
| `id` | Yes | Identifies a specific component instance for updates |
| `data` | Yes | Type-specific payload (defined shapes per type) |
| `timestamp` | No | Auto-populated by push server if omitted |

### Standard Event Vocabulary

Each type maps to a retro-tui component:

| Event Type | Maps To | Payload Shape | Purpose |
|------------|---------|---------------|---------|
| `log` | `tui-output` | `{ message, level? }` | Append-only text stream |
| `progress` | `tui-progress` (new) | `{ value, label?, total?, current? }` | Trackable progress |
| `table` | `tui-table` | `{ columns, rows }` or `{ key, row }` for upsert | Structured data display |
| `status` | `tui-status` (new) | `{ state, message }` | Success/error/info badges |
| `prompt` | `tui-console` | `{ message, options? }` | Request user input (see Bidirectional Relay below) |
| `clear` | (any) | `{ }` | Reset a component by id |
| `dismiss` | (any) | `{ }` | Remove a panel by id |

### Extensibility

Apps can send custom types the protocol doesn't define. Retro-tui renders unrecognized types as raw `tui-output` with a type badge, so nothing breaks — you just don't get a specialized component.

### What's NOT in the Protocol

- **Layout instructions** — the app doesn't say "put this in the top-left." That's the UI's job.
- **Styling directives** — no sending CSS. ANSI codes in text content are fine (already supported).
- **Lifecycle management** — no "app connected/disconnected" semantics beyond what the WebSocket already provides.

### Bidirectional Relay (Planned Phase)

The push server's WebSocket connection is already bidirectional — messages just flow one direction today by convention. For interactive experiences (user input, prompts, MUD-style interactions), the push server extends to relay in both directions:

**Return-path message format:**

```json
{
  "channel": "spotify-dl",
  "type": "response",
  "id": "auth-prompt",
  "data": {
    "value": "https://open.spotify.com/playlist/..."
  }
}
```

**How it works:**
- Browser sends a message back through the existing WebSocket when the user interacts with a `prompt`-type component
- Push server relays it to the app (the pipe works both ways)
- App receives it via WebSocket — the emitter kit offers a `RetroEmitter.connect()` mode that upgrades from fire-and-forget HTTP to a persistent WebSocket for apps that want to receive responses

**What the push server still does NOT do:**
- Interpret, store, or act on return messages — it's still a dumb relay
- Manage sessions or correlate request/response pairs — the app uses `id` fields for that
- Queue messages for disconnected apps — if nobody's listening, the message is dropped

**Design constraints for v1 (to avoid closing the door):**
- Event `id` fields must be stable enough for round-trip correlation
- The push server's client tracking must distinguish app connections from browser connections so it knows which direction to relay
- The emitter kit's API must not assume fire-and-forget (i.e., don't make `connect()` an afterthought — design the interface so HTTP-only and WebSocket modes share the same event vocabulary)

This phase is not built in v1, but the protocol and emitter kit are designed to accommodate it.

---

## The Emitter Kit

A lightweight Node package that apps import. Thin wrapper over HTTP POST — no WebSocket, no state, no magic.

### API Surface

```js
import { RetroEmitter } from 'retro-tui/emitter';

const retro = new RetroEmitter({
  channel: 'spotify-dl',
  url: 'http://localhost:3001/push'  // defaults to this
});

// Typed helpers — one per event type in the vocabulary
retro.log('Authenticating with Spotify...');
retro.log('Config loaded', 'info');
retro.progress('track-4', 0.73, {
  label: 'Heart - These Dreams',
  total: 6,
  current: 4
});
retro.table('summary', { columns: [...], rows: [...] });
retro.status('auth', 'success', 'Authenticated successfully');
retro.clear('track-4');
retro.dismiss('summary');

// Escape hatch for custom types
retro.emit('canvas-draw', 'sketch-1', { x: 10, y: 20, tool: 'brush' });
```

### What the Emitter Does

- Constructs the JSON payload per the protocol spec
- POSTs it to the push server
- Provides typed helpers for each standard event type
- Exposes `emit()` for custom/unrecognized types

### What the Emitter Does NOT Do

- Hold state or cache anything
- Manage connections (it's HTTP, not WebSocket)
- Retry or queue failed sends
- Know anything about components or rendering

### Swappability

Because the emitter is just POSTing JSON, an app can replace it with `fetch()`, `curl`, or their own wrapper at any time. The emitter is a convenience, not a dependency. The protocol spec is the contract, not the emitter.

---

## Component-Side Behavior

### Data Flow

```
Push Server → WebSocket → RetroPush client → EventRouter (new) → component update
```

### Component Contract

Each component that participates in the protocol must:
- Accept updates via a `handleEvent(event)` method that takes a protocol message
- Render from the latest received data (no history, no accumulation — except `tui-output` which appends by nature)
- Be usable standalone without the push server (direct property setting still works)

### Auto-Panel Creation

When the push client receives an event with an `id` that doesn't match an existing component, the workspace creates a new panel for it. Panels stack newest-on-top by default (the "stack of papers" model). Layout hints (e.g., `overlap: false`) are future scope — v1 uses default stacking only.

### Panel Lifecycle

- **Created** when first event with a new `id` arrives
- **Updated** on subsequent events with the same `id`
- **Dismissed** on `dismiss` event, or manually by the user
- **No "disconnected" state** — if events stop, the panel just shows its last value

### EventRouter

A new piece that sits between `RetroPush` and the components:

```
RetroPush (existing) → EventRouter (new) → component lookup/creation → component.handleEvent()
```

`EventRouter` maps event types to component types, manages the id-to-component registry, and handles auto-panel creation. This is the only new architectural piece on the client side.

---

## The Porting Guide

A short document that ships with retro-tui, walking developers through the pattern.

### The Recipe

1. **Audit your output** — Find every `console.log`, `console.error`, `process.stdout.write`. List them.
2. **Categorize** — For each, ask: is this progress, a log line, a status update, tabular data, or a prompt? Map to event types.
3. **Assign IDs** — Group related output. All download progress gets `progress` events with distinct IDs. Auth messages share one `log` ID. The summary table is one `table` event.
4. **Replace** — Swap `console.log` calls for emitter calls. Keep the original console output too if you want the CLI to still work standalone (the emitter is fire-and-forget, it doesn't replace stdout).
5. **Run both** — Start the push server, open retro-tui in a browser, run your app. Events appear as panels.

### Spotify-dl Walkthrough

| Current output | Event type | ID | Notes |
|---|---|---|---|
| "Authenticating with Spotify..." | `log` | `auth` | Auth flow messages |
| "Fetched 'These Dreams': 6 tracks" | `status` | `fetch` | Success badge |
| "[1/6] Downloading: Heart..." | `progress` | `download` | Single progress bar, or one per track |
| "OK: /path/to/file.mp3" | `log` | `results` | Append-only completion log |
| "TAGGED: file.mp3" | `log` | `tagging` | Separate panel from downloads |
| Summary table | `table` | `summary` | Downloaded/Skipped/Failed |

### What the Guide is NOT

- A tutorial on how to architect your app — that's your decision
- A mandate to use the emitter — `curl` works fine
- Prescriptive about when to create panels vs. reuse them — that's app judgment

---

## Deliverables

1. **Protocol spec / API document** — the contract consumer apps code against, covering message format, event vocabulary, and payload shapes
2. **Emitter kit** — `retro-tui/emitter` Node package with typed helpers
3. **EventRouter** — client-side bridge between RetroPush and components
4. **`tui-progress` component** — new component for progress events
5. **`tui-status` component** — new component for status badge events
6. **`handleEvent()` on existing components** — `tui-output`, `tui-table`, `tui-console`
7. **Auto-panel creation** in workspace
8. **Porting guide** — developer-facing document with the recipe and spotify-dl walkthrough
9. **Quiltsketch refactor** — as a reference "before/after" of the event protocol pattern
