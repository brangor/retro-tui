import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

type StatColor = 'primary' | 'success' | 'warning' | 'error' | 'muted' | '';

/**
 * <tui-stat> - Right-aligned label/value stat display
 *
 * @attr {string} label - Uppercase label text
 * @attr {string} value - Value text
 * @attr {string} color - Semantic color for value: primary | success | warning | error | muted
 */
@customElement('tui-stat')
export class Stat extends LitElement {
  @property({ type: String })
  label = '';

  @property({ type: String })
  value = '';

  @property({ type: String, reflect: true })
  color: StatColor = '';

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        text-align: right;
        font-family: var(--font-mono, monospace);
      }

      :host + :host {
        margin-top: var(--spacing-sm);
      }

      .label {
        font-size: var(--font-size-caption, 0.6rem);
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      .value {
        font-size: var(--font-size-md, 0.85rem);
        color: var(--text-primary);
        font-variant-numeric: tabular-nums;
      }

      :host([color="primary"]) .value { color: var(--color-primary); }
      :host([color="success"]) .value { color: var(--color-success); }
      :host([color="warning"]) .value { color: var(--color-warning); }
      :host([color="error"]) .value { color: var(--color-error); }
      :host([color="muted"]) .value { color: var(--text-muted); }
    `,
  ];

  render() {
    return html`
      <div class="label">${this.label}</div>
      <div class="value">${this.value}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-stat': Stat;
  }
}
