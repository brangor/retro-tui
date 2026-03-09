export interface GridCoord {
  x: number;
  y: number;
  region?: string;
}

export interface ScreenCoord {
  x: number;
  y: number;
}

export interface ProjectionBounds {
  width: number;
  height: number;
}

export interface Projection {
  cellSize: number;
  screenToGrid(screenX: number, screenY: number, bounds: ProjectionBounds): GridCoord | null;
  gridToScreen(gridX: number, gridY: number, bounds: ProjectionBounds, region?: string): ScreenCoord;
  getCellPath(gridX: number, gridY: number, region?: string): string;
  getDimensions(gridWidth: number, gridHeight: number): { width: number; height: number };
  /** SVG path tracing the outer boundary of the full grid */
  getBoundsPath(): string;
}
