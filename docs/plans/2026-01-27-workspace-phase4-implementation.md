# Workspace Phase 4: Simplified Attribute-Driven Docking

**Goal:** Simplify panel docking to be purely attribute-driven. Panels set `docked="left"` or `floating` attributes; workspace positions them via CSS. No DOM manipulation, no tight coupling.

**Architecture:** All panels are direct children of workspace (no slot shuffling). Workspace uses CSS Grid to position docked panels in sidebar zones, and absolute positioning for floating panels. Changing dock state = changing an attribute, nothing more.

**Tech Stack:** Lit 3.1, TypeScript, CSS Grid for layout

---

## Design Principles

**Before (Over-engineered):**
```js
// Workspace manipulates panel internals and moves DOM
workspace.dockPanel('tools', 'left');  // Moves DOM, sets properties
```

**After (Attribute-driven):**
```js
// App sets attribute, workspace CSS handles positioning
panel.docked = 'left';   // That's it
panel.floating = false;
```

**Key changes:**
1. No `dockPanel()`/`undockPanel()` methods - apps set attributes directly
2. No DOM movement - CSS handles positioning based on attributes
3. `auto-dock` just sets `panel.docked` attribute on gravity zone drop
4. Workspace reads panel state, never writes it (except auto-dock)
5. `tui-sidebar` becomes optional grouping/styling, not required for docking

---

## Task 1: Refactor Workspace to Position Panels by Attribute

**Files:**
- Modify: `src/components/tui-workspace.ts`
- Modify: `tests/tui-workspace.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-workspace.test.js`:

```js
it('positions docked panels in sidebar zones via CSS', async () => {
  const el = await fixture(html`
    <tui-workspace style="width: 800px; height: 600px;">
      <div slot="main">Canvas</div>
      <tui-panel id="left-panel" title="Left" docked="left">Left content</tui-panel>
      <tui-panel id="floating-panel" title="Float" floating position-x="200" position-y="100">Float content</tui-panel>
    </tui-workspace>
  `);
  
  await new Promise(r => setTimeout(r, 100));
  
  const leftPanel = el.querySelector('#left-panel');
  const floatingPanel = el.querySelector('#floating-panel');
  
  // Left panel should be in the left zone (check computed styles or position)
  const leftRect = leftPanel.getBoundingClientRect();
  const floatRect = floatingPanel.getBoundingClientRect();
  const workspaceRect = el.getBoundingClientRect();
  
  // Left panel should be near left edge
  expect(leftRect.left - workspaceRect.left).to.be.lessThan(50);
  
  // Floating panel should be at its specified position
  expect(floatRect.left - workspaceRect.left).to.be.approximately(200, 20);
  expect(floatRect.top - workspaceRect.top).to.be.approximately(100, 20);
});

it('re-positions panel when docked attribute changes', async () => {
  const el = await fixture(html`
    <tui-workspace style="width: 800px; height: 600px;">
      <div slot="main">Canvas</div>
      <tui-panel id="tools" title="Tools" floating position-x="300" position-y="150">Tools</tui-panel>
    </tui-workspace>
  `);
  
  await new Promise(r => setTimeout(r, 100));
  
  const panel = el.querySelector('#tools');
  const workspaceRect = el.getBoundingClientRect();
  
  // Initially floating at 300, 150
  let panelRect = panel.getBoundingClientRect();
  expect(panelRect.left - workspaceRect.left).to.be.approximately(300, 20);
  
  // Change to docked
  panel.docked = 'right';
  panel.floating = false;
  
  await new Promise(r => setTimeout(r, 100));
  
  // Should now be positioned on the right
  panelRect = panel.getBoundingClientRect();
  expect(panelRect.right).to.be.approximately(workspaceRect.right, 20);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: FAIL - panels not positioned correctly by attribute

**Step 3: Update workspace to use default slot with attribute-based positioning**

Update `src/components/tui-workspace.ts` styles:

```ts
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
      grid-template-areas:
        "top top top"
        "left main right"
        "bottom bottom bottom";
      grid-template-rows: auto 1fr auto;
      grid-template-columns: auto 1fr auto;
    }

    /* Sidebar zones - panels slotted here or docked panels */
    .sidebar-zone {
      display: flex;
      flex-direction: column;
      gap: 1px;
      overflow: hidden;
    }

    .sidebar-zone.horizontal {
      flex-direction: row;
    }

    .sidebar-top { grid-area: top; }
    .sidebar-left { grid-area: left; }
    .sidebar-right { grid-area: right; }
    .sidebar-bottom { grid-area: bottom; }
    .main-area { grid-area: main; position: relative; overflow: auto; min-width: 0; min-height: 0; }

    /* Floating layer */
    .floating-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 100;
    }

    .floating-layer ::slotted(*) {
      pointer-events: auto;
    }

    /* Dock preview overlay */
    .dock-preview {
      position: absolute;
      background: var(--color-info, #8be9fd);
      opacity: 0.15;
      pointer-events: none;
      z-index: 99;
    }

    .dock-preview.left { left: 0; top: 0; bottom: 0; width: 200px; }
    .dock-preview.right { right: 0; top: 0; bottom: 0; width: 200px; }
    .dock-preview.top { top: 0; left: 0; right: 0; height: 150px; }
    .dock-preview.bottom { bottom: 0; left: 0; right: 0; height: 150px; }

    /* Docked panels get slotted to their zone */
    ::slotted([docked="left"]) { grid-area: left; }
    ::slotted([docked="right"]) { grid-area: right; }
    ::slotted([docked="top"]) { grid-area: top; }
    ::slotted([docked="bottom"]) { grid-area: bottom; }
  `,
];
```

Update render to use a simpler slot structure:

```ts
render() {
  return html`
    <div class="workspace">
      <div class="sidebar-zone sidebar-top">
        <slot name="top"></slot>
      </div>
      <div class="sidebar-zone sidebar-left">
        <slot name="left"></slot>
      </div>
      <div class="main-area">
        <slot name="main"></slot>
        <div class="floating-layer">
          <slot name="floating"></slot>
        </div>
        ${this._dockPreview ? html`
          <div class="dock-preview ${this._dockPreview}"></div>
        ` : ''}
      </div>
      <div class="sidebar-zone sidebar-right">
        <slot name="right"></slot>
      </div>
      <div class="sidebar-zone sidebar-bottom">
        <slot name="bottom"></slot>
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
git commit -m "refactor(workspace): position panels by attribute via CSS Grid"
```

---

## Task 2: Add getPanelStates() API

**Files:**
- Modify: `src/components/tui-workspace.ts`
- Modify: `tests/tui-workspace.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-workspace.test.js`:

```js
it('getPanelStates returns all panel info', async () => {
  const el = await fixture(html`
    <tui-workspace>
      <tui-panel slot="left" id="colors" title="Colors" docked="left">Colors</tui-panel>
      <tui-panel slot="floating" id="tools" title="Tools" floating position-x="100" position-y="50">Tools</tui-panel>
      <tui-panel slot="floating" id="hidden" title="Hidden" floating hidden>Hidden</tui-panel>
    </tui-workspace>
  `);
  
  await new Promise(r => setTimeout(r, 50));
  
  const states = el.getPanelStates();
  
  expect(states).to.be.an('array');
  expect(states.length).to.equal(3);
  
  const colors = states.find(p => p.id === 'colors');
  expect(colors).to.exist;
  expect(colors.title).to.equal('Colors');
  expect(colors.mode).to.equal('docked');
  expect(colors.side).to.equal('left');
  expect(colors.visible).to.be.true;
  
  const tools = states.find(p => p.id === 'tools');
  expect(tools).to.exist;
  expect(tools.mode).to.equal('floating');
  expect(tools.x).to.equal(100);
  expect(tools.visible).to.be.true;
  
  const hidden = states.find(p => p.id === 'hidden');
  expect(hidden).to.exist;
  expect(hidden.visible).to.be.false;
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: FAIL - `getPanelStates is not a function`

**Step 3: Implement getPanelStates()**

Add to `src/components/tui-workspace.ts`:

```ts
interface PanelState {
  id: string;
  title: string;
  mode: 'floating' | 'docked';
  side?: 'left' | 'right' | 'top' | 'bottom';
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  collapsed: boolean;
  visible: boolean;
}

/**
 * Get state of all panels in the workspace (for View menu integration)
 */
getPanelStates(): PanelState[] {
  const states: PanelState[] = [];
  const allPanels = this.querySelectorAll('tui-panel');
  
  for (const panel of allPanels) {
    const el = panel as HTMLElement;
    const docked = (el as any).docked;
    const isDocked = !!docked && docked !== '';
    
    states.push({
      id: el.id || (el as any).title,
      title: (el as any).title || el.id,
      mode: isDocked ? 'docked' : 'floating',
      side: isDocked ? docked : undefined,
      x: isDocked ? undefined : ((el as any).positionX ?? 0),
      y: isDocked ? undefined : ((el as any).positionY ?? 0),
      width: (el as any).panelWidth ?? el.offsetWidth,
      height: (el as any).panelHeight ?? el.offsetHeight,
      collapsed: (el as any).collapsed ?? false,
      visible: !el.hidden,
    });
  }
  
  return states;
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-workspace.ts tests/tui-workspace.test.js
git commit -m "feat(workspace): add getPanelStates() API for View menu integration"
```

---

## Task 3: Add auto-dock Attribute (Sets Panel Attribute Only)

**Files:**
- Modify: `src/components/tui-workspace.ts`
- Modify: `tests/tui-workspace.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-workspace.test.js`:

```js
it('auto-dock sets panel docked attribute on gravity zone drop', async () => {
  const el = await fixture(html`
    <tui-workspace auto-dock gravity-zone="50" style="width: 800px; height: 600px;">
      <tui-panel slot="floating" id="tools" title="Tools" floating position-x="100" position-y="50">Tools</tui-panel>
    </tui-workspace>
  `);
  
  await new Promise(r => setTimeout(r, 50));
  
  const panel = el.querySelector('#tools');
  
  // Initially floating
  expect(panel.floating).to.be.true;
  expect(panel.docked).to.equal('');
  
  // Move into gravity zone
  panel.dispatchEvent(new CustomEvent('panel-move', {
    detail: { panelId: 'tools', x: 20, y: 100 },
    bubbles: true,
    composed: true,
  }));
  
  // End drag in gravity zone
  panel.dispatchEvent(new CustomEvent('panel-drag-end', {
    detail: { panelId: 'tools', x: 20, y: 100 },
    bubbles: true,
    composed: true,
  }));
  
  await new Promise(r => setTimeout(r, 50));
  
  // Panel should have docked attribute set (but NOT moved in DOM)
  expect(panel.docked).to.equal('left');
  expect(panel.floating).to.be.false;
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: FAIL - panel attributes not changed

**Step 3: Implement auto-dock**

Add property:

```ts
@property({ type: Boolean, attribute: 'auto-dock' })
autoDock = false;
```

Update `_handlePanelDragEnd`:

```ts
private _handlePanelDragEnd = (e: CustomEvent): void => {
  if (this._dockPreview) {
    const panelId = e.detail?.panelId;
    const side = this._dockPreview as 'left' | 'right' | 'top' | 'bottom';
    
    // Always emit the event for apps that want to handle it
    this.dispatchEvent(new CustomEvent('panel-dock', {
      detail: { panelId, side },
      bubbles: true,
      composed: true,
    }));
    
    // If auto-dock enabled, set the panel's attributes
    if (this.autoDock && panelId) {
      const panel = this._findPanelById(panelId);
      if (panel) {
        // Store last floating position for potential restore
        (panel as any)._lastFloatingPosition = {
          x: (panel as any).positionX,
          y: (panel as any).positionY,
          width: (panel as any).panelWidth,
          height: (panel as any).panelHeight,
        };
        
        // Set docked attribute, clear floating
        (panel as any).docked = side;
        (panel as any).floating = false;
        
        // Update slot to match dock side
        panel.slot = side;
      }
    }
  }
  this._dockPreview = null;
};

private _findPanelById(panelId: string): HTMLElement | null {
  const allPanels = this.querySelectorAll('tui-panel');
  for (const panel of allPanels) {
    if (panel.id === panelId || (panel as any).title === panelId) {
      return panel as HTMLElement;
    }
  }
  return null;
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-workspace.ts tests/tui-workspace.test.js
git commit -m "feat(workspace): add auto-dock attribute to set panel docked state on drop"
```

---

## Task 4: Add auto-undock on Drag Away from Sidebar

**Files:**
- Modify: `src/components/tui-workspace.ts`
- Modify: `tests/tui-workspace.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-workspace.test.js`:

```js
it('auto-dock undocks panel when dragged away from edge', async () => {
  const el = await fixture(html`
    <tui-workspace auto-dock gravity-zone="50" style="width: 800px; height: 600px;">
      <tui-panel slot="left" id="tools" title="Tools" docked="left">Tools</tui-panel>
    </tui-workspace>
  `);
  
  await new Promise(r => setTimeout(r, 50));
  
  const panel = el.querySelector('#tools');
  
  // Initially docked
  expect(panel.docked).to.equal('left');
  
  // Drag to center (outside gravity zones)
  panel.dispatchEvent(new CustomEvent('panel-move', {
    detail: { panelId: 'tools', x: 300, y: 200 },
    bubbles: true,
    composed: true,
  }));
  
  // End drag outside gravity zone
  panel.dispatchEvent(new CustomEvent('panel-drag-end', {
    detail: { panelId: 'tools', x: 300, y: 200 },
    bubbles: true,
    composed: true,
  }));
  
  await new Promise(r => setTimeout(r, 50));
  
  // Panel should be floating now
  expect(panel.floating).to.be.true;
  expect(panel.docked).to.equal('');
  expect(panel.positionX).to.equal(300);
  expect(panel.positionY).to.equal(200);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: FAIL - panel not undocked

**Step 3: Implement auto-undock**

Update `_handlePanelDragEnd`:

```ts
private _handlePanelDragEnd = (e: CustomEvent): void => {
  const panelId = e.detail?.panelId;
  const panel = panelId ? this._findPanelById(panelId) : null;
  
  if (this._dockPreview) {
    // Dropping in a gravity zone
    const side = this._dockPreview as 'left' | 'right' | 'top' | 'bottom';
    
    this.dispatchEvent(new CustomEvent('panel-dock', {
      detail: { panelId, side },
      bubbles: true,
      composed: true,
    }));
    
    if (this.autoDock && panel) {
      (panel as any)._lastFloatingPosition = {
        x: (panel as any).positionX,
        y: (panel as any).positionY,
        width: (panel as any).panelWidth,
        height: (panel as any).panelHeight,
      };
      
      (panel as any).docked = side;
      (panel as any).floating = false;
      panel.slot = side;
    }
  } else if (this.autoDock && panel && (panel as any).docked) {
    // Dropping outside gravity zones while docked = undock
    const x = e.detail?.x ?? 100;
    const y = e.detail?.y ?? 100;
    
    this.dispatchEvent(new CustomEvent('panel-undock', {
      detail: { panelId, x, y },
      bubbles: true,
      composed: true,
    }));
    
    (panel as any).docked = '';
    (panel as any).floating = true;
    (panel as any).positionX = x;
    (panel as any).positionY = y;
    panel.slot = 'floating';
  }
  
  this._dockPreview = null;
};
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-workspace.ts tests/tui-workspace.test.js
git commit -m "feat(workspace): auto-undock panels when dragged away from sidebar zone"
```

---

## Task 5: Panel Memory - Store Position on Dismiss

**Files:**
- Modify: `src/components/tui-panel.ts`
- Modify: `tests/tui-panel.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-panel.test.js`:

```js
it('stores position to localStorage on dismiss when persist-id set', async () => {
  localStorage.removeItem('tui-panel-memory-test-panel');
  
  const el = await fixture(html`
    <tui-panel 
      title="Test" 
      floating 
      dismissable 
      persist-id="test-panel"
      position-x="150"
      position-y="75"
      panel-width="250"
      panel-height="180"
    >Content</tui-panel>
  `);
  
  el.dismiss();
  
  const stored = localStorage.getItem('tui-panel-memory-test-panel');
  expect(stored).to.exist;
  
  const data = JSON.parse(stored);
  expect(data.x).to.equal(150);
  expect(data.y).to.equal(75);
  expect(data.width).to.equal(250);
  expect(data.height).to.equal(180);
  
  localStorage.removeItem('tui-panel-memory-test-panel');
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-panel.test.js`
Expected: FAIL - no position stored

**Step 3: Update dismiss() to store position**

Update `dismiss()` in `src/components/tui-panel.ts`:

```ts
dismiss(): void {
  // Store position/state if persist-id is set
  if (this.persistId) {
    const memory = {
      x: this.positionX,
      y: this.positionY,
      width: this.panelWidth,
      height: this.panelHeight,
      collapsed: this.collapsed,
      docked: this.docked,
      floating: this.floating,
    };
    localStorage.setItem(`tui-panel-memory-${this.persistId}`, JSON.stringify(memory));
  }
  
  this.dispatchEvent(new CustomEvent('panel-dismiss', {
    detail: { panelId: this.id || this.title },
    bubbles: true,
    composed: true,
  }));
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-panel.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-panel.ts tests/tui-panel.test.js
git commit -m "feat(panel): store position to localStorage on dismiss"
```

---

## Task 6: Panel Memory - Restore Position

**Files:**
- Modify: `src/components/tui-panel.ts`
- Modify: `tests/tui-panel.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-panel.test.js`:

```js
it('restorePosition loads from localStorage', async () => {
  localStorage.setItem('tui-panel-memory-restore-test', JSON.stringify({
    x: 200,
    y: 100,
    width: 300,
    height: 200,
    collapsed: true,
  }));
  
  const el = await fixture(html`
    <tui-panel 
      title="Test" 
      floating 
      persist-id="restore-test"
      position-x="0"
      position-y="0"
    >Content</tui-panel>
  `);
  
  const restored = el.restorePosition();
  
  expect(restored).to.be.true;
  expect(el.positionX).to.equal(200);
  expect(el.positionY).to.equal(100);
  expect(el.panelWidth).to.equal(300);
  expect(el.panelHeight).to.equal(200);
  expect(el.collapsed).to.be.true;
  
  localStorage.removeItem('tui-panel-memory-restore-test');
});

it('restorePosition returns false if no stored state', async () => {
  localStorage.removeItem('tui-panel-memory-no-state');
  
  const el = await fixture(html`
    <tui-panel title="Test" floating persist-id="no-state">Content</tui-panel>
  `);
  
  const restored = el.restorePosition();
  
  expect(restored).to.be.false;
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-panel.test.js`
Expected: FAIL - `restorePosition is not a function`

**Step 3: Implement restorePosition()**

Add to `src/components/tui-panel.ts`:

```ts
/**
 * Restore panel position/state from localStorage
 * @returns true if restored, false if no stored state
 */
restorePosition(): boolean {
  if (!this.persistId) return false;
  
  const stored = localStorage.getItem(`tui-panel-memory-${this.persistId}`);
  if (!stored) return false;
  
  try {
    const memory = JSON.parse(stored);
    
    if (memory.x !== undefined) this.positionX = memory.x;
    if (memory.y !== undefined) this.positionY = memory.y;
    if (memory.width !== undefined) this.panelWidth = memory.width;
    if (memory.height !== undefined) this.panelHeight = memory.height;
    if (memory.collapsed !== undefined) this.collapsed = memory.collapsed;
    
    return true;
  } catch (e) {
    console.warn(`[tui-panel] Failed to restore position for ${this.persistId}:`, e);
    return false;
  }
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-panel.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-panel.ts tests/tui-panel.test.js
git commit -m "feat(panel): add restorePosition() to load from localStorage"
```

---

## Task 7: Enable Docked Panel Dragging

**Files:**
- Modify: `src/components/tui-panel.ts`
- Modify: `tests/tui-panel.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-panel.test.js`:

```js
it('docked panel header is draggable for undocking', async () => {
  const el = await fixture(html`<tui-panel title="Test" docked="left">Content</tui-panel>`);
  const header = el.shadowRoot.querySelector('.header');
  
  // Docked panels should have draggable header for undocking
  expect(header.classList.contains('draggable')).to.be.true;
});

it('docked panel emits panel-move on drag', async () => {
  const el = await fixture(html`<tui-panel title="Test" docked="left">Content</tui-panel>`);
  
  let moveEvent = null;
  el.addEventListener('panel-move', (e) => { moveEvent = e.detail; });
  
  const header = el.shadowRoot.querySelector('.header');
  
  header.dispatchEvent(new PointerEvent('pointerdown', { clientX: 10, clientY: 10, bubbles: true }));
  document.dispatchEvent(new PointerEvent('pointermove', { clientX: 100, clientY: 100 }));
  document.dispatchEvent(new PointerEvent('pointerup', {}));
  
  expect(moveEvent).to.exist;
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-panel.test.js`
Expected: FAIL - docked panel header not draggable

**Step 3: Enable dragging for docked panels**

Update render() in `src/components/tui-panel.ts` to make docked panels draggable too:

```ts
render() {
  const isDraggable = this.floating || !!this.docked;
  
  return html`
    <div class="panel ${this.collapsed ? 'collapsed' : ''}">
      <div 
        class="header ${isDraggable ? 'draggable' : ''}"
        @pointerdown=${isDraggable ? this._onDragStart : undefined}
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

Update `_onDragStart` to handle docked panels:

```ts
private _onDragStart = (e: PointerEvent): void => {
  // Allow drag start for both floating and docked panels
  if (!this.floating && !this.docked) return;
  
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

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-panel.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-panel.ts tests/tui-panel.test.js
git commit -m "feat(panel): enable drag from docked state for undocking"
```

---

## Task 8: Run Full Test Suite

**Step 1: Run all tests**

Run: `npm test`
Expected: All tests pass

**Step 2: Check TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: Phase 4 complete - attribute-driven docking"
```

---

## Summary: What Changed from Original Plan

**Removed (over-engineered):**
- ❌ `dockPanel()` method - apps set `panel.docked = 'left'` directly
- ❌ `undockPanel()` method - apps set `panel.floating = true` directly
- ❌ `showPanel()`/`hidePanel()` methods - apps use `panel.hidden = true/false`
- ❌ DOM movement between slots by workspace

**Kept (useful):**
- ✅ `getPanelStates()` - still useful for View menu integration
- ✅ `auto-dock` attribute - convenience for common case, but just sets attributes
- ✅ Panel memory (`persist-id`, `restorePosition()`) - panels own their own state
- ✅ Gravity zone detection and events

**New behavior:**
- Docked panels can be dragged to undock (with `auto-dock`)
- Workspace is a positioning container, not a state manager
- Apps have full control over panel state via attributes

**Result:** Cleaner separation of concerns. Workspace positions, panels own their state, apps orchestrate.
