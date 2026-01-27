import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

type SidebarSide = 'left' | 'right' | 'top' | 'bottom';

/**
 * <tui-sidebar> - Edge-docked container for panels
 * 
 * Stacks panels vertically (left/right) or horizontally (top/bottom).
 * Can be collapsed to a thin strip showing panel names.
 * 
 * @attr {string} side - Which edge: 'left' | 'right' | 'top' | 'bottom'
 * @attr {boolean} collapsed - Whether sidebar is collapsed
 * @attr {number} size - Width (left/right) or height (top/bottom) in pixels
 * @attr {number} min-size - Minimum size in pixels
 * 
 * @slot - Panels to stack in the sidebar
 * 
 * @fires sidebar-collapse - When collapsed state changes
 * @fires sidebar-resize - When sidebar is resized
 */
@customElement('tui-sidebar')
export class Sidebar extends LitElement {
  @property({ type: String, reflect: true })
  side: SidebarSide = 'left';

  @property({ type: Boolean, reflect: true })
  collapsed = false;

  @property({ type: Number })
  size = 250;

  @property({ type: Number, attribute: 'min-size' })
  minSize = 150;

  @state()
  private _panelNames: string[] = [];

  // Resize state
  private _isResizing = false;
  private _resizeStartPos = 0;
  private _resizeStartSize = 0;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        background: var(--surface-elevated);
        border: 1px solid var(--color-info);
        position: relative;
        box-sizing: border-box;
      }

      /* Orientation based on side */
      :host([side="left"]),
      :host([side="right"]) {
        height: 100%;
      }

      :host([side="top"]),
      :host([side="bottom"]) {
        width: 100%;
      }

      .sidebar {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
      }

      :host([side="top"]) .sidebar,
      :host([side="bottom"]) .sidebar {
        flex-direction: row;
      }

      .header {
        padding: var(--spacing-xs) var(--spacing-sm);
        border-bottom: 1px solid var(--color-info);
        color: var(--color-info);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.75rem;
        user-select: none;
        cursor: grab;
        flex-shrink: 0;
      }

      :host([side="top"]) .header,
      :host([side="bottom"]) .header {
        border-bottom: none;
        border-right: 1px solid var(--color-info);
        writing-mode: vertical-rl;
        text-orientation: mixed;
        padding: var(--spacing-sm) var(--spacing-xs);
      }

      .collapse-btn {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        font-size: 0.7rem;
        opacity: 0.7;
      }

      .collapse-btn:hover {
        opacity: 1;
      }

      .content {
        flex: 1;
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: 1px;
        min-height: 0;
      }

      :host([side="top"]) .content,
      :host([side="bottom"]) .content {
        flex-direction: row;
      }

      /* Collapsed state */
      :host([collapsed]) .content {
        display: none;
      }

      :host([collapsed]) {
        width: auto !important;
        height: auto !important;
      }

      :host([side="left"][collapsed]),
      :host([side="right"][collapsed]) {
        width: 24px !important;
      }

      :host([side="top"][collapsed]),
      :host([side="bottom"][collapsed]) {
        height: 24px !important;
      }

      .collapsed-label {
        display: none;
        writing-mode: vertical-rl;
        text-orientation: mixed;
        font-size: 0.65rem;
        letter-spacing: 0.1em;
        color: var(--color-info);
        padding: var(--spacing-sm);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }

      :host([side="top"][collapsed]) .collapsed-label,
      :host([side="bottom"][collapsed]) .collapsed-label {
        writing-mode: horizontal-tb;
      }

      :host([collapsed]) .collapsed-label {
        display: block;
      }

      :host([collapsed]) .header {
        display: none;
      }

      /* Resize handle */
      .resize-handle {
        position: absolute;
        background: transparent;
        z-index: 10;
      }

      :host([side="left"]) .resize-handle {
        right: -2px;
        top: 0;
        bottom: 0;
        width: 5px;
        cursor: ew-resize;
      }

      :host([side="right"]) .resize-handle {
        left: -2px;
        top: 0;
        bottom: 0;
        width: 5px;
        cursor: ew-resize;
      }

      :host([side="top"]) .resize-handle {
        bottom: -2px;
        left: 0;
        right: 0;
        height: 5px;
        cursor: ns-resize;
      }

      :host([side="bottom"]) .resize-handle {
        top: -2px;
        left: 0;
        right: 0;
        height: 5px;
        cursor: ns-resize;
      }

      .resize-handle:hover {
        background: var(--color-info);
        opacity: 0.3;
      }
    `,
  ];

  private _updatePanelNames(): void {
    const slot = this.shadowRoot?.querySelector('slot:not([name])');
    if (!slot) {
      this._panelNames = [];
      return;
    }
    const elements = (slot as HTMLSlotElement).assignedElements();
    this._panelNames = elements.map(el => (el as any).title || el.id || 'Panel');
  }

  private _toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(new CustomEvent('sidebar-collapse', {
      detail: { side: this.side, collapsed: this.collapsed },
      bubbles: true,
      composed: true,
    }));
  }

  private _onResizeStart = (e: PointerEvent): void => {
    e.preventDefault();
    this._isResizing = true;
    this._resizeStartPos = this.side === 'left' || this.side === 'right' ? e.clientX : e.clientY;
    this._resizeStartSize = this.size;
    
    document.addEventListener('pointermove', this._onResizeMove);
    document.addEventListener('pointerup', this._onResizeEnd);
  };

  private _onResizeMove = (e: PointerEvent): void => {
    if (!this._isResizing) return;
    
    const currentPos = this.side === 'left' || this.side === 'right' ? e.clientX : e.clientY;
    let delta = currentPos - this._resizeStartPos;
    
    // Invert delta for right/bottom
    if (this.side === 'right' || this.side === 'bottom') {
      delta = -delta;
    }
    
    const newSize = Math.max(this.minSize, this._resizeStartSize + delta);
    this.size = newSize;
    
    this.dispatchEvent(new CustomEvent('sidebar-resize', {
      detail: { side: this.side, size: this.size },
      bubbles: true,
      composed: true,
    }));
  };

  private _onResizeEnd = (): void => {
    this._isResizing = false;
    document.removeEventListener('pointermove', this._onResizeMove);
    document.removeEventListener('pointerup', this._onResizeEnd);
  };

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('pointermove', this._onResizeMove);
    document.removeEventListener('pointerup', this._onResizeEnd);
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('size') && !this.collapsed) {
      if (this.side === 'left' || this.side === 'right') {
        this.style.width = `${this.size}px`;
      } else {
        this.style.height = `${this.size}px`;
      }
    }
  }

  render() {
    const collapsedLabel = `SIDEBAR ‹${this._panelNames.join(', ')}›`;

    return html`
      <div class="sidebar">
        <div class="header">
          <span>SIDEBAR</span>
          <button class="collapse-btn" @click=${this._toggleCollapse} aria-label="Toggle sidebar">
            ${this.collapsed ? '▸' : '▾'}
          </button>
        </div>
        <div class="content">
          <slot @slotchange=${this._updatePanelNames}></slot>
        </div>
        <div class="collapsed-label" @click=${this._toggleCollapse}>
          ${collapsedLabel}
        </div>
      </div>
      ${!this.collapsed ? html`
        <div class="resize-handle" @pointerdown=${this._onResizeStart}></div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-sidebar': Sidebar;
  }
}
