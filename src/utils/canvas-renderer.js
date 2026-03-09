/**
 * Canvas Renderer — Shared utility for rendering grid state to SVG.
 *
 * Transforms a 2D grid array into SVG path elements using a projection's
 * getCellPath() method. Each app provides a cellRenderer callback that
 * decides how each cell (or sub-cell region) looks.
 *
 * Works with any projection type (rectangular, isometric, triangular).
 *
 * @example Rectangular / Isometric (whole-cell rendering)
 * ```js
 * const svg = renderGrid({
 *   grid,
 *   projection,
 *   cellRenderer: (x, y, cell) => ({ fill: cell.color }),
 * });
 * ```
 *
 * @example Triangular (region-based rendering)
 * ```js
 * const svg = renderGrid({
 *   grid,
 *   projection,
 *   regions: ['top', 'right', 'bottom', 'left'],
 *   cellRenderer: (x, y, cell, region) => {
 *     if (!cell[region]) return null;
 *     return { fill: cell[region].color };
 *   },
 * });
 * ```
 */

/**
 * Render grid state to SVG path elements.
 *
 * @param {Object} opts
 * @param {Array<Array<any>>} opts.grid - 2D array of cell data (app-defined shape)
 * @param {Object} opts.projection - Projection instance with getCellPath(x, y, region?)
 * @param {Function} opts.cellRenderer - (x, y, cell, region?) => { fill, stroke?, strokeWidth?, opacity? } | null
 * @param {string[]} [opts.regions] - Sub-cell regions for projections that support them (e.g. triangular)
 * @param {Function} [opts.sortOrder] - Optional (x, y) iteration order. Receives (width, height), returns [{x, y}]
 * @returns {string} SVG path elements as an HTML string
 */
export function renderGrid({ grid, projection, cellRenderer, regions, sortOrder }) {
  const height = grid.length;
  const width = height > 0 ? grid[0].length : 0;

  // Ensure projection is initialized with grid dimensions.
  // Projections like IsometricProjection cache grid size in getDimensions()
  // and use it in getCellPath() for origin offset calculations.
  if (projection.getDimensions) {
    projection.getDimensions(width, height);
  }

  // Default iteration: row by row, left to right
  const coords = sortOrder
    ? sortOrder(width, height)
    : defaultOrder(width, height);

  let paths = '';

  for (const { x, y } of coords) {
    const cell = grid[y][x];
    if (!cell) continue;

    if (regions) {
      for (const region of regions) {
        const style = cellRenderer(x, y, cell, region);
        if (!style) continue;
        const d = projection.getCellPath(x, y, region);
        paths += buildPath(d, style);
      }
    } else {
      const style = cellRenderer(x, y, cell);
      if (!style) continue;
      const d = projection.getCellPath(x, y);
      paths += buildPath(d, style);
    }
  }

  return paths;
}

/**
 * Isometric back-to-front sort order.
 * Iterates by ascending (x + y) sum so closer tiles overlap farther ones.
 */
export function isometricOrder(width, height) {
  const coords = [];
  for (let sum = 0; sum < width + height - 1; sum++) {
    for (let y = 0; y <= sum; y++) {
      const x = sum - y;
      if (x >= 0 && x < width && y >= 0 && y < height) {
        coords.push({ x, y });
      }
    }
  }
  return coords;
}

function defaultOrder(width, height) {
  const coords = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      coords.push({ x, y });
    }
  }
  return coords;
}

function buildPath(d, { fill, stroke = 'none', strokeWidth = 0, opacity = 1 }) {
  let attrs = `d="${d}" fill="${fill}"`;
  if (stroke !== 'none') attrs += ` stroke="${stroke}" stroke-width="${strokeWidth}"`;
  if (opacity < 1) attrs += ` opacity="${opacity}"`;
  return `<path ${attrs}/>`;
}
