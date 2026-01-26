import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';

/**
 * <retro-panel> - Collapsible panel with terminal aesthetic
 * 
 * Two style variants:
 * - 'bright' (default): Header highlights when active, bold borders
 * - 'classic': Box-draw aesthetic with shadows, subtle color changes
 * 
 * Focus states:
 * - neutral: default appearance
 * - selected: emphasized (bold border or medium shadow)
 * - active: strongest emphasis (header highlight or heavy shadow)
 * 
 * @attr {string} title - Panel title
 * @attr {string} color - Semantic color: primary | secondary | error | success | info
 *                        (Legacy: cyan | green | magenta | yellow | red still work)
 * @attr {string} variant - 'bright' | 'classic'
 * @attr {boolean} collapsible - Whether panel can be collapsed
 * @attr {boolean} collapsed - Current collapsed state
 * @attr {boolean} selected - Panel is selected but not focused
 * @attr {boolean} active - Panel is active/focused
 * @attr {string} persist-id - LocalStorage key for collapse state
 * 
 * @fires toggle - When panel is collapsed/expanded
 * @fires focus-request - When panel wants focus
 * 
 * @slot - Panel content
 */
export class RetroPanel extends LitElement {
  static properties = {
    title: { type: String },
    color: { type: String },
    variant: { type: String, reflect: true },
    collapsible: { type: Boolean },
    collapsed: { type: Boolean },
    selected: { type: Boolean, reflect: true },
    active: { type: Boolean, reflect: true },
    persistId: { type: String, attribute: 'persist-id' },
  };

  static styles = [
    sharedStyles,
    css`
      :host {
        /* Default: neutral border color */
        --panel-color: var(--color-info);
        --panel-color-bg: var(--surface-elevated);
        --panel-color-fg: var(--text-primary);
        display: block;
      }

      /* ═══════════════════════════════════════════════════════════════════
         SEMANTIC COLORS (new)
         Each sets the triplet: --panel-color, --panel-color-bg, --panel-color-fg
         ═══════════════════════════════════════════════════════════════════ */

      :host([color="primary"]) {
        --panel-color: var(--color-primary);
        --panel-color-bg: var(--color-primary-bg);
        --panel-color-fg: var(--color-primary-fg);
      }

      :host([color="secondary"]) {
        --panel-color: var(--color-secondary);
        --panel-color-bg: var(--color-secondary-bg);
        --panel-color-fg: var(--color-secondary-fg);
      }

      :host([color="error"]) {
        --panel-color: var(--color-error);
        --panel-color-bg: var(--color-error-bg);
        --panel-color-fg: var(--color-error-fg);
      }

      :host([color="success"]) {
        --panel-color: var(--color-success);
        --panel-color-bg: var(--color-success-bg);
        --panel-color-fg: var(--color-success-fg);
      }

      :host([color="info"]) {
        --panel-color: var(--color-info);
        --panel-color-bg: var(--color-info-bg);
        --panel-color-fg: var(--color-info-fg);
      }

      /* ═══════════════════════════════════════════════════════════════════
         LEGACY COLORS (backwards compatibility)
         Maps old names to semantic tokens
         ═══════════════════════════════════════════════════════════════════ */

      :host([color="cyan"]) {
        --panel-color: var(--color-primary);
        --panel-color-bg: var(--color-primary-bg);
        --panel-color-fg: var(--color-primary-fg);
      }

      :host([color="green"]) {
        --panel-color: var(--color-secondary);
        --panel-color-bg: var(--color-secondary-bg);
        --panel-color-fg: var(--color-secondary-fg);
      }

      :host([color="magenta"]) {
        --panel-color: var(--color-primary);
        --panel-color-bg: var(--color-primary-bg);
        --panel-color-fg: var(--color-primary-fg);
      }

      :host([color="yellow"]) {
        --panel-color: var(--color-info);
        --panel-color-bg: var(--color-info-bg);
        --panel-color-fg: var(--color-info-fg);
      }

      :host([color="red"]) {
        --panel-color: var(--color-error);
        --panel-color-bg: var(--color-error-bg);
        --panel-color-fg: var(--color-error-fg);
      }

      /* ═══════════════════════════════════════════════════════════════════
         PANEL BASE
         ═══════════════════════════════════════════════════════════════════ */

      .panel {
        background: var(--surface-elevated);
        border: var(--border-width, 1px) solid var(--panel-color);
        border-radius: var(--border-radius, 0);
        display: flex;
        flex-direction: column;
        min-height: 0;
        transition: border-width 0.1s, box-shadow 0.1s;
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: BRIGHT (default)
         Header highlights when active, bold borders for emphasis
         ═══════════════════════════════════════════════════════════════════ */

      /* Selected state: bold border */
      :host(:not([variant="classic"]))[selected] .panel,
      :host([variant="bright"][selected]) .panel {
        border-width: 2px;
        box-shadow: 3px 3px 0 rgba(255,255,255,0.05);
      }

      /* Active state: bold border + header highlight + heavy shadow */
      :host(:not([variant="classic"]))[active] .panel,
      :host([variant="bright"][active]) .panel {
        border-width: 2px;
        box-shadow: 4px 4px 0 rgba(255,255,255,0.08);
      }

      :host(:not([variant="classic"]))[active] .header,
      :host([variant="bright"][active]) .header {
        background: var(--panel-color-bg);
        color: var(--panel-color-fg);
      }

      :host(:not([variant="classic"]))[active] .title::before,
      :host(:not([variant="classic"]))[active] .title::after,
      :host([variant="bright"][active]) .title::before,
      :host([variant="bright"][active]) .title::after {
        opacity: 1;
      }

      :host(:not([variant="classic"]))[active] .toggle,
      :host([variant="bright"][active]) .toggle {
        color: var(--panel-color-fg);
        opacity: 1;
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: CLASSIC
         Box-draw aesthetic with shadow levels, no header highlighting
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="classic"]) .panel {
        box-shadow: 3px 3px 0 rgba(255,255,255,0.04);
      }

      /* Selected state: medium shadow */
      :host([variant="classic"][selected]) .panel {
        box-shadow: 5px 5px 0 rgba(255,255,255,0.07);
        border-color: var(--panel-color);
      }

      :host([variant="classic"][selected]) .title::before,
      :host([variant="classic"][selected]) .title::after {
        opacity: 1;
      }

      /* Active state: heavy shadow + colored title */
      :host([variant="classic"][active]) .panel {
        box-shadow: 6px 6px 0 rgba(255,255,255,0.12);
      }

      :host([variant="classic"][active]) .header {
        background: transparent;
        color: var(--panel-color);
      }

      :host([variant="classic"][active]) .title {
        text-shadow: 0 0 8px var(--panel-color);
      }

      :host([variant="classic"][active]) .title::before,
      :host([variant="classic"][active]) .title::after {
        opacity: 1;
        color: var(--panel-color);
      }

      /* ═══════════════════════════════════════════════════════════════════
         HEADER
         ═══════════════════════════════════════════════════════════════════ */

      .header {
        padding: var(--spacing-sm) var(--spacing-md);
        border-bottom: var(--border-width, 1px) solid var(--panel-color);
        color: var(--panel-color);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        user-select: none;
        font-size: 0.85rem;
        transition: background 0.1s, color 0.1s;
      }

      .header.clickable {
        cursor: pointer;
      }

      .header.clickable:hover {
        background: rgba(255, 255, 255, 0.03);
      }

      :host([active]) .header.clickable:hover {
        filter: brightness(1.1);
      }

      .toggle {
        background: none;
        border: none;
        color: inherit;
        font-family: inherit;
        font-size: 0.75rem;
        cursor: pointer;
        padding: 0;
        opacity: 0.7;
      }

      .toggle:hover {
        opacity: 1;
      }

      .title {
        display: flex;
        align-items: center;
      }

      .title::before {
        content: '┌─ ';
        opacity: 0.7;
      }

      .title::after {
        content: ' ─┐';
        opacity: 0.7;
      }

      /* ═══════════════════════════════════════════════════════════════════
         CONTENT
         ═══════════════════════════════════════════════════════════════════ */

      .content {
        flex: 1;
        overflow: auto;
        padding: var(--spacing-sm);
        min-height: 0;
      }

      .collapsed .content {
        display: none;
      }

      .collapsed .header {
        border-bottom: none;
      }

      /* Collapsed panels: lighter appearance */
      .collapsed {
        box-shadow: 2px 2px 0 rgba(255,255,255,0.03);
      }
    `,
  ];

  constructor() {
    super();
    this.title = '';
    this.color = '';
    this.variant = 'bright'; // 'bright' or 'classic'
    this.collapsible = false;
    this.collapsed = false;
    this.selected = false;
    this.active = false;
    this.persistId = '';
  }

  connectedCallback() {
    super.connectedCallback();
    
    // Restore collapse state from localStorage
    if (this.persistId) {
      const stored = localStorage.getItem(`retro-panel-${this.persistId}`);
      if (stored !== null) {
        this.collapsed = stored === 'true';
      }
    }

    // Request focus when clicked
    this.addEventListener('click', this._handleClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
  }

  _handleClick = () => {
    this.dispatchEvent(new CustomEvent('focus-request', {
      bubbles: true,
      composed: true,
      detail: { panel: this }
    }));
  };

  toggle() {
    if (this.collapsible) {
      this.collapsed = !this.collapsed;
      
      // Persist collapse state
      if (this.persistId) {
        localStorage.setItem(`retro-panel-${this.persistId}`, this.collapsed);
      }

      this.dispatchEvent(new CustomEvent('toggle', {
        detail: { collapsed: this.collapsed },
        bubbles: true,
        composed: true,
      }));
    }
  }

  render() {
    return html`
      <div class="panel ${this.collapsed ? 'collapsed' : ''}">
        <div 
          class="header ${this.collapsible ? 'clickable' : ''}"
          @click=${this.toggle}
        >
          ${this.collapsible ? html`
            <button class="toggle" aria-label="Toggle panel">
              ${this.collapsed ? '▸' : '▾'}
            </button>
          ` : ''}
          <span class="title">${this.title}</span>
        </div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('retro-panel', RetroPanel);
