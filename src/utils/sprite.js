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
    // Convert layer frame data: spaces → null (transparent), then delegate to overlay
    const data = frameData.map(row =>
      row.map(ch => (ch === ' ' ? null : ch))
    );
    frame = overlay(frame, {
      location: layer.location,
      size: layer.size,
      data,
    });
  }

  return frame;
}

export function createMoodCycler(moods, initialMood) {
  let current = initialMood;
  let index = 0;

  return {
    get mood() { return current; },

    setMood(name) {
      if (moods[name]) {
        current = name;
        index = 0;
      }
    },

    next() {
      const mood = moods[current];
      const selections = {};
      for (const [layer, cycle] of Object.entries(mood)) {
        selections[layer] = cycle[index % cycle.length];
      }
      index++;
      return selections;
    },
  };
}
