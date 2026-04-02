# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RetroTUI is a Lit-based web component library that creates terminal-aesthetic UI components with real-time WebSocket-based update capabilities. Components render with dark terminal styling and support ANSI color codes.

## Commands

```bash
npm start          # Run dev server (:3000) + push server (:3001) concurrently
npm run dev        # Dev server only
npm run server     # Push server only
npm run build      # Build library to dist/
npm run build:site # Build GitHub Pages site to site/
npm run typecheck  # TypeScript type checking (tsc --noEmit)
npm test           # Run tests in watch mode (vitest)
npm run test:run   # Run tests once (vitest run)
```

Run a single test file:
```bash
npx vitest run src/components/tui-button.test.ts
```

Tests use Vitest with jsdom environment and `@open-wc/testing` for web component fixtures. Test files live alongside source (`src/**/*.test.{js,ts}`) and in `tests/`.

## Architecture

```
┌──────────────────┐     HTTP POST     ┌──────────────────┐     WebSocket    ┌──────────────────┐
│  Shell/Node      │ ──────────────→   │  Push Server     │ ←──────────────→ │   Browser        │
│  Scripts         │                   │  :3001           │                   │   (Lit UI)       │
└──────────────────┘                   └──────────────────┘                   └──────────────────┘
```

### Key Directories

- `src/components/` - Lit web components (all prefixed `tui-*` in filenames and tag names)
- `src/state/tool-state.ts` - Tool state management using `@lit/context`
- `src/projections/` - Grid projection system (rectangular, isometric, triangular) with registry
- `src/utils/` - ANSI converter, push client, canvas renderer, border utilities
- `src/styles/shared.js` - Shared CSS variables and ANSI color classes
- `server/index.js` - WebSocket push server
- `examples/` - Demo apps (isosketch, quiltsketch, paint)

### Component Patterns

All components:
- Inherit from `LitElement` with shadow DOM
- Use TypeScript with Lit decorators (`@customElement`, `@property`)
- Import `sharedStyles` from `../styles/shared.js`
- Dispatch custom events with `bubbles: true, composed: true`
- Augment global `HTMLElementTagNameMap` for type safety

Components supporting text output (`tui-output`, `tui-console`, `tui-text`) use `ansiToHtml()` for ANSI color rendering.

### Library Entry Point

`src/index.js` re-exports all components organized as:
- **Layout**: App, Workspace, Sidebar
- **Atoms**: Panel, Output, Table, Console, Text, Menu, Statusbar, Modal, Button, Toolbar, Toast, Card, Palette, Canvas
- **State & Projections**: ToolState, projection implementations
- **Utilities**: ansiToHtml, RetroPush, canvas renderer, borders

### Build Output

Vite library mode produces `dist/retro-tui.js` (ESM) and `dist/retro-tui.umd.cjs`. External dependency: `lit`.

### Push Protocol

POST to `http://localhost:3001/push`:
```json
{
  "channel": "build",
  "type": "log",
  "data": "Build succeeded"
}
```

Types: `log`, `error`, `warn`, `info`, `clear`, `status`. Helper scripts: `./push.sh` and `./push.js`.

### Styling System

CSS custom properties defined in `src/styles/shared.js`:
- `--bg`, `--text` - Base colors
- `--cyan`, `--green`, `--yellow`, `--magenta`, `--red` - Accent colors
- `.ansi-*` classes - Map ANSI codes to colors
- `.tui-bold`, `.tui-reverse`, `.tui-blink` - Text attribute utilities
