import type { Projection, GridCoord, ScreenCoord, ProjectionBounds } from './types.ts';

export class TriangularProjection implements Projection {
  constructor(public cellSize: number) {}

  screenToGrid(screenX: number, screenY: number, bounds: ProjectionBounds): GridCoord | null {
    const cellX = Math.floor(screenX / this.cellSize);
    const cellY = Math.floor(screenY / this.cellSize);

    const gridWidth = Math.floor(bounds.width / this.cellSize);
    const gridHeight = Math.floor(bounds.height / this.cellSize);

    if (cellX < 0 || cellX >= gridWidth || cellY < 0 || cellY >= gridHeight) {
      return null;
    }

    // Local coordinates within cell (0-1)
    const localX = (screenX % this.cellSize) / this.cellSize;
    const localY = (screenY % this.cellSize) / this.cellSize;

    // Determine region using two diagonals
    let region: string;

    if (localY < localX) {
      region = localY < 1 - localX ? 'top' : 'right';
    } else {
      region = localY < 1 - localX ? 'left' : 'bottom';
    }

    return { x: cellX, y: cellY, region };
  }

  gridToScreen(gridX: number, gridY: number, _bounds: ProjectionBounds, region?: string): ScreenCoord {
    const cellCenterX = (gridX + 0.5) * this.cellSize;
    const cellCenterY = (gridY + 0.5) * this.cellSize;

    if (!region) {
      return { x: cellCenterX, y: cellCenterY };
    }

    const offset = this.cellSize / 6;
    const offsets: Record<string, { x: number; y: number }> = {
      top: { x: 0, y: -offset },
      right: { x: offset, y: 0 },
      bottom: { x: 0, y: offset },
      left: { x: -offset, y: 0 },
    };

    const o = offsets[region] || { x: 0, y: 0 };
    return { x: cellCenterX + o.x, y: cellCenterY + o.y };
  }

  getCellPath(gridX: number, gridY: number, region?: string): string {
    const x = gridX * this.cellSize;
    const y = gridY * this.cellSize;
    const s = this.cellSize;

    if (!region) {
      return `M ${x},${y} L ${x + s},${y} L ${x + s},${y + s} L ${x},${y + s} Z`;
    }

    const cx = x + s / 2;
    const cy = y + s / 2;

    const paths: Record<string, string> = {
      top: `M ${x},${y} L ${x + s},${y} L ${cx},${cy} Z`,
      right: `M ${x + s},${y} L ${x + s},${y + s} L ${cx},${cy} Z`,
      bottom: `M ${x + s},${y + s} L ${x},${y + s} L ${cx},${cy} Z`,
      left: `M ${x},${y + s} L ${x},${y} L ${cx},${cy} Z`,
    };

    return paths[region] || '';
  }

  getDimensions(gridWidth: number, gridHeight: number): { width: number; height: number } {
    return {
      width: gridWidth * this.cellSize,
      height: gridHeight * this.cellSize,
    };
  }
}
