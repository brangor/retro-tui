# Panel Shrink-to-Edge Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** When a panel is "dismissed", it shrinks to a vertical tab on its edge instead of disappearing. Clicking the tab restores it.

**Architecture:** Self-contained in tui-panel. Panel tracks `minimized` state and renders either as full panel or as edge tab. Position memory already exists via `persistId`. Animation via CSS transitions.

**Tech Stack:** Lit, TypeScript, CSS animations

---

## Task 1: Add Minimized State Property

**Files:**
- Modify: `src/components/tui-panel.ts`

**Step 1: Add minimized property**

After line 106 (`resizable = false;`), add:

```typescript
  @property({ type: Boolean, reflect: true })
  minimized = false;
```

**Step 2: Add pre-minimize position storage**

After the resize state variables (around line 148), add:

```typescript
  // Pre-minimize state for restoration
  private _preMinimizeX = 0;
  private _preMinimizeY = 0;
  private _preMinimizeWidth: number | null = null;
  private _preMinimizeHeight: number | null = null;
```

**Step 3: Verify build passes**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/components/tui-panel.ts
git commit -m "feat(panel): add minimized state property"
```

---

## Task 2: Add Minimized Tab Styles

**Files:**
- Modify: `src/components/tui-panel.ts`

**Step 1: Add minimized state styles**

Add before the closing backtick of the `css` template (around line 586):

```css
      /* ═══════════════════════════════════════════════════════════════════
         MINIMIZED STATE (edge tab)
         ═══════════════════════════════════════════════════════════════════ */

      :host([minimized]) {
        width: auto !important;
        height: auto !important;
        min-width: 0 !important;
        min-height: 0 !important;
      }

      :host([minimized]) .panel {
        display: none;
      }

      .edge-tab {
        display: none;
      }

      :host([minimized]) .edge-tab {
        display: flex;
        align-items: center;
        justify-content: center;
        writing-mode: vertical-rl;
        text-orientation: mixed;
        padding: 12px 6px;
        background: var(--surface-elevated, #1a1a2e);
        border: 1px solid var(--panel-color);
        color: var(--panel-color);
        font-size: 0.75rem;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        transition: background 0.15s, color 0.15s;
      }

      /* Left edge tab styling */
      :host([minimized][snap-edge="left"]) .edge-tab {
        border-left: none;
        border-radius: 0 4px 4px 0;
      }

      /* Right edge tab styling */
      :host([minimized][snap-edge="right"]) .edge-tab {
        writing-mode: vertical-lr;
        border-right: none;
        border-radius: 4px 0 0 4px;
      }

      :host([minimized]) .edge-tab:hover {
        background: var(--panel-color-bg);
        color: var(--panel-color-fg);
      }

      /* Matrix-style collapse animation */
      @keyframes matrix-collapse {
        0% { opacity: 1; transform: scaleX(1); }
        50% { opacity: 0.6; transform: scaleX(0.3); filter: blur(2px); }
        100% { opacity: 0; transform: scaleX(0); }
      }

      @keyframes matrix-expand {
        0% { opacity: 0; transform: scaleX(0); }
        50% { opacity: 0.6; transform: scaleX(0.3); filter: blur(2px); }
        100% { opacity: 1; transform: scaleX(1); }
      }

      :host([minimized]) .edge-tab {
        animation: matrix-expand 0.25s ease-out;
      }
```

**Step 2: Verify build passes**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/tui-panel.ts
git commit -m "feat(panel): add minimized tab styles with animation"
```

---

## Task 3: Implement Minimize Logic

**Files:**
- Modify: `src/components/tui-panel.ts`

**Step 1: Add minimize method**

After the `dismiss()` method (around line 665), add:

```typescript
  /**
   * Minimize panel to edge tab
   */
  minimize(): void {
    if (this.minimized) return;

    // Store current position for restoration
    this._preMinimizeX = this.positionX;
    this._preMinimizeY = this.positionY;
    this._preMinimizeWidth = this.panelWidth;
    this._preMinimizeHeight = this.panelHeight;

    // Default to left edge if no snap-edge set
    if (!this.snapEdge) {
      this.snapEdge = 'left';
    }

    this.minimized = true;

    this.dispatchEvent(new CustomEvent('panel-minimize', {
      detail: { panelId: this.id || this.title },
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Restore panel from minimized state
   */
  restore(): void {
    if (!this.minimized) return;

    // Restore position
    this.positionX = this._preMinimizeX;
    this.positionY = this._preMinimizeY;
    if (this._preMinimizeWidth !== null) this.panelWidth = this._preMinimizeWidth;
    if (this._preMinimizeHeight !== null) this.panelHeight = this._preMinimizeHeight;

    this.minimized = false;

    this.dispatchEvent(new CustomEvent('panel-restore', {
      detail: { panelId: this.id || this.title },
      bubbles: true,
      composed: true,
    }));
  }
```

**Step 2: Modify dismiss to minimize instead**

Replace the `dismiss()` method body:

```typescript
  dismiss(): void {
    // If dismissable panels should minimize instead of hide
    if (this.floating && this.dismissable) {
      this.minimize();
      return;
    }

    // Original dismiss behavior for non-floating or explicit hide
    if (this.persistId) {
      const memory = {
        x: this.positionX,
        y: this.positionY,
        width: this.panelWidth,
        height: this.panelHeight,
        collapsed: this.collapsed,
        snapEdge: this.snapEdge,
      };
      localStorage.setItem(`tui-panel-memory-${this.persistId}`, JSON.stringify(memory));
    }

    const event = new CustomEvent('panel-dismiss', {
      detail: { panelId: this.id || this.title },
      bubbles: true,
      composed: true,
      cancelable: true,
    });

    const notCancelled = this.dispatchEvent(event);

    if (notCancelled) {
      this.hidden = true;
    }
  }
```

**Step 3: Add edge tab click handler**

Add after the restore method:

```typescript
  private _onEdgeTabClick = (): void => {
    this.restore();
  };
```

**Step 4: Verify build passes**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/components/tui-panel.ts
git commit -m "feat(panel): implement minimize/restore methods"
```

---

## Task 4: Update Render for Edge Tab

**Files:**
- Modify: `src/components/tui-panel.ts`

**Step 1: Update render method**

Replace the `render()` method (around line 856):

```typescript
  render() {
    // Render edge tab when minimized
    if (this.minimized) {
      return html`
        <div class="edge-tab" @click=${this._onEdgeTabClick} title="Click to restore ${this.title}">
          ${this.title}
        </div>
      `;
    }

    // Normal panel render
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
              <button class="dismiss-btn" aria-label="Minimize panel" @click=${this._onDismissClick}>−</button>
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

Note: Changed dismiss button from `×` to `−` (minimize symbol) and updated aria-label.

**Step 2: Verify build passes**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/tui-panel.ts
git commit -m "feat(panel): render edge tab when minimized"
```

---

## Task 5: Handle Edge Tab Positioning

**Files:**
- Modify: `src/components/tui-panel.ts`

**Step 1: Update position logic in `updated()` method**

Find the `updated()` method and modify the position handling section (around line 820):

```typescript
  updated(changedProperties: Map<string, unknown>): void {
    // Handle minimized positioning
    if (this.minimized) {
      // Position on the appropriate edge
      if (this.snapEdge === 'right') {
        this.style.left = 'auto';
        this.style.right = '0';
      } else {
        // Default to left
        this.style.left = '0';
        this.style.right = 'auto';
      }
      this.style.top = `${this.positionY}px`;
      this.style.width = '';
      this.style.height = '';
      this.style.minWidth = '';
      this.style.minHeight = '';
      return;
    }

    // Normal position handling for non-minimized...
    if (this.floating) {
      if (changedProperties.has('positionX') || changedProperties.has('positionY') ||
          changedProperties.has('floating') || changedProperties.has('minimized')) {
        this.style.left = `${this.positionX}px`;
        this.style.top = `${this.positionY}px`;
        this.style.right = 'auto';
      }
    }

    // ... rest of sizing logic unchanged
    if (changedProperties.has('panelWidth') && this.panelWidth !== null) {
      this.style.width = `${this.panelWidth}px`;
    }
    if (changedProperties.has('panelHeight') || changedProperties.has('collapsed')) {
      if (this.collapsed) {
        this.style.height = '';
      } else if (this.panelHeight !== null) {
        this.style.height = `${this.panelHeight}px`;
      }
    }
    if (changedProperties.has('maxWidth') && this.maxWidth !== null) {
      this.style.maxWidth = `${this.maxWidth}px`;
    }
    if (changedProperties.has('maxHeight') && this.maxHeight !== null) {
      this.style.maxHeight = `${this.maxHeight}px`;
    }
    if (changedProperties.has('minWidth')) {
      this.style.minWidth = `${this.minWidth}px`;
    }
    if (changedProperties.has('minHeight') && !this.collapsed) {
      this.style.minHeight = `${this.minHeight}px`;
    } else if (this.collapsed && changedProperties.has('collapsed')) {
      this.style.minHeight = '';
    }
  }
```

**Step 2: Verify build passes**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/tui-panel.ts
git commit -m "feat(panel): handle edge tab positioning"
```

---

## Task 6: Add Persistence for Minimized State

**Files:**
- Modify: `src/components/tui-panel.ts`

**Step 1: Update memory storage to include minimized state**

In the `minimize()` method, add localStorage persistence:

```typescript
  minimize(): void {
    if (this.minimized) return;

    // Store current position for restoration
    this._preMinimizeX = this.positionX;
    this._preMinimizeY = this.positionY;
    this._preMinimizeWidth = this.panelWidth;
    this._preMinimizeHeight = this.panelHeight;

    // Default to left edge if no snap-edge set
    if (!this.snapEdge) {
      this.snapEdge = 'left';
    }

    this.minimized = true;

    // Persist minimized state
    if (this.persistId) {
      const memory = {
        minimized: true,
        preMinimize: {
          x: this._preMinimizeX,
          y: this._preMinimizeY,
          width: this._preMinimizeWidth,
          height: this._preMinimizeHeight,
        },
        snapEdge: this.snapEdge,
      };
      localStorage.setItem(`tui-panel-memory-${this.persistId}`, JSON.stringify(memory));
    }

    this.dispatchEvent(new CustomEvent('panel-minimize', {
      detail: { panelId: this.id || this.title },
      bubbles: true,
      composed: true,
    }));
  }
```

**Step 2: Update restorePosition to handle minimized state**

Replace the `restorePosition()` method:

```typescript
  restorePosition(): boolean {
    if (!this.persistId) return false;

    const stored = localStorage.getItem(`tui-panel-memory-${this.persistId}`);
    if (!stored) return false;

    try {
      const memory = JSON.parse(stored);

      // Handle minimized state
      if (memory.minimized) {
        this._preMinimizeX = memory.preMinimize?.x ?? 0;
        this._preMinimizeY = memory.preMinimize?.y ?? 0;
        this._preMinimizeWidth = memory.preMinimize?.width ?? null;
        this._preMinimizeHeight = memory.preMinimize?.height ?? null;
        this.snapEdge = memory.snapEdge || 'left';
        this.minimized = true;
        return true;
      }

      // Normal restore
      if (memory.x !== undefined) this.positionX = memory.x;
      if (memory.y !== undefined) this.positionY = memory.y;
      if (memory.width !== undefined) this.panelWidth = memory.width;
      if (memory.height !== undefined) this.panelHeight = memory.height;
      if (memory.collapsed !== undefined) this.collapsed = memory.collapsed;
      if (memory.snapEdge !== undefined) this.snapEdge = memory.snapEdge;

      return true;
    } catch (e) {
      console.warn(`[tui-panel] Failed to restore position for ${this.persistId}:`, e);
      return false;
    }
  }
```

**Step 3: Clear minimized state on restore**

In the `restore()` method, add localStorage update:

```typescript
  restore(): void {
    if (!this.minimized) return;

    // Restore position
    this.positionX = this._preMinimizeX;
    this.positionY = this._preMinimizeY;
    if (this._preMinimizeWidth !== null) this.panelWidth = this._preMinimizeWidth;
    if (this._preMinimizeHeight !== null) this.panelHeight = this._preMinimizeHeight;

    this.minimized = false;

    // Update persisted state
    if (this.persistId) {
      const memory = {
        minimized: false,
        x: this.positionX,
        y: this.positionY,
        width: this.panelWidth,
        height: this.panelHeight,
        collapsed: this.collapsed,
        snapEdge: this.snapEdge,
      };
      localStorage.setItem(`tui-panel-memory-${this.persistId}`, JSON.stringify(memory));
    }

    this.dispatchEvent(new CustomEvent('panel-restore', {
      detail: { panelId: this.id || this.title },
      bubbles: true,
      composed: true,
    }));
  }
```

**Step 4: Verify build passes**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/components/tui-panel.ts
git commit -m "feat(panel): persist minimized state to localStorage"
```

---

## Task 7: Update Type Declarations and Documentation

**Files:**
- Modify: `src/components/tui-panel.ts`

**Step 1: Update JSDoc comment at top of component**

Update the component documentation (around line 17) to include new attributes and events:

```typescript
/**
 * <tui-panel> - Floating panel with terminal aesthetic
 *
 * Panels are floating by default and can be dragged within a tui-workspace.
 * They snap visually to edges when dragged near them.
 * Dismissable panels minimize to edge tabs instead of hiding.
 *
 * Two style variants:
 * - 'bright' (default): Header highlights when active, bold borders
 * - 'classic': Box-draw aesthetic with shadows, subtle color changes
 *
 * Focus states:
 * - neutral: default appearance
 * - selected: emphasized (bold border or medium shadow)
 * - active: strongest emphasis (header highlight or heavy shadow)
 *
 * @attr {string} title - Panel title
 * @attr {string} color - Semantic color: primary | secondary | error | success | info
 * @attr {string} variant - 'bright' | 'classic'
 * @attr {string} selection-style - Selection feedback style: 'invert' | 'border'
 * @attr {boolean} floating - Whether panel is floating (default: true)
 * @attr {string} snap-edge - Edge the panel is snapped to: 'left' | 'right' | 'top' | ''
 * @attr {number} position-x - X position in pixels
 * @attr {number} position-y - Y position in pixels
 * @attr {boolean} collapsible - Whether panel can be collapsed
 * @attr {boolean} collapsed - Current collapsed state
 * @attr {boolean} dismissable - Whether panel can be minimized to edge
 * @attr {boolean} minimized - Whether panel is currently minimized to edge tab
 * @attr {boolean} resizable - Whether panel can be resized
 * @attr {boolean} selected - Panel is selected but not focused
 * @attr {boolean} active - Panel is active/focused
 * @attr {string} persist-id - LocalStorage key for state persistence
 *
 * @fires toggle - When panel is collapsed/expanded
 * @fires panel-move - When panel is dragged
 * @fires panel-drag-end - When panel drag ends
 * @fires panel-dismiss - When panel is dismissed (only if not floating+dismissable)
 * @fires panel-minimize - When panel minimizes to edge tab
 * @fires panel-restore - When panel restores from minimized state
 * @fires panel-resize - When panel is resized
 * @fires focus-request - When panel wants focus
 *
 * @slot - Panel content
 */
```

**Step 2: Verify build passes**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/tui-panel.ts
git commit -m "docs(panel): update JSDoc for minimize feature"
```

---

## Task 8: Manual Testing and Polish

**Files:**
- Modify: `src/demo.js` or create test HTML

**Step 1: Test in demo**

Run: `npm run dev`

Test cases:
- [ ] Click dismiss on floating panel → panel becomes edge tab
- [ ] Click edge tab → panel restores to previous position
- [ ] Edge tab shows panel title vertically
- [ ] Left-snapped panels show tab on left edge
- [ ] Right-snapped panels show tab on right edge
- [ ] Matrix animation plays on minimize/restore
- [ ] Refresh page → minimized state persists (with persist-id)

**Step 2: Fix any issues found**

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat(panel): complete shrink-to-edge feature"
```

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Add minimized property and position storage |
| 2 | Add CSS styles for edge tab with animation |
| 3 | Implement minimize/restore methods |
| 4 | Update render to show edge tab when minimized |
| 5 | Handle edge tab positioning |
| 6 | Add persistence for minimized state |
| 7 | Update documentation |
| 8 | Manual testing and polish |
