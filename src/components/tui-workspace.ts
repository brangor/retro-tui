import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

/**
 * <tui-workspace> - Container for main content and floating panels
 * 
 * Manages layout and constrains floating panels to bounds.
 * Panels snap visually to edges when dragged near them.
 * 
 * @slot main - The primary content area (canvas)
 * @slot floating - Floating panels that sit above main content
 * 
 * @fires bounds-change - When workspace bounds change
 * @fires layout-change - When panel layout changes
 */
@customElement('tui-workspace')
export class Workspace extends LitElement {
  private static readonly SNAP_ZONE = 20; // pixels from edge to trigger snap

  @state()
  private _bounds: DOMRect = new DOMRect();

  @state()
  private _snapPreview: 'left' | 'right' | 'top' | null = null;

  private _resizeObserver: ResizeObserver | null = null;

  get bounds(): DOMRect {
    return this._bounds;
  }

  /**
   * Get state of all floating panels in the workspace
   */
  getPanelStates(): Array<{
    id: string;
    title: string;
    snapEdge?: 'left' | 'right' | 'top';
    x: number;
    y: number;
    width?: number;
    height?: number;
    collapsed: boolean;
    visible: boolean;
  }> {
    const states: Array<{
      id: string;
      title: string;
      snapEdge?: 'left' | 'right' | 'top';
      x: number;
      y: number;
      width?: number;
      height?: number;
      collapsed: boolean;
      visible: boolean;
    }> = [];
    
    const panels = this._getFloatingPanels();
    
    for (const panel of panels) {
      states.push({
        id: panel.id || (panel as any).title,
        title: (panel as any).title || panel.id,
        snapEdge: (panel as any).snapEdge || undefined,
        x: (panel as any).positionX ?? 0,
        y: (panel as any).positionY ?? 0,
        width: (panel as any).panelWidth ?? panel.offsetWidth,
        height: (panel as any).panelHeight ?? panel.offsetHeight,
        collapsed: (panel as any).collapsed ?? false,
        visible: !panel.hidden,
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
      }

      .main-area {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Floating layer covers entire workspace */
      .floating-layer {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 100;
      }

      .floating-layer ::slotted(*) {
        pointer-events: auto;
      }

      /* Snap preview overlay */
      .snap-preview {
        position: absolute;
        background: var(--color-info, #8be9fd);
        opacity: 0.15;
        pointer-events: none;
        z-index: 99;
        transition: opacity 0.1s;
      }

      .snap-preview.left {
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
      }

      .snap-preview.right {
        right: 0;
        top: 0;
        bottom: 0;
        width: 4px;
      }

      .snap-preview.top {
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
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

  private _detectSnapEdge(x: number, y: number, panelWidth: number, panelHeight: number): 'left' | 'right' | 'top' | null {
    const bounds = this._bounds;
    
    // Check each edge
    if (x <= Workspace.SNAP_ZONE) return 'left';
    if (x + panelWidth >= bounds.width - Workspace.SNAP_ZONE) return 'right';
    if (y <= Workspace.SNAP_ZONE) return 'top';
    
    return null;
  }

  private _handlePanelMove = (e: CustomEvent): void => {
    const panel = e.target as HTMLElement;
    if (!panel.hasAttribute('floating')) return;
    
    const { x, y } = e.detail;
    const panelWidth = (panel as any).panelWidth ?? panel.offsetWidth ?? 100;
    const panelHeight = (panel as any).panelHeight ?? panel.offsetHeight ?? 100;
    
    // Check snap zones
    const snapEdge = this._detectSnapEdge(x, y, panelWidth, panelHeight);
    this._snapPreview = snapEdge;
    
    // Constrain to bounds
    if (this._bounds.width > 0 && this._bounds.height > 0) {
      const maxX = this._bounds.width - panelWidth;
      const maxY = this._bounds.height - panelHeight;
      
      if (maxX > 0 && maxY > 0) {
        const constrainedX = Math.max(0, Math.min(x, maxX));
        const constrainedY = Math.max(0, Math.min(y, maxY));
        
        if (constrainedX !== x || constrainedY !== y) {
          (panel as any).positionX = constrainedX;
          (panel as any).positionY = constrainedY;
        }
      }
    }
  };

  private _handlePanelDragEnd = (e: CustomEvent): void => {
    const panel = e.target as HTMLElement;
    if (!panel) return;
    
    if (this._snapPreview) {
      const edge = this._snapPreview;
      const panelWidth = (panel as any).panelWidth ?? panel.offsetWidth ?? 100;
      const panelHeight = (panel as any).panelHeight ?? panel.offsetHeight ?? 100;
      
      // Snap to edge
      switch (edge) {
        case 'left':
          (panel as any).positionX = 0;
          break;
        case 'right':
          (panel as any).positionX = this._bounds.width - panelWidth;
          break;
        case 'top':
          (panel as any).positionY = 0;
          break;
      }
      
      // Set snap-edge attribute for persistence
      (panel as any).snapEdge = edge;
    } else {
      // Clear snap-edge if dropped freely
      (panel as any).snapEdge = '';
    }
    
    this._snapPreview = null;
    this._emitLayoutChange();
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
        <div class="main-area">
          <slot name="main"></slot>
        </div>
        <div class="floating-layer">
          <slot name="floating" @slotchange=${this._onFloatingSlotChange}></slot>
        </div>
        ${this._snapPreview ? html`
          <div class="snap-preview ${this._snapPreview}"></div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-workspace': Workspace;
  }
}
