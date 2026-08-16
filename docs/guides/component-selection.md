# Choosing a component

Pick the right element on the first try, without reading component source.

Every recommendation below carries its negative case. If a row's **not** column
describes what you are building, the row is the wrong answer — take the row that
matches instead. Where two components look interchangeable, the discriminator is
stated explicitly; that discriminator is the whole reason both exist.

Companion contracts, which this guide points at rather than restates:

| For | Read |
|---|---|
| The `color` vocabulary and its tokens | [`docs/api/semantic-colors.md`](../api/semantic-colors.md) |
| Every event name, payload and 4.x migration | [`docs/api/events.md`](../api/events.md) |
| `tui-tiled` presets and row-sizing rules | [`docs/api/tui-tiled.md`](../api/tui-tiled.md) |
| Which build to import | [`docs/api/distribution.md`](../api/distribution.md) |

**Scope fence.** RetroTUI is a terminal-aesthetic UI component library — a design
language for small app UIs. It is not a canvas engine, a realtime system, or a
window manager. Canvas, grid projection and tool-state work lives in
`../retro-tui-lab`; the live-push server pattern lives in `examples/push-server/`.
If what you want is one of those, this library is not where it comes from.

---

## 1. Choosing a layout

Pick exactly one layout root. They are alternatives, not layers to stack.

| Need | Use | Not |
|---|---|---|
| A whole app with chrome — title, menu bar, status bar | `tui-app` | Not when you are embedding into an existing page that already has chrome |
| A fixed, declarative arrangement of regions | `tui-tiled` | Not when regions must move or overlap at runtime |
| Panels the user drags, snaps and stacks at runtime | `tui-workspace` | Not for a static split — that is `tui-tiled`. Feature-frozen; do not extend |
| A single edge rail of stacked panels | `tui-sidebar` | Not as a page layout on its own — it is one edge, not a frame |
| A bare app/section header strip | `tui-titlebar` | Not inside `tui-tiled` as a grid row — compose it outside |

### `tui-app`

Full chrome. Five slots; the header slot has a default so `title` alone works.

| Slot | Holds |
|---|---|
| `header` | Branding. Defaults to `title` / `subtitle` rendered as `░░ TITLE ░░` |
| `header-right` | Trailing header content |
| `menu` | The menu bar — `tui-menu` |
| `main` | Primary content: `tui-tiled`, `tui-workspace`, or anything |
| `status` | Bottom bar — `tui-statusbar` |

| Attribute | Values | Default |
|---|---|---|
| `title` | string | `TUI` |
| `subtitle` | string | `''` |
| `compact` | boolean | `false` |
| `decorations` | `full \| none \| header \| status` | `full` |

### `tui-tiled`

A CSS grid with one slot per named region. Layout comes from `preset` **or**
`areas` — `preset` wins if both are set, and then `areas` is reinterpreted as
display labels for the preset's regions (see the API reference).

| Attribute | Values | Default |
|---|---|---|
| `preset` | `monitor \| viewer \| console \| console-split \| triad` | `''` |
| `areas` | shorthand, `\|` separates rows — `main aside \| footer footer` | `''` |
| `gap` | any CSS grid gap | `1px` |
| `labels` | `caption` (small overlay) `\| titlebar` (full bar) `\| ''` | `''` |

Row heights are inferred from shape, not declared: a full-width first row is
`auto` (chrome), a full-width last row is `--tui-tiled-footer-height` (`120px`,
a log strip), everything else is `1fr`. Do not fight this by nesting grids —
read the row-sizing contract and choose a shape that produces what you want.

### `tui-workspace`

Floating, draggable, edge-snapping panels. **Feature-frozen** — docking,
tabbing and tiling inside it are explicitly out of scope. Two slots, `main` and
`floating`; no attributes at all. Read layout back with `getPanelStates()` and
the `bounds` getter, or listen for `tui-workspace-layout-change`.

Reach for it only when the *user* rearranges the layout. If *you* decide where
things go, that is `tui-tiled`.

### `tui-sidebar`

| Attribute | Values | Default |
|---|---|---|
| `side` | `left \| right \| top \| bottom` | `left` |
| `size` | pixels (width for left/right, height for top/bottom) | `200` |

Slotted panels stack in order and can be drag-reordered. It is a rail, not a
frame — pair it with the rest of your layout, do not expect it to host one.

---

## 2. Choosing a container

| Need | Use | Not |
|---|---|---|
| Titled, bordered region with optional collapse/drag/resize | `tui-panel` | Not for spacing or grouping alone — use a token |
| A blocking dialogue with its own backdrop | `tui-modal` | Not for a passing message — that is `tui-toast` |
| A playing card | `tui-card` | Not as a generic box. It is a card, not a container |
| Content that needs neither a title nor a border | *no container* | — |

**The default answer is no container.** A `tui-panel` earns its place by having
a title, a border that means something, or a control (collapse, dismiss,
resize). Reaching for one purely to indent content costs a shadow root and a
border you then have to turn off.

### `tui-panel`

The workhorse. Everything optional is off by default, including `floating`.

| Attribute | Values | Default |
|---|---|---|
| `title` | string | `''` |
| `color` | semantic colour — see §6 | `''` |
| `border` | `single \| heavy \| double \| rounded \| none` | `single` |
| `variant` | `bright \| classic` | `bright` |
| `full` | fill container; disables drag/resize, keeps collapse | `false` |
| `collapsible` / `collapsed` | boolean | `false` |
| `dismissable` / `minimized` | boolean | `false` |
| `resizable` | boolean | `false` |
| `floating` | boolean | `false` |
| `selected` / `active` | boolean | `false` |
| `persist-id` | localStorage key for position/collapse state | `''` |
| `snap-edge` | `left \| right \| top \| ''` | `''` |
| `position-x` / `position-y` | number (px) | `0` |
| `panel-width` / `panel-height` | number (px) or null | `null` |
| `min-width` / `min-height` | number (px) | `150` / `100` |
| `max-width` / `max-height` | number (px) or null | `null` |

Inside a `tui-tiled` region, use `full` — the region already sizes the panel.
The drag/floating attributes only make sense inside `tui-workspace`.

`tui-panel-dismiss` is the **only cancelable event in the library**; see §8.

### `tui-modal`

| Attribute | Values | Default |
|---|---|---|
| `title` | string | `''` |
| `border` | `single \| heavy \| double \| rounded \| none` | `double` |
| `open` | boolean | `false` |
| `closable` | show the close control | `true` |

Slots: default (body) and `footer` (buttons). Drive it with `show()` / `close()`
and listen for `tui-modal-open` / `tui-modal-close`.

### `tui-card`

A playing-card primitive: `rank`, `suit`, `face-down`, `selected`, `disabled`,
`size` (`sm | md | lg`), and a default slot that replaces the rank/suit face.
Fires `tui-card-click` with `{ rank, suit }`.

It is a **settled fence exception** — a card game primitive kept in a general UI
library because its box-draw states (`┌──┐` neutral, `┏━━┓` hover, `╔══╗`
selected) are the design language, not a game feature. That exception is not a
licence to use it as a general container. If you slot arbitrary content into a
card because you liked the border, you wanted `tui-panel`.

---

## 3. Choosing a text surface

All four render monospaced. The discriminator is *how the text arrives*.

| Need | Use | Not |
|---|---|---|
| Static or occasionally re-set prose | `tui-text` | Not for a growing log — it has no line cap |
| An append-only log, capped and auto-scrolling | `tui-output` | Not when the user must type back |
| A log **plus** a command line | `tui-console` | Not for read-only output — the prompt would be dead furniture |
| Rows and columns | `tui-table` | Not for freeform text |

`tui-text`, `tui-output` and `tui-console` all run their content through
`ansiToHtml()`, so ANSI escape sequences render as colour. `tui-table` does not.

### `tui-text`

| Attribute | Values | Default |
|---|---|---|
| `content` | the text; falls back to `textContent` when empty | `''` |
| `attr` | space-separated: `bold dim italic underline reverse strikethrough blink` | `''` |
| `variant` | `body \| caption \| subtitle \| label \| ''` | `''` |

### `tui-output`

| Attribute | Values | Default |
|---|---|---|
| `max-lines` | lines retained; older lines are dropped | `500` |
| `autoscroll` | follow the tail when already near the bottom | `true` |
| `timestamps` | prefix each line with `HH:MM:SS` | `false` |
| `attr` | as `tui-text` | `''` |

Methods: `append(text)` (splits on `\n`), `clear()`.

### `tui-console`

`tui-output` plus an input line. Fires `tui-console-command` with
`{ command }` on submit — **not** the bare string; a 4.x handler reading
`e.detail` directly breaks here.

| Attribute | Values | Default |
|---|---|---|
| `prompt` | prompt string | `❯ ` |
| `prompt-attr` | text attributes applied to the prompt | `''` |
| `history-size` | **recallable commands**, not output lines | `100` |

Methods: `print(text)`, `clear()`. Note the asymmetry: `tui-console` has no
output cap. If you are streaming an unbounded feed and never need input, prefer
`tui-output` and its `max-lines`.

### `tui-table`

`border` (`single | double | heavy | none`, default `single`). Data is imperative
only — there is no rows attribute:

```js
table.setData(['host', 'status'], [{ host: 'web-1', status: 'up' }]);
table.upsertRow('web-1', { status: 'down' });   // keyed in-place update
```

---

## 4. Status and feedback

Six components, one question each: *how many values, and how long do they live?*

| Need | Use | Not |
|---|---|---|
| One state, right now, with an icon | `tui-status` | Not for a number — that is `tui-stat` |
| A persistent bottom bar of label/value pairs | `tui-statusbar` + `tui-status-item` | Not inline within content |
| An inline run of labelled values, in flow | `tui-status-strip` + `tui-strip-item` | Not as the app's bottom bar |
| One labelled figure, sized for display | `tui-stat` | Not for a run of six — that is a status strip |
| Determinate completion | `tui-progress` | Not for an unknown-duration wait |
| A transient message that then disappears | `tui-toast` | Not for anything the user must act on — that is `tui-modal` |

### `tui-status`

`state` + `message`. The `state` vocabulary is **five values, and it is not the
`color` vocabulary**:

| `state` | Indicator | Token |
|---|---|---|
| `success` | `✓` | `--color-success` |
| `error` | `✗` | `--color-error` |
| `warning` | `⚠` | `--color-warning` |
| `info` | `ℹ` | `--color-info` |
| `pending` | `…` | `--text-muted` |

An unset `state` renders the placeholder `No status`. Anything outside the five
renders with no indicator — there is no `warn`, no `danger`, no `ok`.

### `tui-statusbar` / `tui-status-item`

`tui-statusbar` takes `color` (semantic, default **`primary`** — the only
component whose `color` is not empty by default). Each `tui-status-item` takes
`label`, `value` and boolean `highlight`.

### `tui-status-strip` / `tui-strip-item`

`tui-status-strip` takes a `label` (`STATUS`, `RESULTS`, `CONFIG`). Each
`tui-strip-item` takes `color` (semantic) and an optional `indicator`
character — `●` active, `○` inactive — with its text slotted.

The strip is content; the statusbar is chrome. That is the entire distinction.

### `tui-stat`

`label`, `value`, `color` (semantic, applied to the value).

### `tui-progress`

`value` (0–100), `label`, and optionally `total` + `current` for an `n/total`
readout. Determinate only — there is no indeterminate mode, so for an unknown
wait use `tui-status state="pending"`.

### `tui-toast`

Imperative and transient. Either query the element, or use the singleton helper
that creates and appends one for you:

```js
import { tuiToast } from 'retro-tui';
tuiToast('Saved');
tuiToast('Build failed', { type: 'error', duration: 5000 });
```

| Option | Values | Default |
|---|---|---|
| `type` | `info \| success \| warning \| error \| null` | `null` |
| `title` | header text | derived from `type` (`Success`, `Error`, …) |
| `duration` | ms | `2500` |

The element attribute `position` takes `bottom | top | bottom-right`, default
`bottom`. Toasts queue: a second call waits for the first to finish. Passing
neither `type` nor `title` gives the compact headerless layout — see §7.

---

## 5. Actions and input

| Need | Use | Not |
|---|---|---|
| One action | `tui-button` | — |
| A rail or row of mutually exclusive tools | `tui-toolbar` + `tui-tool` | Not for unrelated actions — that is a row of buttons |
| An application menu bar with dropdowns | `tui-menu` + `tui-menu-item` + `tui-menu-action` | Not for in-content choices |
| A list whose items expand to reveal actions | `tui-action-list` | Not for plain tabular rows — that is `tui-table` |
| A URL, or a click-to-copy value | `tui-link` | Not for an action — that is a button |
| Collecting a value | the form set, below | — |
| Picking a glyph from named character sets | `tui-palette` | Not a general picker — it is characters |

### `tui-button` — two orthogonal axes

`variant` is the **treatment**; `color` is the **semantic accent**. They are
independent, and only two treatments read `color` at all.

| `variant` | Treatment | Reads `color`? |
|---|---|---|
| `default` | Bordered, neutral surface | ✖ |
| `filled` | Solid accent, inverted label | ✓ |
| `outline` | Accent border and label, fills on hover | ✓ |
| `ghost` | No border until hover, muted label | ✖ |
| `icon` | Square, sized for toolbars | ✖ |
| `menu` | Transparent trigger for menu bars | ✖ |

`color` accepts the semantic vocabulary (§6). Unset on `filled`/`outline`, the
accent falls back to `--color-primary`.

| Other attribute | Values | Default |
|---|---|---|
| `size` | `sm \| md \| lg` (`ControlSize`, shared with toolbar/tool/card) | `md` |
| `selection-style` | `invert \| border`; inherits `--selection-style` | inherited |
| `selected` | toggle/selected state | `false` |
| `disabled` | boolean | `false` |
| `block` | full width | `false` |

Migrating from 4.x: `variant="primary"` → `variant="filled"`;
`variant="danger"` → `variant="outline" color="error"`.

**Do not use `variant="filled" color="muted"`.** Filled paints the accent as the
background behind `--surface-base` text, and muted lands at 3.45:1 and 3.29:1 in
the dark themes against a 4.5:1 WCAG AA floor. For de-emphasis use
`variant="ghost"`, which is muted by design and passes.

### `tui-toolbar` / `tui-tool`

Authored two ways — pass a `tools` array, or slot `<tui-tool>` children. Both
emit `tui-tool-select` with `{ tool }`, so a listener does not need to know
which was used.

| `tui-toolbar` | Values | Default |
|---|---|---|
| `orientation` | `vertical \| horizontal` | `vertical` |
| `selected` | the active tool id | `''` |
| `size` | `sm \| md \| lg` | `md` |
| `selection-style` | `invert \| border` | `''` |
| `tools` | `{ id, icon?, name?, key?, divider? }[]` | `[]` |
| `show-hotkeys` | boolean | `true` |

`tui-tool` takes `tool-id`, `icon`, `active`, `size`.

### `tui-menu`

Three nested elements plus a separator: `tui-menu` (bar) → `tui-menu-item`
(`label`, `hotkey` — the underlined letter) → `tui-menu-action` (`label`,
`shortcut`, boolean `danger`), with `tui-menu-divider` between groups.

Actions fire `tui-menu-action-select` with `{ label }`. Note `danger` is a
boolean flag on the action, not a `color` — destructive menu items are a
structural category here, not a paint job.

### `tui-action-list`

`items` is `{ id, label, sublabel?, color? }[]`; `selected` is the expanded
item's id. Per-item detail goes in a `slot="actions-<id>"`. Fires
`tui-list-item-select` and `tui-list-item-deselect`, both with `{ id, label }`.

### `tui-link`

`href` plus `type`: `external` (opens in a browser, arrow icon) or `copy`
(writes `href` to the clipboard and fires `tui-link-copy` with `{ value }`).

### `tui-palette`

`palettes` (a `{ name: string[] }` map), `current-palette`, `selected-char`,
`columns` (default `8`). Fires `tui-palette-change` with `{ palette, firstChar }`
and `tui-palette-char-select` with `{ char }`.

### The form set and the `tui-change` protocol

| Component | Key attributes | `tui-change` detail |
|---|---|---|
| `tui-input` | `value`, `placeholder`, `name`, `label`, `disabled` | `{ value }` |
| `tui-checkbox` | `checked`, `value`, `name`, `label`, `disabled` | `{ checked, value, name }` |
| `tui-radio` | `checked`, `value`, `name`, `label`, `disabled` | `{ checked, value, name }` |
| `tui-checkbox-group` | `name`, `label`, `disabled`, `value: string[]` | `{ value: string[], name }` |
| `tui-radio-group` | `name`, `label`, `disabled`, `value` | `{ value, name }` |

All five share the same two event names — `tui-change` on commit, and
`tui-input` on every keystroke (`tui-input` the element only). So one listener
serves a whole form:

```js
form.addEventListener('tui-change', (e) => {
  state[e.detail.name] = e.detail.value;
});
```

**Listening once at the container is safe.** Both groups call
`stopPropagation()` on the child's event before re-emitting their own, so a
listener above a `tui-checkbox-group` or `tui-radio-group` sees exactly **one**
`tui-change` per interaction, carrying the group's value — never the child's as
well. Do not add a second listener on the children to compensate; there is
nothing to compensate for.

---

## 6. Colour discipline

Name the **meaning**, never the pigment. Every `color` attribute in the library
accepts exactly one vocabulary — `primary | secondary | success | warning |
error | info | muted | ''` — defined once in `src/styles/semantics.ts` and
enforced by `tests/semantic-vocabulary.test.ts`. Literal names (`cyan`, `green`,
`magenta`, `yellow`, `red`) were removed in 4.0.0 because they resolved
inconsistently between components and misdescribed themselves the moment a theme
changed the pigment. In consumer CSS the same rule applies one level down: never
write a raw colour value, always a token (`var(--color-error)`, not `#ff5555`),
because the three shipped themes reassign every one of them.

Full reference, including the per-value token map and the 4.x migration table:
[`docs/api/semantic-colors.md`](../api/semantic-colors.md).

---

## 7. Kind is not colour

Two APIs take a value that *looks* like `color` and is not. Both name a **kind
or level** that happens to be colour-keyed. Neither should be read as, renamed
to, or validated against the `color` vocabulary.

| API | Vocabulary | Why it is not `color` |
|---|---|---|
| `ToastOptions.type` | `info \| success \| warning \| error \| null` | Also selects the default title (`Error`, `Success`, …) and switches off the compact `simple` layout. It changes structure, not just paint |
| `LogData.level` | `info \| warn \| error` | A log level following the `console.warn`/syslog convention. Deliberately `warn`, not `warning` |
| `tui-status` `state` | `success \| error \| warning \| info \| pending` | Also selects the indicator glyph, and includes `pending`, which has no `color` equivalent |
| `tui-menu-action` `danger` | boolean | A structural category for destructive actions, not an accent |

The test: if changing the value changes anything other than the colour — a
title, a glyph, a layout — it is a kind, not a colour. **When a value carries
meaning beyond paint, do not reach for `color`.** Conversely, when all you want
is the paint, `color` is the only correct place to put it.

---

## 8. Composition recipes

### Chrome goes outside `tui-tiled`

The grid owns its regions and infers row heights from the layout's shape. Wrap
it; do not add chrome as a grid row and then fight the sizing.

```html
<tui-titlebar app="DEPLOY" section="STAGING"></tui-titlebar>

<tui-tiled preset="console-split">
  <tui-panel full title="SERVICES" slot="main">…</tui-panel>
  <tui-panel full title="DETAIL"   slot="aside">…</tui-panel>
  <tui-console slot="footer"></tui-console>
</tui-tiled>

<tui-status-strip label="STATUS">
  <tui-strip-item color="success" indicator="●">healthy</tui-strip-item>
  <tui-strip-item color="muted"   indicator="○">idle</tui-strip-item>
</tui-status-strip>
```

The exception is a full-width **first** row, which `tui-tiled` deliberately
sizes to content for exactly this purpose. Even then, a two-row all-full-width
layout is ambiguous — the last row becomes the fixed footer. Compose outside, or
add a third row.

### Panels inside tiled regions

`<tui-panel full>`. The region is already sized, so `full` fills it and drops
drag/resize while keeping collapse. Floating and position attributes belong to
`tui-workspace`, and do nothing here.

### Chrome inside `tui-app`

`tui-app` already owns the chrome, so slot into it instead of stacking your own:

```html
<tui-app title="DEPLOY" subtitle="staging">
  <tui-menu slot="menu">…</tui-menu>
  <tui-tiled preset="monitor" slot="main">…</tui-tiled>
  <tui-statusbar slot="status">
    <tui-status-item label="BUILD" value="passing"></tui-status-item>
  </tui-statusbar>
</tui-app>
```

### Confirm before a panel closes

`tui-panel-dismiss` is the only cancelable event in the library.

```js
panel.addEventListener('tui-panel-dismiss', (e) => {
  if (hasUnsavedWork) e.preventDefault();   // panel stays
});
```

`preventDefault()` on any other retro-tui event does nothing — they are all
informational.

### Theming by body class

Tokens auto-inject on import. Switch theme by class on `<body>`; nothing else
changes.

```html
<body class="theme-vibrant-scifi">
```

| Class | Look |
|---|---|
| `theme-terminal-classic` | Dark, cyan/green on near-black. The default — no class needed |
| `theme-vibrant-scifi` | Bright magenta/teal |
| `theme-home-security-interface` | Amber on dark |

---

## 9. Anti-patterns

| ✖ Don't | ✓ Do |
|---|---|
| Nest `tui-panel` inside `tui-panel` to get spacing | Use a spacing token — `--spacing-xs/sm/md/lg` |
| Wrap content in `tui-panel` with `border="none"` and no title | Use no container at all |
| Reach for `tui-workspace` because it sounds like the layout root | Use `tui-tiled` unless the *user* rearranges panels. Workspace is feature-frozen |
| Use `tui-card` as a generic bordered box | Use `tui-panel`. Card is a playing card |
| Put a titlebar or status strip inside `tui-tiled` as a row | Compose chrome outside the grid, or slot into `tui-app` |
| Hardcode `#00ffff` in consumer CSS | Use `var(--color-primary)` — the three themes reassign it |
| Pass `color="cyan"` / `"green"` / `"red"` | Pass the meaning: `primary`, `secondary`, `error` |
| Set `color` on `variant="default"`, `ghost`, `icon` or `menu` | Only `filled` and `outline` read `color`; elsewhere it fails **silently** |
| Use `variant="filled" color="muted"` for a de-emphasised button | Use `variant="ghost"` — filled+muted fails WCAG AA in the dark themes |
| Keep using `variant="primary"` or `variant="danger"` | `variant="filled"`; `variant="outline" color="error"` |
| Listen for a bare `toggle`, `close`, `command`, `copy`, `action` | Every event is `tui-<subject>-<verb>`. Nothing dispatches a bare name any more |
| Read `e.detail` as the command string on `tui-console-command` | Read `e.detail.command` — the payload became an object in 5.0.0 |
| Listen on both a group and its child inputs to catch every change | Listen once at the container; the groups already `stopPropagation()` |
| Use `state="warn"` on `tui-status` | Use `state="warning"`. `warn` is a *log level* (`LogData.level`), not a UI state |
| Use `tui-console` as a read-only log feed | Use `tui-output` — it has `max-lines`; console does not cap output |
| Use `tui-toast` for something the user must acknowledge | Use `tui-modal`. Toasts expire on a timer |
| Add a component-local colour union in your own code | Import `SemanticColor` from `retro-tui` |
| Expect canvas, grid projection or tool-state components here | They live in `../retro-tui-lab` |
| Expect a push server or websocket client here | Copy the recipe from `examples/push-server/` |
