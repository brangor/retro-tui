import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

/**
 * <tui-workspace> - Container for main content, sidebars, and floating panels
 * 
 * Manages layout zones and constrains floating panels to bounds.
 * Detects gravity zones near edges for dock/undock behavior.
 * 
 * @slot main - The primary content area (canvas)
 * @slot left - Left sidebar
 * @slot right - Right sidebar
 * @slot top - Top sidebar
 * @slot bottom - Bottom sidebar
 * @slot floating - Floating panels that sit above main content
 * 
 * @attr {number} gravity-zone - Pixels from edge to trigger dock preview (default 50)
 * 
 * @fires bounds-change - When workspace bounds change
 * @fires layout-change - When panel layout changes
 * @fires panel-dock-preview - When panel enters gravity zone during drag
 * @fires panel-dock - When panel dropped in gravity zone
 */
@customElement('tui-workspace')
export class Workspace extends LitElement {
  @property({ type: Number, attribute: 'gravity-zone' })
  gravityZone = 50;

  @property({ type: Boolean, attribute: 'auto-dock' })
  autoDock = false;

  @state()
  private _bounds: DOMRect = new DOMRect();

  @state()
  private _dockPreview: string | null = null;

  private _resizeObserver: ResizeObserver | null = null;

  get bounds(): DOMRect {
    return this._bounds;
  }

  /**
   * Get state of all panels in the workspace (for View menu integration)
   */
  getPanelStates(): Array<{
    id: string;
    title: string;
    mode: 'floating' | 'docked';
    side?: 'left' | 'right' | 'top' | 'bottom';
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    collapsed: boolean;
    visible: boolean;
  }> {
    const states: Array<{
      id: string;
      title: string;
      mode: 'floating' | 'docked';
      side?: 'left' | 'right' | 'top' | 'bottom';
      x?: number;
      y?: number;
      width?: number;
      height?: number;
      collapsed: boolean;
      visible: boolean;
    }> = [];
    
    const allPanels = this.querySelectorAll('tui-panel');
    
    for (const panel of allPanels) {
      const el = panel as HTMLElement;
      const docked = (el as any).docked;
      const isDocked = !!docked && docked !== '';
      
      states.push({
        id: el.id || (el as any).title,
        title: (el as any).title || el.id,
        mode: isDocked ? 'docked' : 'floating',
        side: isDocked ? docked : undefined,
        x: isDocked ? undefined : ((el as any).positionX ?? 0),
        y: isDocked ? undefined : ((el as any).positionY ?? 0),
        width: (el as any).panelWidth ?? el.offsetWidth,
        height: (el as any).panelHeight ?? el.offsetHeight,
        collapsed: (el as any).collapsed ?? false,
        visible: !el.hidden,
      });
    }
    
    return states;
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .workspace {
        position: relative;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-areas:
          "top top top"
          "left main right"
          "bottom bottom bottom";
        grid-template-rows: auto 1fr auto;
        grid-template-columns: auto 1fr auto;
      }

      .sidebar-top {
        grid-area: top;
      }

      .sidebar-left {
        grid-area: left;
      }

      .sidebar-right {
        grid-area: right;
      }

      .sidebar-bottom {
        grid-area: bottom;
      }

      .main-area {
        grid-area: main;
        position: relative;
        overflow: auto;
        min-width: 0;
        min-height: 0;
      }

      .floating-layer {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 100;
      }

      .floating-layer ::slotted(*) {
        pointer-events: auto;
      }

      /* Dock preview overlay */
      .dock-preview {
        position: absolute;
        background: var(--color-info, #8be9fd);
        opacity: 0.15;
        pointer-events: none;
        z-index: 99;
        transition: opacity 0.1s;
      }

      .dock-preview.left {
        left: 0;
        top: 0;
        bottom: 0;
        width: 200px;
      }

      .dock-preview.right {
        right: 0;
        top: 0;
        bottom: 0;
        width: 200px;
      }

      .dock-preview.top {
        top: 0;
        left: 0;
        right: 0;
        height: 150px;
      }

      .dock-preview.bottom {
        bottom: 0;
        left: 0;
        right: 0;
        height: 150px;
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    
    // ResizeObserver may not be available in test environments
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this._bounds = entry.contentRect;
          this.dispatchEvent(new CustomEvent('bounds-change', {
            detail: { bounds: this._bounds },
            bubbles: true,
            composed: true,
          }));
        }
      });
      
      this._resizeObserver.observe(this);
    } else {
      // Fallback for test environments
      this._bounds = new DOMRect(0, 0, this.offsetWidth || 800, this.offsetHeight || 600);
    }
    
    // Listen for panel events
    this.addEventListener('panel-move', this._handlePanelMove as EventListener);
    this.addEventListener('panel-resize', this._handlePanelResize as EventListener);
    this.addEventListener('panel-dismiss', this._handlePanelDismiss as EventListener);
    this.addEventListener('panel-drag-end', this._handlePanelDragEnd as EventListener);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this.removeEventListener('panel-move', this._handlePanelMove as EventListener);
    this.removeEventListener('panel-resize', this._handlePanelResize as EventListener);
    this.removeEventListener('panel-dismiss', this._handlePanelDismiss as EventListener);
    this.removeEventListener('panel-drag-end', this._handlePanelDragEnd as EventListener);
  }

  private _detectGravityZone(x: number, y: number, panelWidth: number, panelHeight: number): string | null {
    const bounds = this._bounds;
    
    // Check each edge - priority: left, right, top, bottom
    if (x <= this.gravityZone) return 'left';
    if (x + panelWidth >= bounds.width - this.gravityZone) return 'right';
    if (y <= this.gravityZone) return 'top';
    if (y + panelHeight >= bounds.height - this.gravityZone) return 'bottom';
    
    return null;
  }

  private _handlePanelMove = (e: CustomEvent): void => {
    const panel = e.target as HTMLElement;
    const isFloating = panel.hasAttribute('floating');
    const isDocked = !!(panel as any).docked;
    
    // Only handle floating or docked panels (docked panels can be dragged to undock)
    if (!isFloating && !isDocked) return;
    
    const { x, y } = e.detail;
    const panelWidth = (panel as any).panelWidth ?? panel.offsetWidth ?? 100;
    const panelHeight = (panel as any).panelHeight ?? panel.offsetHeight ?? 100;
    
    // Check gravity zones
    const gravityZone = this._detectGravityZone(x, y, panelWidth, panelHeight);
    this._dockPreview = gravityZone;
    
    if (gravityZone) {
      this.dispatchEvent(new CustomEvent('panel-dock-preview', {
        detail: { panelId: e.detail.panelId, side: gravityZone },
        bubbles: true,
        composed: true,
      }));
    }
    
    // Constrain to bounds (only for floating panels)
    if (isFloating && this._bounds.width > 0 && this._bounds.height > 0) {
      const maxX = this._bounds.width - panelWidth;
      const maxY = this._bounds.height - panelHeight;
      
      // Only constrain if bounds can fit the panel
      if (maxX > 0 && maxY > 0) {
        const constrainedX = Math.max(0, Math.min(x, maxX));
        const constrainedY = Math.max(0, Math.min(y, maxY));
        
        // Update panel position if constrained
        if (constrainedX !== x || constrainedY !== y) {
          (panel as any).positionX = constrainedX;
          (panel as any).positionY = constrainedY;
        }
      }
    }
    
    this._emitLayoutChange();
  };

  private _handlePanelDragEnd = (e: CustomEvent): void => {
    const panelId = e.detail?.panelId;
    const panel = panelId ? this._findPanelById(panelId) : null;
    
    if (this._dockPreview) {
      // Dropping in a gravity zone
      const side = this._dockPreview as 'left' | 'right' | 'top' | 'bottom';
      
      this.dispatchEvent(new CustomEvent('panel-dock', {
        detail: { panelId, side },
        bubbles: true,
        composed: true,
      }));
      
      // If auto-dock enabled, set the panel's attributes and move it
      if (this.autoDock && panel) {
        // Store last floating position for potential restore
        (panel as any)._lastFloatingPosition = {
          x: (panel as any).positionX,
          y: (panel as any).positionY,
          width: (panel as any).panelWidth,
          height: (panel as any).panelHeight,
        };
        
        // Set docked attribute, clear floating
        (panel as any).docked = side;
        (panel as any).floating = false;
        
        // Move panel to appropriate container
        const sidebar = this._getSidebar(side);
        if (sidebar) {
          // Append to sidebar (no slot needed, sidebar is the parent)
          panel.removeAttribute('slot');
          sidebar.appendChild(panel);
        } else {
          // No sidebar - dock directly to workspace slot
          panel.slot = side;
          this.appendChild(panel);
        }
      }
    } else if (this.autoDock && panel && (panel as any).docked) {
      // Dropping outside gravity zones while docked = undock
      const x = e.detail?.x ?? 100;
      const y = e.detail?.y ?? 100;
      
      this.dispatchEvent(new CustomEvent('panel-undock', {
        detail: { panelId, x, y },
        bubbles: true,
        composed: true,
      }));
      
      (panel as any).docked = '';
      (panel as any).floating = true;
      (panel as any).positionX = x;
      (panel as any).positionY = y;
      
      // Move panel back to workspace with floating slot
      panel.slot = 'floating';
      this.appendChild(panel);
    }
    
    this._dockPreview = null;
  };

  private _findPanelById(panelId: string): HTMLElement | null {
    const allPanels = this.querySelectorAll('tui-panel');
    for (const panel of allPanels) {
      if (panel.id === panelId || (panel as any).title === panelId) {
        return panel as HTMLElement;
      }
    }
    return null;
  }

  private _getSidebar(side: 'left' | 'right' | 'top' | 'bottom'): HTMLElement | null {
    const slot = this.shadowRoot?.querySelector(`slot[name="${side}"]`) as HTMLSlotElement;
    if (!slot) return null;
    
    const elements = slot.assignedElements();
    for (const el of elements) {
      if (el.tagName.toLowerCase() === 'tui-sidebar') {
        return el as HTMLElement;
      }
    }
    
    return null;
  }

  private _handlePanelResize = (e: CustomEvent): void => {
    const panel = e.target as HTMLElement;
    if (!panel.hasAttribute('resizable')) return;
    
    const { width, height } = e.detail;
    const x = (panel as any).positionX ?? 0;
    const y = (panel as any).positionY ?? 0;
    
    // Constrain size to available space
    const maxWidth = this._bounds.width - x;
    const maxHeight = this._bounds.height - y;
    
    const constrainedWidth = Math.min(width, maxWidth);
    const constrainedHeight = Math.min(height, maxHeight);
    
    if (constrainedWidth !== width) (panel as any).panelWidth = constrainedWidth;
    if (constrainedHeight !== height) (panel as any).panelHeight = constrainedHeight;
    
    this._emitLayoutChange();
  };

  private _handlePanelDismiss = (_e: CustomEvent): void => {
    // Just emit layout change - actual hiding is handled by app
    this._emitLayoutChange();
  };

  private _emitLayoutChange(): void {
    const panels = this._getFloatingPanels();
    const layout = panels.map(p => ({
      id: p.id || (p as any).title,
      x: (p as any).positionX,
      y: (p as any).positionY,
      width: (p as any).panelWidth ?? p.offsetWidth,
      height: (p as any).panelHeight ?? p.offsetHeight,
    }));
    
    this.dispatchEvent(new CustomEvent('layout-change', {
      detail: { panels: layout, bounds: this._bounds },
      bubbles: true,
      composed: true,
    }));
  }

  private _getFloatingPanels(): HTMLElement[] {
    const slot = this.shadowRoot?.querySelector('slot[name="floating"]') as HTMLSlotElement;
    if (!slot) return [];
    return slot.assignedElements() as HTMLElement[];
  }

  private _constrainAllPanels(): void {
    // Don't constrain if bounds aren't set yet
    if (this._bounds.width <= 0 || this._bounds.height <= 0) return;
    
    const panels = this._getFloatingPanels();
    for (const panel of panels) {
      if (!panel.hasAttribute('floating')) continue;
      
      const x = (panel as any).positionX ?? 0;
      const y = (panel as any).positionY ?? 0;
      const panelWidth = (panel as any).panelWidth ?? panel.offsetWidth ?? 100;
      const panelHeight = (panel as any).panelHeight ?? panel.offsetHeight ?? 100;
      
      // Only constrain if panel would actually be outside bounds
      const maxX = this._bounds.width - panelWidth;
      const maxY = this._bounds.height - panelHeight;
      
      // Skip constraint if bounds are too small to fit the panel
      if (maxX < 0 || maxY < 0) continue;
      
      const constrainedX = Math.max(0, Math.min(x, maxX));
      const constrainedY = Math.max(0, Math.min(y, maxY));
      
      if (constrainedX !== x) (panel as any).positionX = constrainedX;
      if (constrainedY !== y) (panel as any).positionY = constrainedY;
    }
  }

  private _onFloatingSlotChange(): void {
    // Delay to allow panels to render with their dimensions
    requestAnimationFrame(() => {
      this._constrainAllPanels();
    });
  }

  render() {
    return html`
      <div class="workspace">
        <div class="sidebar-top">
          <slot name="top"></slot>
        </div>
        <div class="sidebar-left">
          <slot name="left"></slot>
        </div>
        <div class="main-area">
          <slot name="main"></slot>
          <div class="floating-layer">
            <slot name="floating" @slotchange=${this._onFloatingSlotChange}></slot>
          </div>
          ${this._dockPreview ? html`
            <div class="dock-preview ${this._dockPreview}"></div>
          ` : ''}
        </div>
        <div class="sidebar-right">
          <slot name="right"></slot>
        </div>
        <div class="sidebar-bottom">
          <slot name="bottom"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-workspace': Workspace;
  }
}
