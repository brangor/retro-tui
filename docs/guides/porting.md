# Porting CLI Apps to Retro-TUI

A recipe for connecting existing Node CLI applications to retro-tui's event protocol.

## The Pattern

Your app's business logic emits structured events. The CLI prints them. Retro-tui renders them. Both consume the same event stream — the business logic doesn't know or care who's listening.

```
┌──────────────┐     events     ┌──────────────┐
│  App Logic   │ ────────────→  │  CLI Output   │  (console.log)
│              │ ────────────→  │  Retro-TUI    │  (emitter POST)
└──────────────┘                └──────────────┘
```

## Step-by-Step

### 1. Audit Your Output

Find every `console.log`, `console.error`, `console.warn`, and `process.stdout.write` in your app. List them.

### 2. Categorize

For each output call, ask: what kind of information is this?

| Category | Event Type | Example |
|----------|-----------|---------|
| Running commentary | `log` | "Authenticating...", "Fetching playlist..." |
| Progress updates | `progress` | "[3/6] Downloading...", progress bars |
| Success/failure | `status` | "Authenticated successfully", "Build failed" |
| Structured results | `table` | Summary tables, lists of results |
| User prompts | `prompt` | "Enter URL:", "Continue? (y/n)" |

### 3. Assign IDs

Group related output into logical components. Each group gets a stable `id`:

- All auth messages → `id: "auth"`
- Per-track download progress → `id: "track-1"`, `id: "track-2"`, etc.
- Summary table → `id: "summary"`

### 4. Add the Push Helper

There is nothing to install — this is a copy-in recipe. `examples/` is not published to
npm (the package ships `dist` and `src` only), and the old `RetroEmitter` class was
deleted in 3.0.0. Copy `examples/push-server/push.js` out of the retro-tui repo:

```javascript
import { push, log, status } from './push.js';
```

Each helper is one HTTP POST of a `{ channel, type, id, data }` envelope, documented in
[event-protocol.md](../api/event-protocol.md).

### 5. Replace Output Calls

**Before:**
```javascript
console.log('Authenticating with Spotify...');
```

**After:**
```javascript
console.log('Authenticating with Spotify...');  // keep CLI output
await push({ channel: 'my-app', type: 'log', id: 'auth',
             data: { message: 'Authenticating with Spotify...', level: 'info' } });
```

The push helper is fire-and-forget. If the push server isn't running, the POST silently fails and your CLI works normally.

### 6. Run Both

Terminal 1: `node server/index.js`
Terminal 2: Open retro-tui in browser
Terminal 3: Run your app

Events appear as panels in the retro-tui workspace.

## Example: Spotify Downloader

All calls below omit `channel: 'my-app'` for brevity — every envelope carries it.

| Current CLI output | Event call |
|---|---|
| `Authenticating with Spotify...` | `push({ type: 'log', id: 'auth', data: { message: 'Authenticating with Spotify...' } })` |
| `Authenticated successfully.` | `push({ type: 'status', id: 'auth', data: { state: 'success', message: 'Authenticated' } })` |
| `Fetched "These Dreams": 6 tracks` | `push({ type: 'status', id: 'fetch', data: { state: 'success', message: 'Fetched "These Dreams": 6 tracks' } })` |
| `[1/6] Downloading: Heart - These Dreams` | `push({ type: 'progress', id: 'download', data: { value: 1/6, label: 'Heart - These Dreams', total: 6, current: 1 } })` |
| `OK: .../Heart - These Dreams.mp3` | `push({ type: 'log', id: 'results', data: { message: 'OK: Heart - These Dreams.mp3' } })` |
| `TAGGED: Heart - These Dreams.mp3` | `push({ type: 'log', id: 'tagging', data: { message: 'TAGGED: Heart - These Dreams.mp3' } })` |
| Summary table | `push({ type: 'table', id: 'summary', data: { columns: ['Metric', 'Count'], rows: [...] } })` |

## Tips

- **Keep console.log too.** Pushing supplements your CLI, it doesn't replace it. Your app should work fine without the push server running.
- **Wrap it once.** If the raw envelopes get repetitive, write your own `log(id, msg)` helper around `push` at startup and import that — it's a few lines, and it's yours to shape.
- **IDs are stable strings.** Use descriptive names like `"auth"`, `"download"`, `"summary"` — not generated UUIDs.
- **Don't over-decompose.** You don't need a separate panel for every log line. Group related output under one ID.
