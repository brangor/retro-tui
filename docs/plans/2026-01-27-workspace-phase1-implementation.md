# Workspace Phase 1: Standalone Draggable Panels

**Goal:** Enhance tui-panel with draggable, dismissable, and resizable capabilities that work standalone (no workspace required).

**Architecture:** Add new boolean attributes to tui-panel that enable drag/dismiss/resize behaviors. Use CSS for positioning, pointer events for drag/resize interactions. Panel emits events for all state changes so apps can react.

**Tech Stack:** Lit 3.1, TypeScript, CSS absolute positioning, pointer events API

---

## Task 1: Add Dismiss Button and Event

**Files:**
- Modify: `src/components/tui-panel.ts`
- Modify: `tests/tui-panel.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-panel.test.js`:

```js
it('shows dismiss button when dismissable', async () => {
  const el = await fixture(html`<tui-panel title="Test" dismissable>Content</tui-panel>`);
  const dismissBtn = el.shadowRoot.querySelector('.dismiss-btn');
  expect(dismissBtn).to.exist;
});

it('hides dismiss button by default', async () => {
  const el = await fixture(html`<tui-panel title="Test">Content</tui-panel>`);
  const dismissBtn = el.shadowRoot.querySelector('.dismiss-btn');
  expect(dismissBtn).to.not.exist;
});

it('emits panel-dismiss event when dismiss clicked', async () => {
  const el = await fixture(html`<tui-panel title="Test" dismissable>Content</tui-panel>`);
  let dismissed = false;
  el.addEventListener('panel-dismiss', () => { dismissed = true; });
  
  const dismissBtn = el.shadowRoot.querySelector('.dismiss-btn');
  dismissBtn.click();
  
  expect(dismissed).to.be.true;
});
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL - `.dismiss-btn` not found, `dismissable` property doesn't exist

**Step 3: Implement dismiss functionality**

In `src/components/tui-panel.ts`, add property:

```ts
@property({ type: Boolean, reflect: true })
dismissable = false;
```

Add styles for dismiss button:

```css
.header-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 4px);
  margin-left: auto;
}

.dismiss-btn {
  background: none;
  border: none;
  color: inherit;
  font-family: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0 2px;
  opacity: 0.6;
  line-height: 1;
}

.dismiss-btn:hover {
  opacity: 1;
  color: var(--color-error, #ff5555);
}
```

Add dismiss method:

```ts
dismiss(): void {
  this.dispatchEvent(new CustomEvent('panel-dismiss', {
    detail: { panelId: this.id || this.title },
    bubbles: true,
    composed: true,
  }));
}
```

Update render() header section:

```ts
<div class="header-controls">
  ${this.collapsible ? html`
    <button class="toggle" aria-label="Toggle panel" @click=${this.toggle}>
      ${this.collapsed ? '▸' : '▾'}
    </button>
  ` : ''}
  ${this.dismissable ? html`
    <button class="dismiss-btn" aria-label="Dismiss panel" @click=${this.dismiss}>×</button>
  ` : ''}
</div>
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-panel.ts tests/tui-panel.test.js
git commit -m "feat(panel): add dismissable attribute with dismiss button and event"
```

---

## Task 2: Add Draggable Attribute and Positioning

**Files:**
- Modify: `src/components/tui-panel.ts`
- Modify: `tests/tui-panel.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-panel.test.js`:

```js
it('has draggable-header class when draggable', async () => {
  const el = await fixture(html`<tui-panel title="Test" draggable>Content</tui-panel>`);
  const header = el.shadowRoot.querySelector('.header');
  expect(header.classList.contains('draggable')).to.be.true;
});

it('applies absolute positioning when draggable', async () => {
  const el = await fixture(html`<tui-panel title="Test" draggable>Content</tui-panel>`);
  const style = getComputedStyle(el);
  expect(style.position).to.equal('absolute');
});

it('reflects position-x and position-y attributes', async () => {
  const el = await fixture(html`<tui-panel title="Test" draggable position-x="100" position-y="50">Content</tui-panel>`);
  expect(el.positionX).to.equal(100);
  expect(el.positionY).to.equal(50);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL - `draggable` property doesn't exist

**Step 3: Implement draggable positioning**

Add properties:

```ts
@property({ type: Boolean, reflect: true })
draggable = false;

@property({ type: Number, attribute: 'position-x' })
positionX = 0;

@property({ type: Number, attribute: 'position-y' })
positionY = 0;
```

Add styles:

```css
:host([draggable]) {
  position: absolute;
  z-index: 100;
}

.header.draggable {
  cursor: grab;
}

.header.draggable:active {
  cursor: grabbing;
}
```

Update render() to add draggable class:

```ts
<div 
  class="header ${this.collapsible ? 'clickable' : ''} ${this.draggable ? 'draggable' : ''}"
  @click=${this.collapsible && !this.draggable ? this.toggle : undefined}
>
```

Add updated() to apply position:

```ts
updated(changedProperties: Map<string, unknown>): void {
  if (this.draggable && (changedProperties.has('positionX') || changedProperties.has('positionY'))) {
    this.style.left = `${this.positionX}px`;
    this.style.top = `${this.positionY}px`;
  }
}
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-panel.ts tests/tui-panel.test.js
git commit -m "feat(panel): add draggable attribute with absolute positioning"
```

---

## Task 3: Implement Drag Interaction

**Files:**
- Modify: `src/components/tui-panel.ts`
- Modify: `tests/tui-panel.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-panel.test.js`:

```js
it('emits panel-move event during drag', async () => {
  const el = await fixture(html`<tui-panel title="Test" draggable>Content</tui-panel>`);
  let moveEvent = null;
  el.addEventListener('panel-move', (e) => { moveEvent = e.detail; });
  
  const header = el.shadowRoot.querySelector('.header');
  
  // Simulate drag start
  header.dispatchEvent(new PointerEvent('pointerdown', { clientX: 10, clientY: 10, bubbles: true }));
  
  // Simulate drag move
  document.dispatchEvent(new PointerEvent('pointermove', { clientX: 50, clientY: 30 }));
  
  // Simulate drag end
  document.dispatchEvent(new PointerEvent('pointerup', {}));
  
  expect(moveEvent).to.exist;
  expect(moveEvent.x).to.be.a('number');
  expect(moveEvent.y).to.be.a('number');
});
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL - no `panel-move` event emitted

**Step 3: Implement drag handlers**

Add private state for dragging:

```ts
private _isDragging = false;
private _dragStartX = 0;
private _dragStartY = 0;
private _dragOffsetX = 0;
private _dragOffsetY = 0;
```

Add drag methods:

```ts
private _onDragStart = (e: PointerEvent): void => {
  if (!this.draggable) return;
  
  e.preventDefault();
  this._isDragging = true;
  this._dragStartX = e.clientX;
  this._dragStartY = e.clientY;
  this._dragOffsetX = this.positionX;
  this._dragOffsetY = this.positionY;
  
  document.addEventListener('pointermove', this._onDragMove);
  document.addEventListener('pointerup', this._onDragEnd);
};

private _onDragMove = (e: PointerEvent): void => {
  if (!this._isDragging) return;
  
  const deltaX = e.clientX - this._dragStartX;
  const deltaY = e.clientY - this._dragStartY;
  
  this.positionX = this._dragOffsetX + deltaX;
  this.positionY = this._dragOffsetY + deltaY;
  
  this.dispatchEvent(new CustomEvent('panel-move', {
    detail: { 
      panelId: this.id || this.title,
      x: this.positionX, 
      y: this.positionY 
    },
    bubbles: true,
    composed: true,
  }));
};

private _onDragEnd = (): void => {
  this._isDragging = false;
  document.removeEventListener('pointermove', this._onDragMove);
  document.removeEventListener('pointerup', this._onDragEnd);
};
```

Update render() to bind pointerdown:

```ts
<div 
  class="header ${this.collapsible ? 'clickable' : ''} ${this.draggable ? 'draggable' : ''}"
  @pointerdown=${this.draggable ? this._onDragStart : undefined}
>
```

Cleanup in disconnectedCallback:

```ts
disconnectedCallback(): void {
  super.disconnectedCallback();
  this.removeEventListener('click', this._handleClick);
  document.removeEventListener('pointermove', this._onDragMove);
  document.removeEventListener('pointerup', this._onDragEnd);
}
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-panel.ts tests/tui-panel.test.js
git commit -m "feat(panel): implement drag interaction with pointer events"
```

---

## Task 4: Add Resizable Attribute

**Files:**
- Modify: `src/components/tui-panel.ts`
- Modify: `tests/tui-panel.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-panel.test.js`:

```js
it('shows resize handle when resizable', async () => {
  const el = await fixture(html`<tui-panel title="Test" draggable resizable>Content</tui-panel>`);
  const handle = el.shadowRoot.querySelector('.resize-handle');
  expect(handle).to.exist;
});

it('hides resize handle when not resizable', async () => {
  const el = await fixture(html`<tui-panel title="Test" draggable>Content</tui-panel>`);
  const handle = el.shadowRoot.querySelector('.resize-handle');
  expect(handle).to.not.exist;
});

it('reflects panel-width and panel-height attributes', async () => {
  const el = await fixture(html`<tui-panel title="Test" draggable resizable panel-width="300" panel-height="200">Content</tui-panel>`);
  expect(el.panelWidth).to.equal(300);
  expect(el.panelHeight).to.equal(200);
});

it('respects max-width constraint', async () => {
  const el = await fixture(html`<tui-panel title="Test" draggable resizable max-width="400" panel-width="500">Content</tui-panel>`);
  const style = getComputedStyle(el);
  expect(el.panelWidth).to.equal(500); // property is set
  expect(style.maxWidth).to.equal('400px'); // but CSS constrains it
});
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL - `resizable` property doesn't exist

**Step 3: Implement resizable**

Add properties:

```ts
@property({ type: Boolean, reflect: true })
resizable = false;

@property({ type: Number, attribute: 'panel-width' })
panelWidth: number | null = null;

@property({ type: Number, attribute: 'panel-height' })
panelHeight: number | null = null;

@property({ type: Number, attribute: 'max-width' })
maxWidth: number | null = null;

@property({ type: Number, attribute: 'max-height' })
maxHeight: number | null = null;

@property({ type: Number, attribute: 'min-width' })
minWidth = 150;

@property({ type: Number, attribute: 'min-height' })
minHeight = 100;
```

Add styles:

```css
.resize-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 12px;
  height: 12px;
  cursor: se-resize;
  opacity: 0.5;
}

.resize-handle::before {
  content: '◢';
  position: absolute;
  right: 2px;
  bottom: 0;
  font-size: 10px;
  color: var(--panel-color);
}

.resize-handle:hover {
  opacity: 1;
}
```

Update updated() for sizing:

```ts
updated(changedProperties: Map<string, unknown>): void {
  // Position
  if (this.draggable && (changedProperties.has('positionX') || changedProperties.has('positionY'))) {
    this.style.left = `${this.positionX}px`;
    this.style.top = `${this.positionY}px`;
  }
  
  // Sizing
  if (this.panelWidth !== null) {
    this.style.width = `${this.panelWidth}px`;
  }
  if (this.panelHeight !== null) {
    this.style.height = `${this.panelHeight}px`;
  }
  if (this.maxWidth !== null) {
    this.style.maxWidth = `${this.maxWidth}px`;
  }
  if (this.maxHeight !== null) {
    this.style.maxHeight = `${this.maxHeight}px`;
  }
  this.style.minWidth = `${this.minWidth}px`;
  this.style.minHeight = `${this.minHeight}px`;
}
```

Add resize handle to render():

```ts
${this.resizable && this.draggable ? html`
  <div class="resize-handle" @pointerdown=${this._onResizeStart}></div>
` : ''}
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-panel.ts tests/tui-panel.test.js
git commit -m "feat(panel): add resizable attribute with size constraints"
```

---

## Task 5: Implement Resize Interaction

**Files:**
- Modify: `src/components/tui-panel.ts`
- Modify: `tests/tui-panel.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-panel.test.js`:

```js
it('emits panel-resize event during resize', async () => {
  const el = await fixture(html`<tui-panel title="Test" draggable resizable panel-width="200" panel-height="150">Content</tui-panel>`);
  let resizeEvent = null;
  el.addEventListener('panel-resize', (e) => { resizeEvent = e.detail; });
  
  const handle = el.shadowRoot.querySelector('.resize-handle');
  
  // Simulate resize start
  handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 200, clientY: 150, bubbles: true }));
  
  // Simulate resize move
  document.dispatchEvent(new PointerEvent('pointermove', { clientX: 250, clientY: 200 }));
  
  // Simulate resize end
  document.dispatchEvent(new PointerEvent('pointerup', {}));
  
  expect(resizeEvent).to.exist;
  expect(resizeEvent.width).to.be.a('number');
  expect(resizeEvent.height).to.be.a('number');
});
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL - no `panel-resize` event emitted

**Step 3: Implement resize handlers**

Add private state for resizing:

```ts
private _isResizing = false;
private _resizeStartX = 0;
private _resizeStartY = 0;
private _resizeStartWidth = 0;
private _resizeStartHeight = 0;
```

Add resize methods:

```ts
private _onResizeStart = (e: PointerEvent): void => {
  if (!this.resizable) return;
  
  e.preventDefault();
  e.stopPropagation();
  this._isResizing = true;
  this._resizeStartX = e.clientX;
  this._resizeStartY = e.clientY;
  this._resizeStartWidth = this.panelWidth ?? this.offsetWidth;
  this._resizeStartHeight = this.panelHeight ?? this.offsetHeight;
  
  document.addEventListener('pointermove', this._onResizeMove);
  document.addEventListener('pointerup', this._onResizeEnd);
};

private _onResizeMove = (e: PointerEvent): void => {
  if (!this._isResizing) return;
  
  const deltaX = e.clientX - this._resizeStartX;
  const deltaY = e.clientY - this._resizeStartY;
  
  let newWidth = this._resizeStartWidth + deltaX;
  let newHeight = this._resizeStartHeight + deltaY;
  
  // Apply constraints
  newWidth = Math.max(this.minWidth, newWidth);
  newHeight = Math.max(this.minHeight, newHeight);
  if (this.maxWidth !== null) newWidth = Math.min(this.maxWidth, newWidth);
  if (this.maxHeight !== null) newHeight = Math.min(this.maxHeight, newHeight);
  
  this.panelWidth = newWidth;
  this.panelHeight = newHeight;
  
  this.dispatchEvent(new CustomEvent('panel-resize', {
    detail: { 
      panelId: this.id || this.title,
      width: this.panelWidth, 
      height: this.panelHeight 
    },
    bubbles: true,
    composed: true,
  }));
};

private _onResizeEnd = (): void => {
  this._isResizing = false;
  document.removeEventListener('pointermove', this._onResizeMove);
  document.removeEventListener('pointerup', this._onResizeEnd);
};
```

Update disconnectedCallback:

```ts
disconnectedCallback(): void {
  super.disconnectedCallback();
  this.removeEventListener('click', this._handleClick);
  document.removeEventListener('pointermove', this._onDragMove);
  document.removeEventListener('pointerup', this._onDragEnd);
  document.removeEventListener('pointermove', this._onResizeMove);
  document.removeEventListener('pointerup', this._onResizeEnd);
}
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-panel.ts tests/tui-panel.test.js
git commit -m "feat(panel): implement resize interaction with pointer events"
```

---

## Task 6: Add Collapse Toggle to Header Controls

**Files:**
- Modify: `src/components/tui-panel.ts`
- Modify: `tests/tui-panel.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-panel.test.js`:

```js
it('shows collapse button in header controls when collapsible', async () => {
  const el = await fixture(html`<tui-panel title="Test" collapsible>Content</tui-panel>`);
  const collapseBtn = el.shadowRoot.querySelector('.header-controls .collapse-btn');
  expect(collapseBtn).to.exist;
});

it('collapse button toggles collapsed state', async () => {
  const el = await fixture(html`<tui-panel title="Test" collapsible>Content</tui-panel>`);
  expect(el.collapsed).to.be.false;
  
  const collapseBtn = el.shadowRoot.querySelector('.header-controls .collapse-btn');
  collapseBtn.click();
  
  expect(el.collapsed).to.be.true;
});
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL - `.collapse-btn` inside `.header-controls` not found

**Step 3: Refactor header layout**

Update the header render to use header-controls properly:

```ts
render() {
  return html`
    <div class="panel ${this.collapsed ? 'collapsed' : ''}">
      <div 
        class="header ${this.draggable ? 'draggable' : ''}"
        @pointerdown=${this.draggable ? this._onDragStart : undefined}
      >
        <span class="title">${this.title}</span>
        <div class="header-controls">
          ${this.collapsible ? html`
            <button class="collapse-btn" aria-label="Toggle panel" @click=${this._onCollapseClick}>
              ${this.collapsed ? '▸' : '▾'}
            </button>
          ` : ''}
          ${this.dismissable ? html`
            <button class="dismiss-btn" aria-label="Dismiss panel" @click=${this._onDismissClick}>×</button>
          ` : ''}
        </div>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      ${this.resizable && this.draggable ? html`
        <div class="resize-handle" @pointerdown=${this._onResizeStart}></div>
      ` : ''}
    </div>
  `;
}
```

Add click handlers that stop propagation:

```ts
private _onCollapseClick = (e: Event): void => {
  e.stopPropagation();
  this.toggle();
};

private _onDismissClick = (e: Event): void => {
  e.stopPropagation();
  this.dismiss();
};
```

Add styles for collapse button:

```css
.collapse-btn {
  background: none;
  border: none;
  color: inherit;
  font-family: inherit;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0 2px;
  opacity: 0.7;
  line-height: 1;
}

.collapse-btn:hover {
  opacity: 1;
}
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-panel.ts tests/tui-panel.test.js
git commit -m "refactor(panel): move collapse button to header-controls section"
```

---

## Task 7: Visual Polish and Demo

**Files:**
- Modify: `src/components/tui-panel.ts`
- Create: `examples/floating-panels/index.html`

**Step 1: Add visual polish styles**

Update styles in `src/components/tui-panel.ts`:

```css
/* Floating panel shadow */
:host([draggable]) .panel {
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3), 
              6px 6px 0 rgba(255, 255, 255, 0.05);
}

/* Active dragging state */
:host([draggable]) .panel.dragging {
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.4), 
              10px 10px 0 rgba(255, 255, 255, 0.08);
  opacity: 0.95;
}

/* Resize cursor zones (optional edge resize) */
:host([resizable]) {
  position: relative;
}
```

**Step 2: Create demo page**

Create `examples/floating-panels/index.html`:

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
    
    .workspace {
      position: relative;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
    
    .canvas {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      font-size: 1.5rem;
    }
  </style>
</head>
<body>
  <div class="workspace">
    <div class="canvas">
      [ Canvas Area - Drag panels around ]
    </div>
    
    <tui-panel 
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
        Color palette goes here
      </div>
    </tui-panel>
    
    <tui-panel 
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
      <div style="padding: 8px;">
        Tool options go here
      </div>
    </tui-panel>
    
    <tui-panel 
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
      <div style="padding: 8px;">
        Layer list goes here
      </div>
    </tui-panel>
  </div>

  <script type="module">
    import '../../src/components/tui-panel.ts';
    
    // Log events for debugging
    document.querySelectorAll('tui-panel').forEach(panel => {
      panel.addEventListener('panel-move', e => console.log('move', e.detail));
      panel.addEventListener('panel-resize', e => console.log('resize', e.detail));
      panel.addEventListener('panel-dismiss', e => {
        console.log('dismiss', e.detail);
        e.target.style.display = 'none';
      });
    });
  </script>
</body>
</html>
```

**Step 3: Test manually**

Run: `npm run dev`
Open: `http://localhost:5173/examples/floating-panels/`
Verify: Panels can be dragged, resized, collapsed, and dismissed

**Step 4: Commit**

```bash
git add src/components/tui-panel.ts examples/floating-panels/
git commit -m "feat(panel): add floating panels demo with visual polish"
```

---

## Task 8: Run Full Test Suite and Verify

**Step 1: Run all tests**

Run: `npm test`
Expected: All tests pass

**Step 2: Run linter**

Run: `npm run lint` (if available) or check for TypeScript errors with `npx tsc --noEmit`
Expected: No errors

**Step 3: Final commit with any fixes**

```bash
git add -A
git commit -m "chore: fix any linting or type issues"
```

---

## Summary of New Panel Capabilities

After Phase 1, `tui-panel` supports:

| Attribute | Type | Description |
|-----------|------|-------------|
| `draggable` | boolean | Enables drag-to-move via title bar |
| `dismissable` | boolean | Shows X button, emits `panel-dismiss` |
| `resizable` | boolean | Shows resize handle (requires draggable) |
| `position-x` | number | X position when draggable |
| `position-y` | number | Y position when draggable |
| `panel-width` | number | Explicit width |
| `panel-height` | number | Explicit height |
| `max-width` | number | Maximum width constraint |
| `max-height` | number | Maximum height constraint |
| `min-width` | number | Minimum width (default 150) |
| `min-height` | number | Minimum height (default 100) |

| Event | Detail | Description |
|-------|--------|-------------|
| `panel-move` | `{ panelId, x, y }` | Emitted during drag |
| `panel-resize` | `{ panelId, width, height }` | Emitted during resize |
| `panel-dismiss` | `{ panelId }` | Emitted when dismiss clicked |

Existing attributes (`collapsible`, `collapsed`, `color`, `variant`, etc.) continue to work.
