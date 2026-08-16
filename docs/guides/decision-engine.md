# The Decision Engine Pattern

The Decision Engine is **one** architecture for apps built with retro-tui — a centralized, unidirectional state pattern where a single `emit()` function handles all state mutations and triggers re-renders. It suits single-page tool apps with a canvas-like main surface. It is not a requirement of the library, and it is not the only shape that works.

> **Evidence base, stated honestly (audited 2026-08-16).** This pattern came out of
> GridSketch, QuiltSketch and the Paint editor. Paint moved to `../retro-tui-lab` with
> the canvas work; QuiltSketch is frozen on retro-tui 2.2.0; GridSketch's retro-tui
> integration is abandoned and never ran against a tagged release. Charmapder is still
> only in design. So every app that validated this pattern is on a 2.x retro-tui or
> gone.
>
> The newest actively-maintained consumer, **down-spot, does not use this pattern** —
> it is an Electron app composing retro-tui components directly inside per-view
> modules, with no global `emit()`. That is a perfectly good way to use the library.
>
> Read this guide as a worked example, not a mandate. If your app is form- and
> list-shaped rather than canvas-shaped, per-view state is likely the better fit.

---

## Core Architecture

```
┌──────────────────────────────────────────────────────┐
│                    User / System                     │
│            clicks, keys, timers, IPC                 │
└──────────────┬───────────────────────────────────────┘
               │  emit('tool:select', { tool: 'brush' })
               ▼
┌──────────────────────────────────────────────────────┐
│                  Decision Engine                     │
│                    (state.js)                         │
│                                                      │
│   emit(event, detail) {                              │
│     switch (event) {                                 │
│       case 'tool:select': ...mutate state...         │
│       case 'canvas:draw': ...mutate state...         │
│     }                                                │
│     renderCanvas();                                  │
│     updateStatus();                                  │
│   }                                                  │
└──────────────┬───────────────────────────────────────┘
               │  calls renderers with new state
               ▼
┌──────────────────────────────────────────────────────┐
│              Dumb UI Modules (ui/)                   │
│                                                      │
│   layout.js  — renders tui-tiled regions from state  │
│   palette.js — renders tui-palette, emits selects    │
│   status.js  — renders tui-statusbar from state      │
│                                                      │
│   These modules NEVER mutate state directly.         │
│   They call emit() for changes, and expose           │
│   render functions the engine calls.                 │
└──────────────────────────────────────────────────────┘
```

**The rule:** State flows down (engine → UI). Events flow up (UI → engine). Nothing else.

The drawing surface an editor app renders into is **not** a retro-tui component.
Canvas, grid projections and tool-state live in `../retro-tui-lab` — see the scope
fence in `CLAUDE.md`. The pattern is the same either way: that module is one more
dumb UI module, wired exactly like the ones above.

---

## The emit() Function

The engine is a single file (`state.js`) with a `switch` statement handling all events:

```js
const state = {
  tool: 'brush',
  grid: createGrid(30, 20),
  cursor: { x: 0, y: 0 },
  // ...all app state lives here
};

export function emit(event, detail) {
  switch (event) {
    case 'tool:select':
      state.tool = detail.tool;
      updateStatus();
      break;

    case 'canvas:draw': {
      const { x, y } = detail;
      state.grid[y][x] = state.activeChar;
      renderCanvas();
      updateStatus();
      break;
    }

    case 'history:undo':
      if (history.length === 0) return;
      state.grid = history.pop();
      renderCanvas();
      break;
  }
}
```

Event names follow `namespace:action` convention: `tool:select`, `canvas:draw`, `palette:change`, `file:export`, `history:undo`.

---

## Dumb Components

UI modules know how to render and how to emit. They don't know about each other or about state internals:

```js
// ui/palette.js
export function initPalette(paletteEl, emitFn) {
  paletteEl.addEventListener('tui-palette-char-select', (e) => {
    emitFn('palette:change', { char: e.detail.char });
  });
}

export function renderPalette(paletteEl, state) {
  paletteEl.selectedChar = state.activeChar;
}
```

Every retro-tui event is named `tui-<subject>-<verb>` and carries an object
`detail` — see [docs/api/events.md](../api/events.md) for the full set.

The engine wires the modules together at startup:

```js
// main.js
import { emit } from './state.js';
import { initPalette, renderPalette } from './ui/palette.js';

const paletteEl = document.querySelector('tui-palette');
initPalette(paletteEl, emit);

// Register renderers so the engine can call them
setRenderers({ renderPalette: () => renderPalette(paletteEl, state) });
```

---

## Why This Pattern

| Approach | Lines (typical) | Testable | Extensible |
|----------|----------------|----------|------------|
| All inline (monolithic) | ~1600 | No | No |
| Decision Engine + modules | ~500 | Yes | Yes |

The engine is testable because it's pure state logic — no DOM. Call `emit('canvas:draw', {x:5, y:3})` and assert state changed. UI modules are testable because they're thin wiring — mock the emit function, simulate a click, verify emit was called correctly.

---

## Electron / IPC Layer

For desktop apps (like down-spot), the Decision Engine runs in the **renderer process**. An IPC adapter bridges it to the Electron main process for things the browser can't do: filesystem access, native dialogs, system integration.

```
┌─────────────────────────────────────────┐
│           Electron Main Process         │
│                                         │
│   ipc-handlers.js                       │
│     file:save  → fs.writeFile()         │
│     file:open  → dialog.showOpen()      │
│     export:png → sharp/canvas render    │
│                                         │
├────────────── IPC Bridge ───────────────┤
│                                         │
│           Renderer Process              │
│                                         │
│   ┌─────────────────────────────┐       │
│   │     Decision Engine         │       │
│   │     (state.js + emit())     │       │
│   │                             │       │
│   │  file:save → api.invoke()   │       │
│   │  file:open → api.invoke()   │       │
│   └─────────────────────────────┘       │
│   ┌─────────────────────────────┐       │
│   │  retro-tui Components       │       │
│   │  (tui-tiled, tui-panel, ...)│       │
│   └─────────────────────────────┘       │
└─────────────────────────────────────────┘
```

**Key principle:** The Decision Engine doesn't call IPC directly. For events that need native capabilities, the engine delegates to an adapter:

```js
case 'file:save':
  if (window.electronAPI) {
    await window.electronAPI.saveFile(state.project);
  } else {
    downloadAsFile(state.project); // browser fallback
  }
  break;
```

This keeps the editor functional in a browser (Vite dev server) while gaining native powers in Electron. Down-spot demonstrates this pattern with its preload script and context bridge.

---

## Adding to an Existing App

1. **Create `state.js`** with your state object and `emit()` function
2. **Move all mutations** into `emit()` cases — if state changes, it goes through emit
3. **Create UI modules** in `ui/` that accept an emit function and expose render functions
4. **Wire in `main.js`** — init UI modules, register renderers, connect events
5. **Keep it flat** — resist the urge to add middleware, stores, or reactive frameworks. A switch statement and render calls are enough.

---

## Reference Implementations

- **Paint** (`../retro-tui-lab`) — the canonical reference, fully documented in its README. It moved out of this repo with the canvas toolkit; the pattern it demonstrates did not
- **GridSketch** (`gridsketch/`) — character art editor, same pattern
- **QuiltSketch** (`quiltsketch/`) — triangle quilt pattern designer, same pattern
- **down-spot** (`down-spot/`) — Electron app demonstrating the IPC adapter layer
