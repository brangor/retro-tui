# The Decision Engine Pattern

The Decision Engine is the recommended architecture for apps built with retro-tui. It's a centralized, unidirectional state management pattern where a single `emit()` function handles all state mutations and triggers re-renders.

Three shipped apps use this pattern: the Paint example, GridSketch, and QuiltSketch. A fourth (Charmapder, a sprite editor) is in design.

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
│   canvas.js  — renders tui-grid, emits pointer events│
│   palette.js — renders color swatches, emits selects │
│   status.js  — renders tui-statusbar from state      │
│                                                      │
│   These modules NEVER mutate state directly.         │
│   They call emit() for changes, and expose           │
│   render functions the engine calls.                 │
└──────────────────────────────────────────────────────┘
```

**The rule:** State flows down (engine → UI). Events flow up (UI → engine). Nothing else.

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
// ui/canvas.js
export function initCanvas(gridEl, emitFn) {
  gridEl.addEventListener('grid-draw', (e) => {
    emitFn('canvas:draw', { x: e.detail.x, y: e.detail.y });
  });
}

export function renderCanvas(gridEl, grid) {
  gridEl.setGrid(grid);
}
```

The engine wires them together at startup:

```js
// main.js
import { emit } from './state.js';
import { initCanvas, renderCanvas } from './ui/canvas.js';

const gridEl = document.querySelector('tui-grid');
initCanvas(gridEl, emit);

// Register renderers so the engine can call them
setRenderers({ renderCanvas: () => renderCanvas(gridEl, state.grid) });
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
│   │  (tui-grid, tui-tiled, ...) │       │
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

- **Paint** (`retro-tui/examples/paint/`) — the canonical reference, fully documented in its README
- **GridSketch** (`gridsketch/`) — character art editor, same pattern
- **QuiltSketch** (`quiltsketch/`) — triangle quilt pattern designer, same pattern
- **down-spot** (`down-spot/`) — Electron app demonstrating the IPC adapter layer
