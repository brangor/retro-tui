# Event Protocol API Reference

## Message Format

Every message sent to the retro-tui push server follows this shape:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `channel` | string | Yes | Groups messages by app/session |
| `type` | string | Yes | Event type — maps to a component |
| `id` | string | Yes | Identifies a component instance for updates |
| `data` | object | Yes | Type-specific payload |
| `timestamp` | number | No | Auto-populated by server if omitted |

## Event Types

### `log`

Appends text to a `<tui-output>` component.

```json
{
  "channel": "my-app",
  "type": "log",
  "id": "main-log",
  "data": {
    "message": "Build started...",
    "level": "info"
  }
}
```

| Data Field | Type | Required | Description |
|------------|------|----------|-------------|
| `message` | string | Yes | Text to append (ANSI codes supported) |
| `level` | `"info"` \| `"warn"` \| `"error"` | No | Log severity |

### `progress`

Updates a `<tui-progress>` progress bar.

```json
{
  "channel": "my-app",
  "type": "progress",
  "id": "download",
  "data": {
    "value": 0.73,
    "label": "Heart - These Dreams",
    "total": 6,
    "current": 4
  }
}
```

| Data Field | Type | Required | Description |
|------------|------|----------|-------------|
| `value` | number | Yes | Progress 0.0–1.0 |
| `label` | string | No | Display label |
| `total` | number | No | Total item count |
| `current` | number | No | Current item count |

### `table`

Sets or updates data in a `<tui-table>` component.

**Full replacement:**
```json
{
  "channel": "my-app",
  "type": "table",
  "id": "summary",
  "data": {
    "columns": ["Metric", "Value"],
    "rows": [
      { "Metric": "Downloaded", "Value": 6 },
      { "Metric": "Failed", "Value": 0 }
    ]
  }
}
```

**Single row upsert:**
```json
{
  "channel": "my-app",
  "type": "table",
  "id": "summary",
  "data": {
    "key": "Downloaded",
    "row": { "Metric": "Downloaded", "Value": 7 }
  }
}
```

### `status`

Shows a status badge in a `<tui-status>` component.

```json
{
  "channel": "my-app",
  "type": "status",
  "id": "auth",
  "data": {
    "state": "success",
    "message": "Authenticated successfully"
  }
}
```

| Data Field | Type | Required | Description |
|------------|------|----------|-------------|
| `state` | `"success"` \| `"error"` \| `"info"` \| `"warn"` \| `"pending"` | Yes | Status state |
| `message` | string | Yes | Status message |

### `clear`

Resets a component to its empty state.

```json
{ "channel": "my-app", "type": "clear", "id": "main-log", "data": {} }
```

### `dismiss`

Removes a panel from the workspace.

```json
{ "channel": "my-app", "type": "dismiss", "id": "summary", "data": {} }
```

### Custom Types

Any `type` not listed above is routed normally. If a component is registered for the `id`, it receives the event. Otherwise, it renders as a `<tui-output>` with a type badge.

## Emitter Kit

```bash
npm install retro-tui
```

```javascript
import { RetroEmitter } from 'retro-tui/emitter';

const retro = new RetroEmitter({
  channel: 'my-app',
  url: 'http://localhost:3001/push',  // default
});

// Typed helpers
retro.log('main', 'Build started...');
retro.log('main', 'Warning: slow', 'warn');
retro.progress('dl', 0.73, { label: 'Track 4', total: 6, current: 4 });
retro.table('stats', { columns: ['K', 'V'], rows: [{ K: 'a', V: 1 }] });
retro.status('auth', 'success', 'Logged in');
retro.clear('main');
retro.dismiss('stats');

// Custom events
retro.emit('my-type', 'my-id', { custom: 'data' });
```

The emitter is a thin HTTP POST wrapper. You can replace it with `fetch`, `curl`, or any HTTP client.

## Push Server

Start: `node server/index.js` (default port 3001)

- `POST /push` — send an event (JSON body)
- `GET /health` — server status
- `ws://localhost:3001` — WebSocket for browser clients
