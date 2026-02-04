# RetroTUI Paint - Example Multi-Panel App

A simple paint program demonstrating how to build a multi-panel application with RetroTUI components using the **Decision Engine** pattern.

## Quick Start

```bash
cd ~/Code/brando/retro-tui
npx vite examples/paint
```

Open http://localhost:5173 in your browser.

## Architecture

This example demonstrates the recommended pattern for building apps with RetroTUI:

```
┌─────────────────────────────────────────────────────────────────┐
│                        main.js (Decision Engine)                │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  • Owns all state                                          │ │
│  │  • Listens to events from all panels                       │ │
│  │  • Makes decisions about cross-panel effects               │ │
│  │  • Handles keyboard shortcuts                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│         ┌──────────────┬──────────────┬──────────────┐         │
│         ↓              ↓              ↓              ↓         │
│    ┌─────────┐   ┌──────────┐   ┌──────────┐   ┌─────────┐    │
│    │ Toolbar │   │  Canvas  │   │ Palette  │   │ Status  │    │
│    │         │   │          │   │          │   │         │    │
│    │ events↑ │   │ events↑  │   │ events↑  │   │ props↓  │    │
│    │ props↓  │   │ props↓   │   │ props↓   │   │         │    │
│    └─────────┘   └──────────┘   └──────────┘   └─────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Key Principles

1. **Panels are "dumb"** - They render UI and emit events, but don't know about each other
2. **Decision Engine is "smart"** - It receives all events and coordinates responses
3. **Events bubble up** - Panels emit events like `palette:color`, `canvas:draw`
4. **Props flow down** - The engine updates panels by calling their render functions

## File Structure

```
examples/paint/
├── index.html              # App shell using RetroTUI components
├── README.md               # This file
└── src/
    ├── main.js             # Decision engine (central coordinator)
    ├── state.js            # Application state (pure data)
    ├── data/
    │   ├── colors.js       # Color palette definitions
    │   └── tools.js        # Tool definitions
    └── ui/
        ├── canvas.js       # Canvas rendering + events
        └── palette.js      # Color palette rendering + events
```

## The Decision Engine Pattern

### Why This Pattern?

| Problem | Solution |
|---------|----------|
| Panels need to communicate | Events flow through central handler |
| Forgetting to update UI after state change | Each case in switch handles all side effects |
| Complex cross-panel logic | All decisions in one place, easy to trace |
| Debugging state issues | Log all events: `console.log(\`[\${event}]\`, detail)` |

### Event Flow Example

```
User clicks cyan in palette
        │
        ↓
palette.js: emit('palette:color', { color: { name: 'Cyan', value: '#39c5cf' }})
        │
        ↓
main.js: switch case 'palette:color'
        │
        ├─→ state.currentColor = detail.color
        ├─→ renderColorSwatches(...)    // Highlight selected
        └─→ updateStatus('color', ...)  // Update status bar
```

### The emit() Function

The central event handler in `main.js`:

```javascript
function emit(event, detail = {}) {
  switch (event) {
    case 'canvas:draw':
      handleDraw(detail.x, detail.y);
      break;
      
    case 'palette:color':
      state.currentColor = detail.color;
      renderColorSwatches(...);
      updateStatus('color', detail.color.name);
      break;
      
    case 'tool:select':
      state.currentTool = detail.tool;
      el.toolbar.selected = detail.tool;
      updateStatus('tool', ...);
      break;
      
    // ... more cases
  }
}
```

### Dumb Panel Example

Panels don't import state - they receive everything as parameters:

```javascript
// ui/canvas.js - knows nothing about palette or tools

export function renderCanvas(container, grid, cursorX, cursorY, width) {
  // Just renders what it's told
}

export function initCanvasEvents(container, emit) {
  container.addEventListener('mousedown', (e) => {
    // Just emits events, doesn't handle them
    emit('canvas:draw', { x: ..., y: ... });
  });
}
```

## State Management

State is a simple object in `state.js`:

```javascript
export const state = {
  width: 16,
  height: 12,
  grid: [],
  cursorX: 0,
  cursorY: 0,
  currentTool: 'brush',
  currentColor: { name: 'Cyan', value: '#39c5cf' },
  focusArea: 'canvas',
  history: [],
};
```

**Key points:**
- State is mutable (for simplicity at this scale)
- Mutations only happen in `main.js`
- Pure helper functions (`initGrid`, `saveHistory`) in `state.js`

## Focus Management

Tab cycles between panels, arrow keys are context-aware:

```javascript
// In main.js
if (e.key === 'Tab') {
  const areas = ['canvas', 'palette', 'tools'];
  const next = (currentIndex + 1) % areas.length;
  emit('focus:change', { area: areas[next] });
}

// Arrow keys only work when canvas is focused
if (state.focusArea === 'canvas' && e.key === 'ArrowUp') {
  moveCursor(0, -1);
}
```

Visual feedback via panel `active` attribute:

```javascript
function updatePanelFocus(area) {
  ['canvas', 'palette', 'tools'].forEach(a => {
    document.getElementById(`panel-${a}`)
      ?.toggleAttribute('active', a === area);
  });
}
```

## RetroTUI Components Used

| Component | Usage |
|-----------|-------|
| `<retro-app>` | App shell layout (header, slots, status) |
| `<retro-panel>` | Collapsible panels with focus states |
| `<retro-menu>` | Dropdown menu bar |
| `<retro-toolbar>` | Tool buttons |
| `<retro-statusbar>` | Bottom status bar |
| `<retro-modal>` | Help dialog |
| `<retro-toast>` | Undo/action feedback |

## Extending This Pattern

### Adding a New Tool

1. Add to `data/tools.js`:
   ```javascript
   { id: 'line', key: 'L', icon: '╱', name: 'Line' }
   ```

2. Handle in `main.js` switch case for `canvas:draw`:
   ```javascript
   case 'line':
     // Line drawing logic
     break;
   ```

### Adding a New Panel

1. Add HTML in `index.html`:
   ```html
   <retro-panel id="panel-layers" slot="sidebar" title="Layers">
     ...
   </retro-panel>
   ```

2. Create `ui/layers.js` with render + event functions

3. Add event cases in `main.js`

4. Add to focus cycle array

### Converting to Lit Components

For maximum reusability, panels can become Lit components:

```javascript
// ui/paint-canvas.js
import { LitElement, html, css } from 'lit';

export class PaintCanvas extends LitElement {
  static properties = {
    grid: { type: Array },
    cursorX: { type: Number },
    cursorY: { type: Number },
  };

  render() {
    return html`
      <div class="canvas-grid" @click=${this._handleClick}>
        ${this.grid.flatMap((row, y) => 
          row.map((color, x) => html`
            <div class="cell" 
                 data-x=${x} data-y=${y}
                 style="background: ${color || ''}">
            </div>
          `)
        )}
      </div>
    `;
  }

  _handleClick(e) {
    const cell = e.target.closest('.cell');
    if (cell) {
      this.dispatchEvent(new CustomEvent('cell-click', {
        bubbles: true,
        detail: { x: +cell.dataset.x, y: +cell.dataset.y }
      }));
    }
  }
}

customElements.define('paint-canvas', PaintCanvas);
```

## Comparison: Inline vs ES Modules

| Approach | Lines | Testable | Reusable |
|----------|-------|----------|----------|
| All inline (GridSketch original) | ~1600 | No | No |
| ES Modules (this example) | ~500 | Yes | Partially |
| Full Lit Components | ~600 | Yes | Yes |

The ES Modules approach is a good middle ground - organized and testable without the overhead of full component extraction.

## License

MIT - Part of RetroTUI examples
