import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

type CharGrid = (string | null)[][];

/**
 * <tui-grid> — Character grid renderer
 *
 * Renders a 2D array of characters as SVG text in non-square cells,
 * matching monospace character aspect ratio. Supports pointer events
 * for painting and interaction.
 *
 * @attr {number} cols - Grid width in cells (default: 16)
 * @attr {number} rows - Grid height in cells (default: 16)
 * @attr {number} cell-width - Cell width in pixels (default: 10)
 * @attr {number} cell-height - Cell height in pixels (default: 18)
 * @attr {string} color - Text fill color (default: var(--text))
 * @attr {boolean} readonly - Disable pointer interactions
 *
 * @fires grid-draw - When a cell is clicked/drawn: { x, y }
 * @fires grid-hover - When hovering over a cell: { x, y }
 * @fires grid-leave - When pointer leaves the grid
 */
@customElement('tui-grid')
export class Grid extends LitElement {

  @property({ type: Number })
  cols = 16;

  @property({ type: Number })
  rows = 16;

  @property({ type: Number, attribute: 'cell-width' })
  cellWidth = 10;

  @property({ type: Number, attribute: 'cell-height' })
  cellHeight = 18;

  @property({ type: String })
  color = 'var(--text, #2ecc71)';

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @state()
  private _grid: CharGrid = [];

  @state()
  private _hoverX = -1;

  @state()
  private _hoverY = -1;

  private _isDrawing = false;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: inline-block;
        touch-action: none;
        user-select: none;
      }
      svg {
        display: block;
      }
      .hover-cell {
        fill: rgba(255, 255, 255, 0.08);
      }
    `,
  ];

  /** Set the full grid contents. Triggers re-render. */
  setGrid(grid: CharGrid) {
    this._grid = grid;
    this.requestUpdate();
  }

  /** Set a single cell value. */
  setCell(x: number, y: number, ch: string | null) {
    if (!this._grid[y]) return;
    this._grid[y][x] = ch;
    this.requestUpdate();
  }

  private get _totalWidth() { return this.cols * this.cellWidth; }
  private get _totalHeight() { return this.rows * this.cellHeight; }

  private _screenToGrid(e: PointerEvent): { x: number; y: number } | null {
    const svgEl = this.shadowRoot?.querySelector('svg');
    if (!svgEl) return null;
    const rect = svgEl.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / (rect.width / this.cols));
    const y = Math.floor((e.clientY - rect.top) / (rect.height / this.rows));
    if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) return null;
    return { x, y };
  }

  private _handlePointerDown = (e: PointerEvent) => {
    if (this.readonly || e.button !== 0) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
    this._isDrawing = true;
    const cell = this._screenToGrid(e);
    if (cell) {
      this.dispatchEvent(new CustomEvent('grid-draw', {
        detail: cell, bubbles: true, composed: true,
      }));
    }
  };

  private _handlePointerMove = (e: PointerEvent) => {
    const cell = this._screenToGrid(e);
    if (cell && (cell.x !== this._hoverX || cell.y !== this._hoverY)) {
      this._hoverX = cell.x;
      this._hoverY = cell.y;
      this.dispatchEvent(new CustomEvent('grid-hover', {
        detail: cell, bubbles: true, composed: true,
      }));
      if (this._isDrawing && !this.readonly) {
        this.dispatchEvent(new CustomEvent('grid-draw', {
          detail: cell, bubbles: true, composed: true,
        }));
      }
    } else if (!cell && this._hoverX !== -1) {
      this._hoverX = -1;
      this._hoverY = -1;
    }
  };

  private _handlePointerUp = (e: PointerEvent) => {
    if (!this._isDrawing) return;
    if ((e.target as HTMLElement).hasPointerCapture?.(e.pointerId)) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
    this._isDrawing = false;
  };

  private _handlePointerLeave = (e: PointerEvent) => {
    if (!(e.target as HTMLElement).hasPointerCapture?.(e.pointerId)) {
      this._hoverX = -1;
      this._hoverY = -1;
      this.dispatchEvent(new CustomEvent('grid-leave', {
        bubbles: true, composed: true,
      }));
    }
  };

  render() {
    const cw = this.cellWidth;
    const ch = this.cellHeight;
    const fontSize = ch * 0.85;

    return html`
      <svg
        viewBox="0 0 ${this._totalWidth} ${this._totalHeight}"
        width="${this._totalWidth}"
        height="${this._totalHeight}"
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerUp}
        @pointerleave=${this._handlePointerLeave}
        @contextmenu=${(e: Event) => e.preventDefault()}
      >
        ${this._hoverX >= 0 && !this.readonly ? svg`
          <rect class="hover-cell"
            x="${this._hoverX * cw}" y="${this._hoverY * ch}"
            width="${cw}" height="${ch}" />
        ` : null}
        ${this._grid.map((row, y) =>
          row.map((cell, x) =>
            cell != null ? svg`
              <text
                x="${x * cw + cw / 2}"
                y="${y * ch + ch / 2}"
                text-anchor="middle"
                dominant-baseline="central"
                fill="${this.color}"
                font-family="monospace"
                font-size="${fontSize}px"
              >${cell}</text>
            ` : null
          )
        )}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-grid': Grid;
  }
}
