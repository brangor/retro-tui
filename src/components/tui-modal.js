import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';

/**
 * <tui-modal> - Modal dialog with terminal aesthetic
 * 
 * Panel behavior levels (from GridSketch):
 * - Expanded → full content, medium shadow
 * - Collapsed → header only, light shadow  
 * - Popup/Modal → heavy shadow, dims background
 * 
 * @attr {string} title - Modal title
 * @attr {boolean} open - Whether modal is visible
 * @attr {boolean} closable - Show close button (default: true)
 * 
 * @fires close - When modal is closed
 * 
 * @slot - Modal content
 * @slot footer - Footer content (buttons, etc.)
 */
export class Modal extends LitElement {
  static properties = {
    title: { type: String },
    open: { type: Boolean, reflect: true },
    closable: { type: Boolean },
  };

  static styles = [
    sharedStyles,
    css`
      :host {
        display: none;
      }

      :host([open]) {
        display: block;
      }

      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.15s ease-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .modal {
        background: var(--surface-elevated);
        border: 2px solid var(--text-primary);
        box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.8);
        max-width: 90vw;
        max-height: 80vh;
        min-width: 300px;
        display: flex;
        flex-direction: column;
        animation: slideIn 0.15s ease-out;
      }

      @keyframes slideIn {
        from { 
          opacity: 0;
          transform: translateY(-10px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-sm) 0.75rem;
        border-bottom: var(--border-width) solid var(--border-default);
        background: var(--text-primary);
        color: var(--surface-base);
        user-select: none;
      }

      .title {
        font-size: 0.9rem;
        font-weight: normal;
      }

      .title::before {
        content: '┌─ ';
      }

      .title::after {
        content: ' ─┐';
      }

      .close {
        background: none;
        border: none;
        color: var(--surface-base);
        font-family: inherit;
        font-size: var(--spacing-md);
        cursor: pointer;
        padding: 0 var(--spacing-xs);
        line-height: 1;
      }

      .close:hover {
        color: var(--color-error);
      }

      .content {
        padding: var(--spacing-md);
        overflow: auto;
        flex: 1;
      }

      .footer {
        padding: 0.75rem var(--spacing-md);
        border-top: 1px solid var(--border-default);
        display: flex;
        justify-content: flex-end;
        gap: var(--spacing-sm);
      }

      .footer:empty {
        display: none;
      }

      /* Content styling helpers */
      ::slotted(h3) {
        color: var(--color-primary);
        font-size: 0.85rem;
        font-weight: normal;
        margin: 0 0 var(--spacing-sm) 0;
      }

      ::slotted(h3:not(:first-child)) {
        margin-top: var(--spacing-md);
      }

      ::slotted(p) {
        margin: 0 0 var(--spacing-sm) 0;
        font-size: 0.85rem;
        color: var(--text-muted);
      }

      ::slotted(kbd) {
        background: var(--border-default);
        padding: 0.var(--spacing-md) 0.3rem;
        border-radius: 2px;
        font-size: 0.75rem;
        font-family: inherit;
      }
    `,
  ];

  constructor() {
    super();
    this.title = '';
    this.open = false;
    this.closable = true;
    this._boundKeyHandler = this._handleKeydown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._boundKeyHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._boundKeyHandler);
  }

  _handleKeydown(e) {
    if (this.open && e.key === 'Escape' && this.closable) {
      this.close();
      e.preventDefault();
      e.stopPropagation();
    }
  }

  _handleOverlayClick(e) {
    if (e.target === e.currentTarget && this.closable) {
      this.close();
    }
  }

  /**
   * Open the modal
   */
  show() {
    this.open = true;
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  /**
   * Close the modal
   */
  close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="overlay" @click=${this._handleOverlayClick}>
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="header">
            <span class="title" id="modal-title">${this.title}</span>
            ${this.closable ? html`
              <button class="close" @click=${this.close} aria-label="Close">✕</button>
            ` : ''}
          </div>
          <div class="content">
            <slot></slot>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('tui-modal')) {
  customElements.define('tui-modal', Modal);
}
