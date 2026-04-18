/**
 * Sprite Utility — layer composition, grid creation, and frame management.
 * Pure data manipulation — no DOM, no Lit.
 */

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

/** A 2D array of characters, row-major. null = transparent cell. */
export type CharGrid = (string | null)[][];

/** A positioned region of character data to stamp onto a grid. */
export interface Layer {
  location: { x: number; y: number };
  size: { width: number; height: number };
  data: CharGrid;
}

/** A named layer within a sprite, containing multiple named frames. */
export interface SpriteLayer {
  name: string;
  location: { x: number; y: number };
  size: { width: number; height: number };
  frames: Record<string, CharGrid>;
}

/** A complete sprite definition — body template, composable layers, and mood configurations. */
export interface SpriteDefinition {
  name?: string;
  size: { width: number; height: number };
  body: { default: string[] };
  layers: SpriteLayer[];
  moods: MoodMap;
}

/** Map of mood name → per-layer frame name cycles. */
export type MoodMap = Record<string, Record<string, string[]>>;

/** A mood cycler returned by createMoodCycler(). */
export interface MoodCycler {
  /** Current mood name. */
  readonly mood: string;
  /** Switch to a different mood. Resets all cycle indices. Ignores unknown names. */
  setMood(name: string): void;
  /** Advance all layer cycles by one tick and return the frame name selections. */
  next(): Record<string, string>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// GRID CREATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Create an empty grid filled with null.
 */
export function createGrid(width: number, height: number): CharGrid {
  return Array.from({ length: height }, () => Array(width).fill(null));
}

// ═══════════════════════════════════════════════════════════════════════════════
// OVERLAY
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Stamp a positioned layer onto a base grid. Non-null cells in the layer
 * overwrite the base; null cells are transparent (base shows through).
 * Returns a new grid — does not mutate the input.
 */
export function overlay(base: CharGrid, layer: Layer): CharGrid {
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

// ═══════════════════════════════════════════════════════════════════════════════
// BODY CONVERSION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Convert an array of strings into a CharGrid.
 * Spaces become null (transparent). Short lines are padded with null.
 */
export function bodyToGrid(lines: string[], width: number, height: number): CharGrid {
  const grid = createGrid(width, height);
  for (let y = 0; y < lines.length && y < height; y++) {
    for (let x = 0; x < lines[y].length && x < width; x++) {
      const ch = lines[y][x];
      if (ch !== ' ') grid[y][x] = ch;
    }
  }
  return grid;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPOSE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Compose a sprite frame from a sprite definition and layer frame selections.
 * Builds the body grid, then overlays each layer using the selected frame.
 * Spaces in layer frame data are converted to null (transparent) before overlay.
 */
export function compose(sprite: SpriteDefinition, selections: Record<string, string>): CharGrid {
  const { size, body, layers } = sprite;
  let frame = bodyToGrid(body.default, size.width, size.height);

  for (const layer of layers) {
    const frameName = selections[layer.name];
    const frameData = layer.frames[frameName]
      || layer.frames[Object.keys(layer.frames)[0]];
    // Convert layer frame data: spaces → null (transparent), then delegate to overlay
    const data: CharGrid = frameData.map(row =>
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

// ═══════════════════════════════════════════════════════════════════════════════
// MOOD CYCLING
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Create a mood cycler that tracks independent frame indices per layer.
 * Each mood defines per-layer frame name arrays that cycle independently.
 */
export function createMoodCycler(moods: MoodMap, initialMood: string): MoodCycler {
  let current = initialMood;
  let index = 0;

  return {
    get mood() { return current; },

    setMood(name: string) {
      if (moods[name]) {
        current = name;
        index = 0;
      }
    },

    next(): Record<string, string> {
      const mood = moods[current];
      const selections: Record<string, string> = {};
      for (const [layer, cycle] of Object.entries(mood)) {
        selections[layer] = cycle[index % cycle.length];
      }
      index++;
      return selections;
    },
  };
}
