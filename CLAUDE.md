# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RetroTUI is a Lit-based web component library — a terminal-aesthetic design language for building small app UIs in the browser. It provides components, a token/theme system, and ANSI/border utilities. It is **not** a canvas engine, realtime system, or window manager.

**Scope fence:** New additions must be a terminal-aesthetic UI primitive usable across multiple small apps. Canvas/projection/tool-state work lives in `../retro-tui-lab`. The push server pattern lives in `examples/push-server/`. If you're considering adding something that doesn't pass that test, update this fence section first.

## Commands

```bash
npm run dev        # Dev server on :3000
npm run server     # Push server (examples/push-server/server) on :3001
npm start          # Both concurrently
npm run build      # All three outputs below (ESM + CDN + types)
npm run build:cdn  # Self-contained bundle (lit bundled) -> dist/retro-tui.cdn.js
npm run build:types# TypeScript declarations -> dist/types/
npm run build:site # Build GitHub Pages site to site/
npm run typecheck  # TypeScript type checking (tsc --noEmit)
npm test           # Run tests in watch mode (vitest)
npm run test:run   # Run tests once (vitest run)
```

Run a single test file:
```bash
npx vitest run tests/tui-button.test.js
```

Tests use Vitest with jsdom environment and `@open-wc/testing` for web component fixtures. Test files live in `tests/`.

## Architecture

```
┌──────────────────┐
│   Browser        │  Imports retro-tui components + tokens
│   (Lit UI)       │  No runtime server dependency
└──────────────────┘

examples/push-server/ — optional recipe for live dashboard use cases
  ┌─────────────┐  HTTP POST  ┌─────────────┐  WebSocket  ┌─────────────┐
  │ Shell/Node  │ ──────────► │ Push Server │ ◄──────────► │   Browser   │
  └─────────────┘             │  :3001      │              └─────────────┘
                              └─────────────┘
```

### Key Directories

- `src/components/` — Lit web components (all prefixed `tui-*`)
- `src/utils/` — ANSI converter (`ansi.js`), border drawing chars (`borders.ts`)
- `src/styles/shared.js` — Shared CSS variables and ANSI color classes (exported as `sharedStyles`)
- `src/styles/tokens.css` — Design token system (semantic colors, surfaces, spacing, typography, themes)
- `src/styles/semantics.ts` — The shared vocabularies: `SemanticColor`/`SEMANTIC_COLORS` for every component with a `color` attribute, plus `ControlSize` and `SelectionStyle`
- `src/styles/inject-tokens.ts` — Auto-imports tokens.css on library load
- `src/protocol/types.ts` — Type definitions used by component props (no runtime)
- `docs/api/` — Public API contracts: `semantic-colors.md`, `events.md`, `event-protocol.md`, `tui-tiled.md`, `distribution.md`
- `docs/guides/` — Task-oriented guides: `component-selection.md`, `upgrading.md`, `decision-engine.md`, `porting.md`
- `docs/references/` — Visual reference images the aesthetic is drawn from (Unity Systems
  home-security panel, Jupiter Hell, MGS2, Diablo 2). Not stray files — they are the
  source `theme-home-security-interface` and `index.html` are built against.

Pre-vault implementation plans (`docs/plans/`, `docs/superpowers/`) were archived out of
the repo on 2026-08-16 to `~/Code/agents/vault/plans/brando/retro-tui/archive-prevault/`.
Nothing live linked them. New plans go to the vault, never into this repo.
- `examples/` — Demo pages; `push-server/` is a standalone recipe

### Component Patterns

All components:
- Inherit from `LitElement` with shadow DOM
- Use TypeScript with Lit decorators (`@customElement`, `@property`)
- Import `sharedStyles` from `../styles/shared.js`
- Dispatch custom events with `bubbles: true, composed: true`
- Augment global `HTMLElementTagNameMap` for type safety

Components supporting text output (`tui-output`, `tui-console`, `tui-text`) use `ansiToHtml()` for ANSI color rendering.

### Library Entry Point

`src/index.ts` exports (it became TypeScript in 5.0.0 so the shared vocabulary types
can be re-exported — `export type` is not valid in a `.js` entry):
- **Layout**: App, Workspace, Sidebar
- **Atoms**: Panel, Output, Table, Console, Text, Menu (+ MenuItem, MenuAction, MenuDivider), Statusbar (+ StatusItem), Modal, Button, Toolbar (+ Tool), Toast (+ tuiToast), Card, Palette, Link, ActionList, Stat, StatusStrip (+ StripItem), Titlebar, Tiled
- **Form**: Input, Checkbox, Radio, CheckboxGroup, RadioGroup
- **Atoms (cont.)**: Progress, Status
- **Utilities**: ansiToHtml, BORDER_CHARS, getBorderChars, titleDecoration, STATE_BORDERS, sharedStyles, parseAreas, SEMANTIC_COLORS, SEMANTIC_TOKENS
- **Types**: SemanticColor, ControlSize, SelectionStyle — consumers building their own
  components import these rather than redeclaring the unions

### Build Output

Two builds ship, and they are not interchangeable — see `docs/api/distribution.md`:

- `dist/retro-tui.js` — ESM, **lit external**. For bundler consumers. Lit must stay
  external so the page has one Lit module instance: `sharedStyles` is a Lit
  `CSSResult` meant to be composed into consumers' own components, which breaks
  across two instances.
- `dist/retro-tui.cdn.js` — ESM, **lit bundled**. For `<script type="module">` users
  who have no bundler. ~35 kB gzipped, no import map needed.
- `dist/types/` — TypeScript declarations. `types` must stay **first** in the
  `exports` condition or TS silently falls back to `any`.

`dist/` is committed to git (quiltsketch pins a git tag), so it has to be rebuilt
in the same branch as the source change that invalidates it. `tests/dist-contract.test.ts`
checks bundle *shape* (lit external in the ESM build, lit bundled and no bare
imports in the CDN build, no UMD artifact, components register on load) and one
piece of bundle *content*: the set of dispatched event names in each bundle must
equal the set in `src/components/`. That catches a stale `dist/` only when the
event vocabulary moved — it is not a general "did you rebuild" check, and a change
to markup, styling or props will pass against an old bundle. Rebuild anyway.

### Publishing

Published to npm as `retro-tui`. Releases go to the `next` dist-tag first and are
promoted to `latest` deliberately:

```bash
npm publish --tag next
npm dist-tag add retro-tui@<version> latest   # only when verified
```

### Token System

`src/styles/tokens.css` defines three themes (apply as body class):
- `.theme-terminal-classic` (default) — cyan `#00ffff` primary on near-black, green
  `#00ff00` secondary
- `.theme-vibrant-scifi` — magenta `#ff00ff` primary on deep blue-black, cyan-teal
  `#00ffcc` secondary
- `.theme-home-security-interface` — green `#3fb950` on black with orange `#e8691e`
  alerts and 3px borders. Named for the Unity Systems home-security panel in
  `docs/references/`; `index.html` uses it for the SELECT PROGRAM page.

Verify a colour against `tokens.css` before describing a theme — these three
descriptions were all wrong until 2026-08-16.

Semantic tokens: `--color-primary`, `--color-secondary`, `--color-error`, `--color-warning`, `--color-success`, `--color-info` (+ `-bg`/`-fg` variants), `--surface-base/elevated/overlay`, `--text-primary/muted`, `--spacing-xs/sm/md/lg`, `--font-mono`.

**Semantic colour vocabulary (enforced).** Every component with a `color` attribute
accepts exactly: `primary | secondary | success | warning | error | info | muted | ''`,
defined once in `src/styles/semantics.ts`. Literal colour names (`cyan`, `green`,
`magenta`, `yellow`, `red`) were removed in 4.0.0 — they were inconsistent aliases
that misdescribed themselves under theming. Five components carry the attribute:
`tui-panel`, `tui-stat`, `tui-strip-item`, `tui-statusbar`, `tui-button`. As of
5.0.0 `tui-button` splits the two axes it used to conflate — `variant` is the
treatment (`default | filled | outline | ghost | icon | menu`), `color` is the
semantic accent, and only `filled` and `outline` read `color`; the other four
treatments carry their own colours and ignore it.

`tests/semantic-vocabulary.test.ts` fails if any of the five misses a value or
reintroduces a literal, and as of 5.0.0 also scans `@attr`/`@fires` JSDoc for
retired literal names — documentation drifted out of sync with the CSS in 4.0.0
and nothing caught it. Never add a component-local colour union; import
`SemanticColor`. Full reference: `docs/api/semantic-colors.md`.

**Event naming (enforced).** Every dispatched event is `tui-` prefixed and follows
`tui-<subject>-<verb>`, where the subject names the emitting component
(`tui-panel-toggle`, `tui-console-command`, `tui-workspace-layout-change`). Bare
names collide — `toggle`, `close` and `copy` are real DOM events, and every
retro-tui event is `bubbles: true, composed: true`, so it reaches `document`.

Two shared-protocol exceptions are deliberate, because the whole point is that one
listener serves several components:
- the form protocol — `tui-change` / `tui-input`, dispatched by all five form
  components (`tui-input`, `tui-checkbox`, `tui-radio`, `tui-checkbox-group`,
  `tui-radio-group`)
- `tui-tool-select`, dispatched by both `tui-toolbar` and `tui-tool`

`tests/event-naming.test.ts` fails on an unprefixed name in either a dispatch or an
`@fires` tag, and asserts the dispatched set and the documented set are identical —
so an undocumented event and a typo'd `@fires` both fail. Full reference:
`docs/api/events.md`.

**Control sizing.** `ControlSize` (`sm | md | lg`) is declared once in
`src/styles/semantics.ts` and shared by `tui-button`, `tui-toolbar`, `tui-tool` and
`tui-card`. Never redeclare it locally.

**Picking a component.** `docs/guides/component-selection.md` is the agent-first
guide to choosing between the primitives.

### Out of scope

- Canvas/grid projections/ToolState → `../retro-tui-lab`
- Push server/client → `examples/push-server/` (copy into your project)
- Routing, forms validation, advanced state management → build on top
- Mobile/responsive layouts — terminal UIs target desktop
- Extending the panel workspace (floating/docking) — feature-frozen at current level
