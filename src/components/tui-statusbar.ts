import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type StatusbarColor = 'cyan' | 'green' | 'magenta' | 'yellow';

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
 * @attr {string} color - Border color: cyan | green | magenta | yellow
 */
@customElement('tui-statusbar')
export class Statusbar extends LitElement {
  @property({ type: String, reflect: true })
  color: StatusbarColor = 'magenta';

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

      :host([color="cyan"]) { --bar-color: var(--color-primary); border-color: var(--color-primary); }
      :host([color="green"]) { --bar-color: var(--color-secondary); border-color: var(--color-secondary); }
      :host([color="yellow"]) { --bar-color: var(--color-secondary); border-color: var(--color-secondary); }

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
 * @attr {string} label - Item label (displayed in bar color)
 * @attr {string} value - Item value (displayed in green)
 * @attr {boolean} highlight - Use yellow for value instead of green
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
        color: var(--color-secondary);
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
