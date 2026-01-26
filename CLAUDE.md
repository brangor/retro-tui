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
```

No tests or linting configured yet.

## Architecture

```
┌──────────────────┐     HTTP POST     ┌──────────────────┐     WebSocket    ┌──────────────────┐
│  Shell/Node      │ ──────────────→   │  Push Server     │ ←──────────────→ │   Browser        │
│  Scripts         │                   │  :3001           │                   │   (Lit UI)       │
└──────────────────┘                   └──────────────────┘                   └──────────────────┘
```

### Key Directories

- `src/components/` - Lit web components (all prefixed `retro-*`)
- `src/utils/ansi.js` - ANSI escape code to HTML converter
- `src/utils/push-client.js` - WebSocket client (`RetroPush` class)
- `src/styles/shared.js` - Shared CSS variables and ANSI color classes
- `server/index.js` - WebSocket push server

### Component Patterns

All components:
- Inherit from `LitElement`
- Use shadow DOM for style isolation
- Import `sharedStyles` from `../styles/shared.js`
- Dispatch custom events with `bubbles: true, composed: true`

Components supporting text output (`retro-output`, `retro-console`, `retro-text`) use `ansiToHtml()` for ANSI color rendering.

### Push Protocol

POST to `http://localhost:3001/push`:
```json
{
  "channel": "build",           // Required: channel name
  "type": "log",                // Optional: log, error, warn, info, clear, status
  "data": "Build succeeded"     // Required: message content
}
```

Helper scripts:
- `./push.sh` - Shell script for sending messages
- `./push.js` - Node module/CLI for sending messages

### Styling System

CSS custom properties defined in `src/styles/shared.js`:
- `--bg`, `--text` - Base colors
- `--cyan`, `--green`, `--yellow`, `--magenta`, `--red` - Accent colors
- `.ansi-*` classes - Map ANSI codes to colors

Design tokens system in progress (see `docs/plans/2026-01-25-design-tokens.md`).
