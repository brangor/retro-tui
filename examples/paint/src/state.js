/**
 * Application State
 * 
 * This module contains ONLY the state object.
 * No side effects, no DOM manipulation, no imports of UI modules.
 * 
 * Mutations happen in main.js (the decision engine).
 */

import { DEFAULT_PALETTE, DEFAULT_COLOR, PALETTES } from './data/colors.js';

export const state = {
  // Canvas dimensions
  width: 16,
  height: 12,
  
  // Canvas data: 2D array of color values (null = transparent)
  grid: [],
  
  // Cursor position
  cursorX: 0,
  cursorY: 0,
  
  // Current tool
  currentTool: 'brush',
  
  // Current color
  currentColor: DEFAULT_COLOR,
  currentPalette: DEFAULT_PALETTE,
  
  // Focus management
  focusArea: 'canvas', // 'canvas' | 'palette' | 'tools'
  
  // History for undo
  history: [],
  maxHistory: 30,
};

/**
 * Initialize the grid with null (transparent) cells
 */
export function initGrid() {
  state.grid = Array(state.height)
    .fill(null)
    .map(() => Array(state.width).fill(null));
}

/**
 * Save current grid to history (for undo)
 */
export function saveHistory() {
  state.history.push(state.grid.map(row => [...row]));
  if (state.history.length > state.maxHistory) {
    state.history.shift();
  }
}

/**
 * Restore previous grid state
 * @returns {boolean} true if undo was successful
 */
export function popHistory() {
  if (state.history.length > 0) {
    state.grid = state.history.pop();
    return true;
  }
  return false;
}
