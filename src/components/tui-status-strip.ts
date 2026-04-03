import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

type StripItemColor = 'success' | 'warning' | 'error' | 'primary' | 'muted' | '';

/**
 * <tui-status-strip> - Single-line status bar with box-draw separators
 *
 * Right-aligned, full caps, semantic colors. Used as the C zone in zone layouts.
 *
 * @attr {string} label - Left-side label (e.g. "STATUS", "RESULTS", "CONFIG")
 *
 * @slot - tui-strip-item children
 */
@customElement('tui-status-strip')
export class StatusStrip extends LitElement {
  @property({ type: String })
  label = '';

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: var(--spacing-sm) var(--spacing-md);
        background: var(--surface-base);
        font-family: var(--font-mono, monospace);
        font-size: var(--font-size-xs, 0.6rem);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        min-height: 28px;
      }

      .label {
        color: var(--text-muted);
        letter-spacing: 0.1em;
        margin-right: var(--spacing-sm);
      }

      ::slotted(tui-strip-item) {
        display: inline-flex;
        align-items: center;
      }

      ::slotted(tui-strip-item)::before {
        content: '│';
        color: var(--border-default);
        margin: 0 var(--spacing-sm);
      }
    `,
  ];

  render() {
    return html`
      ${this.label ? html`<span class="label">${this.label}:</span>` : ''}
      <slot></slot>
    `;
  }
}

/**
 * <tui-strip-item> - Single item in a status strip
 *
 * @attr {string} color - Semantic color: success | warning | error | primary | muted
 * @attr {string} indicator - Optional indicator: '●' for active, '○' for inactive
 */
@customElement('tui-strip-item')
export class StripItem extends LitElement {
  @property({ type: String, reflect: true })
  color: StripItemColor = '';

  @property({ type: String })
  indicator = '';

  static styles = [
    sharedStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.3em;
        font-family: var(--font-mono, monospace);
        font-size: var(--font-size-xs, 0.6rem);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--text-muted);
      }

      :host([color="success"]) { color: var(--color-success); }
      :host([color="warning"]) { color: var(--color-warning); }
      :host([color="error"]) { color: var(--color-error); }
      :host([color="primary"]) { color: var(--color-primary); }
      :host([color="muted"]) { color: var(--text-muted); }

      .separator {
        color: var(--border-default);
        margin: 0 var(--spacing-sm);
      }
    `,
  ];

  render() {
    return html`
      <span class="separator">│</span>
      <slot></slot>${this.indicator ? html` ${this.indicator}` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-status-strip': StatusStrip;
    'tui-strip-item': StripItem;
  }
}
