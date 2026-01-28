import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type ToastPosition = 'bottom' | 'top' | 'bottom-right';
type ToastType = 'info' | 'success' | 'warning' | 'error' | null;

interface ToastItem {
  message: string;
  type: ToastType;
  title: string;
  duration: number;
  simple: boolean;
}

interface ToastOptions {
  type?: ToastType;
  title?: string;
  duration?: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-toast> - Terminal-styled toast notifications
 * 
 * Box-draw aesthetic, not Material Design.
 * Displays briefly then fades out.
 * 
 * Usage:
 *   const toast = document.querySelector('tui-toast');
 *   toast.show('File saved!');
 *   toast.show('Error occurred', { type: 'error', duration: 5000 });
 * 
 * @attr {string} position - 'bottom' | 'top' | 'bottom-right'
 */
@customElement('tui-toast')
export class Toast extends LitElement {
  @property({ type: String, reflect: true })
  position: ToastPosition = 'bottom';

  @state()
  private _queue: ToastItem[] = [];

  @state()
  private _current: ToastItem | null = null;

  @state()
  private _visible = false;

  static styles = [
    sharedStyles,
    css`
      :host {
        position: fixed;
        z-index: 3000;
        pointer-events: none;
      }

      :host([position="bottom"]),
      :host(:not([position])) {
        bottom: var(--spacing-lg);
        left: 50%;
        transform: translateX(-50%);
      }

      :host([position="top"]) {
        top: var(--spacing-lg);
        left: 50%;
        transform: translateX(-50%);
      }

      :host([position="bottom-right"]) {
        bottom: var(--spacing-lg);
        right: var(--spacing-lg);
      }

      .toast {
        background: var(--surface-elevated);
        border: var(--border-width) solid var(--text-primary);
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.6);
        padding: 0;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.2s, transform 0.2s;
        pointer-events: auto;
      }

      .toast.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .toast.exiting {
        opacity: 0;
        transform: translateY(-5px);
      }

      /* Toast header with box-draw */
      .toast-header {
        padding: var(--spacing-xs) var(--spacing-sm);
        background: var(--text-primary);
        color: var(--surface-base);
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
      }

      .toast-header::before {
        content: '┌─';
        opacity: 0.7;
      }

      .toast-header::after {
        content: '─┐';
        opacity: 0.7;
      }

      /* Toast body */
      .toast-body {
        padding: var(--spacing-sm) 0.75rem;
        font-size: 0.85rem;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
      }

      /* Type variants */
      .toast.type-success .toast-header {
        background: var(--color-secondary);
      }

      .toast.type-success .toast-body::before {
        content: '✓';
        color: var(--color-secondary);
      }

      .toast.type-error .toast-header {
        background: var(--color-error);
      }

      .toast.type-error .toast-body::before {
        content: '✗';
        color: var(--color-error);
      }

      .toast.type-warning .toast-header {
        background: var(--color-secondary);
      }

      .toast.type-warning .toast-body::before {
        content: '⚠';
        color: var(--color-secondary);
      }

      .toast.type-info .toast-header {
        background: var(--color-primary);
      }

      .toast.type-info .toast-body::before {
        content: 'ℹ';
        color: var(--color-primary);
      }

      /* Simple toast (no header) */
      .toast.simple .toast-header {
        display: none;
      }

      .toast.simple .toast-body {
        padding: 0.4rem 0.75rem;
      }

      .toast.simple .toast-body::before {
        content: '▸';
        color: var(--color-primary);
      }
    `,
  ];

  /**
   * Show a toast message
   * @param message - The message to display
   * @param options - Toast options
   */
  show(message: string, options: ToastOptions = {}) {
    const toast: ToastItem = {
      message,
      type: options.type || null,
      title: options.title || this._getDefaultTitle(options.type),
      duration: options.duration || 2500,
      simple: !options.type && !options.title,
    };

    this._queue = [...this._queue, toast];
    
    if (!this._current) {
      this._showNext();
    }
  }

  private _getDefaultTitle(type?: ToastType): string {
    switch (type) {
      case 'success': return 'Success';
      case 'error': return 'Error';
      case 'warning': return 'Warning';
      case 'info': return 'Info';
      default: return '';
    }
  }

  private async _showNext() {
    if (this._queue.length === 0) {
      this._current = null;
      return;
    }

    const [next, ...rest] = this._queue;
    this._queue = rest;
    this._current = next;
    this._visible = false;
    
    // Trigger reflow then animate in
    await this.updateComplete;
    requestAnimationFrame(() => {
      this._visible = true;
    });

    // Wait for duration then animate out
    await new Promise(resolve => setTimeout(resolve, this._current!.duration));
    
    this._visible = false;
    
    // Wait for exit animation
    await new Promise(resolve => setTimeout(resolve, 200));
    
    this._showNext();
  }

  render() {
    if (!this._current) {
      return html``;
    }

    const { message, type, title, simple } = this._current;
    const classes = [
      'toast',
      this._visible ? 'visible' : '',
      type ? `type-${type}` : '',
      simple ? 'simple' : '',
    ].filter(Boolean).join(' ');

    return html`
      <div class="${classes}">
        <div class="toast-header">${title}</div>
        <div class="toast-body">${message}</div>
      </div>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-toast': Toast;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// SINGLETON HELPER
// ═══════════════════════════════════════════════════════════════════════════════

let _toastInstance: Toast | null = null;

export function tuiToast(message: string, options?: ToastOptions) {
  if (!_toastInstance) {
    _toastInstance = document.createElement('tui-toast') as Toast;
    document.body.appendChild(_toastInstance);
  }
  _toastInstance.show(message, options);
}
