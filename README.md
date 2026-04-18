# RetroTUI

Terminal-aesthetic UI components for the web with real-time script integration.

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

## Features

- **Lit Web Components** - Works anywhere (React, Vue, plain HTML)
- **Terminal aesthetic** - Dark theme, monospace, box-drawing borders
- **Real-time updates** - Push from shell/node scripts via WebSocket
- **ANSI color support** - Standard terminal colors in web UI
- **Zero-config** - Just import and use
- **Projection system** - Rectangular, isometric, and triangular grid projections
- **Tool state management** - Declarative tool/group state via `@lit/context`

## Quick Start

```bash
cd retro-tui
npm install
npm start
```

This starts:
- Vite dev server at `http://localhost:3000`
- Push server at `http://localhost:3001`

## Push Updates from Scripts

### From shell:

```bash
./push.sh log "Build started..."
./push.sh error "Something went wrong!"
./push.sh --channel=deploy log "Deploying to production"

# Pipe output
npm run build 2>&1 | while read line; do ./push.sh log "$line"; done
```

### From Node:

```javascript
import { push, log } from './push.js';

await log('Build started...');
await push({ channel: 'status', type: 'update', data: { Service: 'API', Status: 'online' } });
```

### From curl:

```bash
curl -X POST http://localhost:3001/push \
  -H "Content-Type: application/json" \
  -d '{"channel":"build","type":"log","data":"Hello from curl!"}'
```

## Components

### `<retro-panel>`

Collapsible panel with header.

```html
<retro-panel title="Output" color="cyan" collapsible>
  Content here
</retro-panel>
```

| Attribute | Type | Description |
|-----------|------|-------------|
| `title` | string | Panel title |
| `color` | string | Border color: cyan, green, magenta, yellow, red |
| `collapsible` | boolean | Enable collapse toggle |
| `collapsed` | boolean | Current collapsed state |

### `<retro-output>`

Scrolling log output with ANSI color support.

```html
<retro-output id="log" max-lines="500" autoscroll timestamps></retro-output>

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

### `<retro-table>`

ASCII-styled data table.

```html
<retro-table id="table"></retro-table>

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

### `<retro-console>`

Interactive command console with history.

```html
<retro-console id="console" prompt="❯ "></retro-console>

<script>
  const console = document.getElementById('console');
  console.addEventListener('command', (e) => {
    console.print(`You typed: ${e.detail}`);
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

### `<retro-text>`

Static text with ANSI color support.

```html
<retro-text>
  \x1b[32m✓\x1b[0m Build successful
  \x1b[33m⚠\x1b[0m 3 warnings
</retro-text>
```

## Push Protocol

Messages are JSON with this structure:

```json
{
  "channel": "build",
  "type": "log",
  "data": "Your message here"
}
```

### Channels

Arbitrary strings. Suggested:
- `build` - Build/compile output
- `status` - Service status updates
- `deploy` - Deployment logs
- `game` - Game state updates

### Types

- `log` - Plain log message
- `error` - Error message (shown in red)
- `warn` - Warning (shown in yellow)
- `info` - Info (shown in cyan)
- `clear` - Clear the output
- `status` - Status update (for tables)

## Architecture

```
┌──────────────┐     HTTP POST     ┌──────────────┐     WebSocket    ┌──────────────┐
│ Shell/Node   │ ───────────────► │ Push Server  │ ◄──────────────► │   Browser    │
│   Scripts    │                   │  :3001       │                   │   (Lit UI)   │
└──────────────┘                   └──────────────┘                   └──────────────┘
```

`<tui-canvas>` supports a `projection` attribute (`rectangular` | `isometric` | `triangular`) for different grid layouts. `ToolState` provides declarative tool management with exclusive/non-exclusive groups via `@lit/context`.

## Examples

- `examples/isosketch.html` - Isometric tile map editor (Diablo-style minimaps)
- `examples/quiltsketch-demo.html` - Triangle quilt pattern designer

Run `npm run dev` and navigate to the example files.

## Roadmap

- [x] Core components (panel, output, table, console)
- [x] Push server with WebSocket
- [x] Shell/Node push scripts
- [x] `<retro-menu>` (menu bar)
- [x] `<retro-toolbar>` (tool buttons)
- [x] Design token system (themeable components)
- [x] Projection system (rectangular, isometric, triangular grids)
- [x] Tool state management (`@lit/context`)
- [ ] `<retro-toolbar>` hotkey support — `getHotkeyMap()` method + `hotkey` attribute on tools for display hints and user-remappable bindings
- [x] `<retro-grid>` (character grid — delivered as `<tui-grid>` with SVG text rendering and pointer events)
- [ ] `<retro-tabs>` (tab container)
- [ ] `<retro-split>` (resizable panes)
- [ ] npm package distribution
- [ ] CDN build for script tag usage

## License

MIT
