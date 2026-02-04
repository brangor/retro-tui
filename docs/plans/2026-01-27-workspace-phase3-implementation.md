# Workspace Phase 3: Sidebars & Docking

**Goal:** Create `tui-sidebar` component and add gravity-zone docking to workspace, enabling panels to snap to edges.

**Architecture:** Sidebar is a container that stacks panels. Workspace detects drag proximity to edges (gravity zones), shows visual feedback, and emits dock/undock events. Panel state includes `docked` mode with `side` property.

**Tech Stack:** Lit 3.1, TypeScript, CSS Flexbox for stacking, pointer events for drag detection

---

## Task 1: Create Basic tui-sidebar Component

**Files:**
- Create: `src/components/tui-sidebar.ts`
- Create: `tests/tui-sidebar.test.js`

**Step 1: Write the failing test**

Create `tests/tui-sidebar.test.js`:

```js
import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-sidebar.ts';

describe('tui-sidebar', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-sidebar side="left"></tui-sidebar>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-sidebar side="left"></tui-sidebar>`);
    expect(el.shadowRoot).to.exist;
  });

  it('reflects side attribute', async () => {
    const el = await fixture(html`<tui-sidebar side="right"></tui-sidebar>`);
    expect(el.side).to.equal('right');
  });

  it('renders slot for panels', async () => {
    const el = await fixture(html`
      <tui-sidebar side="left">
        <div id="panel1">Panel 1</div>
      </tui-sidebar>
    `);
    const slot = el.shadowRoot.querySelector('slot');
    expect(slot).to.exist;
  });

  it('can be collapsed', async () => {
    const el = await fixture(html`<tui-sidebar side="left" collapsed></tui-sidebar>`);
    expect(el.collapsed).to.be.true;
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-sidebar.test.js`
Expected: FAIL - module not found

**Step 3: Implement basic sidebar**

Create `src/components/tui-sidebar.ts`:

```ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

type SidebarSide = 'left' | 'right' | 'top' | 'bottom';

/**
 * <tui-sidebar> - Edge-docked container for panels
 * 
 * Stacks panels vertically (left/right) or horizontally (top/bottom).
 * Can be collapsed to a thin strip showing panel names.
 * 
 * @attr {string} side - Which edge: 'left' | 'right' | 'top' | 'bottom'
 * @attr {boolean} collapsed - Whether sidebar is collapsed
 * @attr {number} size - Width (left/right) or height (top/bottom) in pixels
 * 
 * @slot - Panels to stack in the sidebar
 * 
 * @fires sidebar-collapse - When collapsed state changes
 * @fires sidebar-resize - When sidebar is resized
 */
@customElement('tui-sidebar')
export class Sidebar extends LitElement {
  @property({ type: String, reflect: true })
  side: SidebarSide = 'left';

  @property({ type: Boolean, reflect: true })
  collapsed = false;

  @property({ type: Number })
  size = 250;

  @property({ type: Number, attribute: 'min-size' })
  minSize = 150;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        background: var(--surface-elevated);
        border: 1px solid var(--color-info);
        position: relative;
      }

      /* Orientation based on side */
      :host([side="left"]),
      :host([side="right"]) {
        height: 100%;
      }

      :host([side="top"]),
      :host([side="bottom"]) {
        width: 100%;
      }

      .sidebar {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
      }

      :host([side="top"]) .sidebar,
      :host([side="bottom"]) .sidebar {
        flex-direction: row;
      }

      .header {
        padding: var(--spacing-xs) var(--spacing-sm);
        border-bottom: 1px solid var(--color-info);
        color: var(--color-info);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.75rem;
        user-select: none;
        cursor: grab;
      }

      :host([side="top"]) .header,
      :host([side="bottom"]) .header {
        border-bottom: none;
        border-right: 1px solid var(--color-info);
        writing-mode: vertical-rl;
        text-orientation: mixed;
      }

      .collapse-btn {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        font-size: 0.7rem;
        opacity: 0.7;
      }

      .collapse-btn:hover {
        opacity: 1;
      }

      .content {
        flex: 1;
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      :host([side="top"]) .content,
      :host([side="bottom"]) .content {
        flex-direction: row;
      }

      /* Collapsed state */
      :host([collapsed]) .content {
        display: none;
      }

      :host([collapsed]) {
        width: auto !important;
        height: auto !important;
      }

      :host([side="left"][collapsed]),
      :host([side="right"][collapsed]) {
        width: 24px !important;
      }

      :host([side="top"][collapsed]),
      :host([side="bottom"][collapsed]) {
        height: 24px !important;
      }

      .collapsed-label {
        display: none;
        writing-mode: vertical-rl;
        text-orientation: mixed;
        font-size: 0.7rem;
        letter-spacing: 0.15em;
        color: var(--color-info);
        padding: var(--spacing-sm);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      :host([side="top"][collapsed]) .collapsed-label,
      :host([side="bottom"][collapsed]) .collapsed-label {
        writing-mode: horizontal-tb;
      }

      :host([collapsed]) .collapsed-label {
        display: block;
      }

      :host([collapsed]) .header {
        display: none;
      }

      /* Resize handle */
      .resize-handle {
        position: absolute;
        background: transparent;
      }

      :host([side="left"]) .resize-handle {
        right: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        cursor: ew-resize;
      }

      :host([side="right"]) .resize-handle {
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        cursor: ew-resize;
      }

      :host([side="top"]) .resize-handle {
        bottom: 0;
        left: 0;
        right: 0;
        height: 4px;
        cursor: ns-resize;
      }

      :host([side="bottom"]) .resize-handle {
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        cursor: ns-resize;
      }

      .resize-handle:hover {
        background: var(--color-info);
        opacity: 0.3;
      }
    `,
  ];

  private _getPanelNames(): string[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    const elements = slot.assignedElements();
    return elements.map(el => (el as any).title || el.id || 'Panel');
  }

  private _toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(new CustomEvent('sidebar-collapse', {
      detail: { side: this.side, collapsed: this.collapsed },
      bubbles: true,
      composed: true,
    }));
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('size') && !this.collapsed) {
      if (this.side === 'left' || this.side === 'right') {
        this.style.width = `${this.size}px`;
      } else {
        this.style.height = `${this.size}px`;
      }
    }
  }

  render() {
    const panelNames = this._getPanelNames();
    const collapsedLabel = `SIDEBAR ‹${panelNames.join(', ')}›`;

    return html`
      <div class="sidebar">
        <div class="header">
          <span>SIDEBAR</span>
          <button class="collapse-btn" @click=${this._toggleCollapse}>
            ${this.collapsed ? '▸' : '▾'}
          </button>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="collapsed-label" @click=${this._toggleCollapse}>
          ${collapsedLabel}
        </div>
      </div>
      ${!this.collapsed ? html`<div class="resize-handle"></div>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-sidebar': Sidebar;
  }
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-sidebar.test.js`
Expected: PASS

**Step 5: Export and commit**

Add to `src/index.js`:
```js
export { Sidebar } from './components/tui-sidebar.ts';
```

```bash
git add src/components/tui-sidebar.ts tests/tui-sidebar.test.js src/index.js
git commit -m "feat(sidebar): create basic tui-sidebar component"
```

---

## Task 2: Add Sidebar Slots to Workspace

**Files:**
- Modify: `src/components/tui-workspace.ts`
- Modify: `tests/tui-workspace.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-workspace.test.js`:

```js
import '../src/components/tui-sidebar.ts';

it('renders sidebar slots', async () => {
  const el = await fixture(html`
    <tui-workspace>
      <tui-sidebar slot="left" side="left"></tui-sidebar>
      <tui-sidebar slot="right" side="right"></tui-sidebar>
      <div slot="main">Canvas</div>
    </tui-workspace>
  `);
  
  const leftSlot = el.shadowRoot.querySelector('slot[name="left"]');
  const rightSlot = el.shadowRoot.querySelector('slot[name="right"]');
  expect(leftSlot).to.exist;
  expect(rightSlot).to.exist;
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: FAIL - slots don't exist

**Step 3: Add sidebar slots to workspace**

Update workspace render and styles:

```ts
// Add to styles:
css`
  .workspace {
    display: grid;
    grid-template-areas:
      "top top top"
      "left main right"
      "bottom bottom bottom";
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto 1fr auto;
  }

  .sidebar-top { grid-area: top; }
  .sidebar-left { grid-area: left; }
  .sidebar-right { grid-area: right; }
  .sidebar-bottom { grid-area: bottom; }
  .main-area { grid-area: main; }
`

// Update render:
render() {
  return html`
    <div class="workspace">
      <div class="sidebar-top">
        <slot name="top"></slot>
      </div>
      <div class="sidebar-left">
        <slot name="left"></slot>
      </div>
      <div class="main-area">
        <slot name="main"></slot>
      </div>
      <div class="sidebar-right">
        <slot name="right"></slot>
      </div>
      <div class="sidebar-bottom">
        <slot name="bottom"></slot>
      </div>
      <div class="floating-layer">
        <slot name="floating" @slotchange=${this._onFloatingSlotChange}></slot>
      </div>
    </div>
  `;
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-workspace.ts tests/tui-workspace.test.js
git commit -m "feat(workspace): add sidebar slots (top, right, bottom, left)"
```

---

## Task 3: Implement Gravity Zones Detection

**Files:**
- Modify: `src/components/tui-workspace.ts`
- Modify: `tests/tui-workspace.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-workspace.test.js`:

```js
it('detects gravity zone on panel drag', async () => {
  const el = await fixture(html`
    <tui-workspace style="width: 800px; height: 600px;">
      <tui-panel slot="floating" title="Test" draggable position-x="50" position-y="50">Content</tui-panel>
    </tui-workspace>
  `);
  
  let dockEvent = null;
  el.addEventListener('panel-dock-preview', (e) => { dockEvent = e.detail; });
  
  const panel = el.querySelector('tui-panel');
  
  // Drag panel near left edge (within gravity zone)
  panel.dispatchEvent(new CustomEvent('panel-move', {
    detail: { panelId: 'Test', x: 20, y: 100 },
    bubbles: true,
    composed: true,
  }));
  
  await new Promise(r => setTimeout(r, 50));
  
  expect(dockEvent).to.exist;
  expect(dockEvent.side).to.equal('left');
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: FAIL - no dock preview event

**Step 3: Implement gravity zone detection**

Add to `src/components/tui-workspace.ts`:

```ts
@property({ type: Number, attribute: 'gravity-zone' })
gravityZone = 50;

private _detectGravityZone(x: number, y: number, panelWidth: number, panelHeight: number): string | null {
  const bounds = this._bounds;
  
  // Check each edge
  if (x <= this.gravityZone) return 'left';
  if (x + panelWidth >= bounds.width - this.gravityZone) return 'right';
  if (y <= this.gravityZone) return 'top';
  if (y + panelHeight >= bounds.height - this.gravityZone) return 'bottom';
  
  return null;
}

// Update _handlePanelMove:
private _handlePanelMove = (e: CustomEvent): void => {
  const panel = e.target as HTMLElement;
  if (!panel.hasAttribute('draggable')) return;
  
  const { x, y } = e.detail;
  const panelWidth = (panel as any).panelWidth ?? panel.offsetWidth ?? 100;
  const panelHeight = (panel as any).panelHeight ?? panel.offsetHeight ?? 100;
  
  // Check gravity zones
  const gravityZone = this._detectGravityZone(x, y, panelWidth, panelHeight);
  if (gravityZone) {
    this.dispatchEvent(new CustomEvent('panel-dock-preview', {
      detail: { panelId: e.detail.panelId, side: gravityZone },
      bubbles: true,
      composed: true,
    }));
  }
  
  // Constrain to bounds (existing code)
  const constrainedX = Math.max(0, Math.min(x, this._bounds.width - panelWidth));
  const constrainedY = Math.max(0, Math.min(y, this._bounds.height - panelHeight));
  
  if (constrainedX !== x || constrainedY !== y) {
    (panel as any).positionX = constrainedX;
    (panel as any).positionY = constrainedY;
  }
  
  this._emitLayoutChange();
};
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-workspace.ts tests/tui-workspace.test.js
git commit -m "feat(workspace): detect gravity zones during panel drag"
```

---

## Task 4: Add Visual Feedback for Gravity Zones

**Files:**
- Modify: `src/components/tui-workspace.ts`

**Step 1: Add dock preview indicator**

Add styles and state:

```ts
@state()
private _dockPreview: string | null = null;

// Add to styles:
css`
  .dock-preview {
    position: absolute;
    background: var(--color-info);
    opacity: 0.2;
    pointer-events: none;
    z-index: 99;
    transition: opacity 0.1s;
  }

  .dock-preview.left {
    left: 0;
    top: 0;
    bottom: 0;
    width: 200px;
  }

  .dock-preview.right {
    right: 0;
    top: 0;
    bottom: 0;
    width: 200px;
  }

  .dock-preview.top {
    top: 0;
    left: 0;
    right: 0;
    height: 150px;
  }

  .dock-preview.bottom {
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
  }
`

// Update render to show preview:
${this._dockPreview ? html`
  <div class="dock-preview ${this._dockPreview}"></div>
` : ''}
```

Update move handler to set preview state:

```ts
private _handlePanelMove = (e: CustomEvent): void => {
  // ... existing code ...
  
  const gravityZone = this._detectGravityZone(x, y, panelWidth, panelHeight);
  this._dockPreview = gravityZone;
  
  // ... rest of existing code ...
};
```

Add handler to clear preview on drag end:

```ts
private _handlePanelDragEnd = (): void => {
  this._dockPreview = null;
};

// Listen in connectedCallback:
this.addEventListener('pointerup', this._handlePanelDragEnd);
```

**Step 2: Commit**

```bash
git add src/components/tui-workspace.ts
git commit -m "feat(workspace): add visual feedback for dock gravity zones"
```

---

## Task 5: Implement Dock on Drop

**Files:**
- Modify: `src/components/tui-workspace.ts`
- Modify: `tests/tui-workspace.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-workspace.test.js`:

```js
it('emits panel-dock when dropped in gravity zone', async () => {
  const el = await fixture(html`
    <tui-workspace style="width: 800px; height: 600px;">
      <tui-panel slot="floating" title="Test" draggable position-x="20" position-y="100">Content</tui-panel>
    </tui-workspace>
  `);
  
  let dockEvent = null;
  el.addEventListener('panel-dock', (e) => { dockEvent = e.detail; });
  
  // Simulate drag end in gravity zone
  el.dispatchEvent(new CustomEvent('panel-drag-end', {
    detail: { panelId: 'Test', x: 20, y: 100 },
    bubbles: true,
  }));
  
  await new Promise(r => setTimeout(r, 50));
  
  // Should emit dock event since position is in left gravity zone
  expect(dockEvent).to.exist;
  expect(dockEvent.side).to.equal('left');
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: FAIL - no dock event

**Step 3: Implement dock on drop**

Add panel drag end handler:

```ts
private _handlePanelDragEnd = (e: CustomEvent): void => {
  if (this._dockPreview) {
    this.dispatchEvent(new CustomEvent('panel-dock', {
      detail: { 
        panelId: e.detail?.panelId, 
        side: this._dockPreview 
      },
      bubbles: true,
      composed: true,
    }));
  }
  this._dockPreview = null;
};

// Listen in connectedCallback:
this.addEventListener('panel-drag-end', this._handlePanelDragEnd as EventListener);
```

Also update tui-panel to emit drag-end event:

```ts
// In tui-panel.ts _onDragEnd:
private _onDragEnd = (): void => {
  this._isDragging = false;
  document.removeEventListener('pointermove', this._onDragMove);
  document.removeEventListener('pointerup', this._onDragEnd);
  
  this.dispatchEvent(new CustomEvent('panel-drag-end', {
    detail: { 
      panelId: this.id || this.title,
      x: this.positionX,
      y: this.positionY
    },
    bubbles: true,
    composed: true,
  }));
};
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-workspace.ts src/components/tui-panel.ts tests/tui-workspace.test.js
git commit -m "feat(workspace): emit panel-dock event when dropped in gravity zone"
```

---

## Task 6: Add Panel Docked State

**Files:**
- Modify: `src/components/tui-panel.ts`
- Modify: `tests/tui-panel.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-panel.test.js`:

```js
it('reflects docked attribute', async () => {
  const el = await fixture(html`<tui-panel title="Test" docked="left">Content</tui-panel>`);
  expect(el.docked).to.equal('left');
  expect(el.hasAttribute('docked')).to.be.true;
});

it('removes draggable positioning when docked', async () => {
  const el = await fixture(html`<tui-panel title="Test" docked="left">Content</tui-panel>`);
  expect(el.hasAttribute('draggable')).to.be.false;
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-panel.test.js`
Expected: FAIL - docked property doesn't exist

**Step 3: Add docked property**

Add to `src/components/tui-panel.ts`:

```ts
@property({ type: String, reflect: true })
docked: 'left' | 'right' | 'top' | 'bottom' | '' = '';

// Add styles for docked panels:
css`
  :host([docked]) {
    position: relative !important;
    left: auto !important;
    top: auto !important;
    width: 100% !important;
    z-index: auto;
  }

  :host([docked="top"]),
  :host([docked="bottom"]) {
    height: auto !important;
    width: 100% !important;
  }

  :host([docked="left"]),
  :host([docked="right"]) {
    width: 100% !important;
    height: auto !important;
  }
`
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-panel.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-panel.ts tests/tui-panel.test.js
git commit -m "feat(panel): add docked attribute for sidebar-attached panels"
```

---

## Task 7: Sidebar Resize Handle

**Files:**
- Modify: `src/components/tui-sidebar.ts`
- Modify: `tests/tui-sidebar.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-sidebar.test.js`:

```js
it('emits sidebar-resize on drag', async () => {
  const el = await fixture(html`<tui-sidebar side="left" size="250"></tui-sidebar>`);
  
  let resizeEvent = null;
  el.addEventListener('sidebar-resize', (e) => { resizeEvent = e.detail; });
  
  const handle = el.shadowRoot.querySelector('.resize-handle');
  
  handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 250, clientY: 100, bubbles: true }));
  document.dispatchEvent(new PointerEvent('pointermove', { clientX: 300, clientY: 100 }));
  document.dispatchEvent(new PointerEvent('pointerup', {}));
  
  expect(resizeEvent).to.exist;
  expect(resizeEvent.size).to.be.a('number');
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-sidebar.test.js`
Expected: FAIL - no resize event

**Step 3: Implement sidebar resize**

Add resize handlers to `src/components/tui-sidebar.ts`:

```ts
private _isResizing = false;
private _resizeStartPos = 0;
private _resizeStartSize = 0;

private _onResizeStart = (e: PointerEvent): void => {
  e.preventDefault();
  this._isResizing = true;
  this._resizeStartPos = this.side === 'left' || this.side === 'right' ? e.clientX : e.clientY;
  this._resizeStartSize = this.size;
  
  document.addEventListener('pointermove', this._onResizeMove);
  document.addEventListener('pointerup', this._onResizeEnd);
};

private _onResizeMove = (e: PointerEvent): void => {
  if (!this._isResizing) return;
  
  const currentPos = this.side === 'left' || this.side === 'right' ? e.clientX : e.clientY;
  let delta = currentPos - this._resizeStartPos;
  
  // Invert delta for right/bottom
  if (this.side === 'right' || this.side === 'bottom') {
    delta = -delta;
  }
  
  const newSize = Math.max(this.minSize, this._resizeStartSize + delta);
  this.size = newSize;
  
  this.dispatchEvent(new CustomEvent('sidebar-resize', {
    detail: { side: this.side, size: this.size },
    bubbles: true,
    composed: true,
  }));
};

private _onResizeEnd = (): void => {
  this._isResizing = false;
  document.removeEventListener('pointermove', this._onResizeMove);
  document.removeEventListener('pointerup', this._onResizeEnd);
};

// Update render to bind handler:
${!this.collapsed ? html`
  <div class="resize-handle" @pointerdown=${this._onResizeStart}></div>
` : ''}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-sidebar.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-sidebar.ts tests/tui-sidebar.test.js
git commit -m "feat(sidebar): implement resize handle with pointer events"
```

---

## Task 8: Run Full Test Suite

**Step 1: Run all tests**

Run: `npm test`
Expected: All tests pass

**Step 2: Check TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "chore: Phase 3 complete - sidebars and docking"
```

---

## Summary of Phase 3 Deliverables

**New component: `tui-sidebar`**

| Attribute | Type | Description |
|-----------|------|-------------|
| `side` | string | Which edge: left, right, top, bottom |
| `collapsed` | boolean | Collapsed to thin strip |
| `size` | number | Width or height in pixels |
| `min-size` | number | Minimum size |

| Event | Detail | Description |
|-------|--------|-------------|
| `sidebar-collapse` | `{ side, collapsed }` | Collapse state changed |
| `sidebar-resize` | `{ side, size }` | Sidebar resized |

**Enhanced `tui-workspace`:**

| Attribute | Type | Description |
|-----------|------|-------------|
| `gravity-zone` | number | Pixels from edge to trigger dock preview |

| New Slot | Description |
|----------|-------------|
| `left` | Left sidebar |
| `right` | Right sidebar |
| `top` | Top sidebar |
| `bottom` | Bottom sidebar |

| New Event | Detail | Description |
|-----------|--------|-------------|
| `panel-dock-preview` | `{ panelId, side }` | Panel entering gravity zone |
| `panel-dock` | `{ panelId, side }` | Panel dropped in gravity zone |

**Enhanced `tui-panel`:**

| Attribute | Type | Description |
|-----------|------|-------------|
| `docked` | string | Which side panel is docked to |

| New Event | Detail | Description |
|-----------|--------|-------------|
| `panel-drag-end` | `{ panelId, x, y }` | Drag operation completed |
