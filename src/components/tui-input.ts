// src/components/tui-input.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { TuiEvent, InputData } from '../protocol/types.ts';

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
    const data = event.data as unknown as InputData;
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
