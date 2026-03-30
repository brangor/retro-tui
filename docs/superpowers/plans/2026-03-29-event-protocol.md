# Event Protocol & Emitter Kit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a structured event protocol, lightweight emitter kit, and EventRouter to retro-tui so consumer apps can send typed events that auto-create and update UI panels.

**Architecture:** The event protocol defines a JSON message format with standard event types (log, progress, table, status) that map to retro-tui components. A Node-side emitter kit provides typed helpers over HTTP POST. A browser-side EventRouter bridges the existing RetroPush WebSocket client to components via a `handleEvent()` contract, with auto-panel creation in the workspace.

**Tech Stack:** TypeScript, Lit 3, Vitest + @open-wc/testing, Node HTTP (fetch)

**Spec:** `docs/superpowers/specs/2026-03-29-event-protocol-design.md`

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `src/protocol/types.ts` | Shared event protocol type definitions |
| `src/protocol/emitter.ts` | Node-side RetroEmitter class (HTTP POST helpers) |
| `src/protocol/event-router.ts` | Browser-side event routing, component lookup, auto-panel creation |
| `src/components/tui-progress.ts` | Progress bar component |
| `src/components/tui-status.ts` | Status badge component |
| `tests/protocol/types.test.ts` | Protocol type validation tests |
| `tests/protocol/emitter.test.ts` | Emitter unit tests |
| `tests/protocol/event-router.test.ts` | EventRouter tests |
| `tests/tui-progress.test.ts` | Progress component tests |
| `tests/tui-status.test.ts` | Status component tests |
| `docs/api/event-protocol.md` | Consumer-facing API reference |
| `docs/guides/porting.md` | Porting guide for existing CLI apps |

### Modified Files
| File | Change |
|------|--------|
| `src/components/tui-output.ts` | Add `handleEvent()` method |
| `src/components/tui-table.ts` | Add `handleEvent()` method |
| `src/components/tui-console.ts` | Add `handleEvent()` method |
| `src/index.js` | Export new modules |
| `server/index.js` | Pass through `id` field in broadcast payload |
| `package.json` | Add `./emitter` export path |

---

## Task 1: Protocol Type Definitions

**Files:**
- Create: `src/protocol/types.ts`
- Test: `tests/protocol/types.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/protocol/types.test.ts
import { describe, it, expect } from 'vitest';
import { validateEvent, type TuiEvent } from '../src/protocol/types.ts';

describe('protocol types', () => {
  it('validates a well-formed event', () => {
    const event: TuiEvent = {
      channel: 'my-app',
      type: 'log',
      id: 'main-log',
      data: { message: 'Hello world' },
    };
    expect(validateEvent(event)).toBe(true);
  });

  it('rejects event missing channel', () => {
    const event = { type: 'log', id: 'x', data: {} };
    expect(validateEvent(event as TuiEvent)).toBe(false);
  });

  it('rejects event missing type', () => {
    const event = { channel: 'x', id: 'x', data: {} };
    expect(validateEvent(event as TuiEvent)).toBe(false);
  });

  it('rejects event missing id', () => {
    const event = { channel: 'x', type: 'log', data: {} };
    expect(validateEvent(event as TuiEvent)).toBe(false);
  });

  it('rejects event missing data', () => {
    const event = { channel: 'x', type: 'log', id: 'x' };
    expect(validateEvent(event as TuiEvent)).toBe(false);
  });

  it('accepts custom event types', () => {
    const event: TuiEvent = {
      channel: 'my-app',
      type: 'canvas-draw',
      id: 'sketch-1',
      data: { x: 10, y: 20 },
    };
    expect(validateEvent(event)).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/protocol/types.test.ts`
Expected: FAIL — cannot resolve `../src/protocol/types.ts`

- [ ] **Step 3: Write the implementation**

```typescript
// src/protocol/types.ts

// ═══════════════════════════════════════════════════════════════════════════════
// STANDARD EVENT TYPES
// ═══════════════════════════════════════════════════════════════════════════════

/** Standard event types that map to retro-tui components */
export type StandardEventType =
  | 'log'
  | 'progress'
  | 'table'
  | 'status'
  | 'prompt'
  | 'clear'
  | 'dismiss';

// ═══════════════════════════════════════════════════════════════════════════════
// EVENT PAYLOAD SHAPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface LogData {
  message: string;
  level?: 'info' | 'warn' | 'error';
}

export interface ProgressData {
  value: number;
  label?: string;
  total?: number;
  current?: number;
}

export interface TableData {
  columns: string[];
  rows: Record<string, unknown>[];
}

export interface TableUpsertData {
  key: string;
  row: Record<string, unknown>;
}

export interface StatusData {
  state: 'success' | 'error' | 'info' | 'warn' | 'pending';
  message: string;
}

export interface PromptData {
  message: string;
  options?: string[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// EVENT ENVELOPE
// ═══════════════════════════════════════════════════════════════════════════════

/** The protocol event envelope — every message follows this shape */
export interface TuiEvent {
  channel: string;
  type: string;
  id: string;
  data: Record<string, unknown>;
  timestamp?: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// VALIDATION
// ═══════════════════════════════════════════════════════════════════════════════

/** Validates that an object has the required event envelope fields */
export function validateEvent(event: TuiEvent): boolean {
  return (
    typeof event.channel === 'string' && event.channel.length > 0 &&
    typeof event.type === 'string' && event.type.length > 0 &&
    typeof event.id === 'string' && event.id.length > 0 &&
    event.data != null && typeof event.data === 'object'
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/protocol/types.test.ts`
Expected: PASS — all 6 tests green

- [ ] **Step 5: Commit**

```bash
git add src/protocol/types.ts tests/protocol/types.test.ts
git commit -m "feat(protocol): add event type definitions and validation"
```

---

## Task 2: Emitter Kit

**Files:**
- Create: `src/protocol/emitter.ts`
- Test: `tests/protocol/emitter.test.ts`
- Modify: `package.json` (add export)

- [ ] **Step 1: Write the failing test**

```typescript
// tests/protocol/emitter.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RetroEmitter } from '../src/protocol/emitter.ts';

// Mock global fetch
const mockFetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ ok: true, delivered: 1 }),
});
vi.stubGlobal('fetch', mockFetch);

describe('RetroEmitter', () => {
  let emitter: RetroEmitter;

  beforeEach(() => {
    mockFetch.mockClear();
    emitter = new RetroEmitter({ channel: 'test-app' });
  });

  it('sends a log event', async () => {
    await emitter.log('main', 'Hello world');
    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toBe('http://localhost:3001/push');
    const body = JSON.parse(options.body);
    expect(body).toEqual({
      channel: 'test-app',
      type: 'log',
      id: 'main',
      data: { message: 'Hello world' },
    });
  });

  it('sends a log event with level', async () => {
    await emitter.log('main', 'Oops', 'error');
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.data).toEqual({ message: 'Oops', level: 'error' });
  });

  it('sends a progress event', async () => {
    await emitter.progress('track-1', 0.5, { label: 'Song', total: 10, current: 5 });
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body).toEqual({
      channel: 'test-app',
      type: 'progress',
      id: 'track-1',
      data: { value: 0.5, label: 'Song', total: 10, current: 5 },
    });
  });

  it('sends a progress event with minimal data', async () => {
    await emitter.progress('dl', 0.75);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.data).toEqual({ value: 0.75 });
  });

  it('sends a table event', async () => {
    const columns = ['Name', 'Status'];
    const rows = [{ Name: 'A', Status: 'OK' }];
    await emitter.table('summary', { columns, rows });
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.data).toEqual({ columns, rows });
  });

  it('sends a status event', async () => {
    await emitter.status('auth', 'success', 'Logged in');
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.data).toEqual({ state: 'success', message: 'Logged in' });
  });

  it('sends a clear event', async () => {
    await emitter.clear('main');
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body).toEqual({
      channel: 'test-app',
      type: 'clear',
      id: 'main',
      data: {},
    });
  });

  it('sends a dismiss event', async () => {
    await emitter.dismiss('summary');
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.type).toBe('dismiss');
    expect(body.id).toBe('summary');
  });

  it('sends a custom event via emit()', async () => {
    await emitter.emit('canvas-draw', 'sketch-1', { x: 10, y: 20 });
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body).toEqual({
      channel: 'test-app',
      type: 'canvas-draw',
      id: 'sketch-1',
      data: { x: 10, y: 20 },
    });
  });

  it('uses custom URL when provided', async () => {
    const custom = new RetroEmitter({ channel: 'x', url: 'http://example.com/push' });
    await custom.log('id', 'hi');
    expect(mockFetch.mock.calls[0][0]).toBe('http://example.com/push');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/protocol/emitter.test.ts`
Expected: FAIL — cannot resolve `../src/protocol/emitter.ts`

- [ ] **Step 3: Write the implementation**

```typescript
// src/protocol/emitter.ts
import type { TuiEvent, LogData, ProgressData, TableData, StatusData } from './types.ts';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface EmitterOptions {
  channel: string;
  url?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// EMITTER
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * RetroEmitter — lightweight HTTP client for sending events to the push server.
 *
 * Fire-and-forget. No state. No WebSocket. Just POSTs JSON.
 */
export class RetroEmitter {
  private channel: string;
  private url: string;

  constructor(options: EmitterOptions) {
    this.channel = options.channel;
    this.url = options.url ?? 'http://localhost:3001/push';
  }

  /** Send a log event */
  async log(id: string, message: string, level?: LogData['level']): Promise<void> {
    const data: LogData = { message };
    if (level) data.level = level;
    await this.emit('log', id, data);
  }

  /** Send a progress event */
  async progress(
    id: string,
    value: number,
    opts?: { label?: string; total?: number; current?: number },
  ): Promise<void> {
    const data: ProgressData = { value, ...opts };
    await this.emit('progress', id, data);
  }

  /** Send a table event (full replacement) */
  async table(id: string, data: TableData): Promise<void> {
    await this.emit('table', id, data);
  }

  /** Send a status event */
  async status(id: string, state: StatusData['state'], message: string): Promise<void> {
    await this.emit('status', id, { state, message });
  }

  /** Clear a component by id */
  async clear(id: string): Promise<void> {
    await this.emit('clear', id, {});
  }

  /** Dismiss (remove) a panel by id */
  async dismiss(id: string): Promise<void> {
    await this.emit('dismiss', id, {});
  }

  /** Send a custom event — escape hatch for types not in the standard vocabulary */
  async emit(type: string, id: string, data: Record<string, unknown>): Promise<void> {
    const event: TuiEvent = {
      channel: this.channel,
      type,
      id,
      data,
    };

    await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/protocol/emitter.test.ts`
Expected: PASS — all 10 tests green

- [ ] **Step 5: Commit**

```bash
git add src/protocol/emitter.ts tests/protocol/emitter.test.ts
git commit -m "feat(protocol): add RetroEmitter with typed helpers"
```

---

## Task 3: Server — Pass Through `id` Field

**Files:**
- Modify: `server/index.js:70-76`

- [ ] **Step 1: Update the broadcast payload to include `id`**

In `server/index.js`, the broadcast payload construction (around line 71) currently passes `channel`, `type`, `data`, and `timestamp`. Add `id`:

```javascript
// Replace the existing payload construction:
const payload = JSON.stringify({
  channel: message.channel,
  type: message.type || 'message',
  id: message.id || null,
  data: message.data,
  timestamp: Date.now(),
});
```

- [ ] **Step 2: Verify the server starts**

Run: `node server/index.js &` then `curl -s http://localhost:3001/health | head -1`
Expected: `{"status":"ok",...}`

Kill the server after verifying.

- [ ] **Step 3: Commit**

```bash
git add server/index.js
git commit -m "feat(server): pass through id field in broadcast payload"
```

---

## Task 4: tui-progress Component

**Files:**
- Create: `src/components/tui-progress.ts`
- Test: `tests/tui-progress.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/tui-progress.test.ts
import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-progress.ts';

describe('tui-progress', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-progress></tui-progress>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
  });

  it('renders a progress bar', async () => {
    const el = await fixture(html`<tui-progress value="0.5"></tui-progress>`);
    const bar = el.shadowRoot.querySelector('.bar-fill');
    expect(bar).to.exist;
    expect(bar.style.width).to.equal('50%');
  });

  it('shows label when set', async () => {
    const el = await fixture(html`<tui-progress value="0.3" label="Downloading..."></tui-progress>`);
    const label = el.shadowRoot.querySelector('.label');
    expect(label).to.exist;
    expect(label.textContent).to.contain('Downloading...');
  });

  it('shows count when total and current are set', async () => {
    const el = await fixture(html`<tui-progress value="0.5" total="10" current="5"></tui-progress>`);
    const count = el.shadowRoot.querySelector('.count');
    expect(count).to.exist;
    expect(count.textContent).to.contain('5/10');
  });

  it('shows percentage text', async () => {
    const el = await fixture(html`<tui-progress value="0.73"></tui-progress>`);
    const pct = el.shadowRoot.querySelector('.percentage');
    expect(pct).to.exist;
    expect(pct.textContent).to.contain('73%');
  });

  it('clamps value between 0 and 1', async () => {
    const el = await fixture(html`<tui-progress value="1.5"></tui-progress>`);
    const bar = el.shadowRoot.querySelector('.bar-fill');
    expect(bar.style.width).to.equal('100%');
  });

  it('handles handleEvent for progress type', async () => {
    const el = await fixture(html`<tui-progress></tui-progress>`);
    el.handleEvent({
      channel: 'test', type: 'progress', id: 'x',
      data: { value: 0.6, label: 'Test', total: 10, current: 6 },
    });
    await el.updateComplete;
    expect(el.value).to.equal(0.6);
    expect(el.label).to.equal('Test');
    const bar = el.shadowRoot.querySelector('.bar-fill');
    expect(bar.style.width).to.equal('60%');
  });

  it('handles handleEvent for clear type', async () => {
    const el = await fixture(html`<tui-progress value="0.5" label="Test"></tui-progress>`);
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    expect(el.value).to.equal(0);
    expect(el.label).to.equal('');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/tui-progress.test.ts`
Expected: FAIL — cannot resolve `../src/components/tui-progress.ts`

- [ ] **Step 3: Write the implementation**

```typescript
// src/components/tui-progress.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { TuiEvent, ProgressData } from '../protocol/types.ts';

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-progress> - Terminal-styled progress bar
 *
 * @attr {number} value - Progress value between 0 and 1
 * @attr {string} label - Optional label text
 * @attr {number} total - Optional total count
 * @attr {number} current - Optional current count
 *
 * @method handleEvent(event) - Accept a protocol event
 */
@customElement('tui-progress')
export class Progress extends LitElement {
  @property({ type: Number })
  value = 0;

  @property({ type: String })
  label = '';

  @property({ type: Number })
  total = 0;

  @property({ type: Number })
  current = 0;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      .progress {
        padding: var(--spacing-sm);
        font-size: 0.8rem;
      }

      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--spacing-xs);
        color: var(--text-primary);
      }

      .label {
        color: var(--text-primary);
      }

      .stats {
        display: flex;
        gap: var(--spacing-sm);
        color: var(--text-muted);
      }

      .bar-track {
        height: 12px;
        background: var(--surface-base);
        border: var(--border-width) solid var(--border-default);
        overflow: hidden;
      }

      .bar-fill {
        height: 100%;
        background: var(--color-primary);
        transition: width 0.2s ease;
      }
    `,
  ];

  /** Accept a protocol event */
  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this.value = 0;
      this.label = '';
      this.total = 0;
      this.current = 0;
      return;
    }
    const data = event.data as unknown as ProgressData;
    if (data.value != null) this.value = data.value;
    if (data.label != null) this.label = data.label;
    if (data.total != null) this.total = data.total;
    if (data.current != null) this.current = data.current;
  }

  private get _clampedValue(): number {
    return Math.max(0, Math.min(1, this.value));
  }

  render() {
    const pct = Math.round(this._clampedValue * 100);
    return html`
      <div class="progress">
        <div class="header">
          ${this.label ? html`<span class="label">${this.label}</span>` : ''}
          <span class="stats">
            ${this.total > 0 ? html`<span class="count">${this.current}/${this.total}</span>` : ''}
            <span class="percentage">${pct}%</span>
          </span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-progress': Progress;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/tui-progress.test.ts`
Expected: PASS — all 8 tests green

- [ ] **Step 5: Commit**

```bash
git add src/components/tui-progress.ts tests/tui-progress.test.ts
git commit -m "feat: add tui-progress component with handleEvent support"
```

---

## Task 5: tui-status Component

**Files:**
- Create: `src/components/tui-status.ts`
- Test: `tests/tui-status.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/tui-status.test.ts
import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-status.ts';

describe('tui-status', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-status></tui-status>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
  });

  it('renders state and message', async () => {
    const el = await fixture(html`<tui-status state="success" message="Done"></tui-status>`);
    const badge = el.shadowRoot.querySelector('.badge');
    expect(badge).to.exist;
    expect(badge.classList.contains('success')).to.be.true;
    const msg = el.shadowRoot.querySelector('.message');
    expect(msg.textContent).to.contain('Done');
  });

  it('renders different states with correct classes', async () => {
    for (const state of ['success', 'error', 'info', 'warn', 'pending']) {
      const el = await fixture(html`<tui-status state="${state}" message="test"></tui-status>`);
      const badge = el.shadowRoot.querySelector('.badge');
      expect(badge.classList.contains(state)).to.be.true;
    }
  });

  it('shows indicator symbol per state', async () => {
    const el = await fixture(html`<tui-status state="success" message="OK"></tui-status>`);
    const indicator = el.shadowRoot.querySelector('.indicator');
    expect(indicator).to.exist;
    expect(indicator.textContent.trim()).to.equal('✓');
  });

  it('handles handleEvent for status type', async () => {
    const el = await fixture(html`<tui-status></tui-status>`);
    el.handleEvent({
      channel: 'test', type: 'status', id: 'x',
      data: { state: 'error', message: 'Failed' },
    });
    await el.updateComplete;
    expect(el.state).to.equal('error');
    expect(el.message).to.equal('Failed');
    const badge = el.shadowRoot.querySelector('.badge');
    expect(badge.classList.contains('error')).to.be.true;
  });

  it('handles handleEvent for clear type', async () => {
    const el = await fixture(html`<tui-status state="success" message="OK"></tui-status>`);
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    expect(el.state).to.equal('');
    expect(el.message).to.equal('');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/tui-status.test.ts`
Expected: FAIL — cannot resolve `../src/components/tui-status.ts`

- [ ] **Step 3: Write the implementation**

```typescript
// src/components/tui-status.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { TuiEvent, StatusData } from '../protocol/types.ts';

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const INDICATORS: Record<string, string> = {
  success: '✓',
  error: '✗',
  warn: '⚠',
  info: 'ℹ',
  pending: '…',
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-status> - Status badge with state indicator
 *
 * @attr {string} state - Status state: success | error | info | warn | pending
 * @attr {string} message - Status message text
 *
 * @method handleEvent(event) - Accept a protocol event
 */
@customElement('tui-status')
export class Status extends LitElement {
  @property({ type: String })
  state = '';

  @property({ type: String })
  message = '';

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      .badge {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-sm);
        font-size: 0.8rem;
        border-left: 3px solid transparent;
      }

      .badge.success {
        border-left-color: var(--color-success);
        color: var(--color-success);
      }

      .badge.error {
        border-left-color: var(--color-error);
        color: var(--color-error);
      }

      .badge.warn {
        border-left-color: var(--color-info);
        color: var(--color-info);
      }

      .badge.info {
        border-left-color: var(--color-primary);
        color: var(--color-primary);
      }

      .badge.pending {
        border-left-color: var(--text-muted);
        color: var(--text-muted);
      }

      .indicator {
        flex-shrink: 0;
      }

      .message {
        color: var(--text-primary);
      }

      .empty {
        color: var(--text-muted);
        font-style: italic;
        padding: var(--spacing-sm);
      }
    `,
  ];

  /** Accept a protocol event */
  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this.state = '';
      this.message = '';
      return;
    }
    const data = event.data as unknown as StatusData;
    if (data.state != null) this.state = data.state;
    if (data.message != null) this.message = data.message;
  }

  render() {
    if (!this.state) {
      return html`<div class="empty">No status</div>`;
    }
    return html`
      <div class="badge ${this.state}">
        <span class="indicator">${INDICATORS[this.state] ?? ''}</span>
        <span class="message">${this.message}</span>
      </div>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-status': Status;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/tui-status.test.ts`
Expected: PASS — all 6 tests green

- [ ] **Step 5: Commit**

```bash
git add src/components/tui-status.ts tests/tui-status.test.ts
git commit -m "feat: add tui-status component with handleEvent support"
```

---

## Task 6: handleEvent on Existing Components

**Files:**
- Modify: `src/components/tui-output.ts`
- Modify: `src/components/tui-table.ts`
- Modify: `src/components/tui-console.ts`
- Test: `tests/tui-output.test.js` (extend)
- Test: `tests/tui-table.test.js` (extend)
- Test: `tests/tui-console.test.js` (extend)

- [ ] **Step 1: Write failing tests for tui-output handleEvent**

Add to `tests/tui-output.test.js`:

```javascript
it('handles log event via handleEvent', async () => {
  const el = await fixture(html`<tui-output></tui-output>`);
  el.handleEvent({
    channel: 'test', type: 'log', id: 'x',
    data: { message: 'Hello from protocol' },
  });
  await el.updateComplete;
  const lines = el.shadowRoot.querySelectorAll('.line');
  expect(lines.length).to.equal(1);
  expect(lines[0].textContent).to.contain('Hello from protocol');
});

it('handles log event with level', async () => {
  const el = await fixture(html`<tui-output></tui-output>`);
  el.handleEvent({
    channel: 'test', type: 'log', id: 'x',
    data: { message: 'Warning!', level: 'warn' },
  });
  await el.updateComplete;
  const lines = el.shadowRoot.querySelectorAll('.line');
  expect(lines.length).to.equal(1);
});

it('handles clear event via handleEvent', async () => {
  const el = await fixture(html`<tui-output></tui-output>`);
  el.append('line 1');
  el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
  await el.updateComplete;
  const lines = el.shadowRoot.querySelectorAll('.line');
  expect(lines.length).to.equal(0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/tui-output.test.js`
Expected: FAIL — `el.handleEvent is not a function`

- [ ] **Step 3: Add handleEvent to tui-output**

Add the following import at the top of `src/components/tui-output.ts`:

```typescript
import type { TuiEvent, LogData } from '../protocol/types.ts';
```

Add this method to the `Output` class, after the `clear()` method:

```typescript
  /** Accept a protocol event */
  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this.clear();
      return;
    }
    const data = event.data as unknown as LogData;
    if (data.message != null) {
      this.append(data.message);
    }
  }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/tui-output.test.js`
Expected: PASS — all 7 tests green

- [ ] **Step 5: Write failing tests for tui-table handleEvent**

Add to `tests/tui-table.test.js`:

```javascript
it('handles table event via handleEvent (full data)', async () => {
  const el = await fixture(html`<tui-table></tui-table>`);
  el.handleEvent({
    channel: 'test', type: 'table', id: 'x',
    data: { columns: ['Name', 'Score'], rows: [{ Name: 'Alice', Score: 100 }] },
  });
  await el.updateComplete;
  const header = el.shadowRoot.querySelector('.header');
  expect(header).to.exist;
  const cells = el.shadowRoot.querySelectorAll('.row:not(.header) .cell');
  expect(cells.length).to.equal(2);
  expect(cells[0].textContent).to.contain('Alice');
});

it('handles table event via handleEvent (upsert)', async () => {
  const el = await fixture(html`<tui-table></tui-table>`);
  el.setData(['Name', 'Score'], [{ Name: 'Alice', Score: 100 }]);
  el.handleEvent({
    channel: 'test', type: 'table', id: 'x',
    data: { key: 'Bob', row: { Name: 'Bob', Score: 200 } },
  });
  await el.updateComplete;
  const rows = el.shadowRoot.querySelectorAll('.row:not(.header)');
  expect(rows.length).to.equal(2);
});

it('handles clear event via handleEvent', async () => {
  const el = await fixture(html`<tui-table></tui-table>`);
  el.setData(['Name'], [{ Name: 'Alice' }]);
  el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
  await el.updateComplete;
  const empty = el.shadowRoot.querySelector('.empty');
  expect(empty).to.exist;
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run tests/tui-table.test.js`
Expected: FAIL — `el.handleEvent is not a function`

- [ ] **Step 7: Add handleEvent to tui-table**

Add the following import at the top of `src/components/tui-table.ts`:

```typescript
import type { TuiEvent, TableData, TableUpsertData } from '../protocol/types.ts';
```

Add this method to the `Table` class, after the `upsertRow()` method:

```typescript
  /** Accept a protocol event */
  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this._columns = [];
      this._rows = [];
      return;
    }
    const data = event.data as Record<string, unknown>;
    if ('columns' in data && 'rows' in data) {
      const tableData = data as unknown as TableData;
      this.setData(tableData.columns, tableData.rows);
    } else if ('key' in data && 'row' in data) {
      const upsert = data as unknown as TableUpsertData;
      this.upsertRow(upsert.key, upsert.row);
    }
  }
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run tests/tui-table.test.js`
Expected: PASS — all 7 tests green

- [ ] **Step 9: Write failing tests for tui-console handleEvent**

Add to `tests/tui-console.test.js` (read the file first to see existing tests):

```javascript
it('handles log event via handleEvent', async () => {
  const el = await fixture(html`<tui-console></tui-console>`);
  el.handleEvent({
    channel: 'test', type: 'log', id: 'x',
    data: { message: 'Server output' },
  });
  await el.updateComplete;
  const lines = el.shadowRoot.querySelectorAll('.line');
  expect(lines.length).to.equal(1);
  expect(lines[0].textContent).to.contain('Server output');
});

it('handles clear event via handleEvent', async () => {
  const el = await fixture(html`<tui-console></tui-console>`);
  el.print('something');
  el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
  await el.updateComplete;
  const lines = el.shadowRoot.querySelectorAll('.line');
  expect(lines.length).to.equal(0);
});
```

- [ ] **Step 10: Run test to verify it fails**

Run: `npx vitest run tests/tui-console.test.js`
Expected: FAIL — `el.handleEvent is not a function`

- [ ] **Step 11: Add handleEvent to tui-console**

Add the following import at the top of `src/components/tui-console.ts`:

```typescript
import type { TuiEvent, LogData } from '../protocol/types.ts';
```

Add this method to the `Console` class, after the `clear()` method:

```typescript
  /** Accept a protocol event */
  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this.clear();
      return;
    }
    const data = event.data as unknown as LogData;
    if (data.message != null) {
      this.print(data.message);
    }
  }
```

- [ ] **Step 12: Run test to verify it passes**

Run: `npx vitest run tests/tui-console.test.js`
Expected: PASS — all tests green

- [ ] **Step 13: Run full test suite**

Run: `npx vitest run`
Expected: All tests pass

- [ ] **Step 14: Commit**

```bash
git add src/components/tui-output.ts src/components/tui-table.ts src/components/tui-console.ts \
  tests/tui-output.test.js tests/tui-table.test.js tests/tui-console.test.js
git commit -m "feat: add handleEvent to output, table, and console components"
```

---

## Task 7: EventRouter

**Files:**
- Create: `src/protocol/event-router.ts`
- Test: `tests/protocol/event-router.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/protocol/event-router.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EventRouter } from '../src/protocol/event-router.ts';
import type { TuiEvent } from '../src/protocol/types.ts';

// Minimal mock component
function mockComponent() {
  return { handleEvent: vi.fn() };
}

describe('EventRouter', () => {
  let router: EventRouter;

  beforeEach(() => {
    router = new EventRouter();
  });

  it('routes an event to a registered component', () => {
    const comp = mockComponent();
    router.register('log-1', comp as any);
    const event: TuiEvent = { channel: 'app', type: 'log', id: 'log-1', data: { message: 'hi' } };
    router.route(event);
    expect(comp.handleEvent).toHaveBeenCalledWith(event);
  });

  it('does not throw for unregistered id', () => {
    const event: TuiEvent = { channel: 'app', type: 'log', id: 'unknown', data: { message: 'hi' } };
    expect(() => router.route(event)).not.toThrow();
  });

  it('calls onCreate callback for unregistered id', () => {
    const onCreate = vi.fn().mockReturnValue(mockComponent());
    router = new EventRouter({ onCreate });
    const event: TuiEvent = { channel: 'app', type: 'log', id: 'new-1', data: { message: 'hi' } };
    router.route(event);
    expect(onCreate).toHaveBeenCalledWith(event);
  });

  it('auto-registers component returned from onCreate', () => {
    const comp = mockComponent();
    const onCreate = vi.fn().mockReturnValue(comp);
    router = new EventRouter({ onCreate });
    const event: TuiEvent = { channel: 'app', type: 'log', id: 'new-1', data: { message: 'hi' } };
    router.route(event);
    expect(comp.handleEvent).toHaveBeenCalledWith(event);

    // Route a second event to the same id — should hit the same component, not call onCreate again
    const event2: TuiEvent = { channel: 'app', type: 'log', id: 'new-1', data: { message: 'hi again' } };
    router.route(event2);
    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(comp.handleEvent).toHaveBeenCalledTimes(2);
  });

  it('handles dismiss by unregistering the component', () => {
    const comp = mockComponent();
    router.register('panel-1', comp as any);
    const event: TuiEvent = { channel: 'app', type: 'dismiss', id: 'panel-1', data: {} };
    router.route(event);
    expect(comp.handleEvent).toHaveBeenCalledWith(event);
    expect(router.has('panel-1')).toBe(false);
  });

  it('unregister removes a component', () => {
    const comp = mockComponent();
    router.register('x', comp as any);
    expect(router.has('x')).toBe(true);
    router.unregister('x');
    expect(router.has('x')).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/protocol/event-router.test.ts`
Expected: FAIL — cannot resolve `../src/protocol/event-router.ts`

- [ ] **Step 3: Write the implementation**

```typescript
// src/protocol/event-router.ts
import type { TuiEvent } from './types.ts';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

/** Any element that can receive protocol events */
export interface TuiEventReceiver {
  handleEvent(event: TuiEvent): void;
}

export interface EventRouterOptions {
  /**
   * Called when an event arrives for an unregistered id.
   * Return a component to auto-register it, or null to ignore.
   */
  onCreate?: (event: TuiEvent) => TuiEventReceiver | null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROUTER
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * EventRouter — maps event ids to components and dispatches protocol events.
 *
 * Sits between RetroPush and the component tree. When an event arrives:
 * 1. Look up the component by event.id
 * 2. If found, call component.handleEvent(event)
 * 3. If not found and onCreate is set, call onCreate to create a component
 * 4. If event type is 'dismiss', unregister the component after delivery
 */
export class EventRouter {
  private components = new Map<string, TuiEventReceiver>();
  private onCreate: EventRouterOptions['onCreate'];

  constructor(options: EventRouterOptions = {}) {
    this.onCreate = options.onCreate;
  }

  /** Register a component for an id */
  register(id: string, component: TuiEventReceiver): void {
    this.components.set(id, component);
  }

  /** Unregister a component */
  unregister(id: string): void {
    this.components.delete(id);
  }

  /** Check if a component is registered for an id */
  has(id: string): boolean {
    return this.components.has(id);
  }

  /** Route a protocol event to the appropriate component */
  route(event: TuiEvent): void {
    let component = this.components.get(event.id);

    // Auto-create if not found
    if (!component && this.onCreate) {
      const created = this.onCreate(event);
      if (created) {
        this.register(event.id, created);
        component = created;
      }
    }

    if (!component) return;

    component.handleEvent(event);

    // Clean up on dismiss
    if (event.type === 'dismiss') {
      this.unregister(event.id);
    }
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/protocol/event-router.test.ts`
Expected: PASS — all 6 tests green

- [ ] **Step 5: Commit**

```bash
git add src/protocol/event-router.ts tests/protocol/event-router.test.ts
git commit -m "feat(protocol): add EventRouter for dispatching events to components"
```

---

## Task 8: Library Exports

**Files:**
- Modify: `src/index.js`
- Modify: `package.json`

- [ ] **Step 1: Add protocol exports to src/index.js**

Add the following at the end of `src/index.js`:

```javascript
// Protocol
export { validateEvent } from './protocol/types.ts';
export { RetroEmitter } from './protocol/emitter.ts';
export { EventRouter } from './protocol/event-router.ts';

// New components
export { Progress } from './components/tui-progress.ts';
export { Status } from './components/tui-status.ts';
```

- [ ] **Step 2: Add emitter export path to package.json**

Add a new export path in the `"exports"` field of `package.json`:

```json
"exports": {
  ".": {
    "import": "./dist/retro-tui.js"
  },
  "./emitter": {
    "import": "./src/protocol/emitter.ts"
  },
  "./src/*": "./src/*"
}
```

- [ ] **Step 3: Verify build works**

Run: `npm run build`
Expected: Build completes without errors

- [ ] **Step 4: Run full test suite**

Run: `npx vitest run`
Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add src/index.js package.json
git commit -m "feat: export protocol modules and new components"
```

---

## Task 9: API Reference Document

**Files:**
- Create: `docs/api/event-protocol.md`

- [ ] **Step 1: Write the API reference**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add docs/api/event-protocol.md
git commit -m "docs: add event protocol API reference"
```

---

## Task 10: Porting Guide

**Files:**
- Create: `docs/guides/porting.md`

- [ ] **Step 1: Write the porting guide**

```markdown
# Porting CLI Apps to Retro-TUI

A recipe for connecting existing Node CLI applications to retro-tui's event protocol.

## The Pattern

Your app's business logic emits structured events. The CLI prints them. Retro-tui renders them. Both consume the same event stream — the business logic doesn't know or care who's listening.

```
┌──────────────┐     events     ┌──────────────┐
│  App Logic   │ ────────────→  │  CLI Output   │  (console.log)
│              │ ────────────→  │  Retro-TUI    │  (emitter POST)
└──────────────┘                └──────────────┘
```

## Step-by-Step

### 1. Audit Your Output

Find every `console.log`, `console.error`, `console.warn`, and `process.stdout.write` in your app. List them.

### 2. Categorize

For each output call, ask: what kind of information is this?

| Category | Event Type | Example |
|----------|-----------|---------|
| Running commentary | `log` | "Authenticating...", "Fetching playlist..." |
| Progress updates | `progress` | "[3/6] Downloading...", progress bars |
| Success/failure | `status` | "Authenticated successfully", "Build failed" |
| Structured results | `table` | Summary tables, lists of results |
| User prompts | `prompt` | "Enter URL:", "Continue? (y/n)" |

### 3. Assign IDs

Group related output into logical components. Each group gets a stable `id`:

- All auth messages → `id: "auth"`
- Per-track download progress → `id: "track-1"`, `id: "track-2"`, etc.
- Summary table → `id: "summary"`

### 4. Add the Emitter

```bash
npm install retro-tui
```

```javascript
import { RetroEmitter } from 'retro-tui/emitter';

const retro = new RetroEmitter({ channel: 'my-app' });
```

### 5. Replace Output Calls

**Before:**
```javascript
console.log('Authenticating with Spotify...');
```

**After:**
```javascript
console.log('Authenticating with Spotify...');  // keep CLI output
retro.log('auth', 'Authenticating with Spotify...');
```

The emitter is fire-and-forget. If the push server isn't running, the POST silently fails and your CLI works normally.

### 6. Run Both

Terminal 1: `node server/index.js`
Terminal 2: Open retro-tui in browser
Terminal 3: Run your app

Events appear as panels in the retro-tui workspace.

## Example: Spotify Downloader

| Current CLI output | Event call |
|---|---|
| `Authenticating with Spotify...` | `retro.log('auth', 'Authenticating with Spotify...')` |
| `Authenticated successfully.` | `retro.status('auth', 'success', 'Authenticated')` |
| `Fetched "These Dreams": 6 tracks` | `retro.status('fetch', 'success', 'Fetched "These Dreams": 6 tracks')` |
| `[1/6] Downloading: Heart - These Dreams` | `retro.progress('download', 1/6, { label: 'Heart - These Dreams', total: 6, current: 1 })` |
| `OK: .../Heart - These Dreams.mp3` | `retro.log('results', 'OK: Heart - These Dreams.mp3')` |
| `TAGGED: Heart - These Dreams.mp3` | `retro.log('tagging', 'TAGGED: Heart - These Dreams.mp3')` |
| Summary table | `retro.table('summary', { columns: ['Metric', 'Count'], rows: [...] })` |

## Tips

- **Keep console.log too.** The emitter supplements your CLI, it doesn't replace it. Your app should work fine without the push server running.
- **One emitter per app.** Create it once at startup, pass it around or import it.
- **IDs are stable strings.** Use descriptive names like `"auth"`, `"download"`, `"summary"` — not generated UUIDs.
- **Don't over-decompose.** You don't need a separate panel for every log line. Group related output under one ID.
```

- [ ] **Step 2: Commit**

```bash
git add docs/guides/porting.md
git commit -m "docs: add porting guide for CLI apps"
```

---

## Task 11: Integration Smoke Test

Verify the full flow works end-to-end: emitter → server → push client → EventRouter → component.

**Files:**
- No new files — manual verification

- [ ] **Step 1: Run the full test suite**

Run: `npx vitest run`
Expected: All tests pass

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build completes without errors

- [ ] **Step 3: Verify typecheck**

Run: `npm run typecheck`
Expected: No type errors

- [ ] **Step 4: Commit if any fixes were needed**

Only if fixes were made during smoke testing.

---

## Follow-Up Work (Not In This Plan)

These are spec deliverables that depend on this plan but are scoped separately:

1. **Auto-panel creation in workspace** — Wiring EventRouter's `onCreate` callback to `tui-workspace` to automatically create `<tui-panel>` elements with the appropriate component inside when events arrive for unregistered IDs. This requires deeper integration with the workspace/sidebar/panel layout system and should be its own plan once the protocol layer is stable.

2. **Quiltsketch refactor** — Refactoring Quiltsketch from scattered event handlers to the central decision engine pattern as a reference "before/after" of the event protocol. This is a separate app-level refactoring effort.
