# Upgrading

`latest` was 2.2.5 for a long time, so most existing installs are on 2.x while the
current release is 5.0.0. That is three majors apart. This page is the aggregate map;
each major also has its own reference, linked below.

If you are already on 4.x, skip to [Stage 3](#stage-3--50-0-events-and-buttons) — it is
the only stage that affects you.

## Installing 5.0.0

`latest` still points at 2.2.5, so a plain `npm install retro-tui` keeps you three
majors behind without saying so. Ask for the release explicitly:

```bash
npm install retro-tui@next
```

Writing `"retro-tui": "^5.0.0"` into `package.json` and running `npm install` works
too — a semver range resolves against the published version list and ignores dist-tags.

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
| `RetroEmitter`, `EventRouter`, `validateEvent` | Deleted. They were an unused protocol layer with no consumers |

The `<tui-canvas>` element went with `Canvas`. If your markup uses it, that markup
needs retro-tui-lab, not a rename.

`RetroEmitter`'s typed helpers (`retro.log()`, `retro.progress()`, …) have no
replacement in the package. The emitter was a thin HTTP POST wrapper; push events
directly instead, using `examples/push-server/push.js` as the starting point. Note that
`examples/` is not published to npm — the package ships `dist` and `src` only — so this
is a copy-in, not an install. See [event-protocol.md](../api/event-protocol.md).

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

This is the one 5.0.0 change that fails **silently**. A leftover `variant="danger"` is
not a 5.0.0 variant, so the button falls back to `default` and quietly stops reading as
destructive — nothing throws, nothing logs, and buttons built programmatically raise no
type error either, because `setAttribute` takes a plain `string` and never sees the
`ButtonVariant` union. Sweep for all three forms, not just the attribute:

```bash
grep -rnE 'variant="(primary|danger)"|setAttribute\(["'"'"']variant["'"'"'],\s*["'"'"'](primary|danger)|\.variant\s*=\s*["'"'"'](primary|danger)' src/
```

**New in 5.0.0**, and useful if you build your own components on top: `SemanticColor`,
`ControlSize` and `SelectionStyle` are exported as types, alongside `SEMANTIC_COLORS`,
`SEMANTIC_TOKENS` and `sharedStyles`. Import the union rather than redeclaring it.

```ts
import type { SemanticColor } from 'retro-tui';
```

**Also new, and more useful if you build plain-DOM UI**: every component declares an
`HTMLElementTagNameMap` entry, so `document.createElement('tui-button')` and
`querySelector('tui-status')` return the real element type. Casts like
`querySelector('#url-error') as HTMLElement & { state: string }` can go.

If you are coming from 2.x you may not see any of this. 2.2.5 shipped no `types` export
condition, so consumers commonly wrote a local shim:

```ts
// delete this
declare module 'retro-tui' { ... }
```

An ambient `declare module` **replaces** a package's real types rather than merging with
them, so the shim shadows everything 5.0.0 ships — and it does so invisibly: the build
stays green while you see one export instead of forty. Delete the file. With
`moduleResolution: "bundler"`, TypeScript then resolves `dist/types/index.d.ts` through
the `types` export condition; `tsc --traceResolution` confirms which one won.

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
7. Rewrite `variant="primary"` and `variant="danger"` on `tui-button`, in attribute,
   `setAttribute` and property form.
8. Delete any local `declare module 'retro-tui'` shim written against 2.x.

Two sweeps worth running first — bare event names are the easiest thing to miss, and the
button split is the only change that fails with no compile error and no runtime warning:

```bash
grep -rnE "addEventListener\('(toggle|close|open|copy|command|action|tool-select|item-select|item-deselect|card-click|palette-change|char-select|focus-request|panel-[a-z-]+|bounds-change|layout-change)'" src/

grep -rnE 'variant="(primary|danger)"|setAttribute\(["'"'"']variant["'"'"'],\s*["'"'"'](primary|danger)|\.variant\s*=\s*["'"'"'](primary|danger)' src/
```

### Verifying by computed style

If you check the migration by reading `getComputedStyle` on live elements, measure only
what is actually laid out. Slot content that has not been placed — `tui-action-list`
expands an item's `actions-{id}` slot only while that item is selected — still answers
`getComputedStyle`, and answers with unresolved values, so a correctly migrated button
reports `rgb(0, 0, 0)`. Expand the row first and gate on
`getBoundingClientRect().width > 0`.
