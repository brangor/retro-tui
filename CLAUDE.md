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
- `src/styles/semantics.ts` — The semantic colour vocabulary (`SemanticColor`, `SEMANTIC_COLORS`) shared by every component with a `color` attribute
- `src/styles/inject-tokens.ts` — Auto-imports tokens.css on library load
- `src/protocol/types.ts` — Type definitions used by component props (no runtime)
- `docs/api/` — Public API contracts: `semantic-colors.md`, `tui-tiled.md`, `distribution.md`
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

`src/index.js` exports:
- **Layout**: App, Workspace, Sidebar
- **Atoms**: Panel, Output, Table, Console, Text, Menu, Statusbar, Modal, Button, Toolbar, Toast, Card, Palette, Link, ActionList, Stat, StatusStrip, Titlebar, Tiled
- **Form**: Input, Checkbox, Radio, CheckboxGroup, RadioGroup
- **Atoms (cont.)**: Progress, Status
- **Utilities**: ansiToHtml, BORDER_CHARS, getBorderChars, titleDecoration, STATE_BORDERS, sharedStyles, parseAreas, SEMANTIC_COLORS, SEMANTIC_TOKENS

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

`dist/` is committed to git (quiltsketch pins a git tag). Rebuild after source
changes or `tests/dist-contract.test.ts` will fail.

### Publishing

Published to npm as `retro-tui`. Releases go to the `next` dist-tag first and are
promoted to `latest` deliberately:

```bash
npm publish --tag next
npm dist-tag add retro-tui@<version> latest   # only when verified
```

### Token System

`src/styles/tokens.css` defines three themes (apply as body class):
- `.theme-terminal-classic` (default) — dark green-on-black
- `.theme-vibrant-scifi` — bright cyan/magenta
- `.theme-home-security-interface` — amber-on-dark

Semantic tokens: `--color-primary`, `--color-secondary`, `--color-error`, `--color-warning`, `--color-success`, `--color-info` (+ `-bg`/`-fg` variants), `--surface-base/elevated/overlay`, `--text-primary/muted`, `--spacing-xs/sm/md/lg`, `--font-mono`.

**Semantic colour vocabulary (enforced).** Every component with a `color` attribute
accepts exactly: `primary | secondary | success | warning | error | info | muted | ''`,
defined once in `src/styles/semantics.ts`. Literal colour names (`cyan`, `green`,
`magenta`, `yellow`, `red`) were removed in 4.0.0 — they were inconsistent aliases
that misdescribed themselves under theming. `tests/semantic-vocabulary.test.ts`
fails if any component misses a value or reintroduces a literal. Never add a
component-local colour union; import `SemanticColor`. Full reference:
`docs/api/semantic-colors.md`.

### Out of scope

- Canvas/grid projections/ToolState → `../retro-tui-lab`
- Push server/client → `examples/push-server/` (copy into your project)
- Routing, forms validation, advanced state management → build on top
- Mobile/responsive layouts — terminal UIs target desktop
- Extending the panel workspace (floating/docking) — feature-frozen at current level
