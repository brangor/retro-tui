# tui-workspace Design

**Status:** Design Complete  
**Date:** 2026-01-27

## Overview

A dockable panel system for retro-tui that provides a professional-grade layout where:

- A main content area (canvas) fills the space between header and status bar
- Panels can float above the canvas, draggable anywhere within bounds
- Panels can dock to any of 4 edges, becoming part of a sidebar
- Sidebars stack panels, support collapse/expand, and can be resized or relocated
- Panels remember their position when dismissed and restore to it when re-shown

**Target users:** Apps like quiltsketch that need a canvas-focused UI with movable tool panels.

## Component Hierarchy

```
tui-panel (base)
├── tui-sidebar (variant: edge-docked, stacks children, orientation-aware)
└── tui-workspace (variant: manages 4 sidebar zones + floating layer + main content)
```

All three are variations on the panel concept — boxes with title bars and content that can contain other components.

### Key Principle: Panel Independence

Panels are independently capable, not dependent on workspace:

- `<tui-panel draggable>` — Can be dragged anywhere in its container
- Collapse/dismiss work standalone
- Apps can use floating panels without the full workspace infrastructure

Workspace adds orchestration (sidebars, gravity docking, panel memory) on top.

## Component Specifications

### tui-workspace

**Layout zones:**

```
┌─────────────────────────────────────────┐
│              [top sidebar]              │
├──────┬─────────────────────────┬────────┤
│      │                         │        │
│[left]│     [main content]      │[right] │
│      │       (canvas)          │        │
│      │                         │        │
├──────┴─────────────────────────┴────────┤
│            [bottom sidebar]             │
└─────────────────────────────────────────┘
        + floating layer (above all)
```

**Slots:**
- `main` — The primary content area (your canvas)
- `top`, `right`, `bottom`, `left` — Sidebar zones (can be empty)
- Floating layer — Rendered last, sits above everything

**Event-driven interface:**

```js
// Workspace emits events the Decision Engine can handle
workspace.addEventListener('panel-move', e => { /* { panelId, position: {x, y} } */ });
workspace.addEventListener('panel-dock', e => { /* { panelId, side, index } */ });
workspace.addEventListener('panel-undock', e => { /* { panelId, position: {x, y} } */ });
workspace.addEventListener('panel-dismiss', e => { /* { panelId } */ });
workspace.addEventListener('panel-restore', e => { /* { panelId } */ });
workspace.addEventListener('sidebar-collapse', e => { /* { side } */ });
workspace.addEventListener('sidebar-move', e => { /* { fromSide, toSide } */ });
workspace.addEventListener('layout-change', e => { /* full layout snapshot */ });
```

Workspace never mutates state directly — it proposes changes via events, and the Decision Engine decides whether to apply them.

### tui-panel

**Title bar controls:**

```
╔═[Colors]════════════════[◈][−][×]═╗
║                                    ║
║   (panel content)                  ║
║                                    ║
╚════════════════════════════════════╝
     ↑                    ↑  ↑  ↑
   drag handle      dock  │  │  └─ dismiss
                    widget│  └─ collapse
                          └─ quick-dock
```

**Controls:**
- **Drag handle** — Title bar is draggable to move (floating) or undock (docked)
- **Quick-dock widget** — 4 inward-pointing triangles (⊠ style), click to dock to that side
- **Collapse** — Shrinks panel to just title bar; content hidden
- **Dismiss** — Removes from view; panel remembers its position for later restore

**States a panel can be in:**
- `floating` — Absolute positioned in floating layer, draggable/resizable
- `docked` — Inside a sidebar, flows with siblings, shares width with sidebar
- `collapsed` — Title bar only (works in both floating and docked)
- `dismissed` — Not rendered, but position/state preserved for restore

**Attributes:**
- `draggable` — Boolean, enables drag behavior
- `resizable` — Boolean, enables resize handles when floating
- `max-width`, `max-height` — Limits for resizing
- `collapsed` — Boolean, controls collapsed state

### tui-sidebar

**Structure:**

```
┌─[SIDEBAR]─────────[−]─┐    ← title bar (drag to relocate)
├───────────────────────┤
│ ┌─[Colors]──────[×]─┐ │    ← stacked panels
│ │ (content)         │ │
│ └───────────────────┘ │
│ ┌─[Tools]───────[×]─┐ │
│ │ (content)         │ │
│ └───────────────────┘ │
└───────────────────────┘
          ↕ resize edge
```

**Collapsed state (rotated text strip):**

```
║ S I D E B A R  ‹ C O L O R S ,  T O O L S › ║
```

- Thin vertical (or horizontal) bar at the edge
- Click anywhere to expand
- Monospace, spaced-out letters for readability when rotated

**Behaviors:**
- **Stack management** — Panels stack vertically (left/right sidebars) or horizontally (top/bottom)
- **Auto-collapse** — When a new panel docks, lowest panels collapse first to make room
- **Resize** — Drag the edge between sidebar and canvas (min-width = narrowest panel requirement)
- **Relocate** — Drag title bar to move entire sidebar to another edge
- **Collapse** — Shrinks to rotated-text strip showing panel names

**Attributes:**
- `side` — Which edge: `left`, `right`, `top`, `bottom`
- `collapsed` — Boolean, controls collapsed state

## Drag & Dock Mechanics

**Floating panel drag:**
1. User drags panel title bar
2. Panel moves within workspace bounds (can't escape)
3. As panel nears an edge, **gravity zone** activates (visual hint appears)
4. Release inside gravity zone → dock to that sidebar
5. Release outside gravity zones → stays floating at drop position

**Gravity zones:**
- ~40-60px from each edge (tunable)
- Visual feedback: edge highlight, snap preview, or ghost outline showing where panel would dock
- Only activates for edges that have sidebars enabled (or creates sidebar on first dock)

**Undocking:**
1. User drags docked panel's title bar away from sidebar
2. Once past gravity zone threshold → panel becomes floating
3. Panel follows cursor until released

**Sidebar relocation:**
1. User drags sidebar title bar
2. Entire sidebar (with all panels) can be dropped on another edge
3. Same gravity zone logic applies

**Floating panel constraints:**
- Constrained to workspace bounds (can't drag outside)
- Resizable with configurable `max-width` and `max-height`

## Panel Memory System

**Every panel has persistent identity and memory:**

```js
panelState = {
  id: 'colors',
  title: 'Colors',
  visible: true,
  position: {
    mode: 'docked',        // 'floating' | 'docked'
    side: 'left',          // if docked: which sidebar
    index: 0,              // if docked: order in stack
    x: null, y: null,      // if floating: position
    width: 200, height: 300
  },
  collapsed: false
}
```

**Dismiss behavior:**
1. User clicks X → `panel-dismiss` event emitted
2. Decision Engine sets `visible: false`, preserves `position`
3. Panel removed from DOM but state retained

**Restore behavior:**
1. User opens `View → Panels → Colors` (or keyboard shortcut)
2. `panel-restore` event emitted with `panelId`
3. Decision Engine sets `visible: true`
4. If restoring to sidebar: panel goes to top, others shift down, lowest collapse if needed
5. If restoring to floating: panel appears at last known position

**View menu integration:**

```
View
└── Panels
    ├── ✓ Colors      (visible, checked)
    ├── ✓ Tools       (visible, checked)
    └──   Layers      (dismissed, unchecked)
```

Workspace provides a `getPanelStates()` method so apps can build this menu.

## Visual Design

**Panel chrome (terminal style):**

```
╔═[Colors]════════════════[◈][−][×]═╗
║                                    ║
║   (panel content)                  ║
║                                    ║
╚════════════════════════════════════╝
```

- Box-drawing borders consistent with existing retro-tui components
- Title in brackets: `[Panel Name]`
- Controls use ASCII/Unicode glyphs that fit the aesthetic

**Quick-dock widget:**

4 inward-pointing triangles meeting at center (like a quiltsketch cell):

```
┌───┬───┐
│ ╲ │ ╱ │   Click top wedge → dock top
├───┼───┤   Click right wedge → dock right
│ ╱ │ ╲ │   etc.
└───┴───┘
```

- 1px gap between segments to show they're separate targets
- Hollow by default, fills on hover
- Best implemented as SVG for precise sizing and hit areas

**Resize handles:**
- Floating panels: cursor change on hover at corners/edges
- Sidebar edge: cursor change to `ew-resize` / `ns-resize` on hover

## Implementation Phases

### Phase 1: Standalone Draggable Panels
- Enhance `tui-panel` with `draggable` attribute
- Add collapse, dismiss, resize (when floating)
- Works without workspace — apps can use immediately

### Phase 2: Workspace Container
- `tui-workspace` with main slot and floating layer
- Drag panels within bounds
- Event emission for Decision Engine integration

### Phase 3: Sidebars & Docking
- `tui-sidebar` component
- Gravity zones for dock/undock
- Panel stacking, auto-collapse, sidebar resize

### Phase 4: Polish
- Quick-dock SVG widget
- Sidebar collapse to rotated-text strip
- Sidebar relocation (drag to different edge)
- View menu integration / `getPanelStates()` API

### Phase 5: Storybook & Documentation
- Interactive demos for each component
- Workspace organism showcase
- Copy-paste examples for common patterns

## Decision Engine Integration

The workspace is designed to be a good citizen in the Decision Engine pattern:

- **Emit events** for all layout changes
- **Accept state externally** — the "brain engine" can drive workspace state
- **Expose observable state** — current layout is queryable/serializable for persistence

In quiltsketch (or similar apps), the Decision Engine owns the workspace layout state just like it owns canvas state. The workspace is a controlled component, not a black box.
