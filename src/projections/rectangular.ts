import type { Projection, GridCoord, ScreenCoord, ProjectionBounds } from './types';

export class RectangularProjection implements Projection {
  constructor(public cellSize: number) {}

  screenToGrid(screenX: number, screenY: number, bounds: ProjectionBounds): GridCoord | null {
    const cellX = Math.floor(screenX / this.cellSize);
    const cellY = Math.floor(screenY / this.cellSize);

    const gridWidth = Math.floor(bounds.width / this.cellSize);
    const gridHeight = Math.floor(bounds.height / this.cellSize);

    if (cellX < 0 || cellX >= gridWidth || cellY < 0 || cellY >= gridHeight) {
      return null;
    }

    return { x: cellX, y: cellY };
  }

  gridToScreen(gridX: number, gridY: number, _bounds: ProjectionBounds): ScreenCoord {
    return {
      x: (gridX + 0.5) * this.cellSize,
      y: (gridY + 0.5) * this.cellSize,
    };
  }

  getCellPath(gridX: number, gridY: number): string {
    const x = gridX * this.cellSize;
    const y = gridY * this.cellSize;
    const s = this.cellSize;
    return `M ${x},${y} L ${x + s},${y} L ${x + s},${y + s} L ${x},${y + s} Z`;
  }

  // Cache for getBoundsPath
  private _gridWidth = 0;
  private _gridHeight = 0;

  getBoundsPath(): string {
    const w = this._gridWidth * this.cellSize;
    const h = this._gridHeight * this.cellSize;
    return `M 0,0 L ${w},0 L ${w},${h} L 0,${h} Z`;
  }

  getDimensions(gridWidth: number, gridHeight: number): { width: number; height: number } {
    this._gridWidth = gridWidth;
    this._gridHeight = gridHeight;
    return {
      width: gridWidth * this.cellSize,
      height: gridHeight * this.cellSize,
    };
  }
}
