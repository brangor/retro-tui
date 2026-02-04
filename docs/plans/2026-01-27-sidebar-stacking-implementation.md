# Sidebar Stacking Implementation Plan

**Goal:** Fix sidebar panel stacking so collapsed panels don't leave gaps, add drop indicators when docking, and enable panel reordering within sidebars.

**Architecture:** Panels in sidebars use flexbox for natural stacking. Sidebar tracks drag events and shows drop indicator at calculated insertion point. Workspace coordinates between floating panels and sidebars, passing cursor position for drop index calculation.

**Tech Stack:** Lit 3.1, TypeScript, CSS Flexbox

---

## Task 1: Fix Collapsed Panel Gap

**Files:**
- Modify: `src/components/tui-panel.ts`
- Test: `tests/tui-panel.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-panel.test.js`:

```js
it('docked collapsed panel has minimal height', async () => {
  const el = await fixture(html`
    <tui-panel title="Test" docked="left" collapsible collapsed>Content here</tui-panel>
  `);
  
  await el.updateComplete;
  
  // Collapsed docked panel should only be header height (roughly 24-40px)
  const height = el.offsetHeight;
  expect(height).to.be.lessThan(50);
  expect(height).to.be.greaterThan(0);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-panel.test.js`
Expected: FAIL - height is larger than 50px due to reserved content space

**Step 3: Add CSS fix for docked collapsed panels**

Add to `src/components/tui-panel.ts` styles (in the DOCKED STATE section):

```css
:host([docked][collapsed]) {
  height: auto !important;
  min-height: 0 !important;
}

:host([docked][collapsed]) .panel {
  height: auto;
  min-height: 0;
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-panel.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-panel.ts tests/tui-panel.test.js
git commit -m "fix(panel): collapsed docked panels have minimal height"
```

---

## Task 2: Add Drop Index State to Sidebar

**Files:**
- Modify: `src/components/tui-sidebar.ts`
- Test: `tests/tui-sidebar.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-sidebar.test.js`:

```js
it('calculates drop index based on cursor position', async () => {
  const el = await fixture(html`
    <tui-sidebar side="left" size="200">
      <tui-panel title="Panel A" docked="left">A</tui-panel>
      <tui-panel title="Panel B" docked="left">B</tui-panel>
    </tui-sidebar>
  `);
  
  await el.updateComplete;
  await new Promise(r => setTimeout(r, 50));
  
  // Get panel positions
  const panels = el.querySelectorAll('tui-panel');
  const panelARect = panels[0].getBoundingClientRect();
  const panelBRect = panels[1].getBoundingClientRect();
  
  // Cursor above Panel A midpoint -> index 0
  const indexAboveA = el.calculateDropIndex(panelARect.top + 10);
  expect(indexAboveA).to.equal(0);
  
  // Cursor between panels -> index 1
  const indexBetween = el.calculateDropIndex(panelARect.bottom + 5);
  expect(indexBetween).to.equal(1);
  
  // Cursor below Panel B -> index 2
  const indexAfterB = el.calculateDropIndex(panelBRect.bottom + 20);
  expect(indexAfterB).to.equal(2);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-sidebar.test.js`
Expected: FAIL - `calculateDropIndex is not a function`

**Step 3: Implement calculateDropIndex method**

Add to `src/components/tui-sidebar.ts`:

```ts
@state()
private _dropIndex: number | null = null;

/**
 * Get all panel elements in this sidebar
 */
private _getPanels(): HTMLElement[] {
  const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
  if (!slot) return [];
  return slot.assignedElements().filter(el => el.tagName.toLowerCase() === 'tui-panel') as HTMLElement[];
}

/**
 * Calculate drop index based on cursor Y position
 */
calculateDropIndex(cursorY: number): number {
  const panels = this._getPanels();
  
  for (let i = 0; i < panels.length; i++) {
    const rect = panels[i].getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    if (cursorY < midpoint) {
      return i;
    }
  }
  
  return panels.length; // Insert at end
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-sidebar.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-sidebar.ts tests/tui-sidebar.test.js
git commit -m "feat(sidebar): add calculateDropIndex method"
```

---

## Task 3: Render Drop Indicator

**Files:**
- Modify: `src/components/tui-sidebar.ts`
- Test: `tests/tui-sidebar.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-sidebar.test.js`:

```js
it('shows drop indicator when dropIndex is set', async () => {
  const el = await fixture(html`
    <tui-sidebar side="left" size="200">
      <tui-panel title="Panel A" docked="left">A</tui-panel>
      <tui-panel title="Panel B" docked="left">B</tui-panel>
    </tui-sidebar>
  `);
  
  await el.updateComplete;
  
  // No indicator initially
  let indicator = el.shadowRoot.querySelector('.drop-indicator');
  expect(indicator).to.not.exist;
  
  // Set drop index
  el.showDropIndicator(1);
  await el.updateComplete;
  
  // Should show indicator
  indicator = el.shadowRoot.querySelector('.drop-indicator');
  expect(indicator).to.exist;
  
  // Hide indicator
  el.hideDropIndicator();
  await el.updateComplete;
  
  indicator = el.shadowRoot.querySelector('.drop-indicator');
  expect(indicator).to.not.exist;
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-sidebar.test.js`
Expected: FAIL - `showDropIndicator is not a function`

**Step 3: Implement drop indicator rendering**

Add CSS to `src/components/tui-sidebar.ts` styles:

```css
.drop-indicator {
  height: 3px;
  background: var(--color-primary, #bd93f9);
  margin: 2px 4px;
  border-radius: 2px;
  flex-shrink: 0;
}
```

Add methods:

```ts
/**
 * Show drop indicator at specified index
 */
showDropIndicator(index: number): void {
  this._dropIndex = index;
}

/**
 * Hide drop indicator
 */
hideDropIndicator(): void {
  this._dropIndex = null;
}
```

Update render() to include drop indicator. Replace the content slot section:

```ts
render() {
  const collapsedLabel = `SIDEBAR ‹${this._panelNames.join(', ')}›`;

  return html`
    <div class="sidebar">
      <div class="header">
        <span>SIDEBAR</span>
        <button class="collapse-btn" @click=${this._toggleCollapse} aria-label="Toggle sidebar">
          ${this.collapsed ? '▸' : '▾'}
        </button>
      </div>
      <div class="content">
        ${this._dropIndex === 0 ? html`<div class="drop-indicator"></div>` : ''}
        <slot @slotchange=${this._updatePanelNames}></slot>
      </div>
      <div class="collapsed-label" @click=${this._toggleCollapse}>
        ${collapsedLabel}
      </div>
    </div>
    ${!this.collapsed ? html`
      <div class="resize-handle" @pointerdown=${this._onResizeStart}></div>
    ` : ''}
  `;
}
```

Note: This only handles index 0. We need a more sophisticated approach for mid-list indicators. See Step 4.

**Step 4: Use slotted content with indicator injection**

The drop indicator needs to appear between slotted elements. Since we can't inject elements between slotted content directly, we'll use a different approach - render the indicator as an overlay positioned based on panel bounds.

Update CSS:

```css
.drop-indicator {
  position: absolute;
  left: 4px;
  right: 4px;
  height: 3px;
  background: var(--color-primary, #bd93f9);
  border-radius: 2px;
  pointer-events: none;
  z-index: 10;
}

.content {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-height: 0;
  position: relative; /* For absolute positioning of indicator */
}
```

Update render() for content section:

```ts
<div class="content">
  <slot @slotchange=${this._updatePanelNames}></slot>
  ${this._dropIndex !== null ? html`
    <div class="drop-indicator" style="top: ${this._getDropIndicatorTop()}px"></div>
  ` : ''}
</div>
```

Add helper method:

```ts
private _getDropIndicatorTop(): number {
  const panels = this._getPanels();
  
  if (this._dropIndex === null) return 0;
  
  if (this._dropIndex === 0) {
    return 0;
  }
  
  if (this._dropIndex >= panels.length) {
    // After last panel
    const lastPanel = panels[panels.length - 1];
    if (lastPanel) {
      const contentRect = this.shadowRoot?.querySelector('.content')?.getBoundingClientRect();
      const panelRect = lastPanel.getBoundingClientRect();
      if (contentRect) {
        return panelRect.bottom - contentRect.top;
      }
    }
    return 0;
  }
  
  // Before panel at dropIndex
  const panel = panels[this._dropIndex];
  const contentRect = this.shadowRoot?.querySelector('.content')?.getBoundingClientRect();
  if (panel && contentRect) {
    const panelRect = panel.getBoundingClientRect();
    return panelRect.top - contentRect.top - 2;
  }
  
  return 0;
}
```

**Step 5: Run test to verify it passes**

Run: `npm test -- tests/tui-sidebar.test.js`
Expected: PASS

**Step 6: Commit**

```bash
git add src/components/tui-sidebar.ts tests/tui-sidebar.test.js
git commit -m "feat(sidebar): render drop indicator at calculated position"
```

---

## Task 4: Insert Panel at Index

**Files:**
- Modify: `src/components/tui-sidebar.ts`
- Test: `tests/tui-sidebar.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-sidebar.test.js`:

```js
it('insertPanelAt inserts panel at correct position', async () => {
  const el = await fixture(html`
    <tui-sidebar side="left" size="200">
      <tui-panel id="a" title="Panel A" docked="left">A</tui-panel>
      <tui-panel id="c" title="Panel C" docked="left">C</tui-panel>
    </tui-sidebar>
  `);
  
  await el.updateComplete;
  
  // Create new panel to insert
  const newPanel = document.createElement('tui-panel');
  newPanel.id = 'b';
  newPanel.title = 'Panel B';
  newPanel.setAttribute('docked', 'left');
  newPanel.textContent = 'B';
  
  // Insert at index 1 (between A and C)
  el.insertPanelAt(newPanel, 1);
  
  await el.updateComplete;
  
  const panels = el.querySelectorAll('tui-panel');
  expect(panels.length).to.equal(3);
  expect(panels[0].id).to.equal('a');
  expect(panels[1].id).to.equal('b');
  expect(panels[2].id).to.equal('c');
});

it('insertPanelAt at end appends panel', async () => {
  const el = await fixture(html`
    <tui-sidebar side="left" size="200">
      <tui-panel id="a" title="Panel A" docked="left">A</tui-panel>
    </tui-sidebar>
  `);
  
  await el.updateComplete;
  
  const newPanel = document.createElement('tui-panel');
  newPanel.id = 'b';
  newPanel.title = 'Panel B';
  newPanel.setAttribute('docked', 'left');
  
  el.insertPanelAt(newPanel, 5); // Index beyond length
  
  await el.updateComplete;
  
  const panels = el.querySelectorAll('tui-panel');
  expect(panels.length).to.equal(2);
  expect(panels[1].id).to.equal('b');
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-sidebar.test.js`
Expected: FAIL - `insertPanelAt is not a function`

**Step 3: Implement insertPanelAt method**

Add to `src/components/tui-sidebar.ts`:

```ts
/**
 * Insert panel at specified index in the sidebar
 */
insertPanelAt(panel: HTMLElement, index: number): void {
  const panels = this._getPanels();
  
  // Set docked attribute
  panel.setAttribute('docked', this.side);
  
  if (index >= panels.length) {
    this.appendChild(panel);
  } else {
    this.insertBefore(panel, panels[index]);
  }
  
  this.hideDropIndicator();
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-sidebar.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-sidebar.ts tests/tui-sidebar.test.js
git commit -m "feat(sidebar): add insertPanelAt method for ordered insertion"
```

---

## Task 5: Workspace Coordinates Dock with Sidebar

**Files:**
- Modify: `src/components/tui-workspace.ts`
- Modify: `src/components/tui-sidebar.ts`
- Test: `tests/tui-workspace.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-workspace.test.js`:

```js
it('auto-dock inserts panel into sidebar at drop index', async () => {
  const el = await fixture(html`
    <tui-workspace auto-dock gravity-zone="50">
      <tui-sidebar slot="left" side="left" size="200">
        <tui-panel id="existing" title="Existing" docked="left">Existing</tui-panel>
      </tui-sidebar>
      <tui-panel slot="floating" id="new-panel" title="New Panel" floating position-x="100" position-y="50">New</tui-panel>
    </tui-workspace>
  `);
  
  await el.updateComplete;
  await new Promise(r => setTimeout(r, 50));
  
  const panel = el.querySelector('#new-panel');
  const sidebar = el.querySelector('tui-sidebar');
  const existingPanel = el.querySelector('#existing');
  const existingRect = existingPanel.getBoundingClientRect();
  
  // Move panel into left gravity zone, above existing panel
  panel.dispatchEvent(new CustomEvent('panel-move', {
    detail: { panelId: 'new-panel', x: 20, y: existingRect.top - 20, cursorY: existingRect.top - 20 },
    bubbles: true,
    composed: true,
  }));
  
  // Drop
  panel.dispatchEvent(new CustomEvent('panel-drag-end', {
    detail: { panelId: 'new-panel', x: 20, y: existingRect.top - 20, cursorY: existingRect.top - 20 },
    bubbles: true,
    composed: true,
  }));
  
  await el.updateComplete;
  await new Promise(r => setTimeout(r, 50));
  
  // Panel should be in sidebar at index 0 (before existing)
  const sidebarPanels = sidebar.querySelectorAll('tui-panel');
  expect(sidebarPanels.length).to.equal(2);
  expect(sidebarPanels[0].id).to.equal('new-panel');
  expect(sidebarPanels[1].id).to.equal('existing');
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: FAIL - panel not inserted at correct position

**Step 3: Update workspace to pass cursor position to sidebar**

Update `_handlePanelMove` in `src/components/tui-workspace.ts` to track cursor Y and update sidebar drop indicator:

```ts
private _handlePanelMove = (e: CustomEvent): void => {
  const panel = e.target as HTMLElement;
  const isFloating = panel.hasAttribute('floating');
  const isDocked = !!(panel as any).docked;
  
  if (!isFloating && !isDocked) return;
  
  const { x, y, cursorY } = e.detail;
  const panelWidth = (panel as any).panelWidth ?? panel.offsetWidth ?? 100;
  const panelHeight = (panel as any).panelHeight ?? panel.offsetHeight ?? 100;
  
  // Check gravity zones
  const gravityZone = this._detectGravityZone(x, y, panelWidth, panelHeight);
  this._dockPreview = gravityZone;
  
  // Update sidebar drop indicator if in gravity zone
  if (gravityZone === 'left' || gravityZone === 'right') {
    const sidebar = this._getSidebar(gravityZone as 'left' | 'right');
    if (sidebar) {
      const dropIndex = (sidebar as any).calculateDropIndex(cursorY ?? y);
      (sidebar as any).showDropIndicator(dropIndex);
      this._pendingDropIndex = dropIndex;
    }
  } else {
    // Clear any active drop indicators
    this._clearSidebarDropIndicators();
  }
  
  // ... rest of existing constraint logic
};
```

Add helper and state:

```ts
@state()
private _pendingDropIndex: number | null = null;

private _clearSidebarDropIndicators(): void {
  const leftSidebar = this._getSidebar('left');
  const rightSidebar = this._getSidebar('right');
  if (leftSidebar) (leftSidebar as any).hideDropIndicator?.();
  if (rightSidebar) (rightSidebar as any).hideDropIndicator?.();
  this._pendingDropIndex = null;
}
```

Update `_handlePanelDragEnd` to use drop index:

```ts
private _handlePanelDragEnd = (e: CustomEvent): void => {
  const panelId = e.detail?.panelId;
  const panel = panelId ? this._findPanelById(panelId) : null;
  
  if (this._dockPreview) {
    const side = this._dockPreview as 'left' | 'right' | 'top' | 'bottom';
    
    this.dispatchEvent(new CustomEvent('panel-dock', {
      detail: { panelId, side, index: this._pendingDropIndex },
      bubbles: true,
      composed: true,
    }));
    
    if (this.autoDock && panel) {
      // Store last floating position
      (panel as any)._lastFloatingPosition = {
        x: (panel as any).positionX,
        y: (panel as any).positionY,
        width: (panel as any).panelWidth,
        height: (panel as any).panelHeight,
      };
      
      (panel as any).docked = side;
      (panel as any).floating = false;
      
      // Insert into sidebar at index if sidebar exists
      const sidebar = this._getSidebar(side as 'left' | 'right');
      if (sidebar && this._pendingDropIndex !== null) {
        panel.removeAttribute('slot');
        (sidebar as any).insertPanelAt(panel, this._pendingDropIndex);
      } else {
        panel.slot = side;
        this.appendChild(panel);
      }
    }
  } else if (this.autoDock && panel && (panel as any).docked) {
    // Undock logic (existing code)
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
    this.appendChild(panel);
  }
  
  this._clearSidebarDropIndicators();
  this._dockPreview = null;
};
```

**Step 4: Update panel to include cursorY in events**

Update `_onDragMove` in `src/components/tui-panel.ts` to include cursor Y:

```ts
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
      y: this.positionY,
      cursorY: e.clientY  // Add cursor Y for drop index calculation
    },
    bubbles: true,
    composed: true,
  }));
};
```

**Step 5: Run test to verify it passes**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: PASS

**Step 6: Commit**

```bash
git add src/components/tui-workspace.ts src/components/tui-panel.ts src/components/tui-sidebar.ts tests/tui-workspace.test.js
git commit -m "feat(workspace): coordinate dock with sidebar drop index"
```

---

## Task 6: Reorder Panels Within Sidebar

**Files:**
- Modify: `src/components/tui-workspace.ts`
- Test: `tests/tui-workspace.test.js`

**Step 1: Write the failing test**

Add to `tests/tui-workspace.test.js`:

```js
it('reorders panels within sidebar by dragging', async () => {
  const el = await fixture(html`
    <tui-workspace auto-dock gravity-zone="50">
      <tui-sidebar slot="left" side="left" size="200">
        <tui-panel id="a" title="A" docked="left">A</tui-panel>
        <tui-panel id="b" title="B" docked="left">B</tui-panel>
        <tui-panel id="c" title="C" docked="left">C</tui-panel>
      </tui-sidebar>
    </tui-workspace>
  `);
  
  await el.updateComplete;
  await new Promise(r => setTimeout(r, 50));
  
  const sidebar = el.querySelector('tui-sidebar');
  const panelC = el.querySelector('#c');
  const panelA = el.querySelector('#a');
  const panelARect = panelA.getBoundingClientRect();
  
  // Drag panel C to position above A (within sidebar bounds)
  panelC.dispatchEvent(new CustomEvent('panel-move', {
    detail: { panelId: 'c', x: 50, y: panelARect.top - 10, cursorY: panelARect.top - 10 },
    bubbles: true,
    composed: true,
  }));
  
  panelC.dispatchEvent(new CustomEvent('panel-drag-end', {
    detail: { panelId: 'c', x: 50, y: panelARect.top - 10, cursorY: panelARect.top - 10 },
    bubbles: true,
    composed: true,
  }));
  
  await el.updateComplete;
  await new Promise(r => setTimeout(r, 50));
  
  // Panel order should now be C, A, B
  const panels = sidebar.querySelectorAll('tui-panel');
  expect(panels[0].id).to.equal('c');
  expect(panels[1].id).to.equal('a');
  expect(panels[2].id).to.equal('b');
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: FAIL - panels not reordered

**Step 3: Update workspace to handle reorder within sidebar**

The current auto-dock logic already handles this case because:
1. A docked panel emits `panel-move` when dragged
2. Workspace detects it's in a gravity zone (same sidebar)
3. Workspace calls `insertPanelAt` on the sidebar

However, we need to ensure the panel is removed from its current position before reinsertion. Update `insertPanelAt` in `src/components/tui-sidebar.ts`:

```ts
insertPanelAt(panel: HTMLElement, index: number): void {
  const panels = this._getPanels();
  
  // Check if panel is already in this sidebar
  const currentIndex = panels.indexOf(panel as HTMLElement);
  
  // Adjust index if moving within same sidebar and moving down
  let adjustedIndex = index;
  if (currentIndex !== -1 && currentIndex < index) {
    adjustedIndex = index - 1;
  }
  
  // Remove from current position if in this sidebar
  if (currentIndex !== -1) {
    panel.remove();
  }
  
  // Get fresh panel list after removal
  const updatedPanels = this._getPanels();
  
  panel.setAttribute('docked', this.side);
  
  if (adjustedIndex >= updatedPanels.length) {
    this.appendChild(panel);
  } else {
    this.insertBefore(panel, updatedPanels[adjustedIndex]);
  }
  
  this.hideDropIndicator();
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/tui-workspace.test.js`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/tui-sidebar.ts tests/tui-workspace.test.js
git commit -m "feat(sidebar): support panel reordering within sidebar"
```

---

## Task 7: Run Full Test Suite

**Step 1: Run all tests**

Run: `npm test`
Expected: All tests pass

**Step 2: Check TypeScript**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Manual verification in Storybook**

Run: `cd ../retro-tui-docs && npm run storybook`

Verify:
1. Open "Containers > Workspace > With Sidebars"
2. Collapse a panel → panels below slide up, no gap
3. Open "Containers > Workspace > Auto-Dock"
4. Drag floating panel toward left sidebar → see drop indicator
5. Drop → panel inserts at indicated position
6. Drag docked panel up/down within sidebar → reorders
7. Drag docked panel away from sidebar → undocks to floating

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: sidebar stacking improvements complete"
```

---

## Summary

**Tasks:**
1. Fix collapsed panel gap (CSS)
2. Add calculateDropIndex to sidebar
3. Render drop indicator in sidebar
4. Add insertPanelAt method to sidebar
5. Workspace coordinates dock with sidebar drop index
6. Reorder panels within sidebar
7. Full test suite verification

**Files modified:**
- `src/components/tui-panel.ts` - CSS for collapsed docked, cursorY in events
- `src/components/tui-sidebar.ts` - drop indicator, calculateDropIndex, insertPanelAt
- `src/components/tui-workspace.ts` - coordinate with sidebar, pass drop index
- `tests/tui-panel.test.js` - collapsed height test
- `tests/tui-sidebar.test.js` - drop index, indicator, insertion tests
- `tests/tui-workspace.test.js` - dock with index, reorder tests
