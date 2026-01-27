import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type FocusContext = 'workspace' | 'sidebar' | 'menu';

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-app> - Opinionated app shell layout
 * 
 * Chrome-only layout providing:
 * - Header with menu bar
 * - Workspace (center, primary focus)
 * - Sidebar (right, collapsible)
 * - Status bar (bottom)
 * 
 * Focus Contexts:
 * - Tab cycles between: workspace → sidebar
 * - Arrow keys navigate within current context
 * - Escape retreats (close menu → close modal → nothing)
 * 
 * @slot header - App title/branding (optional)
 * @slot menu - Menu bar items
 * @slot main - Primary workspace content
 * @slot sidebar - Right sidebar panels (optional)
 * @slot status - Status bar content (optional)
 * 
 * @attr {string} title - App title displayed in header
 * @attr {string} subtitle - Subtitle shown after title
 */
@customElement('tui-app')
export class App extends LitElement {
  @property({ type: String, reflect: true })
  title = 'TUI';

  @property({ type: String, reflect: true })
  subtitle = '';

  @state()
  private _focusContext: FocusContext = 'workspace';

  @state()
  private _menuOpen = false;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background: var(--surface-base);
        color: var(--text-primary);
      }

      /* ═══════════════════════════════════════════════════════════════════
         HEADER - Unified terminal aesthetic
         ═══════════════════════════════════════════════════════════════════ */
      
      .header {
        border: var(--border-width) solid var(--color-primary);
        border-top: none;
        padding: var(--spacing-sm) var(--spacing-md);
        position: relative;
        flex-shrink: 0;
        margin: 0 var(--spacing-md);
        background: var(--surface-base);
      }

      /* Box-draw corner decorations */
      :host::before {
        content: '╔';
        position: absolute;
        top: -1px;
        left: -1px;
        color: var(--color-primary);
        line-height: 1;
      }

      :host::after {
        content: '╗';
        position: absolute;
        top: -1px;
        right: -1px;
        color: var(--color-primary);
        line-height: 1;
      }

      .header__top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-md);
      }

      .header__title {
        color: var(--color-primary);
        font-size: var(--spacing-md);
        font-weight: normal;
        margin: 0;
      }

      .header__title span {
        color: var(--color-secondary);
      }

      .header__right {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
      }

      .header__menu {
        display: flex;
        gap: var(--spacing-xs);
      }

      /* ═══════════════════════════════════════════════════════════════════
         MAIN CONTAINER
         ═══════════════════════════════════════════════════════════════════ */

      .container {
        display: flex;
        flex: 1;
        padding: 0.75rem var(--spacing-md);
        min-height: 0;
        gap: 0;
      }

      /* Workspace slot - grows to fill all available space */
      .workspace-area {
        flex: 1;
        min-width: 0;
        min-height: 0;
        display: flex;
      }

      /* Sidebar slot - fixed width, only shown when has content */
      .sidebar-area {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        width: 280px;
        flex-shrink: 0;
      }

      /* Hide sidebar when empty - use :has() for reliable detection */
      .sidebar-area:not(:has(::slotted(*))) {
        display: none;
        width: 0;
      }

      /* ═══════════════════════════════════════════════════════════════════
         STATUS BAR - Unified terminal aesthetic
         ═══════════════════════════════════════════════════════════════════ */

      .status-bar {
        background: var(--surface-elevated);
        border: var(--border-width) solid var(--color-primary);
        border-bottom: none;
        padding: 0;
        display: flex;
        align-items: stretch;
        font-size: 0.8rem;
        flex-shrink: 0;
        margin: 0 var(--spacing-md);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .status-bar:empty {
        display: none;
      }

      /* Box-draw corner decorations */
      .status-bar::before {
        content: '╚';
        position: absolute;
        bottom: -1px;
        left: -1px;
        color: var(--color-primary);
        line-height: 1;
      }

      .status-bar::after {
        content: '╝';
        position: absolute;
        bottom: -1px;
        right: -1px;
        color: var(--color-primary);
        line-height: 1;
      }

      .status-wrapper {
        position: relative;
        margin: 0 var(--spacing-md);
      }

      /* ═══════════════════════════════════════════════════════════════════
         FOCUS CONTEXT INDICATORS
         ═══════════════════════════════════════════════════════════════════ */

      .workspace-area:focus-within,
      .sidebar-area:focus-within {
        outline: 1px dashed var(--color-primary);
        outline-offset: 2px;
      }

      /* Hide focus outline when using mouse */
      :host(.using-mouse) .workspace-area:focus-within,
      :host(.using-mouse) .sidebar-area:focus-within {
        outline: none;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    
    // Track mouse vs keyboard usage for focus styling
    this.addEventListener('mousedown', () => this.classList.add('using-mouse'));
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.classList.remove('using-mouse');
      }
      this._handleGlobalKeydown(e);
    });
  }

  private _handleGlobalKeydown(e: KeyboardEvent) {
    // Escape retreats
    if (e.key === 'Escape') {
      if (this._menuOpen) {
        this._menuOpen = false;
        e.preventDefault();
      }
      // Could also close modals here
      return;
    }

    // Tab cycles focus contexts
    if (e.key === 'Tab' && !e.ctrlKey && !e.altKey) {
      // Let default tab behavior work, but could intercept for custom cycling
    }
  }

  render() {
    const displayTitle = this.subtitle 
      ? html`░░ ${this.title} <span>[ ${this.subtitle} ]</span> ░░`
      : html`░░ ${this.title} ░░`;

    return html`
      <header class="header">
        <div class="header__top">
          <h1 class="header__title">
            <slot name="header">${displayTitle}</slot>
          </h1>
          <div class="header__right">
            <slot name="header-right"></slot>
          </div>
        </div>
        <nav class="header__menu">
          <slot name="menu"></slot>
        </nav>
      </header>

      <div class="container">
        <div class="workspace-area" data-focus-context="workspace">
          <slot name="main"></slot>
        </div>
        
        <div class="sidebar-area" data-focus-context="sidebar">
          <slot name="sidebar"></slot>
        </div>
      </div>

      <footer class="status-bar">
        <slot name="status"></slot>
      </footer>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-app': App;
  }
}
