# Floating Panels & Workspace Simplification

**Goal:** Simplify the layout architecture to a floating-first panel model where panels overlay content rather than constraining it.

**Motivation:** Current architecture has competing layout systems (tui-app sidebar vs tui-workspace sidebars) causing layout gaps and complexity. Canvas gets constrained between panels instead of filling available space.

---

## Architecture Overview

### Current (problematic)
```
tui-app
├── toolbar-area (reserves space)
├── workspace-area
│   └── tui-workspace
│       ├── sidebar-left (reserves space)
│       ├── main
│       ├── sidebar-right (reserves space)
│       └── floating
└── sidebar-area (reserves space, often empty)
```

### New (simplified)
```
tui-app
├── header + menu (chrome)
├── workspace-area
│   └── tui-workspace
│       ├── main (100% of space)
│       └── floating (panels overlay)
├── sidebar-area (optional, for persistent chrome like Caves of Qud stats)
└── status bar (chrome)
```

**Key principle:** Panels never affect content layout. They float above on their own layer. Content scrolls/pans independently beneath them.

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  tui-app: header + menu + status bar (chrome only)         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  tui-workspace (fills remaining space)                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  Main content layer (canvas, 100% of workspace)     │   │
│  │  - Scrolls/pans when content larger than viewport   │   │
│  │  - Content centered when smaller                    │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌──────┐                               ┌──────────────┐   │
│  │Tools │ ← floating panels overlay  →  │ Colors       │   │
│  │      │   (absolute positioned)       │ Controls     │   │
│  └──────┘                               └──────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  status bar                                                 │
└─────────────────────────────────────────────────────────────┘
```

### Future: Persistent Chrome Sidebar

For apps like roguelikes that need a fixed sidebar (stats, inventory, messages):

```
┌────────────────────────────────────────────────────────────────────┐
│  header + menu                                                     │
├──────────────────────────────────────────────────┬─────────────────┤
│                                                  │                 │
│  tui-workspace                                   │  tui-app        │
│  (floating panels over canvas)                   │  sidebar slot   │
│                                                  │  (persistent)   │
│                                                  │                 │
├──────────────────────────────────────────────────┴─────────────────┤
│  status bar                                                        │
└────────────────────────────────────────────────────────────────────┘
```

This is separate from floating panels - it's fixed chrome. Keep tui-app's sidebar slot but hide when empty.

---

## Panel Behavior

### Default State
All panels are floating (position: absolute over workspace).

### Dragging
- Drag header to move panel anywhere within workspace bounds
- Panels constrained to stay within workspace (can't drag off-screen)
- Cursor shows grab/grabbing during drag

### Snapping Behavior

When a panel is dragged near an edge or another panel, it "snaps" to align:

| Snap Target | Behavior |
|-------------|----------|
| Workspace edge | Panel aligns flush to left/right/top edge |
| Another panel (same edge) | Panel stacks vertically below/above |
| Another panel (adjacent) | Panels align their edges |

**Snap zone:** ~20px proximity triggers snap preview (subtle highlight), release to confirm.

**Snap is cosmetic, not structural.** Panels don't "dock into" sidebars - they just align visually. The canvas never resizes. If you drag a snapped panel away, others don't reflow.

### Stacking Example
```
┌──────────┐
│ Tools    │  ← snapped to left edge
├──────────┤
│ Shapes   │  ← snapped below Tools
└──────────┘
```

Both are independent floating panels that happen to be aligned. Drag Shapes away and Tools stays put.

### Panel Attributes
- `floating` - always true in this model
- `position-x`, `position-y` - current position
- `snap-edge` - optional, which edge it's snapped to (for persistence)

---

## Canvas & Content Behavior

### Main Content Slot
- Fills 100% of workspace (not reduced by panels)
- Single `<slot name="main">` for any content type

### Scroll/Pan Behavior

| Content Size | Behavior |
|--------------|----------|
| Smaller than viewport | Centered in workspace |
| Larger than viewport | Scrollbars appear, content pans |

### CSS Approach
```css
.main-content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;           /* scrollbars when needed */
  display: flex;
  align-items: center;      /* center vertically when small */
  justify-content: center;  /* center horizontally when small */
}
```

**Panels don't clip content scrolling.** If you scroll the canvas, it moves under the floating panels. Panels stay fixed in their position.

---

## Component Changes

### tui-app (simplify)
- Remove `.toolbar-area` div and slot
- Keep `.sidebar-area` but ensure `display: none` when empty (`:has()` selector)
- `.workspace-area` becomes the only main content area, `flex: 1`

### tui-workspace (simplify + enhance)
- **Remove:** `slot="left"`, `slot="right"`, `slot="top"`, `slot="bottom"`
- **Remove:** `tui-sidebar` dependency, gravity zone docking logic
- **Keep:** `slot="main"` for content, `slot="floating"` for panels
- **Add:** Snap-to-edge logic (simpler than dock logic)
- **Add:** Snap-to-panel logic (align with siblings)

### tui-panel (minor tweaks)
- Remove `docked` attribute handling (always floating now)
- Keep `floating`, `position-x`, `position-y`
- Add `snap-edge` attribute (optional, for persistence: `left`, `right`, `top`)
- Ensure drag works smoothly with new snap behavior

### tui-sidebar (deprecate)
- No longer needed in floating-first model
- Keep in codebase for potential future persistent sidebar use
- Don't use in quiltsketch

---

## Quiltsketch Changes

- Move all panels to `slot="floating"` in tui-workspace
- Remove `tui-sidebar` wrapper
- Toolbar becomes a regular floating panel
- Color swatches: switch to `tui-button variant="icon"` for consistent sizing

---

## Migration Order

1. **retro-tui: Simplify tui-app** - Remove toolbar-area, fix sidebar-area hiding
2. **retro-tui: Simplify tui-workspace** - Remove sidebar slots, keep main + floating only
3. **retro-tui: Add snap logic** - Edge snapping, panel-to-panel alignment
4. **quiltsketch: Update layout** - All panels floating, remove tui-sidebar
5. **quiltsketch: Fix color swatches** - Use icon buttons for consistent sizing

---

## Success Criteria

| Criterion | Verification |
|-----------|--------------|
| Canvas fills workspace | Visual: no gaps at edges |
| Panels float over canvas | Scroll canvas, panels stay fixed |
| Panels draggable | Drag any panel header |
| Panels snap to edges | Drag near edge, see alignment |
| Panels snap to each other | Stack two panels, they align |
| Toolbar is a panel | Can drag toolbar, collapse it |
| Color swatches fixed size | 9 colors in consistent grid |
| No layout gaps | Sidebar area hidden when unused |

---

## Out of Scope (YAGNI)

- Panel resize handles
- Panel minimize to icon
- Tab grouping
- Drag-to-pan canvas (just scrollbars)
- Keyboard panel navigation
- Minimap
- Infinite canvas
