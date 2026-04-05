import { RectangularProjection } from './rectangular';
import { IsometricProjection } from './isometric';
import { TriangularProjection } from './triangular';
import type { Projection } from './types';

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

export { RectangularProjection } from './rectangular';
export { IsometricProjection } from './isometric';
export { TriangularProjection } from './triangular';
export type { Projection, GridCoord, ScreenCoord, ProjectionBounds } from './types';
