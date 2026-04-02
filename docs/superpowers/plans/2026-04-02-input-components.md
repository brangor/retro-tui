# Input Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add five lightweight terminal-styled input components (tui-input, tui-checkbox, tui-radio, tui-checkbox-group, tui-radio-group) with push protocol support.

**Architecture:** Five flat components, no shared base class. Checkbox and radio use unicode glyphs (□/▣ and ◯/◉). Text input wraps a native `<input>`. Group components coordinate children via slotchange and bubbling events. All implement `handleEvent()` for push protocol.

**Tech Stack:** Lit 3, TypeScript, Vitest + @open-wc/testing

**Spec:** `docs/superpowers/specs/2026-04-02-input-components-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/tui-input.ts` | Create | Text input component |
| `src/components/tui-checkbox.ts` | Create (replaces `.js` stub) | Checkbox with □/▣ glyphs |
| `src/components/tui-radio.ts` | Create | Radio with ◯/◉ glyphs |
| `src/components/tui-checkbox-group.ts` | Create | Multi-select group coordinator |
| `src/components/tui-radio-group.ts` | Create | Single-select group coordinator |
| `src/index.js` | Modify | Add Form section exports |
| `tests/tui-input.test.ts` | Create | Input tests |
| `tests/tui-checkbox.test.ts` | Create | Checkbox tests |
| `tests/tui-radio.test.ts` | Create | Radio tests |
| `tests/tui-checkbox-group.test.ts` | Create | Checkbox group tests |
| `tests/tui-radio-group.test.ts` | Create | Radio group tests |

---

### Task 1: tui-checkbox

**Files:**
- Delete: `src/components/tui-checkbox.js`
- Create: `src/components/tui-checkbox.ts`
- Create: `tests/tui-checkbox.test.ts`

- [ ] **Step 1: Write tests**

```typescript
// tests/tui-checkbox.test.ts
import { describe, it, vi } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-checkbox.ts';

describe('tui-checkbox', () => {
  it('renders unchecked glyph by default', async () => {
    const el = await fixture(html`<tui-checkbox></tui-checkbox>`);
    const glyph = el.shadowRoot!.querySelector('.glyph');
    expect(glyph).to.exist;
    expect(glyph!.textContent).to.equal('□');
  });

  it('renders checked glyph when checked', async () => {
    const el = await fixture(html`<tui-checkbox checked></tui-checkbox>`);
    const glyph = el.shadowRoot!.querySelector('.glyph');
    expect(glyph!.textContent).to.equal('▣');
  });

  it('renders label from attribute', async () => {
    const el = await fixture(html`<tui-checkbox label="Dark mode"></tui-checkbox>`);
    expect(el.shadowRoot!.textContent).to.contain('Dark mode');
  });

  it('renders label from slot', async () => {
    const el = await fixture(html`<tui-checkbox>Slot label</tui-checkbox>`);
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
  });

  it('toggles on click', async () => {
    const el = await fixture(html`<tui-checkbox></tui-checkbox>`) as any;
    const container = el.shadowRoot!.querySelector('.checkbox');
    container!.click();
    await el.updateComplete;
    expect(el.checked).to.be.true;
    expect(el.shadowRoot!.querySelector('.glyph')!.textContent).to.equal('▣');
  });

  it('toggles on Space key', async () => {
    const el = await fixture(html`<tui-checkbox></tui-checkbox>`) as any;
    const container = el.shadowRoot!.querySelector('.checkbox');
    container!.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('toggles on Enter key', async () => {
    const el = await fixture(html`<tui-checkbox></tui-checkbox>`) as any;
    const container = el.shadowRoot!.querySelector('.checkbox');
    container!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('does not toggle when disabled', async () => {
    const el = await fixture(html`<tui-checkbox disabled></tui-checkbox>`) as any;
    const container = el.shadowRoot!.querySelector('.checkbox');
    container!.click();
    await el.updateComplete;
    expect(el.checked).to.be.false;
  });

  it('fires tui-change event on toggle', async () => {
    const el = await fixture(html`<tui-checkbox value="opt1" name="prefs"></tui-checkbox>`) as any;
    const handler = vi.fn();
    el.addEventListener('tui-change', handler);
    const container = el.shadowRoot!.querySelector('.checkbox');
    container!.click();
    expect(handler).toHaveBeenCalledOnce();
    const detail = handler.mock.calls[0][0].detail;
    expect(detail.checked).to.be.true;
    expect(detail.value).to.equal('opt1');
    expect(detail.name).to.equal('prefs');
  });

  it('sets aria-checked attribute', async () => {
    const el = await fixture(html`<tui-checkbox></tui-checkbox>`) as any;
    const container = el.shadowRoot!.querySelector('.checkbox');
    expect(container!.getAttribute('aria-checked')).to.equal('false');
    container!.click();
    await el.updateComplete;
    expect(container!.getAttribute('aria-checked')).to.equal('true');
  });

  it('handles handleEvent to set checked', async () => {
    const el = await fixture(html`<tui-checkbox></tui-checkbox>`) as any;
    el.handleEvent({ channel: 'test', type: 'checkbox', id: 'x', data: { checked: true } });
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('handles handleEvent for clear type', async () => {
    const el = await fixture(html`<tui-checkbox checked></tui-checkbox>`) as any;
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    expect(el.checked).to.be.false;
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/tui-checkbox.test.ts`
Expected: FAIL — module `../src/components/tui-checkbox.ts` exports don't match expected API.

- [ ] **Step 3: Delete the old stub and write tui-checkbox.ts**

Delete `src/components/tui-checkbox.js`, then create:

```typescript
// src/components/tui-checkbox.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { TuiEvent } from '../protocol/types.ts';

@customElement('tui-checkbox')
export class Checkbox extends LitElement {
  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property()
  name = '';

  @property()
  value = '';

  @property()
  label = '';

  static styles = [
    sharedStyles,
    css`
      :host { display: inline-block; }
      :host([disabled]) { pointer-events: none; }
      .checkbox {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm, 0.5rem);
        cursor: pointer;
        user-select: none;
        padding: 2px 0;
      }
      :host([disabled]) .checkbox { cursor: default; }
      .glyph {
        font-size: 1.1em;
        line-height: 1;
        color: var(--text-primary, var(--text, #c9d1d9));
        transition: color 0.15s;
      }
      :host([checked]) .glyph {
        color: var(--color-primary, var(--cyan, #58a6ff));
      }
      :host([disabled]) .glyph {
        color: var(--text-muted, var(--text-dim, #8b949e));
      }
      .checkbox:hover .glyph {
        color: var(--color-primary, var(--cyan, #58a6ff));
      }
      :host([disabled]) .checkbox:hover .glyph {
        color: var(--text-muted, var(--text-dim, #8b949e));
      }
      .label {
        color: var(--text-primary, var(--text, #c9d1d9));
      }
      :host([disabled]) .label {
        color: var(--text-muted, var(--text-dim, #8b949e));
      }
    `,
  ];

  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this.checked = false;
      return;
    }
    const data = event.data as Record<string, unknown>;
    if (data.checked != null) this.checked = Boolean(data.checked);
    if (data.disabled != null) this.disabled = Boolean(data.disabled);
    if (data.label != null) this.label = String(data.label);
  }

  private _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('tui-change', {
      bubbles: true,
      composed: true,
      detail: { checked: this.checked, value: this.value, name: this.name },
    }));
  }

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._toggle();
    }
  }

  render() {
    return html`
      <div class="checkbox"
           role="checkbox"
           aria-checked="${this.checked}"
           tabindex="0"
           @click=${this._toggle}
           @keydown=${this._onKeydown}>
        <span class="glyph">${this.checked ? '▣' : '□'}</span>
        <span class="label"><slot>${this.label}</slot></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-checkbox': Checkbox;
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/tui-checkbox.test.ts`
Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git rm src/components/tui-checkbox.js
git add src/components/tui-checkbox.ts tests/tui-checkbox.test.ts
git commit -m "feat: add tui-checkbox component with geometric glyphs"
```

---

### Task 2: tui-radio

**Files:**
- Create: `src/components/tui-radio.ts`
- Create: `tests/tui-radio.test.ts`

- [ ] **Step 1: Write tests**

```typescript
// tests/tui-radio.test.ts
import { describe, it, vi } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-radio.ts';

describe('tui-radio', () => {
  it('renders unselected glyph by default', async () => {
    const el = await fixture(html`<tui-radio></tui-radio>`);
    const glyph = el.shadowRoot!.querySelector('.glyph');
    expect(glyph).to.exist;
    expect(glyph!.textContent).to.equal('◯');
  });

  it('renders selected glyph when checked', async () => {
    const el = await fixture(html`<tui-radio checked></tui-radio>`);
    const glyph = el.shadowRoot!.querySelector('.glyph');
    expect(glyph!.textContent).to.equal('◉');
  });

  it('renders label from attribute', async () => {
    const el = await fixture(html`<tui-radio label="Option A"></tui-radio>`);
    expect(el.shadowRoot!.textContent).to.contain('Option A');
  });

  it('selects on click', async () => {
    const el = await fixture(html`<tui-radio></tui-radio>`) as any;
    const container = el.shadowRoot!.querySelector('.radio');
    container!.click();
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('does not deselect on click when already checked', async () => {
    const el = await fixture(html`<tui-radio checked></tui-radio>`) as any;
    const container = el.shadowRoot!.querySelector('.radio');
    container!.click();
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('does not select when disabled', async () => {
    const el = await fixture(html`<tui-radio disabled></tui-radio>`) as any;
    const container = el.shadowRoot!.querySelector('.radio');
    container!.click();
    await el.updateComplete;
    expect(el.checked).to.be.false;
  });

  it('fires tui-change event on select', async () => {
    const el = await fixture(html`<tui-radio value="opt1" name="group1"></tui-radio>`) as any;
    const handler = vi.fn();
    el.addEventListener('tui-change', handler);
    const container = el.shadowRoot!.querySelector('.radio');
    container!.click();
    expect(handler).toHaveBeenCalledOnce();
    const detail = handler.mock.calls[0][0].detail;
    expect(detail.checked).to.be.true;
    expect(detail.value).to.equal('opt1');
    expect(detail.name).to.equal('group1');
  });

  it('does not fire event when already checked', async () => {
    const el = await fixture(html`<tui-radio checked></tui-radio>`) as any;
    const handler = vi.fn();
    el.addEventListener('tui-change', handler);
    const container = el.shadowRoot!.querySelector('.radio');
    container!.click();
    expect(handler).not.toHaveBeenCalled();
  });

  it('sets aria-checked and role=radio', async () => {
    const el = await fixture(html`<tui-radio></tui-radio>`) as any;
    const container = el.shadowRoot!.querySelector('.radio');
    expect(container!.getAttribute('role')).to.equal('radio');
    expect(container!.getAttribute('aria-checked')).to.equal('false');
  });

  it('handles handleEvent to set checked', async () => {
    const el = await fixture(html`<tui-radio></tui-radio>`) as any;
    el.handleEvent({ channel: 'test', type: 'radio', id: 'x', data: { checked: true } });
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('handles handleEvent for clear type', async () => {
    const el = await fixture(html`<tui-radio checked></tui-radio>`) as any;
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    expect(el.checked).to.be.false;
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/tui-radio.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write tui-radio.ts**

```typescript
// src/components/tui-radio.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { TuiEvent } from '../protocol/types.ts';

@customElement('tui-radio')
export class Radio extends LitElement {
  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property()
  name = '';

  @property()
  value = '';

  @property()
  label = '';

  static styles = [
    sharedStyles,
    css`
      :host { display: inline-block; }
      :host([disabled]) { pointer-events: none; }
      .radio {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm, 0.5rem);
        cursor: pointer;
        user-select: none;
        padding: 2px 0;
      }
      :host([disabled]) .radio { cursor: default; }
      .glyph {
        font-size: 1.1em;
        line-height: 1;
        color: var(--text-primary, var(--text, #c9d1d9));
        transition: color 0.15s;
      }
      :host([checked]) .glyph {
        color: var(--color-primary, var(--cyan, #58a6ff));
      }
      :host([disabled]) .glyph {
        color: var(--text-muted, var(--text-dim, #8b949e));
      }
      .radio:hover .glyph {
        color: var(--color-primary, var(--cyan, #58a6ff));
      }
      :host([disabled]) .radio:hover .glyph {
        color: var(--text-muted, var(--text-dim, #8b949e));
      }
      .label {
        color: var(--text-primary, var(--text, #c9d1d9));
      }
      :host([disabled]) .label {
        color: var(--text-muted, var(--text-dim, #8b949e));
      }
    `,
  ];

  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this.checked = false;
      return;
    }
    const data = event.data as Record<string, unknown>;
    if (data.checked != null) this.checked = Boolean(data.checked);
    if (data.disabled != null) this.disabled = Boolean(data.disabled);
    if (data.label != null) this.label = String(data.label);
  }

  private _select() {
    if (this.disabled || this.checked) return;
    this.checked = true;
    this.dispatchEvent(new CustomEvent('tui-change', {
      bubbles: true,
      composed: true,
      detail: { checked: true, value: this.value, name: this.name },
    }));
  }

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._select();
    }
  }

  render() {
    return html`
      <div class="radio"
           role="radio"
           aria-checked="${this.checked}"
           tabindex="0"
           @click=${this._select}
           @keydown=${this._onKeydown}>
        <span class="glyph">${this.checked ? '◉' : '◯'}</span>
        <span class="label"><slot>${this.label}</slot></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-radio': Radio;
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/tui-radio.test.ts`
Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/tui-radio.ts tests/tui-radio.test.ts
git commit -m "feat: add tui-radio component with geometric glyphs"
```

---

### Task 3: tui-input

**Files:**
- Create: `src/components/tui-input.ts`
- Create: `tests/tui-input.test.ts`

- [ ] **Step 1: Write tests**

```typescript
// tests/tui-input.test.ts
import { describe, it, vi } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-input.ts';

describe('tui-input', () => {
  it('renders a native input', async () => {
    const el = await fixture(html`<tui-input></tui-input>`);
    const input = el.shadowRoot!.querySelector('input');
    expect(input).to.exist;
  });

  it('renders label when set', async () => {
    const el = await fixture(html`<tui-input label="Username"></tui-input>`);
    const label = el.shadowRoot!.querySelector('label');
    expect(label).to.exist;
    expect(label!.textContent).to.contain('Username');
  });

  it('does not render label when not set', async () => {
    const el = await fixture(html`<tui-input></tui-input>`);
    const label = el.shadowRoot!.querySelector('label');
    expect(label).to.not.exist;
  });

  it('passes placeholder to native input', async () => {
    const el = await fixture(html`<tui-input placeholder="type here..."></tui-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.placeholder).to.equal('type here...');
  });

  it('reflects value property', async () => {
    const el = await fixture(html`<tui-input value="hello"></tui-input>`) as any;
    expect(el.value).to.equal('hello');
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.value).to.equal('hello');
  });

  it('disables native input when disabled', async () => {
    const el = await fixture(html`<tui-input disabled></tui-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.disabled).to.be.true;
  });

  it('fires tui-input event on keystroke', async () => {
    const el = await fixture(html`<tui-input></tui-input>`) as any;
    const handler = vi.fn();
    el.addEventListener('tui-input', handler);
    const input = el.shadowRoot!.querySelector('input')!;
    input.value = 'a';
    input.dispatchEvent(new Event('input'));
    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0].detail.value).to.equal('a');
  });

  it('fires tui-change event on blur', async () => {
    const el = await fixture(html`<tui-input></tui-input>`) as any;
    const handler = vi.fn();
    el.addEventListener('tui-change', handler);
    const input = el.shadowRoot!.querySelector('input')!;
    input.value = 'test';
    input.dispatchEvent(new Event('change'));
    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0].detail.value).to.equal('test');
  });

  it('handles handleEvent to set value', async () => {
    const el = await fixture(html`<tui-input></tui-input>`) as any;
    el.handleEvent({ channel: 'test', type: 'input', id: 'x', data: { value: 'pushed' } });
    await el.updateComplete;
    expect(el.value).to.equal('pushed');
  });

  it('handles handleEvent for clear type', async () => {
    const el = await fixture(html`<tui-input value="something"></tui-input>`) as any;
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    expect(el.value).to.equal('');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/tui-input.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write tui-input.ts**

```typescript
// src/components/tui-input.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { TuiEvent } from '../protocol/types.ts';

@customElement('tui-input')
export class Input extends LitElement {
  @property({ reflect: true })
  value = '';

  @property()
  placeholder = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property()
  name = '';

  @property()
  label = '';

  static styles = [
    sharedStyles,
    css`
      :host { display: block; }
      label {
        display: block;
        font-size: 0.8rem;
        color: var(--text-muted, var(--text-dim, #8b949e));
        margin-bottom: var(--spacing-xs, 0.25rem);
      }
      input {
        width: 100%;
        box-sizing: border-box;
        padding: var(--spacing-sm, 0.5rem);
        font-family: inherit;
        font-size: inherit;
        color: var(--text-primary, var(--text, #c9d1d9));
        background: var(--surface-base, var(--bg, #0d1117));
        border: var(--border-width, 1px) solid var(--border-default, var(--border, #30363d));
        outline: none;
      }
      input:focus {
        border-color: var(--color-primary, var(--cyan, #58a6ff));
      }
      input::placeholder {
        color: var(--text-muted, var(--text-dim, #8b949e));
      }
      input:disabled {
        opacity: 0.5;
        cursor: default;
      }
    `,
  ];

  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this.value = '';
      return;
    }
    const data = event.data as Record<string, unknown>;
    if (data.value != null) this.value = String(data.value);
    if (data.placeholder != null) this.placeholder = String(data.placeholder);
    if (data.disabled != null) this.disabled = Boolean(data.disabled);
    if (data.label != null) this.label = String(data.label);
  }

  private _onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('tui-input', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    }));
  }

  private _onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('tui-change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    }));
  }

  render() {
    return html`
      ${this.label ? html`<label>${this.label}</label>` : ''}
      <input
        .value=${this.value}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        @input=${this._onInput}
        @change=${this._onChange}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-input': Input;
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/tui-input.test.ts`
Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/tui-input.ts tests/tui-input.test.ts
git commit -m "feat: add tui-input text field component"
```

---

### Task 4: tui-checkbox-group

**Files:**
- Create: `src/components/tui-checkbox-group.ts`
- Create: `tests/tui-checkbox-group.test.ts`

- [ ] **Step 1: Write tests**

```typescript
// tests/tui-checkbox-group.test.ts
import { describe, it, vi } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-checkbox.ts';
import '../src/components/tui-checkbox-group.ts';

describe('tui-checkbox-group', () => {
  it('renders a slot for children', async () => {
    const el = await fixture(html`<tui-checkbox-group></tui-checkbox-group>`);
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
  });

  it('renders label when set', async () => {
    const el = await fixture(html`<tui-checkbox-group label="Options"></tui-checkbox-group>`);
    expect(el.shadowRoot!.textContent).to.contain('Options');
  });

  it('tracks checked children in value array', async () => {
    const el = await fixture(html`
      <tui-checkbox-group name="opts">
        <tui-checkbox value="a" checked></tui-checkbox>
        <tui-checkbox value="b"></tui-checkbox>
        <tui-checkbox value="c" checked></tui-checkbox>
      </tui-checkbox-group>
    `) as any;
    // Allow slotchange to fire
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    expect(el.value).to.deep.equal(['a', 'c']);
  });

  it('updates value when child is toggled', async () => {
    const el = await fixture(html`
      <tui-checkbox-group name="opts">
        <tui-checkbox value="a"></tui-checkbox>
        <tui-checkbox value="b"></tui-checkbox>
      </tui-checkbox-group>
    `) as any;
    await el.updateComplete;
    const handler = vi.fn();
    el.addEventListener('tui-change', handler);

    // Click the first checkbox
    const checkbox = el.querySelector('tui-checkbox[value="a"]');
    checkbox.shadowRoot!.querySelector('.checkbox')!.click();
    await el.updateComplete;

    expect(el.value).to.deep.equal(['a']);
    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0].detail.value).to.deep.equal(['a']);
    expect(handler.mock.calls[0][0].detail.name).to.equal('opts');
  });

  it('propagates disabled to children', async () => {
    const el = await fixture(html`
      <tui-checkbox-group disabled>
        <tui-checkbox value="a"></tui-checkbox>
        <tui-checkbox value="b"></tui-checkbox>
      </tui-checkbox-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    const children = el.querySelectorAll('tui-checkbox');
    children.forEach((child: any) => {
      expect(child.disabled).to.be.true;
    });
  });

  it('handles handleEvent to set value', async () => {
    const el = await fixture(html`
      <tui-checkbox-group>
        <tui-checkbox value="a"></tui-checkbox>
        <tui-checkbox value="b"></tui-checkbox>
      </tui-checkbox-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    el.handleEvent({ channel: 'test', type: 'checkbox-group', id: 'x', data: { value: ['b'] } });
    await el.updateComplete;
    const checkboxB = el.querySelector('tui-checkbox[value="b"]');
    expect(checkboxB.checked).to.be.true;
    const checkboxA = el.querySelector('tui-checkbox[value="a"]');
    expect(checkboxA.checked).to.be.false;
  });

  it('handles handleEvent for clear type', async () => {
    const el = await fixture(html`
      <tui-checkbox-group>
        <tui-checkbox value="a" checked></tui-checkbox>
        <tui-checkbox value="b" checked></tui-checkbox>
      </tui-checkbox-group>
    `) as any;
    await el.updateComplete;
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    const children = el.querySelectorAll('tui-checkbox');
    children.forEach((child: any) => {
      expect(child.checked).to.be.false;
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/tui-checkbox-group.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write tui-checkbox-group.ts**

```typescript
// src/components/tui-checkbox-group.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { TuiEvent } from '../protocol/types.ts';
import type { Checkbox } from './tui-checkbox.ts';

@customElement('tui-checkbox-group')
export class CheckboxGroup extends LitElement {
  @property()
  name = '';

  @property()
  label = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Array })
  value: string[] = [];

  static styles = [
    sharedStyles,
    css`
      :host { display: block; }
      .group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm, 0.5rem);
      }
      .group-label {
        font-size: 0.8rem;
        color: var(--text-muted, var(--text-dim, #8b949e));
        margin-bottom: var(--spacing-xs, 0.25rem);
      }
    `,
  ];

  private _getChildren(): Checkbox[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot.assignedElements().filter(
      (el): el is Checkbox => el.tagName === 'TUI-CHECKBOX'
    );
  }

  private _syncChildren() {
    const children = this._getChildren();
    for (const child of children) {
      if (this.name) child.name = this.name;
      if (this.disabled) child.disabled = true;
    }
    this._syncValueFromChildren();
  }

  private _syncValueFromChildren() {
    const children = this._getChildren();
    this.value = children.filter(c => c.checked).map(c => c.value);
  }

  private _syncChildrenFromValue() {
    const children = this._getChildren();
    for (const child of children) {
      child.checked = this.value.includes(child.value);
    }
  }

  private _onSlotChange() {
    this._syncChildren();
  }

  private _onChange(e: Event) {
    e.stopPropagation();
    this._syncValueFromChildren();
    this.dispatchEvent(new CustomEvent('tui-change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value, name: this.name },
    }));
  }

  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this.value = [];
      this._syncChildrenFromValue();
      return;
    }
    const data = event.data as Record<string, unknown>;
    if (data.value != null) {
      this.value = data.value as string[];
      this._syncChildrenFromValue();
    }
    if (data.disabled != null) {
      this.disabled = Boolean(data.disabled);
      this._syncChildren();
    }
  }

  render() {
    return html`
      ${this.label ? html`<div class="group-label">${this.label}</div>` : ''}
      <div class="group" @tui-change=${this._onChange}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-checkbox-group': CheckboxGroup;
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/tui-checkbox-group.test.ts`
Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/tui-checkbox-group.ts tests/tui-checkbox-group.test.ts
git commit -m "feat: add tui-checkbox-group component"
```

---

### Task 5: tui-radio-group

**Files:**
- Create: `src/components/tui-radio-group.ts`
- Create: `tests/tui-radio-group.test.ts`

- [ ] **Step 1: Write tests**

```typescript
// tests/tui-radio-group.test.ts
import { describe, it, vi } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-radio.ts';
import '../src/components/tui-radio-group.ts';

describe('tui-radio-group', () => {
  it('renders a slot for children', async () => {
    const el = await fixture(html`<tui-radio-group></tui-radio-group>`);
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
  });

  it('renders label when set', async () => {
    const el = await fixture(html`<tui-radio-group label="Theme"></tui-radio-group>`);
    expect(el.shadowRoot!.textContent).to.contain('Theme');
  });

  it('has role=radiogroup', async () => {
    const el = await fixture(html`<tui-radio-group></tui-radio-group>`);
    const group = el.shadowRoot!.querySelector('.group');
    expect(group!.getAttribute('role')).to.equal('radiogroup');
  });

  it('selects initial value from attribute', async () => {
    const el = await fixture(html`
      <tui-radio-group value="b">
        <tui-radio value="a"></tui-radio>
        <tui-radio value="b"></tui-radio>
        <tui-radio value="c"></tui-radio>
      </tui-radio-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    const radioB = el.querySelector('tui-radio[value="b"]');
    expect(radioB.checked).to.be.true;
    const radioA = el.querySelector('tui-radio[value="a"]');
    expect(radioA.checked).to.be.false;
  });

  it('enforces mutual exclusivity on child click', async () => {
    const el = await fixture(html`
      <tui-radio-group name="theme" value="a">
        <tui-radio value="a"></tui-radio>
        <tui-radio value="b"></tui-radio>
      </tui-radio-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));

    const handler = vi.fn();
    el.addEventListener('tui-change', handler);

    // Click radio B
    const radioB = el.querySelector('tui-radio[value="b"]');
    radioB.shadowRoot!.querySelector('.radio')!.click();
    await el.updateComplete;

    expect(el.value).to.equal('b');
    expect(radioB.checked).to.be.true;
    const radioA = el.querySelector('tui-radio[value="a"]');
    expect(radioA.checked).to.be.false;
    expect(handler).toHaveBeenCalledOnce();
    expect(handler.mock.calls[0][0].detail.value).to.equal('b');
    expect(handler.mock.calls[0][0].detail.name).to.equal('theme');
  });

  it('navigates with arrow keys', async () => {
    const el = await fixture(html`
      <tui-radio-group value="a">
        <tui-radio value="a"></tui-radio>
        <tui-radio value="b"></tui-radio>
        <tui-radio value="c"></tui-radio>
      </tui-radio-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));

    const group = el.shadowRoot!.querySelector('.group')!;
    group.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    expect(el.value).to.equal('b');
  });

  it('wraps arrow navigation', async () => {
    const el = await fixture(html`
      <tui-radio-group value="c">
        <tui-radio value="a"></tui-radio>
        <tui-radio value="b"></tui-radio>
        <tui-radio value="c"></tui-radio>
      </tui-radio-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));

    const group = el.shadowRoot!.querySelector('.group')!;
    group.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    expect(el.value).to.equal('a');
  });

  it('propagates disabled to children', async () => {
    const el = await fixture(html`
      <tui-radio-group disabled>
        <tui-radio value="a"></tui-radio>
        <tui-radio value="b"></tui-radio>
      </tui-radio-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    const children = el.querySelectorAll('tui-radio');
    children.forEach((child: any) => {
      expect(child.disabled).to.be.true;
    });
  });

  it('handles handleEvent to set value', async () => {
    const el = await fixture(html`
      <tui-radio-group>
        <tui-radio value="a"></tui-radio>
        <tui-radio value="b"></tui-radio>
      </tui-radio-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    el.handleEvent({ channel: 'test', type: 'radio-group', id: 'x', data: { value: 'b' } });
    await el.updateComplete;
    expect(el.value).to.equal('b');
    expect(el.querySelector('tui-radio[value="b"]').checked).to.be.true;
    expect(el.querySelector('tui-radio[value="a"]').checked).to.be.false;
  });

  it('handles handleEvent for clear type', async () => {
    const el = await fixture(html`
      <tui-radio-group value="a">
        <tui-radio value="a"></tui-radio>
        <tui-radio value="b"></tui-radio>
      </tui-radio-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    expect(el.value).to.equal('');
    const children = el.querySelectorAll('tui-radio');
    children.forEach((child: any) => {
      expect(child.checked).to.be.false;
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/tui-radio-group.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Write tui-radio-group.ts**

```typescript
// src/components/tui-radio-group.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { TuiEvent } from '../protocol/types.ts';
import type { Radio } from './tui-radio.ts';

@customElement('tui-radio-group')
export class RadioGroup extends LitElement {
  @property()
  name = '';

  @property()
  label = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property()
  value = '';

  static styles = [
    sharedStyles,
    css`
      :host { display: block; }
      .group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm, 0.5rem);
      }
      .group-label {
        font-size: 0.8rem;
        color: var(--text-muted, var(--text-dim, #8b949e));
        margin-bottom: var(--spacing-xs, 0.25rem);
      }
    `,
  ];

  private _getChildren(): Radio[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot.assignedElements().filter(
      (el): el is Radio => el.tagName === 'TUI-RADIO'
    );
  }

  private _syncChildren() {
    const children = this._getChildren();
    for (const child of children) {
      if (this.name) child.name = this.name;
      if (this.disabled) child.disabled = true;
      child.checked = child.value === this.value;
    }
  }

  private _onSlotChange() {
    this._syncChildren();
  }

  private _onChange(e: Event) {
    e.stopPropagation();
    const detail = (e as CustomEvent).detail;
    this.value = detail.value;
    // Uncheck siblings
    for (const child of this._getChildren()) {
      child.checked = child.value === this.value;
    }
    this.dispatchEvent(new CustomEvent('tui-change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value, name: this.name },
    }));
  }

  private _onKeydown(e: KeyboardEvent) {
    const children = this._getChildren();
    if (children.length === 0) return;
    const currentIndex = children.findIndex(c => c.value === this.value);

    let nextIndex: number;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % children.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + children.length) % children.length;
    } else {
      return;
    }

    this.value = children[nextIndex].value;
    for (const child of children) {
      child.checked = child.value === this.value;
    }
    children[nextIndex].focus();
    this.dispatchEvent(new CustomEvent('tui-change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value, name: this.name },
    }));
  }

  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this.value = '';
      for (const child of this._getChildren()) {
        child.checked = false;
      }
      return;
    }
    const data = event.data as Record<string, unknown>;
    if (data.value != null) {
      this.value = String(data.value);
      this._syncChildren();
    }
    if (data.disabled != null) {
      this.disabled = Boolean(data.disabled);
      this._syncChildren();
    }
  }

  render() {
    return html`
      ${this.label ? html`<div class="group-label">${this.label}</div>` : ''}
      <div class="group" role="radiogroup" @tui-change=${this._onChange} @keydown=${this._onKeydown}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-radio-group': RadioGroup;
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/tui-radio-group.test.ts`
Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/tui-radio-group.ts tests/tui-radio-group.test.ts
git commit -m "feat: add tui-radio-group component with arrow key navigation"
```

---

### Task 6: Library exports and final integration

**Files:**
- Modify: `src/index.js`

- [ ] **Step 1: Add Form section exports to src/index.js**

Add after the `// Atoms (primitives)` section and before `// Tool State`:

```javascript
// Form
export { Input } from './components/tui-input.ts';
export { Checkbox } from './components/tui-checkbox.ts';
export { Radio } from './components/tui-radio.ts';
export { CheckboxGroup } from './components/tui-checkbox-group.ts';
export { RadioGroup } from './components/tui-radio-group.ts';
```

- [ ] **Step 2: Run all tests to verify nothing is broken**

Run: `npx vitest run`
Expected: All tests PASS including existing tests.

- [ ] **Step 3: Run typecheck**

Run: `npm run typecheck`
Expected: No type errors.

- [ ] **Step 4: Commit**

```bash
git add src/index.js
git commit -m "feat: export input components from library entry point"
```
