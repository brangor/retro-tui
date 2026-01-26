/**
 * Canvas UI Module
 * 
 * This module handles rendering and user interaction for the canvas.
 * It does NOT import state - all data is passed as parameters.
 * It emits events for the decision engine to handle.
 * 
 * Pattern: "Dumb component" - render + emit, no business logic
 */

/**
 * Render the entire canvas grid
 * @param {HTMLElement} container - The canvas container element
 * @param {Array<Array<string|null>>} grid - 2D array of colors
 * @param {number} cursorX - Cursor X position
 * @param {number} cursorY - Cursor Y position
 * @param {number} width - Grid width
 */
export function renderCanvas(container, grid, cursorX, cursorY, width) {
  container.style.gridTemplateColumns = `repeat(${width}, 20px)`;
  container.innerHTML = '';
  
  grid.forEach((row, y) => {
    row.forEach((color, x) => {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.x = x;
      cell.dataset.y = y;
      
      if (color) {
        cell.style.background = color;
      }
      
      if (x === cursorX && y === cursorY) {
        cell.classList.add('cursor');
      }
      
      container.appendChild(cell);
    });
  });
}

/**
 * Initialize canvas event listeners
 * @param {HTMLElement} container - The canvas container
 * @param {Function} emit - Event emitter function
 */
export function initCanvasEvents(container, emit) {
  let isDrawing = false;
  
  container.addEventListener('mousedown', (e) => {
    const cell = e.target.closest('.cell');
    if (cell) {
      isDrawing = true;
      emit('canvas:draw', { 
        x: +cell.dataset.x, 
        y: +cell.dataset.y 
      });
    }
  });
  
  container.addEventListener('mousemove', (e) => {
    const cell = e.target.closest('.cell');
    if (!cell) return;
    
    const x = +cell.dataset.x;
    const y = +cell.dataset.y;
    
    // Always emit cursor move for status bar
    emit('canvas:hover', { x, y });
    
    // Only draw if mouse is down
    if (isDrawing) {
      emit('canvas:draw', { x, y });
    }
  });
  
  document.addEventListener('mouseup', () => {
    isDrawing = false;
  });
}

/**
 * Update a single cell (efficient for drawing)
 * @param {HTMLElement} container - The canvas container
 * @param {number} x - Cell X
 * @param {number} y - Cell Y
 * @param {string|null} color - New color (null = transparent)
 * @param {number} width - Grid width
 */
export function updateCell(container, x, y, color, width) {
  const index = y * width + x;
  const cell = container.children[index];
  if (cell) {
    cell.style.background = color || '';
  }
}

/**
 * Update cursor position (moves highlight)
 * @param {HTMLElement} container - The canvas container
 * @param {number} oldX - Previous X
 * @param {number} oldY - Previous Y
 * @param {number} newX - New X
 * @param {number} newY - New Y
 * @param {number} width - Grid width
 */
export function updateCursor(container, oldX, oldY, newX, newY, width) {
  const oldIndex = oldY * width + oldX;
  const newIndex = newY * width + newX;
  
  container.children[oldIndex]?.classList.remove('cursor');
  container.children[newIndex]?.classList.add('cursor');
}
