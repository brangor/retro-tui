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

Omitting `color` inherits the surrounding text colour.

```html
<tui-panel color="error" title="BUILD FAILED">…</tui-panel>
<tui-stat label="passed" value="245" color="success"></tui-stat>
<tui-statusbar color="primary">…</tui-statusbar>
```

Components accepting this vocabulary: `tui-panel`, `tui-stat`, `tui-strip-item`,
`tui-statusbar`. A test asserts each one styles all seven values, so the set
cannot drift apart again.

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
