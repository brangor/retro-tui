import type { Projection, GridCoord, ScreenCoord, ProjectionBounds } from './types.ts';

export class IsometricProjection implements Projection {
  constructor(public cellSize: number) {}

  private get tileWidth() { return this.cellSize; }
  private get tileHeight() { return this.cellSize / 2; }

  // Cached grid dimensions (set by getDimensions, used by getCellPath)
  private _gridWidth = 0;
  private _gridHeight = 0;

  private getOriginX(gridHeight: number): number {
    return gridHeight * (this.tileWidth / 2);
  }

  screenToGrid(screenX: number, screenY: number, _bounds: ProjectionBounds): GridCoord | null {
    const tw = this.tileWidth;
    const th = this.tileHeight;
    const originX = this.getOriginX(this._gridHeight);

    const relX = screenX - originX;
    const relY = screenY;

    // Inverse of: screenX = originX + (gx - gy) * tw/2
    //             screenY = (gx + gy + 1) * th/2   (center Y, but we use top-aligned)
    // Using center-of-cell math:
    //   cx = originX + (gx - gy) * tw/2
    //   cy = (gx + gy) * th/2 + th/2   (center of diamond)
    // Solving for gx, gy from screen coords:
    const gridX = Math.floor((relX / (tw / 2) + relY / (th / 2)) / 2);
    const gridY = Math.floor((relY / (th / 2) - relX / (tw / 2)) / 2);

    if (gridX < 0 || gridY < 0 || gridX >= this._gridWidth || gridY >= this._gridHeight) {
      return null;
    }

    return { x: gridX, y: gridY };
  }

  gridToScreen(gridX: number, gridY: number, _bounds: ProjectionBounds): ScreenCoord {
    const tw = this.tileWidth;
    const th = this.tileHeight;
    const originX = this.getOriginX(this._gridHeight);

    return {
      x: originX + (gridX - gridY) * (tw / 2),
      y: (gridX + gridY) * (th / 2) + th / 2,
    };
  }

  getCellPath(gridX: number, gridY: number): string {
    const tw = this.tileWidth;
    const th = this.tileHeight;
    const originX = this.getOriginX(this._gridHeight);

    const cx = originX + (gridX - gridY) * (tw / 2);
    const cy = (gridX + gridY) * (th / 2) + th / 2;

    return `M ${cx},${cy - th / 2} L ${cx + tw / 2},${cy} L ${cx},${cy + th / 2} L ${cx - tw / 2},${cy} Z`;
  }

  getBoundsPath(): string {
    const tw = this.tileWidth;
    const th = this.tileHeight;
    const gw = this._gridWidth;
    const gh = this._gridHeight;
    const ox = this.getOriginX(gh);

    // Four corners of the isometric grid diamond:
    // Top: cell (0,0) top vertex
    const topX = ox;
    const topY = 0;
    // Right: cell (gw-1, 0) right vertex
    const rightX = ox + gw * (tw / 2);
    const rightY = gw * (th / 2);
    // Bottom: cell (gw-1, gh-1) bottom vertex
    const bottomX = ox + (gw - gh) * (tw / 2);
    const bottomY = (gw + gh) * (th / 2);
    // Left: cell (0, gh-1) left vertex
    const leftX = ox - gh * (tw / 2);
    const leftY = gh * (th / 2);

    return `M ${topX},${topY} L ${rightX},${rightY} L ${bottomX},${bottomY} L ${leftX},${leftY} Z`;
  }

  getDimensions(gridWidth: number, gridHeight: number): { width: number; height: number } {
    const tw = this.tileWidth;
    const th = this.tileHeight;

    // Cache for use by getCellPath and screenToGrid
    this._gridWidth = gridWidth;
    this._gridHeight = gridHeight;

    return {
      width: (gridWidth + gridHeight) * (tw / 2),
      height: (gridWidth + gridHeight) * (th / 2) + th,
    };
  }
}
