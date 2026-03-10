import { RectangularProjection } from './rectangular.ts';
import { IsometricProjection } from './isometric.ts';
import { TriangularProjection } from './triangular.ts';
import type { Projection } from './types.ts';

export type ProjectionType = 'rectangular' | 'isometric' | 'triangular';

export function getProjection(type: ProjectionType, cellSize: number): Projection {
  switch (type) {
    case 'rectangular':
      return new RectangularProjection(cellSize);
    case 'isometric':
      return new IsometricProjection(cellSize);
    case 'triangular':
      return new TriangularProjection(cellSize);
    default:
      throw new Error(`Unknown projection type: ${type}`);
  }
}

export { RectangularProjection } from './rectangular.ts';
export { IsometricProjection } from './isometric.ts';
export { TriangularProjection } from './triangular.ts';
export type { Projection, GridCoord, ScreenCoord, ProjectionBounds } from './types.ts';
