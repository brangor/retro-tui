# Workspace Phase 2: Workspace Container

**Goal:** Create `tui-workspace` component that manages a main content area and floating layer, constraining panels to bounds.

**Architecture:** A new Lit component with slots for main content and floating panels. Workspace listens to panel drag events and constrains positions to its bounds. Emits layout events for Decision Engine integration.

**Tech Stack:** Lit 3.1, TypeScript, CSS Grid, ResizeObserver for bounds tracking

---

## Task 1: Create Basic tui-workspace Component

**Files:**
- Create: `src/components/tui-workspace.ts`
- Create: `tests/tui-workspace.test.js`

**Step 1: Write the failing test**

Create `tests/tui-workspace.test.js`:

```js
import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-workspace.ts';

describe('tui-workspace', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-workspace></tui-workspace>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-workspace></tui-workspace>`);
    expect(el.shadowRoot).to.exist;
  });

  it('renders main slot content', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <div slot="main" id="canvas">Canvas</div>
      </tui-workspace>
    `);
    const slot = el.shadowRoot.querySelector('slot[name="main"]');
    expect(slot).to.exist;
  });

  it('renders floating slot content', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <div slot="floating" id="panel">Panel</div>
      </tui-workspace>
    `);
    const slot = el.shadowRoot.querySelector('slot[name="floating"]');
    expect(slot).to.exist;
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: FAIL - module not found

**Step 3: Implement basic workspace**

Create `src/components/tui-workspace.ts`:

```ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

/**
 * <tui-workspace> - Container for main content and floating panels
 * 
 * Manages layout zones and constrains floating panels to bounds.
 * 
 * @slot main - The primary content area (canvas)
 * @slot floating - Floating panels that sit above main content
 * 
 * @fires layout-change - When workspace layout changes
 */
@customElement('tui-workspace')
export class Workspace extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .workspace {
        position: relative;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
      }

      .main-area {
        grid-row: 1;
        grid-column: 1;
        position: relative;
        overflow: auto;
      }

      .floating-layer {
        grid-row: 1;
        grid-column: 1;
        position: relative;
        pointer-events: none;
        z-index: 100;
      }

      .floating-layer ::slotted(*) {
        pointer-events: auto;
      }
    `,
  ];

  render() {
    return html`
      <div class="workspace">
        <div class="main-area">
          <slot name="main"></slot>
        </div>
        <div class="floating-layer">
          <slot name="floating"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-workspace': Workspace;
  }
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-workspace.ts tests/tui-workspace.test.js
git commit -m "feat(workspace): create basic tui-workspace component with slots"
```

---

## Task 2: Export Workspace from Index

**Files:**
- Modify: `src/index.js`

**Step 1: Add export**

Add to `src/index.js`:

```js
export { Workspace } from './components/tui-workspace.ts';
```

**Step 2: Verify build**

Run: `npm run build` (or just check TypeScript)
Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/index.js
git commit -m "feat(workspace): export Workspace from index"
```

---

## Task 3: Track Workspace Bounds

**Files:**
- Modify: `src/components/tui-workspace.ts`
- Modify: `tests/tui-workspace.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-workspace.test.js`:

```js
it('exposes bounds property', async () => {
  const el = await fixture(html`<tui-workspace style="width: 800px; height: 600px;"></tui-workspace>`);
  // Wait for resize observer to fire
  await new Promise(r => setTimeout(r, 50));
  
  expect(el.bounds).to.exist;
  expect(el.bounds.width).to.be.greaterThan(0);
  expect(el.bounds.height).to.be.greaterThan(0);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: FAIL - `bounds` property doesn't exist

**Step 3: Implement bounds tracking**

Add to `src/components/tui-workspace.ts`:

```ts
import { state } from 'lit/decorators.js';

// Add to class:
@state()
private _bounds: DOMRect = new DOMRect();

private _resizeObserver: ResizeObserver | null = null;

get bounds(): DOMRect {
  return this._bounds;
}

connectedCallback(): void {
  super.connectedCallback();
  
  this._resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      this._bounds = entry.contentRect;
      this.dispatchEvent(new CustomEvent('bounds-change', {
        detail: { bounds: this._bounds },
        bubbles: true,
        composed: true,
      }));
    }
  });
  
  this._resizeObserver.observe(this);
}

disconnectedCallback(): void {
  super.disconnectedCallback();
  this._resizeObserver?.disconnect();
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-workspace.ts tests/tui-workspace.test.js
git commit -m "feat(workspace): track bounds with ResizeObserver"
```

---

## Task 4: Constrain Panel Positions to Bounds

**Files:**
- Modify: `src/components/tui-workspace.ts`
- Modify: `tests/tui-workspace.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-workspace.test.js`:

```js
import '../src/components/tui-panel.ts';

it('constrains panel position to bounds', async () => {
  const el = await fixture(html`
    <tui-workspace style="width: 400px; height: 300px;">
      <tui-panel 
        slot="floating" 
        title="Test" 
        draggable 
        position-x="500" 
        position-y="400"
        panel-width="100"
        panel-height="80"
      >Content</tui-panel>
    </tui-workspace>
  `);
  
  // Wait for bounds and constraint to apply
  await new Promise(r => setTimeout(r, 100));
  
  const panel = el.querySelector('tui-panel');
  // Panel should be constrained to workspace bounds
  expect(panel.positionX).to.be.lessThanOrEqual(400 - 100); // workspace width - panel width
  expect(panel.positionY).to.be.lessThanOrEqual(300 - 80); // workspace height - panel height
});

it('emits layout-change when panel moves', async () => {
  const el = await fixture(html`
    <tui-workspace style="width: 400px; height: 300px;">
      <tui-panel slot="floating" title="Test" draggable position-x="50" position-y="50">Content</tui-panel>
    </tui-workspace>
  `);
  
  let layoutEvent = null;
  el.addEventListener('layout-change', (e) => { layoutEvent = e.detail; });
  
  const panel = el.querySelector('tui-panel');
  panel.positionX = 100;
  panel.positionY = 100;
  panel.dispatchEvent(new CustomEvent('panel-move', {
    detail: { panelId: 'Test', x: 100, y: 100 },
    bubbles: true,
    composed: true,
  }));
  
  await new Promise(r => setTimeout(r, 50));
  
  expect(layoutEvent).to.exist;
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: FAIL - panels not constrained

**Step 3: Implement constraint logic**

Add to `src/components/tui-workspace.ts`:

```ts
private _handlePanelMove = (e: CustomEvent): void => {
  const panel = e.target as HTMLElement;
  if (!panel.hasAttribute('draggable')) return;
  
  const { x, y } = e.detail;
  const panelWidth = (panel as any).panelWidth ?? panel.offsetWidth;
  const panelHeight = (panel as any).panelHeight ?? panel.offsetHeight;
  
  // Constrain to bounds
  const constrainedX = Math.max(0, Math.min(x, this._bounds.width - panelWidth));
  const constrainedY = Math.max(0, Math.min(y, this._bounds.height - panelHeight));
  
  // Update panel position if constrained
  if (constrainedX !== x || constrainedY !== y) {
    (panel as any).positionX = constrainedX;
    (panel as any).positionY = constrainedY;
  }
  
  this._emitLayoutChange();
};

private _emitLayoutChange(): void {
  const panels = this._getFloatingPanels();
  const layout = panels.map(p => ({
    id: p.id || (p as any).title,
    x: (p as any).positionX,
    y: (p as any).positionY,
    width: (p as any).panelWidth ?? p.offsetWidth,
    height: (p as any).panelHeight ?? p.offsetHeight,
  }));
  
  this.dispatchEvent(new CustomEvent('layout-change', {
    detail: { panels: layout, bounds: this._bounds },
    bubbles: true,
    composed: true,
  }));
}

private _getFloatingPanels(): HTMLElement[] {
  const slot = this.shadowRoot?.querySelector('slot[name="floating"]') as HTMLSlotElement;
  if (!slot) return [];
  return slot.assignedElements() as HTMLElement[];
}

connectedCallback(): void {
  super.connectedCallback();
  
  // ... existing ResizeObserver code ...
  
  // Listen for panel events
  this.addEventListener('panel-move', this._handlePanelMove as EventListener);
}

disconnectedCallback(): void {
  super.disconnectedCallback();
  this._resizeObserver?.disconnect();
  this.removeEventListener('panel-move', this._handlePanelMove as EventListener);
}
```

Also add initial constraint on slotchange:

```ts
private _constrainAllPanels(): void {
  const panels = this._getFloatingPanels();
  for (const panel of panels) {
    if (!panel.hasAttribute('draggable')) continue;
    
    const x = (panel as any).positionX ?? 0;
    const y = (panel as any).positionY ?? 0;
    const panelWidth = (panel as any).panelWidth ?? panel.offsetWidth ?? 100;
    const panelHeight = (panel as any).panelHeight ?? panel.offsetHeight ?? 100;
    
    const constrainedX = Math.max(0, Math.min(x, this._bounds.width - panelWidth));
    const constrainedY = Math.max(0, Math.min(y, this._bounds.height - panelHeight));
    
    if (constrainedX !== x) (panel as any).positionX = constrainedX;
    if (constrainedY !== y) (panel as any).positionY = constrainedY;
  }
}

// Update render to handle slotchange:
render() {
  return html`
    <div class="workspace">
      <div class="main-area">
        <slot name="main"></slot>
      </div>
      <div class="floating-layer">
        <slot name="floating" @slotchange=${this._onFloatingSlotChange}></slot>
      </div>
    </div>
  `;
}

private _onFloatingSlotChange(): void {
  // Delay to allow panels to render with their dimensions
  requestAnimationFrame(() => {
    this._constrainAllPanels();
  });
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-workspace.ts tests/tui-workspace.test.js
git commit -m "feat(workspace): constrain panel positions to bounds"
```

---

## Task 5: Handle Panel Resize Events

**Files:**
- Modify: `src/components/tui-workspace.ts`
- Modify: `tests/tui-workspace.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-workspace.test.js`:

```js
it('constrains panel size to bounds on resize', async () => {
  const el = await fixture(html`
    <tui-workspace style="width: 400px; height: 300px;">
      <tui-panel 
        slot="floating" 
        title="Test" 
        draggable
        resizable
        position-x="50" 
        position-y="50"
        panel-width="100"
        panel-height="80"
      >Content</tui-panel>
    </tui-workspace>
  `);
  
  await new Promise(r => setTimeout(r, 50));
  
  const panel = el.querySelector('tui-panel');
  
  // Try to resize beyond bounds
  panel.panelWidth = 500; // exceeds workspace width
  panel.dispatchEvent(new CustomEvent('panel-resize', {
    detail: { panelId: 'Test', width: 500, height: 80 },
    bubbles: true,
    composed: true,
  }));
  
  await new Promise(r => setTimeout(r, 50));
  
  // Width should be constrained
  expect(panel.panelWidth).to.be.lessThanOrEqual(400 - 50); // workspace - position
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: FAIL - resize not constrained

**Step 3: Implement resize constraint**

Add to `src/components/tui-workspace.ts`:

```ts
private _handlePanelResize = (e: CustomEvent): void => {
  const panel = e.target as HTMLElement;
  if (!panel.hasAttribute('resizable')) return;
  
  const { width, height } = e.detail;
  const x = (panel as any).positionX ?? 0;
  const y = (panel as any).positionY ?? 0;
  
  // Constrain size to available space
  const maxWidth = this._bounds.width - x;
  const maxHeight = this._bounds.height - y;
  
  const constrainedWidth = Math.min(width, maxWidth);
  const constrainedHeight = Math.min(height, maxHeight);
  
  if (constrainedWidth !== width) (panel as any).panelWidth = constrainedWidth;
  if (constrainedHeight !== height) (panel as any).panelHeight = constrainedHeight;
  
  this._emitLayoutChange();
};

// Add to connectedCallback:
this.addEventListener('panel-resize', this._handlePanelResize as EventListener);

// Add to disconnectedCallback:
this.removeEventListener('panel-resize', this._handlePanelResize as EventListener);
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-workspace.ts tests/tui-workspace.test.js
git commit -m "feat(workspace): constrain panel resize to bounds"
```

---

## Task 6: Handle Panel Dismiss Events

**Files:**
- Modify: `src/components/tui-workspace.ts`
- Modify: `tests/tui-workspace.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-workspace.test.js`:

```js
it('emits layout-change when panel dismissed', async () => {
  const el = await fixture(html`
    <tui-workspace style="width: 400px; height: 300px;">
      <tui-panel slot="floating" title="Test" draggable dismissable>Content</tui-panel>
    </tui-workspace>
  `);
  
  let layoutEvent = null;
  el.addEventListener('layout-change', (e) => { layoutEvent = e.detail; });
  
  const panel = el.querySelector('tui-panel');
  panel.dispatchEvent(new CustomEvent('panel-dismiss', {
    detail: { panelId: 'Test' },
    bubbles: true,
    composed: true,
  }));
  
  await new Promise(r => setTimeout(r, 50));
  
  expect(layoutEvent).to.exist;
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: FAIL - layout-change not emitted on dismiss

**Step 3: Implement dismiss handler**

Add to `src/components/tui-workspace.ts`:

```ts
private _handlePanelDismiss = (e: CustomEvent): void => {
  // Just emit layout change - actual hiding is handled by app
  this._emitLayoutChange();
};

// Add to connectedCallback:
this.addEventListener('panel-dismiss', this._handlePanelDismiss as EventListener);

// Add to disconnectedCallback:
this.removeEventListener('panel-dismiss', this._handlePanelDismiss as EventListener);
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-workspace.ts tests/tui-workspace.test.js
git commit -m "feat(workspace): emit layout-change on panel dismiss"
```

---

## Task 7: Update Floating Panels Demo

**Files:**
- Modify: `examples/floating-panels/index.html`

**Step 1: Update demo to use workspace**

Replace content with workspace-based version:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Floating Panels Demo</title>
  <link rel="stylesheet" href="../../src/styles/tokens.css">
  <style>
    body {
      margin: 0;
      background: var(--surface-base);
      color: var(--text-primary);
      font-family: var(--font-mono);
      min-height: 100vh;
    }
    
    tui-workspace {
      width: 100vw;
      height: 100vh;
    }
    
    .canvas {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      font-size: 1.5rem;
      flex-direction: column;
      gap: 1rem;
    }
    
    .canvas-hint {
      font-size: 0.9rem;
      opacity: 0.6;
    }
    
    .event-log {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--surface-elevated);
      border-top: 1px solid var(--color-info);
      padding: 8px 16px;
      font-size: 0.75rem;
      color: var(--text-muted);
      max-height: 80px;
      overflow-y: auto;
      z-index: 200;
    }
    
    .event-log-title {
      color: var(--color-info);
      margin-bottom: 4px;
    }
  </style>
</head>
<body>
  <tui-workspace id="workspace">
    <div slot="main" class="canvas">
      <div>[ Canvas Area ]</div>
      <div class="canvas-hint">Panels constrained to workspace bounds • Drag • Resize • Collapse • Dismiss</div>
    </div>
    
    <tui-panel 
      slot="floating"
      id="colors-panel"
      title="Colors" 
      color="primary"
      draggable 
      dismissable 
      collapsible
      resizable
      position-x="50"
      position-y="50"
      panel-width="200"
      panel-height="250"
    >
      <div style="padding: 8px;">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
          <div style="width: 40px; height: 40px; background: #ff5555; border: 1px solid #fff3;"></div>
          <div style="width: 40px; height: 40px; background: #50fa7b; border: 1px solid #fff3;"></div>
          <div style="width: 40px; height: 40px; background: #bd93f9; border: 1px solid #fff3;"></div>
          <div style="width: 40px; height: 40px; background: #f1fa8c; border: 1px solid #fff3;"></div>
          <div style="width: 40px; height: 40px; background: #8be9fd; border: 1px solid #fff3;"></div>
          <div style="width: 40px; height: 40px; background: #ff79c6; border: 1px solid #fff3;"></div>
        </div>
      </div>
    </tui-panel>
    
    <tui-panel 
      slot="floating"
      id="tools-panel"
      title="Tools" 
      color="secondary"
      draggable 
      dismissable 
      collapsible
      resizable
      position-x="280"
      position-y="50"
      panel-width="180"
      panel-height="300"
    >
      <div style="padding: 8px; display: flex; flex-direction: column; gap: 8px;">
        <div style="padding: 8px; border: 1px solid var(--color-secondary); cursor: pointer;">▢ Select</div>
        <div style="padding: 8px; border: 1px solid var(--color-secondary); cursor: pointer;">✎ Brush</div>
        <div style="padding: 8px; border: 1px solid var(--color-secondary); cursor: pointer;">◯ Eraser</div>
        <div style="padding: 8px; border: 1px solid var(--color-secondary); cursor: pointer;">◧ Fill</div>
      </div>
    </tui-panel>
    
    <tui-panel 
      slot="floating"
      id="layers-panel"
      title="Layers" 
      color="info"
      draggable 
      dismissable 
      collapsible
      resizable
      position-x="50"
      position-y="330"
      panel-width="250"
      panel-height="200"
    >
      <div style="padding: 8px; display: flex; flex-direction: column; gap: 4px;">
        <div style="padding: 6px; background: var(--surface-base); display: flex; justify-content: space-between;">
          <span>◉ Layer 3</span>
          <span style="opacity: 0.5">👁</span>
        </div>
        <div style="padding: 6px; background: var(--surface-base); display: flex; justify-content: space-between;">
          <span>○ Layer 2</span>
          <span style="opacity: 0.5">👁</span>
        </div>
        <div style="padding: 6px; background: var(--surface-base); display: flex; justify-content: space-between;">
          <span>○ Layer 1</span>
          <span style="opacity: 0.5">👁</span>
        </div>
      </div>
    </tui-panel>
  </tui-workspace>
  
  <div class="event-log">
    <div class="event-log-title">Event Log</div>
    <div id="log-content">Events will appear here...</div>
  </div>

  <script type="module">
    import '../../src/components/tui-workspace.ts';
    import '../../src/components/tui-panel.ts';
    
    const logContent = document.getElementById('log-content');
    const workspace = document.getElementById('workspace');
    const maxLogLines = 5;
    const logLines = [];
    
    function log(msg) {
      logLines.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
      if (logLines.length > maxLogLines) logLines.shift();
      logContent.textContent = logLines.join('\n');
    }
    
    // Workspace events
    workspace.addEventListener('layout-change', e => {
      log(`layout: ${e.detail.panels.length} panels, bounds: ${Math.round(e.detail.bounds.width)}×${Math.round(e.detail.bounds.height)}`);
    });
    
    workspace.addEventListener('bounds-change', e => {
      log(`bounds: ${Math.round(e.detail.bounds.width)}×${Math.round(e.detail.bounds.height)}`);
    });
    
    // Panel events
    document.querySelectorAll('tui-panel').forEach(panel => {
      panel.addEventListener('panel-dismiss', e => {
        log(`dismiss: ${e.detail.panelId}`);
        e.target.style.display = 'none';
      });
      
      panel.addEventListener('toggle', e => {
        log(`toggle: ${panel.title} → ${e.detail.collapsed ? 'collapsed' : 'expanded'}`);
      });
    });
    
    log('Workspace demo ready. Panels are constrained to workspace bounds.');
  </script>
</body>
</html>
```

**Step 2: Test manually**

Run: `npm run dev`
Open: `http://localhost:5173/examples/floating-panels/`
Verify: 
- Panels can't be dragged outside workspace bounds
- Panels can't be resized beyond workspace bounds
- Layout events fire on move/resize

**Step 3: Commit**

```bash
git add examples/floating-panels/index.html
git commit -m "feat(workspace): update demo to use tui-workspace container"
```

---

## Task 8: Run Full Test Suite

**Step 1: Run all tests**

Run: `npm test`
Expected: All tests pass

**Step 2: Check TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "chore: fix any issues from Phase 2"
```

---

## Summary of Phase 2 Deliverables

**New component: `tui-workspace`**

| Slot | Description |
|------|-------------|
| `main` | Primary content area (canvas) |
| `floating` | Floating panels layer |

| Property | Type | Description |
|----------|------|-------------|
| `bounds` | DOMRect | Current workspace dimensions (read-only) |

| Event | Detail | Description |
|-------|--------|-------------|
| `bounds-change` | `{ bounds }` | Workspace resized |
| `layout-change` | `{ panels, bounds }` | Panel layout changed |

**Behaviors:**
- Panels in floating slot are constrained to workspace bounds
- Panel positions adjusted on drag to stay within bounds
- Panel sizes adjusted on resize to stay within bounds
- Layout events emitted for Decision Engine integration
