# Floating Panels Implementation Plan

**Goal:** Simplify retro-tui layout to floating-first panels and update quiltsketch to use the new architecture.

**Architecture:** Remove competing layout systems. tui-app provides chrome only (header, menu, status). tui-workspace has main content + floating panel layer. Panels snap visually to edges and each other but never constrain content.

**Tech Stack:** Lit 3.x, TypeScript, CSS Grid/Flexbox, Pointer Events API

---

## Task 1: Simplify tui-app Layout

**Files:**
- Modify: `src/components/tui-app.ts`

**Step 1: Remove toolbar-area from template**

In `tui-app.ts`, update the render method to remove the toolbar-area div:

```typescript
render() {
  const displayTitle = this.subtitle 
    ? html`░░ ${this.title} <span>[ ${this.subtitle} ]</span> ░░`
    : html`░░ ${this.title} ░░`;

  return html`
    <header class="header">
      <div class="header__top">
        <h1 class="header__title">
          <slot name="header">${displayTitle}</slot>
        </h1>
        <div class="header__right">
          <slot name="header-right"></slot>
        </div>
      </div>
      <nav class="header__menu">
        <slot name="menu"></slot>
      </nav>
    </header>

    <div class="container">
      <div class="workspace-area" data-focus-context="workspace">
        <slot name="main"></slot>
      </div>
      
      <div class="sidebar-area" data-focus-context="sidebar">
        <slot name="sidebar"></slot>
      </div>
    </div>

    <footer class="status-bar">
      <slot name="status"></slot>
    </footer>
  `;
}
```

**Step 2: Update CSS to remove toolbar-area and fix sidebar hiding**

Replace the container and area styles in the static styles:

```typescript
/* ═══════════════════════════════════════════════════════════════════
   MAIN CONTAINER
   ═══════════════════════════════════════════════════════════════════ */

.container {
  display: flex;
  flex: 1;
  padding: 0.75rem var(--spacing-md);
  min-height: 0;
  gap: 0;
}

/* Workspace slot - grows to fill all available space */
.workspace-area {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
}

/* Sidebar slot - fixed width, only shown when has content */
.sidebar-area {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  width: 280px;
  flex-shrink: 0;
}

/* Hide sidebar when empty - use :has() for reliable detection */
.sidebar-area:not(:has(::slotted(*))) {
  display: none;
  width: 0;
}
```

**Step 3: Remove focus context indicators for removed areas**

Remove the toolbar-area focus styling from CSS:

```typescript
/* ═══════════════════════════════════════════════════════════════════
   FOCUS CONTEXT INDICATORS
   ═══════════════════════════════════════════════════════════════════ */

.workspace-area:focus-within,
.sidebar-area:focus-within {
  outline: 1px dashed var(--color-primary);
  outline-offset: 2px;
}

/* Hide focus outline when using mouse */
:host(.using-mouse) .workspace-area:focus-within,
:host(.using-mouse) .sidebar-area:focus-within {
  outline: none;
}
```

**Step 4: Verify build passes**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 5: Commit**

```bash
git add src/components/tui-app.ts
git commit -m "feat(tui-app): remove toolbar-area, simplify to chrome-only layout"
```

---

## Task 2: Simplify tui-workspace to Main + Floating Only

**Files:**
- Modify: `src/components/tui-workspace.ts`

**Step 1: Remove sidebar slots from template**

Update the render method to only have main and floating:

```typescript
render() {
  return html`
    <div class="workspace">
      <div class="main-area">
        <slot name="main"></slot>
      </div>
      <div class="floating-layer">
        <slot name="floating" @slotchange=${this._onFloatingSlotChange}></slot>
      </div>
      ${this._snapPreview ? html`
        <div class="snap-preview ${this._snapPreview}"></div>
      ` : ''}
    </div>
  `;
}
```

**Step 2: Simplify CSS to remove sidebar grid**

Replace the workspace styles:

```typescript
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
    }

    .main-area {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Floating layer covers entire workspace */
    .floating-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 100;
    }

    .floating-layer ::slotted(*) {
      pointer-events: auto;
    }

    /* Snap preview overlay */
    .snap-preview {
      position: absolute;
      background: var(--color-info, #8be9fd);
      opacity: 0.15;
      pointer-events: none;
      z-index: 99;
      transition: opacity 0.1s;
    }

    .snap-preview.left {
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
    }

    .snap-preview.right {
      right: 0;
      top: 0;
      bottom: 0;
      width: 4px;
    }

    .snap-preview.top {
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
    }
  `,
];
```

**Step 3: Update state to use snap instead of dock**

Change the state property:

```typescript
@state()
private _snapPreview: 'left' | 'right' | 'top' | null = null;
```

Remove these properties and state:
- `_dockPreview`
- `_pendingDropIndex`
- `gravityZone` property
- `autoDock` property

**Step 4: Remove sidebar-related methods**

Remove these methods entirely:
- `_getSidebar()`
- `_clearSidebarDropIndicators()`
- `_handlePanelDragEnd` dock logic (simplify to just snap)

**Step 5: Verify build passes**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 6: Commit**

```bash
git add src/components/tui-workspace.ts
git commit -m "feat(tui-workspace): simplify to main + floating slots only"
```

---

## Task 3: Implement Snap-to-Edge Logic

**Files:**
- Modify: `src/components/tui-workspace.ts`

**Step 1: Add snap zone constant and detection**

Add at top of class:

```typescript
private static readonly SNAP_ZONE = 20; // pixels from edge to trigger snap
```

Add snap detection method:

```typescript
private _detectSnapEdge(x: number, y: number, panelWidth: number, panelHeight: number): 'left' | 'right' | 'top' | null {
  const bounds = this._bounds;
  
  // Check each edge
  if (x <= Workspace.SNAP_ZONE) return 'left';
  if (x + panelWidth >= bounds.width - Workspace.SNAP_ZONE) return 'right';
  if (y <= Workspace.SNAP_ZONE) return 'top';
  
  return null;
}
```

**Step 2: Update panel move handler to show snap preview**

```typescript
private _handlePanelMove = (e: CustomEvent): void => {
  const panel = e.target as HTMLElement;
  if (!panel.hasAttribute('floating')) return;
  
  const { x, y } = e.detail;
  const panelWidth = (panel as any).panelWidth ?? panel.offsetWidth ?? 100;
  const panelHeight = (panel as any).panelHeight ?? panel.offsetHeight ?? 100;
  
  // Check snap zones
  const snapEdge = this._detectSnapEdge(x, y, panelWidth, panelHeight);
  this._snapPreview = snapEdge;
  
  // Constrain to bounds
  if (this._bounds.width > 0 && this._bounds.height > 0) {
    const maxX = this._bounds.width - panelWidth;
    const maxY = this._bounds.height - panelHeight;
    
    if (maxX > 0 && maxY > 0) {
      const constrainedX = Math.max(0, Math.min(x, maxX));
      const constrainedY = Math.max(0, Math.min(y, maxY));
      
      if (constrainedX !== x || constrainedY !== y) {
        (panel as any).positionX = constrainedX;
        (panel as any).positionY = constrainedY;
      }
    }
  }
};
```

**Step 3: Update drag end handler to apply snap**

```typescript
private _handlePanelDragEnd = (e: CustomEvent): void => {
  const panel = e.target as HTMLElement;
  if (!panel) return;
  
  if (this._snapPreview) {
    const edge = this._snapPreview;
    const panelWidth = (panel as any).panelWidth ?? panel.offsetWidth ?? 100;
    const panelHeight = (panel as any).panelHeight ?? panel.offsetHeight ?? 100;
    
    // Snap to edge
    switch (edge) {
      case 'left':
        (panel as any).positionX = 0;
        break;
      case 'right':
        (panel as any).positionX = this._bounds.width - panelWidth;
        break;
      case 'top':
        (panel as any).positionY = 0;
        break;
    }
    
    // Set snap-edge attribute for persistence
    (panel as any).snapEdge = edge;
  } else {
    // Clear snap-edge if dropped freely
    (panel as any).snapEdge = '';
  }
  
  this._snapPreview = null;
};
```

**Step 4: Verify build passes**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 5: Commit**

```bash
git add src/components/tui-workspace.ts
git commit -m "feat(tui-workspace): add snap-to-edge logic for floating panels"
```

---

## Task 4: Update tui-panel for Floating-First

**Files:**
- Modify: `src/components/tui-panel.ts`

**Step 1: Add snap-edge property**

Add new property:

```typescript
@property({ type: String, attribute: 'snap-edge', reflect: true })
snapEdge: 'left' | 'right' | 'top' | '' = '';
```

**Step 2: Remove docked attribute handling**

Remove or simplify:
- Remove `docked` property
- Remove `_wasDocked` private property
- Remove dock-related CSS (`:host([docked])` selectors)
- Simplify `_onDragStart` to always allow drag for floating panels

**Step 3: Ensure floating is always true by default**

Update constructor or property default:

```typescript
@property({ type: Boolean, reflect: true })
floating = true; // Default to floating
```

**Step 4: Simplify drag start - always draggable when floating**

```typescript
private _onDragStart = (e: PointerEvent): void => {
  if (!this.floating) return;
  
  // Don't start drag if clicking on a control button
  const target = e.target as HTMLElement;
  if (target.closest('.collapse-btn') || target.closest('.dismiss-btn')) {
    return;
  }
  
  e.preventDefault();
  this._isDragging = true;
  this._dragStartX = e.clientX;
  this._dragStartY = e.clientY;
  this._dragOffsetX = this.positionX;
  this._dragOffsetY = this.positionY;
  
  document.addEventListener('pointermove', this._onDragMove);
  document.addEventListener('pointerup', this._onDragEnd);
};
```

**Step 5: Update render to always show draggable header**

```typescript
render() {
  return html`
    <div class="panel ${this.collapsed ? 'collapsed' : ''}">
      <div 
        class="header ${this.floating ? 'draggable' : ''}"
        @pointerdown=${this.floating ? this._onDragStart : undefined}
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
      ${this.resizable && this.floating ? html`
        <div class="resize-handle" @pointerdown=${this._onResizeStart}></div>
      ` : ''}
    </div>
  `;
}
```

**Step 6: Verify build passes**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 7: Commit**

```bash
git add src/components/tui-panel.ts
git commit -m "feat(tui-panel): simplify to floating-first, add snap-edge property"
```

---

## Task 5: Run retro-tui Tests

**Files:**
- None (verification only)

**Step 1: Run test suite**

Run: `npm run test:run`
Expected: Tests pass (some may need updating due to removed slots)

**Step 2: Fix any failing tests**

Update tests that reference removed slots (left, right, top, bottom sidebars).

**Step 3: Commit test fixes if any**

```bash
git add tests/
git commit -m "test: update tests for floating-first panel architecture"
```

---

## Task 6: Update Quiltsketch Layout - All Panels Floating

**Files:**
- Modify: `quiltsketch/index.html`

**Step 1: Move toolbar to floating slot with initial position**

Replace the toolbar panel:

```html
<!-- Toolbar as floating panel (snaps to left) -->
<tui-panel 
  id="panel-tools" 
  slot="floating" 
  title="Tools"
  floating
  position-x="8"
  position-y="8"
  snap-edge="left"
  collapsible
>
  <tui-toolbar
    id="toolbar"
    orientation="vertical"
    selected="brush">
  </tui-toolbar>
  <div id="shapeConfig" class="shape-config">
    <div class="shape-label">Shape:</div>
    <div class="shape-buttons" id="shapeButtons"></div>
  </div>
  <div id="fillConfig" class="shape-config">
    <label class="fill-option">
      <input type="checkbox" id="fillCornersCheckbox">
      <span>Fill corners</span>
    </label>
  </div>
</tui-panel>
```

**Step 2: Replace sidebar with floating panels**

Replace the tui-workspace content:

```html
<!-- Workspace: Canvas + Floating Panels -->
<tui-workspace slot="main">
  <!-- Canvas as main content -->
  <div slot="main" class="canvas-container">
    <svg id="canvas" class="quilt-canvas" viewBox="0 0 500 500">
      <!-- Rendered by JS -->
    </svg>
  </div>

  <!-- Toolbar panel (left edge) -->
  <tui-panel 
    id="panel-tools" 
    slot="floating" 
    title="Tools"
    floating
    position-x="8"
    position-y="8"
    snap-edge="left"
    collapsible
  >
    <tui-toolbar
      id="toolbar"
      orientation="vertical"
      selected="brush">
    </tui-toolbar>
    <div id="shapeConfig" class="shape-config">
      <div class="shape-label">Shape:</div>
      <div class="shape-buttons" id="shapeButtons"></div>
    </div>
    <div id="fillConfig" class="shape-config">
      <label class="fill-option">
        <input type="checkbox" id="fillCornersCheckbox">
        <span>Fill corners</span>
      </label>
    </div>
  </tui-panel>

  <!-- Colors panel (right edge) -->
  <tui-panel 
    id="panel-colors" 
    slot="floating"
    title="Colors" 
    color="green" 
    floating
    position-x="calc(100% - 208px)"
    position-y="8"
    snap-edge="right"
    collapsible 
    dismissable
  >
    <div id="colorGrid" class="color-grid"></div>
  </tui-panel>

  <!-- Controls panel (right edge, below colors) -->
  <tui-panel 
    id="panel-controls" 
    slot="floating"
    title="Controls" 
    color="yellow" 
    floating
    position-x="calc(100% - 208px)"
    position-y="200"
    snap-edge="right"
    collapsible 
    collapsed 
    dismissable
  >
    <div class="controls-help">
      <h4>Tools</h4>
      <p><kbd>B</kbd> Brush <kbd>E</kbd> Erase</p>
      <p><kbd>F</kbd> Fill <kbd>R</kbd> Replace <kbd>X</kbd> Clear</p>
      <p>Press tool key again to cycle shapes</p>
      
      <h4>Colors</h4>
      <p><kbd>1</kbd>-<kbd>9</kbd> Select color</p>
      
      <h4>View</h4>
      <p><kbd>G</kbd> Toggle grid</p>
      <p><kbd>D</kbd> Toggle guides</p>
      
      <h4>Zoom</h4>
      <p><kbd>+</kbd> Zoom in <kbd>-</kbd> Zoom out</p>
      <p><kbd>0</kbd> Reset zoom</p>
      
      <h4>Edit</h4>
      <p><kbd>Ctrl+Z</kbd> Undo</p>
    </div>
  </tui-panel>
</tui-workspace>
```

**Step 3: Remove tui-sidebar import/usage**

Remove any `<tui-sidebar>` elements from the HTML.

**Step 4: Verify in browser**

Run: `npm run dev`
Expected: App loads with floating panels over canvas

**Step 5: Commit**

```bash
git add index.html
git commit -m "feat: migrate to floating panels layout"
```

---

## Task 7: Fix Color Swatches to Use Icon Buttons

**Files:**
- Modify: `quiltsketch/index.html` (CSS)
- Modify: `quiltsketch/src/ui/palette.js`

**Step 1: Update color grid CSS for fixed-size swatches**

In index.html, update the color-grid styles:

```css
/* Color palette grid - fixed size swatches */
.color-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 0.5rem;
}

.color-swatch {
  width: 36px;
  height: 36px;
  border: 1px solid var(--border-default);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: transparent;
  transition: border-color 0.1s, box-shadow 0.1s;
  flex-shrink: 0;
}

.color-swatch:hover {
  border-color: var(--text-primary);
  box-shadow: 0 0 0 1px var(--text-primary);
}

.color-swatch.selected {
  border-color: var(--color-primary);
  box-shadow: 
    inset 0 0 0 2px var(--surface-base),
    inset 0 0 0 3px var(--color-primary);
  color: inherit;
  text-shadow: 0 0 2px rgba(0,0,0,0.8);
}
```

**Step 2: Verify swatches are consistent size**

Run: `npm run dev`
Expected: Color swatches are 36x36px, don't resize with panel width

**Step 3: Commit**

```bash
git add index.html src/ui/palette.js
git commit -m "fix: use fixed-size color swatches matching toolbar icons"
```

---

## Task 8: Test Panel Positioning with JS

**Files:**
- Modify: `quiltsketch/src/main.js`

**Step 1: Add panel position initialization**

Since `position-x="calc(...)"` won't work in attributes, initialize positions in JS:

```javascript
function initPanelPositions() {
  const workspace = document.querySelector('tui-workspace');
  if (!workspace) return;
  
  // Get workspace bounds
  const bounds = workspace.getBoundingClientRect();
  
  // Position right-side panels
  const colorsPanel = document.getElementById('panel-colors');
  const controlsPanel = document.getElementById('panel-controls');
  
  if (colorsPanel) {
    colorsPanel.positionX = bounds.width - 208;
    colorsPanel.positionY = 8;
  }
  
  if (controlsPanel) {
    controlsPanel.positionX = bounds.width - 208;
    controlsPanel.positionY = 200;
  }
}
```

**Step 2: Call on init and resize**

Add to init function:

```javascript
function init() {
  // ... existing init code ...
  
  // Initialize panel positions
  initPanelPositions();
  
  // Reposition on resize
  window.addEventListener('resize', initPanelPositions);
}
```

**Step 3: Update index.html to use simple position values**

```html
<tui-panel 
  id="panel-colors" 
  slot="floating"
  title="Colors" 
  color="green" 
  floating
  position-x="0"
  position-y="8"
  snap-edge="right"
  collapsible 
  dismissable
>
```

**Step 4: Verify panels reposition on window resize**

Run: `npm run dev`
Expected: Right panels stay at right edge when window resizes

**Step 5: Commit**

```bash
git add src/main.js index.html
git commit -m "feat: dynamic panel positioning based on workspace bounds"
```

---

## Task 9: Final Verification

**Files:**
- None (verification only)

**Step 1: Test all success criteria**

| Criterion | Test |
|-----------|------|
| Canvas fills workspace | Resize window, no gaps at edges |
| Panels float over canvas | Zoom canvas large, scroll, panels stay fixed |
| Panels draggable | Drag each panel by header |
| Panels snap to edges | Drag panel near edge, release |
| Toolbar is a panel | Drag toolbar, collapse it |
| Color swatches fixed size | Check swatches don't resize |
| No layout gaps | Check no empty space at window edges |

**Step 2: Commit any final fixes**

```bash
git add .
git commit -m "fix: final adjustments for floating panels"
```

---

## Summary

| Task | Component | Description |
|------|-----------|-------------|
| 1 | tui-app | Remove toolbar-area, fix sidebar hiding |
| 2 | tui-workspace | Simplify to main + floating only |
| 3 | tui-workspace | Add snap-to-edge logic |
| 4 | tui-panel | Floating-first, add snap-edge property |
| 5 | retro-tui | Run and fix tests |
| 6 | quiltsketch | Migrate to floating panels |
| 7 | quiltsketch | Fix color swatch sizing |
| 8 | quiltsketch | Dynamic panel positioning |
| 9 | all | Final verification |

**Estimated time:** 2-3 hours for full implementation
