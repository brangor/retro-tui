import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import './tui-button.ts'; // Import tui-button for use

// ═══════════════════════════════════════════════════════════════════════════════
// MENU COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-menu> - Menu bar with dropdown menus
 *
 * @slot - Menu items (tui-menu-item elements)
 *
 * Keyboard navigation:
 * - Arrow Left/Right: move between menu items
 * - Arrow Down/Enter: open dropdown
 * - Arrow Up/Down: navigate dropdown items
 * - Escape: close dropdown
 * - Alt+letter: hotkey access
 */
@customElement('tui-menu')
export class Menu extends LitElement {
  @state()
  private _openMenu: MenuItem | null = null;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        gap: var(--spacing-xs);
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MENU ITEM COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-menu-item> - Single menu with dropdown
 *
 * Uses <tui-button variant="menu"> for the trigger.
 *
 * @attr {string} label - Menu label
 * @attr {string} hotkey - Hotkey letter (underlined)
 * @slot - Dropdown content (tui-menu-action elements)
 */
@customElement('tui-menu-item')
export class MenuItem extends LitElement {
  @property({ type: String })
  label = '';

  @property({ type: String })
  hotkey = '';

  @state()
  private _open = false;

  private _outsideClickHandler: ((e: MouseEvent) => void) | null = null;

  static styles = [
    sharedStyles,
    css`
      :host {
        position: relative;
      }

      /* Hotkey styling within the button */
      .hotkey {
        color: var(--color-secondary);
        text-decoration: underline;
      }

      /* When trigger is hovered/open, hotkey inherits inverted color */
      :host(.open) .hotkey,
      tui-button:hover .hotkey {
        color: inherit;
      }

      .dropdown {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 200px;
        background: var(--surface-elevated);
        border: var(--border-width) solid var(--text-primary);
        box-shadow: 4px 4px 0 rgba(0,0,0,0.5);
        z-index: 1000;
      }

      :host(.open) .dropdown {
        display: block;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();

    // Close when clicking outside
    this._outsideClickHandler = (e: MouseEvent) => {
      if (this._open && !this.contains(e.target as Node)) {
        this._close();
      }
    };
    document.addEventListener('click', this._outsideClickHandler);

    // Keyboard navigation
    this.addEventListener('keydown', this._handleKeydown.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._outsideClickHandler) {
      document.removeEventListener('click', this._outsideClickHandler);
    }
  }

  private _toggle() {
    this._open = !this._open;
    this.classList.toggle('open', this._open);
  }

  private _close() {
    this._open = false;
    this.classList.remove('open');
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this._close();
      e.preventDefault();
    }
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      if (!this._open) {
        this._toggle();
        e.preventDefault();
      }
    }
  }

  render() {
    // Build label with hotkey highlighting
    let labelHtml: string | TemplateResult = this.label;
    if (this.hotkey && this.label.toLowerCase().includes(this.hotkey.toLowerCase())) {
      const idx = this.label.toLowerCase().indexOf(this.hotkey.toLowerCase());
      const before = this.label.slice(0, idx);
      const key = this.label.slice(idx, idx + 1);
      const after = this.label.slice(idx + 1);
      labelHtml = html`${before}<span class="hotkey">${key}</span>${after}`;
    }

    return html`
      <tui-button
        variant="menu"
        ?selected=${this._open}
        @click=${this._toggle}
      >
        ${labelHtml}
      </tui-button>
      <div class="dropdown">
        <slot @click=${this._close}></slot>
      </div>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MENU ACTION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-menu-action> - Single menu action/item
 *
 * @attr {string} label - Action label
 * @attr {string} shortcut - Keyboard shortcut hint
 * @attr {boolean} danger - Style as destructive action
 * @fires action - When activated
 */
@customElement('tui-menu-action')
export class MenuAction extends LitElement {
  @property({ type: String })
  label = '';

  @property({ type: String })
  shortcut = '';

  @property({ type: Boolean, reflect: true })
  danger = false;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0.4rem 0.75rem;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-family: inherit;
        font-size: 0.85rem;
        cursor: pointer;
        text-align: left;
      }

      button:hover {
        background: var(--text-primary);
        color: var(--surface-base);
      }

      :host([danger]) button {
        color: var(--color-error);
      }

      :host([danger]) button:hover {
        background: var(--color-error);
        color: var(--surface-base);
      }

      .shortcut {
        color: var(--text-muted);
        font-size: 0.75rem;
      }

      button:hover .shortcut {
        color: var(--surface-base);
        opacity: 0.7;
      }
    `,
  ];

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent('action', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <button @click=${this._handleClick}>
        <span>${this.label}</span>
        ${this.shortcut ? html`<span class="shortcut">${this.shortcut}</span>` : ''}
      </button>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MENU DIVIDER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-menu-divider> - Divider between menu items
 */
@customElement('tui-menu-divider')
export class MenuDivider extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 1px;
      background: var(--border-default);
      margin: var(--spacing-xs) 0;
    }
  `;

  render() {
    return html``;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-menu': Menu;
    'tui-menu-item': MenuItem;
    'tui-menu-action': MenuAction;
    'tui-menu-divider': MenuDivider;
  }
}
