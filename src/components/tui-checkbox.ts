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
