import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import { getProjection, type ProjectionType, type Projection } from '../projections/index.js';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface CanvasDrawEvent {
  x: number;
  y: number;
  region?: string;
  pointerType: string;
}

export interface CanvasDragEvent {
  x: number;
  y: number;
  region?: string;
  startX: number;
  startY: number;
  pointerType: string;
}

export interface CanvasHoverEvent {
  x: number;
  y: number;
  region?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-canvas> - Touchable grid canvas for drawing applications
 *
 * A reusable canvas component that handles pointer events reliably across
 * mouse, touch, and pen inputs. Uses setPointerCapture() to ensure continuous
 * drawing even when the pointer moves quickly.
 *
 * @attr {number} width - Grid width in cells (default: 16)
 * @attr {number} height - Grid height in cells (default: 16)
 * @attr {number} cell-size - Size of each cell in pixels (default: 20)
 * @attr {boolean} readonly - Disable drawing interactions
 * @attr {boolean} show-grid - Show grid lines between cells
 * @attr {boolean} continuous - Emit draw events continuously while dragging (vs only on new cells)
 *
 * @fires canvas-draw - When a cell is drawn on: {x, y, pointerType}
 * @fires canvas-drag - During drag operations: {x, y, startX, startY, pointerType}
 * @fires canvas-drag-start - When drag begins: {x, y, pointerType}
 * @fires canvas-drag-end - When drag ends: {x, y, startX, startY, pointerType}
 * @fires canvas-hover - When hovering over a cell: {x, y}
 * @fires canvas-leave - When pointer leaves canvas
 *
 * @slot - Custom content rendered above the grid (e.g., SVG overlay)
 *
 * @cssprop [--tui-canvas-bg] - Canvas background color
 * @cssprop [--tui-canvas-grid-color] - Grid line color
 * @cssprop [--tui-canvas-hover-color] - Hover highlight color
 */
@customElement('tui-canvas')
export class Canvas extends LitElement {
  // ─────────────────────────────────────────────────────────────────────────────
  // PROPERTIES
  // ─────────────────────────────────────────────────────────────────────────────

  @property({ type: Number })
  width = 16;

  @property({ type: Number })
  height = 16;

  @property({ type: Number, attribute: 'cell-size' })
  cellSize = 20;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, attribute: 'show-grid' })
  showGrid = true;

  @property({ type: Boolean })
  continuous = false;

  @property({ type: String })
  projection: ProjectionType = 'rectangular';

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────────────────────────────────────────

  @state()
  private hoverX = -1;

  @state()
  private hoverY = -1;

  @state()
  private projectionEngine: Projection | null = null;

  // ─────────────────────────────────────────────────────────────────────────────
  // PRIVATE
  // ─────────────────────────────────────────────────────────────────────────────

  private isDrawing = false;
  private startX = -1;
  private startY = -1;
  private lastX = -1;
  private lastY = -1;
  private lastPointerCoords: { x: number; y: number } | null = null;
  private currentPointerId: number | null = null;

  // ─────────────────────────────────────────────────────────────────────────────
  // STYLES
  // ─────────────────────────────────────────────────────────────────────────────

  static styles = [
    sharedStyles,
    css`
      :host {
        --_canvas-bg: var(--tui-canvas-bg, var(--surface-base));
        --_canvas-grid-color: var(--tui-canvas-grid-color, var(--border-default));
        --_canvas-hover-color: var(--tui-canvas-hover-color, rgba(255, 255, 255, 0.1));

        display: block;
        position: relative;
        touch-action: none; /* Critical: allows pointer events to work */
        user-select: none;
      }

      .canvas-container {
        position: relative;
        background: var(--_canvas-bg);
        overflow: hidden;
      }

      .grid-layer {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }

      .grid-layer svg {
        width: 100%;
        height: 100%;
      }

      .hover-layer {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }

      .hover-cell {
        position: absolute;
        background: var(--_canvas-hover-color);
        pointer-events: none;
      }

      .content-layer {
        position: relative;
        width: 100%;
        height: 100%;
      }

      /* Slot content positioned above grid */
      ::slotted(*) {
        position: absolute;
        inset: 0;
      }
    `,
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  // LIFECYCLE
  // ─────────────────────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback();
    this.projectionEngine = getProjection(this.projection, this.cellSize);
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (
      changedProperties.has('projection') ||
      changedProperties.has('cellSize') ||
      changedProperties.has('width') ||
      changedProperties.has('height')
    ) {
      this.projectionEngine = getProjection(this.projection, this.cellSize);
      this.hoverX = -1;
      this.hoverY = -1;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // COORDINATE CONVERSION
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Convert screen coordinates to grid cell coordinates
   */
  private screenToGrid(clientX: number, clientY: number): { x: number; y: number; region?: string } | null {
    const container = this.shadowRoot?.querySelector('.canvas-container');
    if (!container || !this.projectionEngine) return null;

    const rect = container.getBoundingClientRect();
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;

    const { width: totalW, height: totalH } = this.projectionEngine.getDimensions(this.width, this.height);

    return this.projectionEngine.screenToGrid(localX, localY, { width: totalW, height: totalH });
  }

  /**
   * Interpolate points between two screen coordinates (Bresenham-style)
   * to ensure continuous drawing even with fast pointer movement
   */
  private interpolatePoints(
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): Array<{ x: number; y: number; region?: string }> {
    const points: Array<{ x: number; y: number; region?: string }> = [];
    const dx = x1 - x0;
    const dy = y1 - y0;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Step every few pixels to catch all cells
    const steps = Math.max(1, Math.ceil(distance / (this.cellSize / 2)));

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const screenX = x0 + dx * t;
      const screenY = y0 + dy * t;
      const cell = this.screenToGrid(screenX, screenY);
      if (cell) {
        // Only add if different from last point
        const last = points[points.length - 1];
        if (!last || last.x !== cell.x || last.y !== cell.y) {
          points.push(cell);
        }
      }
    }

    return points;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // EVENT HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────

  private handlePointerDown = (e: PointerEvent) => {
    if (this.readonly) return;
    if (e.button !== 0) return; // Primary button only

    const cell = this.screenToGrid(e.clientX, e.clientY);
    if (!cell) return;

    // Capture pointer to receive all subsequent events
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();

    this.isDrawing = true;
    this.currentPointerId = e.pointerId;
    this.startX = cell.x;
    this.startY = cell.y;
    this.lastX = cell.x;
    this.lastY = cell.y;
    this.lastPointerCoords = { x: e.clientX, y: e.clientY };

    // Emit drag-start
    this.dispatchEvent(
      new CustomEvent('canvas-drag-start', {
        detail: { x: cell.x, y: cell.y, region: cell.region, pointerType: e.pointerType },
        bubbles: true,
        composed: true,
      })
    );

    // Emit initial draw
    this.dispatchEvent(
      new CustomEvent('canvas-draw', {
        detail: { x: cell.x, y: cell.y, region: cell.region, pointerType: e.pointerType },
        bubbles: true,
        composed: true,
      })
    );
  };

  private handlePointerMove = (e: PointerEvent) => {
    const cell = this.screenToGrid(e.clientX, e.clientY);

    // Update hover state
    if (cell) {
      if (cell.x !== this.hoverX || cell.y !== this.hoverY) {
        this.hoverX = cell.x;
        this.hoverY = cell.y;
        this.dispatchEvent(
          new CustomEvent('canvas-hover', {
            detail: { x: cell.x, y: cell.y, region: cell.region },
            bubbles: true,
            composed: true,
          })
        );
      }
    } else if (this.hoverX !== -1) {
      this.hoverX = -1;
      this.hoverY = -1;
    }

    // Handle drawing
    if (!this.isDrawing || this.readonly) return;
    if (e.pointerId !== this.currentPointerId) return;

    e.preventDefault();

    // Interpolate to catch all cells during fast movement
    if (this.lastPointerCoords) {
      const points = this.interpolatePoints(
        this.lastPointerCoords.x,
        this.lastPointerCoords.y,
        e.clientX,
        e.clientY
      );

      for (const point of points) {
        const isNewCell = point.x !== this.lastX || point.y !== this.lastY;

        if (isNewCell || this.continuous) {
          // Emit draw for each cell
          this.dispatchEvent(
            new CustomEvent('canvas-draw', {
              detail: { x: point.x, y: point.y, region: point.region, pointerType: e.pointerType },
              bubbles: true,
              composed: true,
            })
          );

          // Emit drag with start position
          this.dispatchEvent(
            new CustomEvent('canvas-drag', {
              detail: {
                x: point.x,
                y: point.y,
                region: point.region,
                startX: this.startX,
                startY: this.startY,
                pointerType: e.pointerType,
              },
              bubbles: true,
              composed: true,
            })
          );

          this.lastX = point.x;
          this.lastY = point.y;
        }
      }
    }

    this.lastPointerCoords = { x: e.clientX, y: e.clientY };
  };

  private handlePointerUp = (e: PointerEvent) => {
    if (!this.isDrawing) return;
    if (e.pointerId !== this.currentPointerId) return;

    // Release pointer capture
    if ((e.target as HTMLElement).hasPointerCapture?.(e.pointerId)) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }

    const cell = this.screenToGrid(e.clientX, e.clientY);

    this.dispatchEvent(
      new CustomEvent('canvas-drag-end', {
        detail: {
          x: cell?.x ?? this.lastX,
          y: cell?.y ?? this.lastY,
          region: cell?.region,
          startX: this.startX,
          startY: this.startY,
          pointerType: e.pointerType,
        },
        bubbles: true,
        composed: true,
      })
    );

    this.isDrawing = false;
    this.currentPointerId = null;
    this.lastPointerCoords = null;
  };

  private handlePointerLeave = (e: PointerEvent) => {
    // Only clear hover if we don't have capture
    if (!(e.target as HTMLElement).hasPointerCapture?.(e.pointerId)) {
      this.hoverX = -1;
      this.hoverY = -1;
      this.dispatchEvent(
        new CustomEvent('canvas-leave', {
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  private handleContextMenu = (e: Event) => {
    e.preventDefault();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER HELPERS
  // ─────────────────────────────────────────────────────────────────────────────

  private renderGrid() {
    if (!this.showGrid) return null;

    const proj = this.projectionEngine || getProjection('rectangular', this.cellSize);
    const { width: totalWidth, height: totalHeight } = proj.getDimensions(this.width, this.height);

    // Generate cell outlines using projection
    const paths: string[] = [];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        paths.push(`<path d="${proj.getCellPath(x, y)}" fill="none"/>`);
      }
    }

    return html`
      <div class="grid-layer">
        <svg viewBox="0 0 ${totalWidth} ${totalHeight}">
          <g stroke="var(--_canvas-grid-color)" stroke-width="1">
            ${paths.map((p) => html`${this.unsafeSVG(p)}`)}
          </g>
        </svg>
      </div>
    `;
  }

  // Helper to render raw SVG strings
  private unsafeSVG(svgString: string) {
    const template = document.createElement('template');
    template.innerHTML = svgString;
    return template.content.firstChild;
  }

  private renderHover() {
    if (this.hoverX < 0 || this.hoverY < 0) return null;

    const proj = this.projectionEngine || getProjection('rectangular', this.cellSize);
    const { width: totalWidth, height: totalHeight } = proj.getDimensions(this.width, this.height);
    const pathD = proj.getCellPath(this.hoverX, this.hoverY);

    return html`
      <div class="hover-layer">
        <svg viewBox="0 0 ${totalWidth} ${totalHeight}" style="width:100%;height:100%;">
          <path d="${pathD}" fill="var(--_canvas-hover-color)" />
        </svg>
      </div>
    `;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  render() {
    const proj = this.projectionEngine || getProjection('rectangular', this.cellSize);
    const { width: totalWidth, height: totalHeight } = proj.getDimensions(this.width, this.height);

    const containerStyle = `
      width: ${totalWidth}px;
      height: ${totalHeight}px;
    `;

    return html`
      <div
        class="canvas-container"
        style=${containerStyle}
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @pointercancel=${this.handlePointerUp}
        @pointerleave=${this.handlePointerLeave}
        @contextmenu=${this.handleContextMenu}
      >
        ${this.renderGrid()}
        ${this.renderHover()}
        <div class="content-layer">
          <slot></slot>
        </div>
      </div>
    `;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PUBLIC API
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Get the current canvas dimensions
   */
  getDimensions(): { width: number; height: number; cellSize: number } {
    return {
      width: this.width,
      height: this.height,
      cellSize: this.cellSize,
    };
  }

  /**
   * Convert grid coordinates to screen coordinates (center of cell)
   */
  gridToScreen(cellX: number, cellY: number): { x: number; y: number } | null {
    const container = this.shadowRoot?.querySelector('.canvas-container');
    if (!container || !this.projectionEngine) return null;

    const rect = container.getBoundingClientRect();
    const { width: totalW, height: totalH } = this.projectionEngine.getDimensions(this.width, this.height);
    const screen = this.projectionEngine.gridToScreen(cellX, cellY, { width: totalW, height: totalH });

    return {
      x: rect.left + screen.x,
      y: rect.top + screen.y,
    };
  }

  /**
   * Programmatically set hover position (useful for keyboard navigation)
   */
  setHover(x: number, y: number) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.hoverX = x;
      this.hoverY = y;
    } else {
      this.hoverX = -1;
      this.hoverY = -1;
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-canvas': Canvas;
  }
}
