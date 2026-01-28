/**
 * Paint App - Decision Engine
 * 
 * This is the central coordinator for the application.
 * All events from panels flow here, and all cross-panel
 * effects are decided here.
 * 
 * Architecture:
 * ┌─────────────────────────────────────────────────────────┐
 * │                    Decision Engine                      │
 * │  • Owns all state mutations                            │
 * │  • Listens to events from all panels                   │
 * │  • Coordinates cross-panel effects                     │
 * │  • Handles keyboard shortcuts                          │
 * └─────────────────────────────────────────────────────────┘
 *            │              │              │
 *            ↓              ↓              ↓
 *       ┌─────────┐   ┌──────────┐   ┌──────────┐
 *       │ Toolbar │   │  Canvas  │   │ Palette  │
 *       │ events↑ │   │ events↑  │   │ events↑  │
 *       │ props↓  │   │ props↓   │   │ props↓   │
 *       └─────────┘   └──────────┘   └──────────┘
 */

// RetroTUI components
import '../../../src/index.js';
import { tuiToast } from '../../../src/index.js';

// Data
import { PALETTES } from './data/colors.js';
import { TOOLS, TOOLS_BY_KEY, TOOLS_BY_ID } from './data/tools.js';

// State
import { state, initGrid, saveHistory, popHistory } from './state.js';

// UI modules
import { 
  renderCanvas, 
  initCanvasEvents, 
  updateCell, 
  updateCursor 
} from './ui/canvas.js';

import { 
  renderPaletteTabs, 
  renderColorSwatches, 
  selectByIndex 
} from './ui/palette.js';

// ═══════════════════════════════════════════════════════════════════════════
// ELEMENT CACHE
// ═══════════════════════════════════════════════════════════════════════════

const el = {
  canvas: null,
  tabs: null,
  swatches: null,
  toolbar: null,
};

// ═══════════════════════════════════════════════════════════════════════════
// DECISION ENGINE - Central Event Handler
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Central event handler - all panel events flow through here
 * @param {string} event - Event name (e.g., 'canvas:draw', 'palette:color')
 * @param {Object} detail - Event payload
 */
function emit(event, detail = {}) {
  // Uncomment to debug event flow:
  // console.log(`[${event}]`, detail);
  
  switch (event) {
    // ─── Canvas Events ───────────────────────────────────────────────
    case 'canvas:draw':
      handleDraw(detail.x, detail.y);
      break;
      
    case 'canvas:hover':
      handleHover(detail.x, detail.y);
      break;
    
    // ─── Palette Events ──────────────────────────────────────────────
    case 'palette:tab':
      state.currentPalette = detail.palette;
      state.currentColor = PALETTES[detail.palette][0];
      renderPaletteTabs(el.tabs, PALETTES, state.currentPalette, emit);
      renderColorSwatches(el.swatches, PALETTES[state.currentPalette], 
                          state.currentColor, emit);
      updateStatus('color', state.currentColor.name);
      break;
      
    case 'palette:color':
      state.currentColor = detail.color;
      renderColorSwatches(el.swatches, PALETTES[state.currentPalette], 
                          state.currentColor, emit);
      updateStatus('color', detail.color.name);
      break;
    
    // ─── Tool Events ─────────────────────────────────────────────────
    case 'tool:select':
      state.currentTool = detail.tool;
      el.toolbar.selected = detail.tool;
      updateStatus('tool', TOOLS_BY_ID[detail.tool]?.name);
      break;
    
    // ─── Focus Events ────────────────────────────────────────────────
    case 'focus:change':
      state.focusArea = detail.area;
      updatePanelFocus(detail.area);
      updateStatus('mode', detail.area.toUpperCase());
      break;
    
    // ─── Actions ─────────────────────────────────────────────────────
    case 'action:undo':
      if (popHistory()) {
        renderCanvas(el.canvas, state.grid, state.cursorX, state.cursorY, state.width);
        tuiToast('Undo');
      } else {
        tuiToast('Nothing to undo', { type: 'warning' });
      }
      break;
      
    case 'action:clear':
      saveHistory();
      initGrid();
      renderCanvas(el.canvas, state.grid, state.cursorX, state.cursorY, state.width);
      tuiToast('Canvas cleared');
      break;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// DECISION LOGIC
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Handle drawing on the canvas
 */
function handleDraw(x, y) {
  let color;
  
  switch (state.currentTool) {
    case 'brush':
      color = state.currentColor.value;
      break;
    case 'erase':
      color = null;
      break;
    case 'fill':
      floodFill(x, y, state.currentColor.value);
      renderCanvas(el.canvas, state.grid, state.cursorX, state.cursorY, state.width);
      return;
  }
  
  // Only save history if cell actually changes
  if (state.grid[y][x] !== color) {
    saveHistory();
    state.grid[y][x] = color;
    updateCell(el.canvas, x, y, color, state.width);
  }
  
  // Update cursor
  moveCursorTo(x, y);
}

/**
 * Handle mouse hover (for status bar position)
 */
function handleHover(x, y) {
  updateStatus('pos', `${x},${y}`);
}

/**
 * Flood fill algorithm
 */
function floodFill(startX, startY, newColor) {
  const targetColor = state.grid[startY][startX];
  if (targetColor === newColor) return;
  
  saveHistory();
  
  const stack = [[startX, startY]];
  const visited = new Set();
  
  while (stack.length > 0) {
    const [x, y] = stack.pop();
    const key = `${x},${y}`;
    
    if (visited.has(key)) continue;
    if (x < 0 || x >= state.width || y < 0 || y >= state.height) continue;
    if (state.grid[y][x] !== targetColor) continue;
    
    visited.add(key);
    state.grid[y][x] = newColor;
    
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
}

/**
 * Move cursor to position
 */
function moveCursorTo(x, y) {
  const oldX = state.cursorX;
  const oldY = state.cursorY;
  state.cursorX = Math.max(0, Math.min(state.width - 1, x));
  state.cursorY = Math.max(0, Math.min(state.height - 1, y));
  updateCursor(el.canvas, oldX, oldY, state.cursorX, state.cursorY, state.width);
  updateStatus('pos', `${state.cursorX},${state.cursorY}`);
}

/**
 * Move cursor by delta
 */
function moveCursor(dx, dy) {
  moveCursorTo(state.cursorX + dx, state.cursorY + dy);
}

// ═══════════════════════════════════════════════════════════════════════════
// UI HELPERS
// ═══════════════════════════════════════════════════════════════════════════

function updateStatus(key, value) {
  const id = `status${key.charAt(0).toUpperCase() + key.slice(1)}`;
  document.getElementById(id)?.setAttribute('value', value);
}

function updatePanelFocus(area) {
  ['canvas', 'palette', 'tools'].forEach(a => {
    document.getElementById(`panel-${a}`)?.toggleAttribute('active', a === area);
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// KEYBOARD HANDLER
// ═══════════════════════════════════════════════════════════════════════════

function handleKeyboard(e) {
  // Tab cycles focus
  if (e.key === 'Tab') {
    e.preventDefault();
    const areas = ['canvas', 'palette', 'tools'];
    const i = areas.indexOf(state.focusArea);
    const next = e.shiftKey
      ? (i - 1 + areas.length) % areas.length
      : (i + 1) % areas.length;
    emit('focus:change', { area: areas[next] });
    return;
  }
  
  // Arrow keys (canvas focused)
  if (state.focusArea === 'canvas') {
    const moves = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
    };
    if (moves[e.key]) {
      e.preventDefault();
      moveCursor(...moves[e.key]);
      return;
    }
    
    // Space to draw
    if (e.key === ' ') {
      e.preventDefault();
      handleDraw(state.cursorX, state.cursorY);
      return;
    }
  }
  
  // Tool shortcuts (B, F, E)
  const tool = TOOLS_BY_KEY[e.key.toUpperCase()];
  if (tool && !e.ctrlKey && !e.metaKey) {
    emit('tool:select', { tool: tool.id });
    return;
  }
  
  // Number keys for color selection (1-9)
  if (e.key >= '1' && e.key <= '9') {
    const index = parseInt(e.key) - 1;
    const colors = PALETTES[state.currentPalette];
    selectByIndex(el.swatches, colors, index, emit);
    return;
  }
  
  // Undo
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
    e.preventDefault();
    emit('action:undo');
    return;
  }
  
  // Help
  if (e.key === '?') {
    document.getElementById('modal-help')?.show();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════

function init() {
  // Cache elements
  el.canvas = document.getElementById('canvas');
  el.tabs = document.getElementById('palette-tabs');
  el.swatches = document.getElementById('color-swatches');
  el.toolbar = document.getElementById('toolbar');
  
  // Initialize state
  initGrid();
  
  // Initialize canvas
  initCanvasEvents(el.canvas, emit);
  renderCanvas(el.canvas, state.grid, state.cursorX, state.cursorY, state.width);
  
  // Initialize toolbar
  el.toolbar.tools = TOOLS;
  el.toolbar.selected = state.currentTool;
  el.toolbar.addEventListener('tool-select', e => {
    emit('tool:select', { tool: e.detail.tool });
  });
  
  // Initialize palette
  renderPaletteTabs(el.tabs, PALETTES, state.currentPalette, emit);
  renderColorSwatches(el.swatches, PALETTES[state.currentPalette], 
                      state.currentColor, emit);
  
  // Listen for panel focus clicks
  document.addEventListener('focus-request', e => {
    const id = e.detail.panel?.id;
    if (id === 'panel-canvas') emit('focus:change', { area: 'canvas' });
    if (id === 'panel-palette') emit('focus:change', { area: 'palette' });
    if (id === 'panel-tools') emit('focus:change', { area: 'tools' });
  });
  
  // Wire menu actions
  document.getElementById('action-undo')?.addEventListener('action', () => {
    emit('action:undo');
  });
  document.getElementById('action-clear')?.addEventListener('action', () => {
    if (confirm('Clear the canvas?')) {
      emit('action:clear');
    }
  });
  document.getElementById('action-help')?.addEventListener('action', () => {
    document.getElementById('modal-help')?.show();
  });
  
  // Keyboard
  document.addEventListener('keydown', handleKeyboard);
  
  // Set initial focus
  updatePanelFocus(state.focusArea);
  updateStatus('tool', TOOLS_BY_ID[state.currentTool].name);
  updateStatus('color', state.currentColor.name);
  updateStatus('pos', `${state.cursorX},${state.cursorY}`);
  updateStatus('mode', state.focusArea.toUpperCase());
  
  console.log('🎨 Paint app initialized');
}

// Start
init();
