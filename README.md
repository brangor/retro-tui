# RetroTUI

Terminal-aesthetic Lit web components and design tokens for building small app UIs in the browser.

```
╔════════════════════════════════════════════════════════════════╗
║  ░░ RETRO-TUI [ TERMINAL UI FOR THE WEB ] ░░                   ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  ┌─ Build Output ─┐    ┌─ Status ─┐    ┌─ Console ─┐           ║
║  │ ✓ Compiled     │    │ API   ●  │    │ > help    │           ║
║  │ ✓ Tests pass   │    │ DB    ●  │    │ > status  │           ║
║  │ ⚠ 3 warnings   │    │ Cache ●  │    │ > _       │           ║
║  └────────────────┘    └──────────┘    └───────────┘           ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

## Scope

Terminal-aesthetic Lit components and tokens for building small app UIs.
**Not** a canvas engine, **not** a realtime system, **not** a window manager.

New additions must be a terminal-aesthetic UI primitive usable across multiple
small apps. If a proposed addition doesn't pass that test, update this section first.

### Out of scope

- **Canvas / grid projections / ToolState / sprites** → [`../retro-tui-lab`](../retro-tui-lab)
- **Push server + client** → [`examples/push-server/`](examples/push-server/) (copy the recipe into your project)
- **Window management** (floating/docking panels) — feature-frozen at the current level
- **Routing, form validation, advanced state management** — build on top
- **Mobile / responsive layouts** — terminal UIs target desktop

## Features

- **Lit Web Components** — work anywhere (React, Vue, plain HTML)
- **Terminal aesthetic** — dark theme, monospace, box-drawing borders
- **ANSI color support** — standard terminal colors in web UI
- **Themeable token system** — three built-in themes, all driven by CSS custom properties
- **Zero runtime server dependency** — import the components and go

## Quick Start

### Using retro-tui in your app

```bash
npm install retro-tui@next
```

**Ask for `@next`.** The `latest` dist-tag still points at 2.2.5, three majors back, so
a bare `npm install retro-tui` installs that instead — silently. A `"^5.0.0"` range in
`package.json` also works, since semver ranges ignore dist-tags.

```javascript
import 'retro-tui';                       // registers all <tui-*> elements + tokens
// or cherry-pick:
import { Panel, Output, Console } from 'retro-tui';
```

No build step? A self-contained build works from a plain script tag:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/retro-tui@5/dist/retro-tui.cdn.js"></script>
```

**Pin the major.** An unversioned CDN URL resolves to the `latest` dist-tag, which
is not always the newest release — and the CDN build only exists from 3.0.0 onward,
so an unpinned URL can 404 outright.

Two builds ship: `retro-tui` for bundlers, `retro-tui/cdn` for a plain script
tag. They are not interchangeable — see [docs/api/distribution.md](docs/api/distribution.md).
Upgrading an existing app? Start at [docs/guides/upgrading.md](docs/guides/upgrading.md).

### Working on retro-tui itself

```bash
npm install
npm run dev        # Vite dev server at http://localhost:3000
```

## Components

All elements are prefixed `tui-*` and register on import.

### `<tui-panel>`

Collapsible panel with header.

```html
<tui-panel title="Output" color="primary" collapsible>
  Content here
</tui-panel>
```

| Attribute | Type | Description |
|-----------|------|-------------|
| `title` | string | Panel title |
| `color` | string | Semantic colour — `primary`, `secondary`, `success`, `warning`, `error`, `info`, `muted` |
| `collapsible` | boolean | Enable collapse toggle |
| `collapsed` | boolean | Current collapsed state |

### `<tui-output>`

Scrolling log output with ANSI color support.

```html
<tui-output id="log" max-lines="500" autoscroll timestamps></tui-output>

<script>
  document.getElementById('log').append('Hello world!');
  document.getElementById('log').append('\x1b[32m✓ Success\x1b[0m');
</script>
```

| Attribute | Type | Description |
|-----------|------|-------------|
| `max-lines` | number | Max lines to keep (default: 500) |
| `autoscroll` | boolean | Auto-scroll on new content |
| `timestamps` | boolean | Show timestamps |

| Method | Description |
|--------|-------------|
| `append(text)` | Add a line (supports ANSI) |
| `clear()` | Clear all output |

### `<tui-table>`

ASCII-styled data table.

```html
<tui-table id="table"></tui-table>

<script>
  const table = document.getElementById('table');
  table.setData(
    ['Name', 'Status', 'Value'],
    [
      { Name: 'CPU', Status: 'OK', Value: '45%' },
      { Name: 'Memory', Status: 'WARN', Value: '89%' },
    ]
  );
</script>
```

| Method | Description |
|--------|-------------|
| `setData(columns, rows)` | Set table data |
| `upsertRow(key, data)` | Add or update a row |

### `<tui-console>`

Interactive command console with history.

```html
<tui-console id="console" prompt="❯ "></tui-console>

<script>
  const el = document.getElementById('console');
  el.addEventListener('tui-console-command', (e) => {
    el.print(`You typed: ${e.detail.command}`);
  });
</script>
```

| Attribute | Type | Description |
|-----------|------|-------------|
| `prompt` | string | Command prompt (default: "> ") |
| `history-size` | number | Max history entries |

| Method | Description |
|--------|-------------|
| `print(text)` | Print output (supports ANSI) |
| `clear()` | Clear console |

### `<tui-text>`

Static text with ANSI color support.

```html
<tui-text>
  \x1b[32m✓\x1b[0m Build successful
  \x1b[33m⚠\x1b[0m 3 warnings
</tui-text>
```

### Full component inventory

- **Layout**: `tui-app`, `tui-workspace`, `tui-sidebar`, `tui-tiled`
- **Atoms**: `tui-panel`, `tui-output`, `tui-table`, `tui-console`, `tui-text`, `tui-menu`, `tui-statusbar`, `tui-modal`, `tui-button`, `tui-toolbar`, `tui-toast`, `tui-card`, `tui-palette`, `tui-link`, `tui-action-list`, `tui-stat`, `tui-status-strip`, `tui-titlebar`, `tui-progress`, `tui-status`
- **Form**: `tui-input`, `tui-checkbox`, `tui-radio`, `tui-checkbox-group`, `tui-radio-group`
- **Utilities**: `ansiToHtml`, `BORDER_CHARS`, `getBorderChars`, `titleDecoration`, `STATE_BORDERS`, `sharedStyles`, `parseAreas`, `SEMANTIC_COLORS`, `SEMANTIC_TOKENS`
- **Types**: `SemanticColor`, `ControlSize`, `SelectionStyle`

> **Upgrading from 2.x or 3.x?** `latest` sat at 2.2.5 for a long time, so most
> existing installs are several majors behind. Start at
> [docs/guides/upgrading.md](docs/guides/upgrading.md).

> Choosing between components: [docs/guides/component-selection.md](docs/guides/component-selection.md).

> Event names and payloads: [docs/api/events.md](docs/api/events.md).

> Components taking a `color` attribute share one vocabulary — `primary`,
> `secondary`, `success`, `warning`, `error`, `info`, `muted`.
> See [docs/api/semantic-colors.md](docs/api/semantic-colors.md).

> `tui-tiled` infers row heights from the layout shape and exposes
> `--tui-tiled-footer-height`. See [docs/api/tui-tiled.md](docs/api/tui-tiled.md).

## Theming

`src/styles/tokens.css` defines three themes (apply as a `<body>` class):

- `.theme-terminal-classic` (default) — dark green-on-black
- `.theme-vibrant-scifi` — bright cyan/magenta
- `.theme-home-security-interface` — amber-on-dark

Components read semantic tokens (`--color-primary`, `--surface-base`, `--text-primary`, `--spacing-*`, `--font-mono`, …), so theming is CSS-only.

## Live dashboards (optional recipe)

RetroTUI has no runtime server dependency. If you want to push updates into a UI
from shell/node scripts over WebSocket, copy the standalone recipe in
[`examples/push-server/`](examples/push-server/) into your project — it includes
the server, client, push scripts, and the JSON protocol shape.

## Architecture

```
┌──────────────────┐  Imports retro-tui components + tokens
│   Browser        │  No runtime server dependency
│   (Lit UI)       │
└──────────────────┘
```

## Roadmap

- [x] Core components (panel, output, table, console)
- [x] `<tui-menu>` (menu bar)
- [x] `<tui-toolbar>` (tool buttons)
- [x] Design token system (themeable components)
- [x] `<tui-grid>` (character grid) — **moved to [retro-tui-lab](../retro-tui-lab)**
- [x] Projection system — **moved to [retro-tui-lab](../retro-tui-lab)**
- [x] Tool state management (`@lit/context`) — **moved to [retro-tui-lab](../retro-tui-lab)**
- [x] Push server + shell/node scripts — **moved to [examples/push-server/](examples/push-server/)**
- [x] npm package distribution — published as `retro-tui`
- [x] CDN build for script-tag usage — `dist/retro-tui.cdn.js`
- [ ] `<tui-toolbar>` hotkey support — `getHotkeyMap()` method + `hotkey` attribute for display hints and remappable bindings
- [ ] `<tui-tabs>` (tab container)
- [ ] `<tui-split>` (resizable panes)

## License

MIT
