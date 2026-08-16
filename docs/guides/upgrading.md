# Upgrading

`latest` was 2.2.5 for a long time, so most existing installs are on 2.x while the
current release is 5.0.0. That is three majors apart. This page is the aggregate map;
each major also has its own reference, linked below.

If you are already on 4.x, skip to [Stage 3](#stage-3--50-0-events-and-buttons) — it is
the only stage that affects you.

## Which stages apply to you

| You are on | Read |
|---|---|
| 2.x | Stages 1, 2 and 3 |
| 3.x | Stages 2 and 3 |
| 4.x | Stage 3 |

Nothing is deprecated-but-working across these boundaries. Each stage removed what it
replaced, deliberately — an alias that resolves differently per component is the exact
problem 4.0.0 existed to end. Expect a compile or a silent no-op, not a warning.

---

## Stage 1 — 3.0.0: the scope fence

3.0.0 drew a fence around what retro-tui is: terminal-aesthetic UI primitives and
tokens. Canvas rendering, grid projections, tool state and the push server moved out.
Thirteen exports were removed.

| Removed export | Where it went |
|---|---|
| `Canvas`, `renderGrid` | [retro-tui-lab](../../../retro-tui-lab) |
| `getProjection`, `RectangularProjection`, `IsometricProjection`, `TriangularProjection`, `isometricOrder` | retro-tui-lab |
| `ToolState`, `toolContext` | retro-tui-lab |
| `RetroPush` | `examples/push-server/push-client.js` — copy it into your project |
| `RetroEmitter` | `examples/push-server/`, described in [event-protocol.md](../api/event-protocol.md) |
| `EventRouter`, `validateEvent` | Deleted. They were an unused protocol layer with no consumers |

The `<tui-canvas>` element went with `Canvas`. If your markup uses it, that markup
needs retro-tui-lab, not a rename.

Everything else in 2.x kept its name. The `retro-*` → `tui-*` element rename people
sometimes expect here is much older — it predates v1.0.0 and does not apply to any 2.x
install.

## Stage 2 — 4.0.0: one semantic colour vocabulary

Literal colour names were removed from every `color` attribute. They were aliases for
design tokens, and they disagreed between components — `yellow` meant `info` on
`tui-panel` but `secondary` on `tui-statusbar`, while `cyan` and `magenta` were the
same colour. They also lied under theming: a component asking for `yellow` rendered
`--color-info`, which is not yellow in every theme.

| Removed | Use instead |
|---|---|
| `cyan`, `magenta` | `primary` |
| `green` | `secondary` |
| `yellow` | `info` on `tui-panel`; `secondary` on `tui-statusbar` |
| `red` | `error` |

The vocabulary is now the same seven values everywhere: `primary`, `secondary`,
`success`, `warning`, `error`, `info`, `muted`. Full reference:
[semantic-colors.md](../api/semantic-colors.md).

Also in 4.0.0:

- `tui-status` renamed its `warn` state to **`warning`**, and warning/info badges were
  fixed to render in `--color-warning`/`--color-info`. Before this, warnings painted
  light blue and `--color-warning` was never used at all.
- `LogData.level` deliberately kept `warn` — it is a log level following the
  `console.warn` convention, not a visual semantic. This distinction is intentional and
  is explained in [component-selection.md](component-selection.md).

## Stage 3 — 5.0.0: events and buttons

**Every event is now prefixed `tui-`.** Before 5.0.0 some events were bare, and three
of them shadowed real DOM events — `tui-panel` dispatched `toggle`, `tui-modal`
dispatched `close`, `tui-link` dispatched `copy`. Since every retro-tui event is
`bubbles: true, composed: true`, a document-level listener could not tell them apart
from the browser's own.

Renaming your listeners is most of the migration. Four payloads also changed, one of
which (`tui-console-command`) breaks silently. The full table is in
[events.md](../api/events.md#migration-from-4x).

**`tui-button` split `variant` into two axes.** `variant` is now the treatment and
`color` is the semantic accent:

| Before | After |
|---|---|
| `variant="primary"` | `variant="filled"` |
| `variant="danger"` | `variant="outline" color="error"` |
| `default`, `ghost`, `icon`, `menu`, `outline` | unchanged |

Only those two changed; every other variant keeps its exact appearance. The split also
makes combinations expressible that were not before, such as `filled color="error"` or
`outline color="success"`.

**New in 5.0.0**, and useful if you build your own components on top: `SemanticColor`,
`ControlSize` and `SelectionStyle` are exported as types, alongside `SEMANTIC_COLORS`,
`SEMANTIC_TOKENS` and `sharedStyles`. Import the union rather than redeclaring it.

```ts
import type { SemanticColor } from 'retro-tui';
```

---

## Checklist

Working from 2.x, in order:

1. Remove or relocate anything importing `Canvas`, a projection, `ToolState`,
   `renderGrid`, `RetroPush`, `RetroEmitter`, `EventRouter` or `validateEvent`.
2. Replace `<tui-canvas>` usage with retro-tui-lab.
3. Replace literal colour names on every `color` attribute.
4. Rename `state="warn"` to `state="warning"` on `tui-status`.
5. Prefix every retro-tui event listener with `tui-`, using the table in
   [events.md](../api/events.md#migration-from-4x).
6. Read `e.detail.command` rather than `e.detail` on `tui-console-command`.
7. Rewrite `variant="primary"` and `variant="danger"` on `tui-button`.

A useful first sweep, since bare event names are the easiest thing to miss:

```bash
grep -rnE "addEventListener\('(toggle|close|open|copy|command|action|tool-select|item-select|item-deselect|card-click|palette-change|char-select|focus-request|panel-[a-z-]+|bounds-change|layout-change)'" src/
```
