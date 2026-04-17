/**
 * Sprite Utility — layer composition, grid creation, and frame management.
 * Pure data manipulation — no DOM, no Lit.
 *
 * @typedef {(string|null)[][]} CharGrid
 * @typedef {{ location: {x: number, y: number}, size: {width: number, height: number}, data: CharGrid }} Layer
 */

export function createGrid(width, height) {
  return Array.from({ length: height }, () => Array(width).fill(null));
}

export function overlay(base, layer) {
  const result = base.map(row => [...row]);
  const { location, size, data } = layer;
  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      const ch = data[y]?.[x];
      if (ch == null) continue;
      const tx = location.x + x;
      const ty = location.y + y;
      if (ty < result.length && tx < result[ty].length) {
        result[ty][tx] = ch;
      }
    }
  }
  return result;
}
