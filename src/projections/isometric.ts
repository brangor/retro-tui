import type { Projection, GridCoord, ScreenCoord, ProjectionBounds } from './types.ts';

export class IsometricProjection implements Projection {
  constructor(public cellSize: number) {}

  private get tileWidth() { return this.cellSize; }
  private get tileHeight() { return this.cellSize / 2; }

  screenToGrid(screenX: number, screenY: number, bounds: ProjectionBounds): GridCoord | null {
    const tw = this.tileWidth;
    const th = this.tileHeight;
    const originX = bounds.width / 2;

    const relX = screenX - originX;
    const relY = screenY;

    const gridX = Math.floor((relX / (tw / 2) + relY / (th / 2)) / 2);
    const gridY = Math.floor((relY / (th / 2) - relX / (tw / 2)) / 2);

    // Derive max grid dimension from bounds
    // getDimensions(w, h) produces width = (w+h)*tw/2
    // We don't know w and h individually, but we can use a conservative bound
    const totalTiles = Math.round(bounds.width / (tw / 2));

    if (gridX < 0 || gridY < 0 || gridX >= totalTiles || gridY >= totalTiles) {
      return null;
    }

    return { x: gridX, y: gridY };
  }

  gridToScreen(gridX: number, gridY: number, bounds: ProjectionBounds): ScreenCoord {
    const tw = this.tileWidth;
    const th = this.tileHeight;
    const originX = bounds.width / 2;

    return {
      x: originX + (gridX - gridY) * (tw / 2),
      y: (gridX + gridY) * (th / 2),
    };
  }

  getCellPath(gridX: number, gridY: number): string {
    const tw = this.tileWidth;
    const th = this.tileHeight;
    const cx = (gridX - gridY) * (tw / 2);
    const cy = (gridX + gridY) * (th / 2);

    return `M ${cx},${cy - th / 2} L ${cx + tw / 2},${cy} L ${cx},${cy + th / 2} L ${cx - tw / 2},${cy} Z`;
  }

  getDimensions(gridWidth: number, gridHeight: number): { width: number; height: number } {
    const tw = this.tileWidth;
    const th = this.tileHeight;
    return {
      width: (gridWidth + gridHeight) * (tw / 2),
      height: (gridWidth + gridHeight) * (th / 2),
    };
  }
}
