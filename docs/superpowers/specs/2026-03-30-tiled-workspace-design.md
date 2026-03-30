# Tiled Workspace Design

## Overview

A two-component system for fixed-zone grid layouts with an optional auto-tiling area. `<tui-tiled>` provides the macro grid layout via CSS grid-template-areas with named slots. `<tui-tile-zone>` is a smart container that auto-tiles dynamic children inside any slot.

**Goal:** Let apps declare a dashboard-style layout with named zones (like the MGS2 Otacon photo viewer or a PowerPoint template), fill zones with content, and optionally designate one zone for dynamic panels that tile themselves in.

## What This Is / What This Isn't

**Is:**
- A CSS grid layout component with named slot presets
- A companion auto-tiling container for one designated dynamic zone
- Composable with the event protocol (EventRouter's `onCreate` can slot content into zones or the tile zone)

**Is not:**
- A replacement for `tui-workspace` — that handles floating/draggable panels, this handles fixed grid layouts
- A JavaScript layout engine — CSS grid does the macro layout, JS only manages tile zone column switching
- A resize/drag/reorder system — zones are fixed, not interactive
- A recursive tiling window manager — the tile zone is flat (no nested splits)

**Design guardrails (validated against existing systems):**
- CSS grid for macro layout — universal best practice, same pattern as Astro/Tailwind grid utilities
- Named slots via web component `<slot>` — standard Lit pattern
- MutationObserver for tile zone child tracking — standard DOM API
- Preset templates as shorthand for grid-template-areas — well-established pattern (similar to Grafana dashboard templates)
- NOT building a JS layout engine (Golden Layout territory), NOT making every slot dynamic (Grafana complexity), NOT handling resize/drag (tiling WM territory)

---

## Components

### `<tui-tiled>` — Grid Layout

A Lit component that renders a CSS grid with named slots.

**Attributes:**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `preset` | string | none | One of: `monitor`, `viewer`, `console`, `triad` |
| `areas` | string | none | Custom grid-template-areas shorthand. `\|` separates rows. Overrides `preset`. |
| `gap` | string | `1px` | CSS grid gap value |
| `labels` | boolean | false | Show small zone-name labels in top-left of each slot |

**Usage with preset:**
```html
<tui-tiled preset="monitor">
  <div slot="status">...</div>
  <div slot="main">...</div>
  <div slot="aside-1">...</div>
  <tui-tile-zone slot="aside-2" dismissable></tui-tile-zone>
</tui-tiled>
```

**Usage with custom areas:**
```html
<tui-tiled areas="header header | main sidebar | footer footer">
  <div slot="header">...</div>
  <div slot="main">...</div>
  <div slot="sidebar">...</div>
  <div slot="footer">...</div>
</tui-tiled>
```

**Rendering behavior:**
- Parses `preset` or `areas` into a CSS `grid-template-areas` string
- Generates one `<slot name="...">` per unique area name
- Sets `grid-template-rows` and `grid-template-columns` based on sizing rules
- The 1px gap with `var(--border-default)` background creates grid lines between zones
- Component fills its parent container (`width: 100%; height: 100%`)

**Row sizing rules:**
- Slots that span full width at the top or bottom of the grid → `auto` (size to content)
- All other rows → `1fr` (fill remaining space equally)

**Column sizing:** Equal `1fr` columns based on the max number of columns in the areas definition.

### `<tui-tile-zone>` — Auto-Tiling Container

A Lit component that auto-tiles its children in a responsive grid.

**Attributes:**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `dismissable` | boolean | false | Adds close buttons to tiled children |

**Auto-column behavior:**
- Observes child count via `MutationObserver`
- 1–2 children → single column (`grid-template-columns: 1fr`)
- 3+ children → 2 columns (`grid-template-columns: 1fr 1fr`)
- Recalculates on add/remove — collapses back to 1 column when children drop below 3

**Tile wrapping:**
- Each child is wrapped in a `<div class="tile">` container
- If the child has a `data-title` attribute, a title bar is rendered
- If `dismissable` is set, a close button is added to the title bar
- Direct DOM appends are detected via MutationObserver and wrapped automatically

**Methods:**

| Method | Description |
|--------|-------------|
| `add(element, title?)` | Wrap element in a tile, append, trigger spawn animation |
| `remove(element)` | Trigger dismiss animation, remove after animation completes |

**Events:**

| Event | Detail | Description |
|-------|--------|-------------|
| `tile-dismiss` | `{ element }` | Fired when a user clicks the close button (before removal). Bubbles, composed. App can listen to sync state (e.g., unregister from EventRouter). |

**Animations:**
- Spawn: fade in + slide down (0.25s ease-out)
- Dismiss: fade out + collapse height (0.4s ease-in), then remove from DOM

---

## Presets

| Preset | Areas | Slot Names | Rows | Cols |
|--------|-------|------------|------|------|
| `monitor` | `status status \| main aside-1 \| main aside-2` | status, main, aside-1, aside-2 | `auto 1fr 1fr` | `1fr 1fr` |
| `viewer` | `header header \| primary secondary \| detail detail` | header, primary, secondary, detail | `auto 1fr auto` | `1fr 1fr` |
| `console` | `main \| footer` | main, footer | `1fr auto` | `1fr` |
| `triad` | `left center right` | left, center, right | `1fr` | `1fr 1fr 1fr` |

**Areas shorthand:** `|` separates rows, spaces separate columns within a row. Parsed into standard CSS `grid-template-areas` with quoted row strings.

Example: `"header header | main sidebar | footer footer"` becomes:
```css
grid-template-areas:
  "header header"
  "main sidebar"
  "footer footer";
```

---

## Integration with Event Protocol

The tiled workspace composes with the EventRouter from the event protocol:

```javascript
import { EventRouter } from 'retro-tui';

const tileZone = document.querySelector('tui-tile-zone');

const router = new EventRouter({
  onCreate(event) {
    // Fixed slots: return the pre-existing element
    if (event.id === 'activity') return activityLog;

    // Dynamic panels: create and add to tile zone
    const component = document.createElement(TYPE_TO_TAG[event.type]);
    tileZone.add(component, event.id);
    return component;
  },
});
```

The tiled workspace does NOT know about the event protocol. It's a layout component. The EventRouter bridges events to the layout — same separation of concerns as the rest of the protocol design.

---

## Styling

- Uses `sharedStyles` and CSS custom properties from the design token system
- Grid lines: 1px gap with `var(--surface-elevated)` background on the host, `var(--surface-base)` on each zone
- Zone labels (optional): small `var(--text-muted)` text in top-left corner, enabled via `labels` attribute on `<tui-tiled>`
- Tile zone close button: styled like existing panel dismiss buttons
- Tile wrapper title bar: `var(--surface-elevated)` background, `var(--text-muted)` text, same font sizing as existing panel headers
