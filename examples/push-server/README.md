# Push server recipe

Real-time updates from shell/node scripts into retro-tui components, via a
small WebSocket relay. This is a **recipe, not part of the library** — copy it
into your project and adapt it. The library itself has no realtime coupling.

```
┌──────────────┐    HTTP POST     ┌──────────────┐    WebSocket    ┌──────────────┐
│ Shell/Node   │ ───────────────► │ Push Server  │ ◄─────────────► │   Browser    │
│   Scripts    │                  │  :3001       │                 │   (Lit UI)   │
└──────────────┘                  └──────────────┘                 └──────────────┘
```

## Run it

```bash
node server/index.js          # relay on :3001
# or from the repo root:
npm run server
```

`examples/panels-demo.html` connects to it via `demo.js` when served by the
dev server (`npm run dev`).

## Push from scripts

```bash
./push.sh log "Build started..."
./push.sh error "Something went wrong!"
./push.sh --channel=deploy log "Deploying"

curl -X POST http://localhost:3001/push \
  -H "Content-Type: application/json" \
  -d '{"channel":"build","type":"log","data":"Hello from curl!"}'
```

```javascript
import { push, log } from './push.js';
await log('Build started...');
await push({ channel: 'status', type: 'update', data: { Service: 'API', Status: 'online' } });
```

## Message shape

```json
{ "channel": "build", "type": "log", "data": "Your message here" }
```

Types: `log`, `error`, `warn`, `info`, `clear`, `status`. Channels are
arbitrary strings.

## Files

- `server/index.js` — the WebSocket relay
- `push-client.js` — browser-side client (`retroPush.connect()`, `.on(type, fn)`)
- `push.sh` / `push.js` — script-side senders
- `demo.js` — wires panels-demo components to the relay
- `demo.html` — standalone protocol demo page
- `push.test.js.txt` — old vitest suite for the client (kept for reference;
  referenced a `src/push/` layout that never existed, so it was already broken)
