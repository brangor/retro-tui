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

  @state()
  private _bounds: DOMRect = new DOMRect();

  @state()
  private _dockPreview: string | null = null;

  private _resizeObserver: ResizeObserver | null = null;

  get bounds(): DOMRect {
    return this._bounds;
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
    if (!panel.hasAttribute('draggable')) return;
    
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
    
    // Constrain to bounds
    const constrainedX = Math.max(0, Math.min(x, this._bounds.width - panelWidth));
    const constrainedY = Math.max(0, Math.min(y, this._bounds.height - panelHeight));
    
    // Update panel position if constrained
    if (constrainedX !== x || constrainedY !== y) {
      (panel as any).positionX = constrainedX;
      (panel as any).positionY = constrainedY;
    }
    
    this._emitLayoutChange();
  };

  private _handlePanelDragEnd = (e: CustomEvent): void => {
    if (this._dockPreview) {
      this.dispatchEvent(new CustomEvent('panel-dock', {
        detail: { 
          panelId: e.detail?.panelId, 
          side: this._dockPreview 
        },
        bubbles: true,
        composed: true,
      }));
    }
    this._dockPreview = null;
  };

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
    const panels = this._getFloatingPanels();
    for (const panel of panels) {
      if (!panel.hasAttribute('draggable')) continue;
      
      const x = (panel as any).positionX ?? 0;
      const y = (panel as any).positionY ?? 0;
      const panelWidth = (panel as any).panelWidth ?? panel.offsetWidth ?? 100;
      const panelHeight = (panel as any).panelHeight ?? panel.offsetHeight ?? 100;
      
      const constrainedX = Math.max(0, Math.min(x, this._bounds.width - panelWidth));
      const constrainedY = Math.max(0, Math.min(y, this._bounds.height - panelHeight));
      
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
