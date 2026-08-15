import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { SemanticColor } from '../styles/semantics.js';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// STATUSBAR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-statusbar> - Status bar for displaying context info
 * 
 * Unified terminal aesthetic with vertical dividers between items.
 * Matches GridSketch's hacker-style status bar.
 * 
 * @slot - Status items (use tui-status-item)
 * @attr {string} color - Semantic color, painting the border and the dividers
 *                        between slotted items (default: primary).
 *                        See docs/api/semantic-colors.md
 */
@customElement('tui-statusbar')
export class Statusbar extends LitElement {
  @property({ type: String, reflect: true })
  color: SemanticColor = 'primary';

  static styles = [
    sharedStyles,
    css`
      :host {
        --bar-color: var(--color-primary);
        display: flex;
        align-items: stretch;
        font-size: 0.8rem;
        background: var(--surface-elevated);
        border: var(--border-width) solid var(--bar-color);
        border-bottom: none;
        flex-shrink: 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      /* Semantic colours — see docs/api/semantic-colors.md */
      :host([color="primary"])   { --bar-color: var(--color-primary);   border-color: var(--color-primary); }
      :host([color="secondary"]) { --bar-color: var(--color-secondary); border-color: var(--color-secondary); }
      :host([color="success"])   { --bar-color: var(--color-success);   border-color: var(--color-success); }
      :host([color="warning"])   { --bar-color: var(--color-warning);   border-color: var(--color-warning); }
      :host([color="error"])     { --bar-color: var(--color-error);     border-color: var(--color-error); }
      :host([color="info"])      { --bar-color: var(--color-info);      border-color: var(--color-info); }
      :host([color="muted"])     { --bar-color: var(--text-muted);      border-color: var(--border-default); }

      /* Style slotted status-items with dividers */
      ::slotted(tui-status-item) {
        border-right: 1px solid var(--bar-color);
      }

      ::slotted(tui-status-item:last-child) {
        border-right: none;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATUS ITEM COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-status-item> - Single status bar item
 * 
 * @attr {string} label - Item label (rendered in --color-primary, independent of
 *                        the bar's own color)
 * @attr {string} value - Item value (rendered in --color-secondary)
 * @attr {boolean} highlight - Repaints the value in --color-warning to draw the
 *                             eye to it. Also reflected to the host, so consumers
 *                             can hang their own styling off it.
 */
@customElement('tui-status-item')
export class StatusItem extends LitElement {
  @property({ type: String })
  label = '';

  @property({ type: String })
  value = '';

  @property({ type: Boolean, reflect: true })
  highlight = false;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        padding: 0.4rem 0.75rem;
        color: var(--text-primary);
      }

      .label {
        color: var(--color-primary);
        margin-right: var(--spacing-sm);
        font-weight: normal;
      }

      .value {
        color: var(--color-secondary);
        font-weight: normal;
      }

      :host([highlight]) .value {
        color: var(--color-warning);
      }
    `,
  ];

  render() {
    return html`
      <span class="label">${this.label}</span>
      <span class="value">${this.value}</span>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-statusbar': Statusbar;
    'tui-status-item': StatusItem;
  }
}
