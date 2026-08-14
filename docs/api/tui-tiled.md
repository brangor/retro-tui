# tui-tiled API Reference

A pure CSS-grid layout component with named slots and preset templates. Compose
chrome (`tui-titlebar`, `tui-status-strip`) *outside* the grid, not as rows in it.

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `preset` | string | `''` | Named layout: `monitor`, `viewer`, `console`, `console-split`, `triad` |
| `areas` | string | `''` | Grid shorthand; `\|` separates rows. Overridden by `preset` — see below |
| `gap` | string | `1px` | CSS grid gap |
| `labels` | string | `''` | Zone labels: `caption` (small overlay), `titlebar` (full bar), `''` (none) |

## Presets

| Preset | Shorthand | Rows |
|--------|-----------|------|
| `monitor` | `status status \| main aside-1 \| main aside-2` | `auto 1fr 1fr` |
| `viewer` | `primary secondary \| detail detail` | `1fr <footer>` |
| `console` | `main \| footer` | `1fr <footer>` |
| `console-split` | `main aside \| footer footer` | `1fr <footer>` |
| `triad` | `left center right` | `1fr` |

`<footer>` is `--tui-tiled-footer-height`, default `120px`.

## Row sizing contract

Row heights are inferred from the shape of the layout. The rules are stable and
safe to depend on:

1. A **full-width first row** sizes to its content (`auto`) — it is treated as
   chrome, such as a status strip.
2. A **full-width last row** gets a fixed height (`--tui-tiled-footer-height`,
   default `120px`) — it is treated as a log or console strip, which stays
   compact and scrolls internally rather than growing to consume the main row.
3. **Every other row** flexes (`1fr`).
4. Rules 1 and 2 apply only when there is more than one row, and never at the
   cost of rule 5.
5. **At least one row always flexes.** A height-bounded grid needs a flexible
   row to absorb the frame; without one the layout collapses to its content and
   leaves dead space below. If rules 1–3 produce no flexible row, the first
   non-footer row is promoted to `1fr`.

`minmax(120px, auto)` was considered for the footer and rejected: under a busy
log it lets the footer devour the frame and crush the main row.

### Ambiguous case

In a **two-row layout where both rows are full-width** (`main | footer`,
`status status | main main`), nothing in the shorthand says which row is chrome.
The first row is treated as content and the last as the fixed strip. If you want
a status bar above a main pane, compose it outside the grid, or add a third row.

## Custom properties

| Property | Default | Description |
|----------|---------|-------------|
| `--tui-tiled-footer-height` | `120px` | Height of a full-width bottom row |

```css
tui-tiled {
  --tui-tiled-footer-height: 200px;
}
```

## Slots

One slot per unique area name, named for that area.

```html
<tui-tiled preset="console-split">
  <tui-panel slot="main">…</tui-panel>
  <tui-panel slot="aside">…</tui-panel>
  <tui-console slot="footer"></tui-console>
</tui-tiled>
```

## Areas as display labels

Setting `areas` *alongside* `preset` does not change the layout — the values are
mapped in order onto the preset's slot names and used as visible labels. Slot
names are unaffected.

```html
<!-- Layout stays console-split; zones read DOWNLOAD / HISTORY / CONSOLE -->
<tui-tiled preset="console-split" areas="DOWNLOAD | HISTORY | CONSOLE" labels="caption">
  <div slot="main">…</div>
</tui-tiled>
```
