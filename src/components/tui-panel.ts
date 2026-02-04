import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type PanelColor = 'primary' | 'secondary' | 'error' | 'success' | 'info' | 'cyan' | 'green' | 'magenta' | 'yellow' | 'red' | '';
type PanelVariant = 'bright' | 'classic';
type SelectionStyle = 'invert' | 'border' | '';

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-panel> - Floating panel with terminal aesthetic
 * 
 * Panels are floating by default and can be dragged within a tui-workspace.
 * They snap visually to edges when dragged near them.
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
 * @attr {string} selection-style - Selection feedback style: 'invert' | 'border'
 *                                  Inherited by child components (toolbar, buttons)
 * @attr {boolean} floating - Whether panel is floating (default: true)
 * @attr {string} snap-edge - Edge the panel is snapped to: 'left' | 'right' | 'top' | ''
 * @attr {number} position-x - X position in pixels
 * @attr {number} position-y - Y position in pixels
 * @attr {boolean} collapsible - Whether panel can be collapsed
 * @attr {boolean} collapsed - Current collapsed state
 * @attr {boolean} dismissable - Whether panel can be dismissed
 * @attr {boolean} resizable - Whether panel can be resized
 * @attr {boolean} selected - Panel is selected but not focused
 * @attr {boolean} active - Panel is active/focused
 * @attr {string} persist-id - LocalStorage key for collapse state
 * 
 * @fires toggle - When panel is collapsed/expanded
 * @fires panel-move - When panel is dragged
 * @fires panel-drag-end - When panel drag ends
 * @fires panel-dismiss - When panel is dismissed
 * @fires panel-resize - When panel is resized
 * @fires focus-request - When panel wants focus
 * 
 * @slot - Panel content
 * 
 * @cssprop [--selection-style] - Inherited selection style for child components
 */
@customElement('tui-panel')
export class Panel extends LitElement {
  @property({ type: String })
  title = '';

  @property({ type: String })
  color: PanelColor = '';

  @property({ type: String, reflect: true })
  variant: PanelVariant = 'bright';

  @property({ type: String, attribute: 'selection-style', reflect: true })
  selectionStyle: SelectionStyle = '';

  @property({ type: Boolean })
  collapsible = false;

  @property({ type: Boolean, reflect: true })
  collapsed = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: String, attribute: 'persist-id' })
  persistId = '';

  @property({ type: Boolean, reflect: true })
  dismissable = false;

  @property({ type: Boolean, reflect: true })
  floating = true; // Default to floating

  @property({ type: String, attribute: 'snap-edge', reflect: true })
  snapEdge: 'left' | 'right' | 'top' | '' = '';

  @property({ type: Number, attribute: 'position-x' })
  positionX = 0;

  @property({ type: Number, attribute: 'position-y' })
  positionY = 0;

  @property({ type: Boolean, reflect: true })
  resizable = false;

  @property({ type: Boolean, reflect: true })
  minimized = false;

  @property({ type: Number, attribute: 'panel-width' })
  panelWidth: number | null = null;

  @property({ type: Number, attribute: 'panel-height' })
  panelHeight: number | null = null;

  @property({ type: Number, attribute: 'max-width' })
  maxWidth: number | null = null;

  @property({ type: Number, attribute: 'max-height' })
  maxHeight: number | null = null;

  @property({ type: Number, attribute: 'min-width' })
  minWidth = 150;

  @property({ type: Number, attribute: 'min-height' })
  minHeight = 100;

  @property({ 
    type: String, 
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => value || '',
      toAttribute: (value: string) => value || null  // Don't reflect empty string
    }
  })
  docked: 'left' | 'right' | 'top' | 'bottom' | '' = '';

  // Private drag state
  private _isDragging = false;
  private _dragStartX = 0;
  private _dragStartY = 0;
  private _dragOffsetX = 0;
  private _dragOffsetY = 0;

  // Private resize state
  private _isResizing = false;
  private _resizeStartX = 0;
  private _resizeStartY = 0;
  private _resizeStartWidth = 0;
  private _resizeStartHeight = 0;

  // Pre-minimize state for restoration
  private _preMinimizeX = 0;
  private _preMinimizeY = 0;
  private _preMinimizeWidth: number | null = null;
  private _preMinimizeHeight: number | null = null;

  static styles = [
    sharedStyles,
    css`
      :host {
        /* Default: neutral border color */
        --panel-color: var(--color-info);
        --panel-color-bg: var(--surface-elevated);
        --panel-color-fg: var(--text-primary);
        
        /* Pass selection-style to children (inheritable) */
        --selection-style: var(--parent-selection-style, invert);
        
        display: block;
      }

      /* Hidden panels (dismissed) */
      :host([hidden]) {
        display: none !important;
      }
      
      /* When selection-style attribute is set, override and pass to children */
      :host([selection-style="invert"]) {
        --selection-style: invert;
      }
      
      :host([selection-style="border"]) {
        --selection-style: border;
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
        position: relative;
        background: var(--surface-elevated);
        border: var(--border-width, 1px) solid var(--panel-color);
        border-radius: var(--border-radius, 0);
        display: flex;
        flex-direction: column;
        min-height: 0;
        height: auto;
        min-height: 100%;
        transition: border-width 0.1s, box-shadow 0.1s;
      }

      /* Collapsed: shrink to header only */
      .collapsed {
        min-height: 0;
        height: auto;
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

      .header-controls {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs, 4px);
        margin-left: auto;
      }

      .dismiss-btn {
        background: none;
        border: none;
        color: inherit;
        font-family: inherit;
        font-size: 0.85rem;
        cursor: pointer;
        padding: 0 2px;
        opacity: 0.6;
        line-height: 1;
      }

      .dismiss-btn:hover {
        opacity: 1;
        color: var(--color-error, #ff5555);
      }

      .collapse-btn {
        background: none;
        border: none;
        color: inherit;
        font-family: inherit;
        font-size: 0.75rem;
        cursor: pointer;
        padding: 0 2px;
        opacity: 0.7;
        line-height: 1;
      }

      .collapse-btn:hover {
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
        /* Smooth collapse animation */
        max-height: 1000px;
        transition: max-height 0.2s ease-out, padding 0.2s ease-out, opacity 0.15s ease-out;
        opacity: 1;
      }

      .collapsed .content {
        max-height: 0;
        padding-top: 0;
        padding-bottom: 0;
        opacity: 0;
        overflow: hidden;
      }

      .collapsed .header {
        border-bottom: none;
      }

      /* Collapsed panels: lighter appearance */
      .collapsed {
        box-shadow: 2px 2px 0 rgba(255,255,255,0.03);
      }

      /* ═══════════════════════════════════════════════════════════════════
         FLOATING POSITIONING
         ═══════════════════════════════════════════════════════════════════ */

      :host([floating]) {
        position: absolute;
        z-index: 100;
      }

      /* Floating panel shadow */
      :host([floating]) .panel {
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3), 
                    6px 6px 0 rgba(255, 255, 255, 0.05);
      }

      .header.floating {
        cursor: grab;
      }

      .header.floating:active {
        cursor: grabbing;
      }

      .header.draggable {
        cursor: grab;
      }

      .header.draggable:active {
        cursor: grabbing;
      }

      /* ═══════════════════════════════════════════════════════════════════
         RESIZE HANDLE
         ═══════════════════════════════════════════════════════════════════ */

      .resize-handle {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 12px;
        height: 12px;
        cursor: se-resize;
        opacity: 0.5;
      }

      .resize-handle::before {
        content: '◢';
        position: absolute;
        right: 2px;
        bottom: 0;
        font-size: 10px;
        color: var(--panel-color);
      }

      .resize-handle:hover {
        opacity: 1;
      }

      /* ═══════════════════════════════════════════════════════════════════
         DOCKED STATE
         ═══════════════════════════════════════════════════════════════════ */

      :host([docked]) {
        position: relative !important;
        left: auto !important;
        top: auto !important;
        z-index: auto;
      }

      :host([docked]) .panel {
        box-shadow: none;
      }

      :host([docked="left"]),
      :host([docked="right"]) {
        width: 100% !important;
        height: auto;
      }

      :host([docked="top"]),
      :host([docked="bottom"]) {
        width: 100% !important;
        height: auto;
      }

      /* Collapsed docked panels shrink to header only */
      :host([docked][collapsed]) {
        height: auto !important;
        min-height: 0 !important;
      }

      :host([docked][collapsed]) .panel {
        height: auto;
        min-height: 0;
      }

      /* Collapsed floating panels also shrink to header only */
      :host([floating][collapsed]) {
        height: auto !important;
        min-height: 0 !important;
      }

      :host([floating][collapsed]) .panel {
        height: auto;
        min-height: 0;
      }

      /* ═══════════════════════════════════════════════════════════════════
         MINIMIZED STATE (edge tab)
         ═══════════════════════════════════════════════════════════════════ */

      :host([minimized]) {
        width: auto !important;
        height: auto !important;
        min-width: 0 !important;
        min-height: 0 !important;
      }

      :host([minimized]) .panel {
        display: none;
      }

      .edge-tab {
        display: none;
      }

      :host([minimized]) .edge-tab {
        display: flex;
        align-items: center;
        justify-content: center;
        writing-mode: vertical-rl;
        text-orientation: mixed;
        padding: 12px 6px;
        background: var(--surface-elevated, #1a1a2e);
        border: 1px solid var(--panel-color);
        color: var(--panel-color);
        font-size: 0.75rem;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        transition: background 0.15s, color 0.15s;
      }

      /* Left edge tab styling */
      :host([minimized][snap-edge="left"]) .edge-tab {
        border-left: none;
        border-radius: 0 4px 4px 0;
      }

      /* Right edge tab styling */
      :host([minimized][snap-edge="right"]) .edge-tab {
        writing-mode: vertical-lr;
        border-right: none;
        border-radius: 4px 0 0 4px;
      }

      :host([minimized]) .edge-tab:hover {
        background: var(--panel-color-bg);
        color: var(--panel-color-fg);
      }

      /* Matrix-style collapse animation */
      @keyframes matrix-collapse {
        0% { opacity: 1; transform: scaleX(1); }
        50% { opacity: 0.6; transform: scaleX(0.3); filter: blur(2px); }
        100% { opacity: 0; transform: scaleX(0); }
      }

      @keyframes matrix-expand {
        0% { opacity: 0; transform: scaleX(0); }
        50% { opacity: 0.6; transform: scaleX(0.3); filter: blur(2px); }
        100% { opacity: 1; transform: scaleX(1); }
      }

      :host([minimized]) .edge-tab {
        animation: matrix-expand 0.25s ease-out;
      }
    `,
  ];

  private _handleClick = (): void => {
    this.dispatchEvent(new CustomEvent('focus-request', {
      bubbles: true,
      composed: true,
      detail: { panel: this }
    }));
  };

  connectedCallback(): void {
    super.connectedCallback();
    
    // Restore collapse state from localStorage
    if (this.persistId) {
      const stored = localStorage.getItem(`tui-panel-${this.persistId}`);
      if (stored !== null) {
        this.collapsed = stored === 'true';
      }
    }

    // Request focus when clicked
    this.addEventListener('click', this._handleClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    document.removeEventListener('pointermove', this._onDragMove);
    document.removeEventListener('pointerup', this._onDragEnd);
    document.removeEventListener('pointermove', this._onResizeMove);
    document.removeEventListener('pointerup', this._onResizeEnd);
  }

  toggle(): void {
    if (this.collapsible) {
      this.collapsed = !this.collapsed;
      
      // Persist collapse state
      if (this.persistId) {
        localStorage.setItem(`tui-panel-${this.persistId}`, String(this.collapsed));
      }

      this.dispatchEvent(new CustomEvent('toggle', {
        detail: { collapsed: this.collapsed },
        bubbles: true,
        composed: true,
      }));
    }
  }

  dismiss(): void {
    // If dismissable panels should minimize instead of hide
    if (this.floating && this.dismissable) {
      this.minimize();
      return;
    }

    // Original dismiss behavior for non-floating or explicit hide
    if (this.persistId) {
      const memory = {
        x: this.positionX,
        y: this.positionY,
        width: this.panelWidth,
        height: this.panelHeight,
        collapsed: this.collapsed,
        snapEdge: this.snapEdge,
      };
      localStorage.setItem(`tui-panel-memory-${this.persistId}`, JSON.stringify(memory));
    }

    const event = new CustomEvent('panel-dismiss', {
      detail: { panelId: this.id || this.title },
      bubbles: true,
      composed: true,
      cancelable: true,
    });

    const notCancelled = this.dispatchEvent(event);

    if (notCancelled) {
      this.hidden = true;
    }
  }

  /**
   * Minimize panel to edge tab
   */
  minimize(): void {
    if (this.minimized) return;

    // Store current position for restoration
    this._preMinimizeX = this.positionX;
    this._preMinimizeY = this.positionY;
    this._preMinimizeWidth = this.panelWidth;
    this._preMinimizeHeight = this.panelHeight;

    // Default to left edge if no snap-edge set
    if (!this.snapEdge) {
      this.snapEdge = 'left';
    }

    this.minimized = true;

    this.dispatchEvent(new CustomEvent('panel-minimize', {
      detail: { panelId: this.id || this.title },
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Restore panel from minimized state
   */
  restore(): void {
    if (!this.minimized) return;

    // Restore position
    this.positionX = this._preMinimizeX;
    this.positionY = this._preMinimizeY;
    if (this._preMinimizeWidth !== null) this.panelWidth = this._preMinimizeWidth;
    if (this._preMinimizeHeight !== null) this.panelHeight = this._preMinimizeHeight;

    this.minimized = false;

    this.dispatchEvent(new CustomEvent('panel-restore', {
      detail: { panelId: this.id || this.title },
      bubbles: true,
      composed: true,
    }));
  }

  private _onEdgeTabClick = (): void => {
    this.restore();
  };

  /**
   * Restore panel position/state from localStorage
   * @returns true if restored, false if no stored state
   */
  restorePosition(): boolean {
    if (!this.persistId) return false;
    
    const stored = localStorage.getItem(`tui-panel-memory-${this.persistId}`);
    if (!stored) return false;
    
    try {
      const memory = JSON.parse(stored);
      
      if (memory.x !== undefined) this.positionX = memory.x;
      if (memory.y !== undefined) this.positionY = memory.y;
      if (memory.width !== undefined) this.panelWidth = memory.width;
      if (memory.height !== undefined) this.panelHeight = memory.height;
      if (memory.collapsed !== undefined) this.collapsed = memory.collapsed;
      if (memory.snapEdge !== undefined) this.snapEdge = memory.snapEdge;
      
      return true;
    } catch (e) {
      console.warn(`[tui-panel] Failed to restore position for ${this.persistId}:`, e);
      return false;
    }
  }

  private _onDragStart = (e: PointerEvent): void => {
    if (!this.floating) return;
    
    // Don't start drag if clicking on a control button (collapse, dismiss)
    const target = e.target as HTMLElement;
    if (target.closest('.collapse-btn') || target.closest('.dismiss-btn')) {
      return;
    }
    
    e.preventDefault();
    this._isDragging = true;
    this._dragStartX = e.clientX;
    this._dragStartY = e.clientY;
    this._dragOffsetX = this.positionX;
    this._dragOffsetY = this.positionY;
    
    document.addEventListener('pointermove', this._onDragMove);
    document.addEventListener('pointerup', this._onDragEnd);
  };

  private _onDragMove = (e: PointerEvent): void => {
    if (!this._isDragging) return;
    
    const deltaX = e.clientX - this._dragStartX;
    const deltaY = e.clientY - this._dragStartY;
    
    this.positionX = this._dragOffsetX + deltaX;
    this.positionY = this._dragOffsetY + deltaY;
    
    this.dispatchEvent(new CustomEvent('panel-move', {
      detail: { 
        panelId: this.id || this.title,
        x: this.positionX, 
        y: this.positionY,
        cursorY: e.clientY  // For drop index calculation
      },
      bubbles: true,
      composed: true,
    }));
  };

  private _onDragEnd = (): void => {
    this._isDragging = false;
    document.removeEventListener('pointermove', this._onDragMove);
    document.removeEventListener('pointerup', this._onDragEnd);
    
    this.dispatchEvent(new CustomEvent('panel-drag-end', {
      detail: { 
        panelId: this.id || this.title,
        x: this.positionX,
        y: this.positionY
      },
      bubbles: true,
      composed: true,
    }));
  };

  private _onResizeStart = (e: PointerEvent): void => {
    if (!this.resizable) return;
    
    e.preventDefault();
    e.stopPropagation();
    this._isResizing = true;
    this._resizeStartX = e.clientX;
    this._resizeStartY = e.clientY;
    this._resizeStartWidth = this.panelWidth ?? this.offsetWidth;
    this._resizeStartHeight = this.panelHeight ?? this.offsetHeight;
    
    document.addEventListener('pointermove', this._onResizeMove);
    document.addEventListener('pointerup', this._onResizeEnd);
  };

  private _onResizeMove = (e: PointerEvent): void => {
    if (!this._isResizing) return;
    
    const deltaX = e.clientX - this._resizeStartX;
    const deltaY = e.clientY - this._resizeStartY;
    
    let newWidth = this._resizeStartWidth + deltaX;
    let newHeight = this._resizeStartHeight + deltaY;
    
    // Apply constraints
    newWidth = Math.max(this.minWidth, newWidth);
    newHeight = Math.max(this.minHeight, newHeight);
    if (this.maxWidth !== null) newWidth = Math.min(this.maxWidth, newWidth);
    if (this.maxHeight !== null) newHeight = Math.min(this.maxHeight, newHeight);
    
    this.panelWidth = newWidth;
    this.panelHeight = newHeight;
    
    this.dispatchEvent(new CustomEvent('panel-resize', {
      detail: { 
        panelId: this.id || this.title,
        width: this.panelWidth, 
        height: this.panelHeight 
      },
      bubbles: true,
      composed: true,
    }));
  };

  private _onResizeEnd = (): void => {
    this._isResizing = false;
    document.removeEventListener('pointermove', this._onResizeMove);
    document.removeEventListener('pointerup', this._onResizeEnd);
  };

  private _onCollapseClick = (e: Event): void => {
    e.stopPropagation();
    this.toggle();
  };

  private _onDismissClick = (e: Event): void => {
    e.stopPropagation();
    this.dismiss();
  };

  firstUpdated(): void {
    // Apply initial position for floating panels
    if (this.floating) {
      this.style.left = `${this.positionX}px`;
      this.style.top = `${this.positionY}px`;
    }
  }

  updated(changedProperties: Map<string, unknown>): void {
    // Handle minimized positioning
    if (this.minimized) {
      // Position on the appropriate edge
      if (this.snapEdge === 'right') {
        this.style.left = 'auto';
        this.style.right = '0';
      } else {
        // Default to left
        this.style.left = '0';
        this.style.right = 'auto';
      }
      this.style.top = `${this.positionY}px`;
      this.style.width = '';
      this.style.height = '';
      this.style.minWidth = '';
      this.style.minHeight = '';
      return;
    }

    // Normal position handling for non-minimized...
    if (this.floating) {
      if (changedProperties.has('positionX') || changedProperties.has('positionY') ||
          changedProperties.has('floating') || changedProperties.has('minimized')) {
        this.style.left = `${this.positionX}px`;
        this.style.top = `${this.positionY}px`;
        this.style.right = 'auto';
      }
    }

    // ... rest of sizing logic unchanged
    if (changedProperties.has('panelWidth') && this.panelWidth !== null) {
      this.style.width = `${this.panelWidth}px`;
    }
    if (changedProperties.has('panelHeight') || changedProperties.has('collapsed')) {
      if (this.collapsed) {
        // When collapsed, clear inline height so CSS can control it
        this.style.height = '';
      } else if (this.panelHeight !== null) {
        this.style.height = `${this.panelHeight}px`;
      }
    }
    if (changedProperties.has('maxWidth') && this.maxWidth !== null) {
      this.style.maxWidth = `${this.maxWidth}px`;
    }
    if (changedProperties.has('maxHeight') && this.maxHeight !== null) {
      this.style.maxHeight = `${this.maxHeight}px`;
    }
    if (changedProperties.has('minWidth')) {
      this.style.minWidth = `${this.minWidth}px`;
    }
    if (changedProperties.has('minHeight') && !this.collapsed) {
      this.style.minHeight = `${this.minHeight}px`;
    } else if (this.collapsed && changedProperties.has('collapsed')) {
      this.style.minHeight = '';
    }
  }

  render() {
    // Render edge tab when minimized
    if (this.minimized) {
      return html`
        <div class="edge-tab" @click=${this._onEdgeTabClick} title="Click to restore ${this.title}">
          ${this.title}
        </div>
      `;
    }

    // Normal panel render
    return html`
      <div class="panel ${this.collapsed ? 'collapsed' : ''}">
        <div
          class="header ${this.floating ? 'draggable' : ''}"
          @pointerdown=${this.floating ? this._onDragStart : undefined}
        >
          <span class="title">${this.title}</span>
          <div class="header-controls">
            ${this.collapsible ? html`
              <button class="collapse-btn" aria-label="Toggle panel" @click=${this._onCollapseClick}>
                ${this.collapsed ? '▸' : '▾'}
              </button>
            ` : ''}
            ${this.dismissable ? html`
              <button class="dismiss-btn" aria-label="Minimize panel" @click=${this._onDismissClick}>−</button>
            ` : ''}
          </div>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        ${this.resizable && this.floating ? html`
          <div class="resize-handle" @pointerdown=${this._onResizeStart}></div>
        ` : ''}
      </div>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-panel': Panel;
  }
}
