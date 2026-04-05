// src/components/tui-radio.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { TuiEvent, RadioData } from '../protocol/types';

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
        color: var(--text-primary);
        transition: color 0.15s;
      }
      :host([checked]) .glyph {
        color: var(--color-primary);
      }
      :host([disabled]) .glyph {
        color: var(--text-muted);
      }
      .radio:hover .glyph {
        color: var(--color-primary);
      }
      :host([disabled]) .radio:hover .glyph {
        color: var(--text-muted);
      }
      .label {
        color: var(--text-primary);
      }
      :host([disabled]) .label {
        color: var(--text-muted);
      }
    `,
  ];

  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this.checked = false;
      return;
    }
    const data = event.data as unknown as RadioData;
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
           tabindex="${this.disabled ? -1 : 0}"
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
