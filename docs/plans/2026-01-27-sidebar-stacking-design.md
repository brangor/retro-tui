# Sidebar Panel Stacking Improvements

**Status:** Design Complete  
**Date:** 2026-01-27

## Problem

Current sidebar panel behavior has several issues:
1. Collapsed panels leave empty gaps - panels below don't slide up
2. No visual feedback when docking shows where panel will insert in stack
3. Can't reorder panels within a sidebar by dragging
4. Awkward "buffer lane" appears during dock drag instead of integrated feedback

## Solution

Improve sidebar stacking with proper flexbox behavior, drop indicators, and reorder support.

## Core Behavior

### Sidebar Stacking Rules
- Panels in left/right sidebars stack vertically, top to bottom
- Sidebar width is determined by first panel that docks (or default 250px)
- All subsequent panels assimilate to sidebar's width
- Collapsed panels shrink to header-only, panels below slide up immediately (no gap)

### Docking with Position Awareness
- When dragging toward a sidebar with existing panels, sidebar shows "drop indicator"
- Drop indicator is a horizontal line between panels showing insertion point
- Position determined by cursor Y relative to existing panel midpoints:
  - Above all panels → insert at top
  - Below all panels → insert at bottom
  - Between panels → insert at that gap

### Reorder Within Sidebar
- Dragging a docked panel's header initiates reorder (not undock)
- Same drop indicator logic applies
- Dragging far enough away from sidebar (past gravity zone) triggers undock

## Implementation

### Fix 1: Collapsed Panel Gap

**Problem:** `.panel` div reserves space when content is hidden.

**Solution:** Ensure docked + collapsed panels have proper height:

```css
:host([docked][collapsed]) {
  height: auto !important;
}

.panel.collapsed {
  min-height: 0;
  height: auto;
}
```

### Fix 2: Drop Indicator in Sidebar

**Sidebar changes:**
- Add `@state() _dropIndex: number | null = null` to track insertion point
- Listen for drag events when panel is in gravity zone
- Calculate insertion index from cursor Y vs panel midpoints
- Render drop indicator line at calculated position

```ts
private _calculateDropIndex(cursorY: number): number {
  const panels = this._getPanels();
  for (let i = 0; i < panels.length; i++) {
    const rect = panels[i].getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    if (cursorY < midpoint) return i;
  }
  return panels.length; // Insert at end
}
```

**Drop indicator CSS:**
```css
.drop-indicator {
  height: 3px;
  background: var(--color-primary);
  margin: -1px 0;
  border-radius: 2px;
}
```

### Fix 3: Panel Insertion at Index

When dropping:
1. Workspace detects drop in sidebar gravity zone
2. Workspace queries sidebar for drop index
3. Sidebar inserts panel at DOM position using `insertBefore`

```ts
insertPanelAt(panel: HTMLElement, index: number): void {
  const panels = this._getPanels();
  if (index >= panels.length) {
    this.appendChild(panel);
  } else {
    this.insertBefore(panel, panels[index]);
  }
}
```

### Fix 4: Reorder vs Undock Detection

When dragging a docked panel:
1. Track cursor position relative to sidebar bounds
2. If within sidebar X bounds → reorder mode (show drop indicator)
3. If outside sidebar X bounds → undock mode (panel becomes floating ghost)

```ts
private _isDragWithinSidebar(cursorX: number): boolean {
  const rect = this.getBoundingClientRect();
  const threshold = 50; // Same as gravity zone
  return cursorX >= rect.left - threshold && cursorX <= rect.right + threshold;
}
```

## Scope

### In Scope
- Collapsed panels don't leave gaps
- Drop indicator shows insertion position
- Reorder panels within sidebar by dragging
- Undock by dragging panel out of sidebar bounds
- Left/right sidebars only

### Deferred
- Top/bottom sidebars (conflicts with header/footer convention)
- Floating panel snapping to each other
- Quick-dock SVG widget
- Sidebar relocation (drag entire sidebar to different edge)

## Files to Modify

- `src/components/tui-panel.ts` - Fix collapsed height for docked panels
- `src/components/tui-sidebar.ts` - Add drop indicator, handle insertion index
- `src/components/tui-workspace.ts` - Coordinate drag events with sidebar
- `tests/tui-sidebar.test.js` - Tests for drop indicator and insertion
- `tests/tui-panel.test.js` - Tests for collapsed docked panels

## Success Criteria

1. Collapse a panel in sidebar → panels below slide up, no gap
2. Drag floating panel to sidebar with panels → see drop indicator line
3. Drop in sidebar → panel inserts at indicated position
4. Drag docked panel within sidebar → reorder with drop indicator
5. Drag docked panel outside sidebar → undocks to floating

## Events

**New events:**
- `sidebar-drag-over` - Fired when panel dragged over sidebar, includes cursor position
- `sidebar-drag-leave` - Fired when panel leaves sidebar zone
- `sidebar-panel-insert` - Fired when panel inserted, includes index

**Modified events:**
- `panel-dock` - Now includes `index` in detail
