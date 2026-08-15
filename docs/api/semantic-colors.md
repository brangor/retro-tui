# Semantic colours

Every component that takes a `color` attribute accepts the same seven values.
Learn them once; they work everywhere.

| Value | Token | Use for |
|-------|-------|---------|
| `primary` | `--color-primary` | The main accent — active state, focus, emphasis |
| `secondary` | `--color-secondary` | A second accent, subordinate to primary |
| `success` | `--color-success` | Completion, passing, healthy |
| `warning` | `--color-warning` | Needs attention, not yet failing |
| `error` | `--color-error` | Failure, blocked, destructive |
| `info` | `--color-info` | Neutral notice, no action implied |
| `muted` | `--text-muted` | De-emphasised, inactive, secondary detail |

Omitting `color` leaves the component at its own default — usually inheriting the
surrounding text colour. The table below gives each default; `tui-statusbar` is
the only component whose `color` is not empty to begin with.

```html
<tui-panel color="error" title="BUILD FAILED">…</tui-panel>
<tui-stat label="passed" value="245" color="success"></tui-stat>
<tui-statusbar color="primary">…</tui-statusbar>
<tui-button variant="outline" color="error">DELETE</tui-button>
```

Five components accept this vocabulary:

| Component | `color` paints | Default |
|---|---|---|
| `tui-panel` | Border, header and title decoration | `''` |
| `tui-stat` | The value | `''` |
| `tui-strip-item` | The item text | `''` |
| `tui-statusbar` | Border and item dividers | `primary` |
| `tui-button` | The accent — **only** under `variant="filled"` and `variant="outline"` | `''` |

`tests/semantic-vocabulary.test.ts` asserts that each of the five styles all seven
values, and that no component names a retired literal — in its CSS or in its
`@attr` documentation. The set cannot drift apart again, and neither can the docs
drift away from it.

## `tui-button`: colour is only half the answer

`tui-button` has two independent axes. `variant` is the **treatment**; `color` is
the **semantic accent**. Only two of the six treatments read `color` at all:

| `variant` | Reads `color`? |
|---|---|
| `filled` | ✓ — accent becomes the background |
| `outline` | ✓ — accent becomes the border and label |
| `default` | ✖ |
| `ghost` | ✖ |
| `icon` | ✖ |
| `menu` | ✖ |

The four that ignore it carry their own colours. Setting `color` on them fails
**silently** — nothing errors, nothing changes. Unset on `filled`/`outline`, the
accent falls back to `--color-primary`.

**Avoid `variant="filled" color="muted"`.** Filled paints the accent as the
background behind `--surface-base` text; muted lands below the 4.5:1 WCAG AA
floor in the dark themes. For a de-emphasised button use `variant="ghost"`, which
is muted by design and passes. The rule carries this warning in
`src/components/tui-button.ts`.

## Kind is not colour

Several APIs take a value that looks like `color` and is not — `ToastOptions.type`,
`LogData.level`, `tui-status`'s `state`, `tui-menu-action`'s `danger`. Each names a
**kind or level** that happens to be colour-keyed, and each changes something
beyond paint: a default title, an indicator glyph, a layout, a category. Do not
read them as, rename them to, or validate them against this vocabulary.

The test: if changing the value changes anything other than the colour, it is a
kind, not a colour. See
[`docs/guides/component-selection.md` §7](../guides/component-selection.md) for the
full table.

## Why not colour names

Earlier versions accepted `cyan`, `green`, `magenta`, `yellow` and `red`. These
were removed in 4.0.0. They were never real colours — each was an alias for a
token, and the aliases disagreed: `yellow` meant `info` in `tui-panel` but
`secondary` in `tui-statusbar`, while `cyan` and `magenta` were identical.

They also misdescribed themselves. A component asking for `yellow` renders
`--color-info`, which in `theme-vibrant-scifi` is not yellow. Naming the
*meaning* rather than the *pigment* is what lets a theme change the pigment.

| Removed | Use instead |
|---------|-------------|
| `cyan`, `magenta` | `primary` |
| `green` | `secondary` |
| `yellow` | `info` (panel) / `secondary` (statusbar) |
| `red` | `error` |

Every replacement above renders the same colour the alias already produced, so
migrating is a rename with no visual change.

## Status states

`tui-status` takes `state`, a related but distinct vocabulary: the four shared
values plus `pending`.

| State | Indicator |
|-------|-----------|
| `success` | `✓` |
| `error` | `✗` |
| `warning` | `⚠` |
| `info` | `ℹ` |
| `pending` | `…` |

Before 4.0.0 this state was spelled `warn` and rendered in `--color-info`, so
warnings appeared light blue; `--color-warning` went unused. Both are fixed.

`LogData.level` in the push-server example keeps `warn`, following the log-level
convention (`console.warn`, syslog) rather than this visual vocabulary.

## Using the vocabulary in your own code

The values are exported, so you can iterate or validate against them:

```js
import { SEMANTIC_COLORS, SEMANTIC_TOKENS } from 'retro-tui';

SEMANTIC_COLORS;            // ['primary', 'secondary', 'success', …]
SEMANTIC_TOKENS.warning;    // '--color-warning'
```

TypeScript consumers can import the `SemanticColor` type for their own props.
