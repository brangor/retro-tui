import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';

/**
 * <retro-button> - Terminal-styled button
 * 
 * @attr {string} variant - 'default' | 'primary' | 'danger' | 'ghost'
 * @attr {string} size - 'sm' | 'md' | 'lg'
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} block - Full width
 * 
 * @slot - Button label
 */
export class RetroButton extends LitElement {
  static properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    block: { type: Boolean, reflect: true },
  };

  static styles = [
    sharedStyles,
    css`
      :host {
        --_selection-style: var(--selection-style, invert);
      

        /* Selected state - invert mode */
        :host([selected]) button {
          background: var(--text-primary);
          color: var(--surface-base);
        }
        
        --_btn-bg: var(--retro-button-bg, var(--surface-base));
        --_btn-color: var(--retro-button-color, var(--text-priary));
        --_btn_border: var(--retro-button-border, var(--border-default));
        --_btn_padding-x: var(--retro-button-padding-x, var(--spacing-md));
        --_btn_padding-y: var(--retro-button-padding-y, var(--spacing-sm));
        
        display: inline-block;
      }

      :host([block]) {
        display: block;
      }

      button {
        font-family: inherit;
        font-size: 0.85rem;
        padding: var(--spacing-sm) var(--spacing-md);
        background: var(--surface-base);
        border: var(--border-width) solid var(--border-default);
        color: var(--text-primary);
        cursor: pointer;
        transition: background 0.1s, border-color 0.1s, color 0.1s;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        text-transform: uppercase;
        letter-spacing: 0.03em;
        width: 100%;
      }

      button:hover:not(:disabled) {
        background: var(--border-default);
        border-color: var(--text-muted);
      }

      button:focus {
        outline: 1px solid var(--color-primary);
        outline-offset: 1px;
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANTS
         ═══════════════════════════════════════════════════════════════════ */

      /* Primary */
      :host([variant="primary"]) button {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: var(--surface-base);
      }

      :host([variant="primary"]) button:hover:not(:disabled) {
        filter: brightness(1.15);
        background: var(--color-primary);
      }

      /* Danger */
      :host([variant="danger"]) button {
        background: transparent;
        border-color: var(--color-error);
        color: var(--color-error);
      }

      :host([variant="danger"]) button:hover:not(:disabled) {
        background: var(--color-error);
        color: var(--surface-base);
      }

      /* Ghost - no border until hover */
      :host([variant="ghost"]) button {
        background: transparent;
        border-color: transparent;
        color: var(--text-muted);
      }

      :host([variant="ghost"]) button:hover:not(:disabled) {
        background: transparent;
        border-color: var(--border-default);
        color: var(--text-primary);
      }

      /* ═══════════════════════════════════════════════════════════════════
         SIZES
         ═══════════════════════════════════════════════════════════════════ */

      :host([size="sm"]) button {
        padding: var(--spacing-xs) var(--spacing-sm);
        font-size: var(--font-size-xs, 0.75rem);
      }

      :host([size="lg"]) button {
        padding: 0.6rem 1.25rem;
        font-size: var(--font-size-xs, 0.75rem);
      }

      /* ═══════════════════════════════════════════════════════════════════
         DISABLED
         ═══════════════════════════════════════════════════════════════════ */

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ];

  constructor() {
    super();
    this.variant = 'default';
    this.size = 'md';
    this.disabled = false;
    this.block = false;
  }

  render() {
    return html`
      <button ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('retro-button', RetroButton);
