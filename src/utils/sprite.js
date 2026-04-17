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

export function bodyToGrid(lines, width, height) {
  const grid = createGrid(width, height);
  for (let y = 0; y < lines.length && y < height; y++) {
    for (let x = 0; x < lines[y].length && x < width; x++) {
      const ch = lines[y][x];
      if (ch !== ' ') grid[y][x] = ch;
    }
  }
  return grid;
}

export function compose(sprite, selections) {
  const { size, body, layers } = sprite;
  let frame = bodyToGrid(body.default, size.width, size.height);

  for (const layer of layers) {
    const frameName = selections[layer.name];
    const frameData = layer.frames[frameName]
      || layer.frames[Object.keys(layer.frames)[0]];
    // Write layer data directly onto frame; spaces become null (transparent holes)
    for (let y = 0; y < layer.size.height; y++) {
      for (let x = 0; x < layer.size.width; x++) {
        const ty = layer.location.y + y;
        const tx = layer.location.x + x;
        if (ty < size.height && tx < size.width) {
          const ch = frameData[y]?.[x];
          frame[ty][tx] = (ch == null || ch === ' ') ? null : ch;
        }
      }
    }
  }

  return frame;
}
