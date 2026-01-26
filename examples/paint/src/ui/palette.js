/**
 * Color Palette UI Module
 * 
 * Renders palette tabs and color swatches.
 * Emits events when user selects colors or switches palettes.
 * 
 * Pattern: "Dumb component" - render + emit, no business logic
 */

/**
 * Render the palette tabs
 * @param {HTMLElement} container - Tab container
 * @param {Object} palettes - All palette definitions
 * @param {string} currentPalette - Currently selected palette name
 * @param {Function} emit - Event emitter
 */
export function renderPaletteTabs(container, palettes, currentPalette, emit) {
  container.innerHTML = '';
  
  Object.keys(palettes).forEach(name => {
    const tab = document.createElement('button');
    tab.className = 'palette-tab' + (name === currentPalette ? ' active' : '');
    tab.textContent = name;
    tab.onclick = () => emit('palette:tab', { palette: name });
    container.appendChild(tab);
  });
}

/**
 * Render the color swatches
 * @param {HTMLElement} container - Swatch container
 * @param {Array} colors - Array of {name, value} color objects
 * @param {Object} selectedColor - Currently selected color object
 * @param {Function} emit - Event emitter
 */
export function renderColorSwatches(container, colors, selectedColor, emit) {
  container.innerHTML = '';
  
  colors.forEach((color, index) => {
    const swatch = document.createElement('button');
    swatch.className = 'color-swatch';
    swatch.style.background = color.value;
    swatch.title = color.name;
    
    if (color.value === selectedColor?.value) {
      swatch.classList.add('selected');
    }
    
    swatch.onclick = () => emit('palette:color', { color, index });
    container.appendChild(swatch);
  });
}

/**
 * Highlight a specific color by index (for keyboard shortcuts)
 * @param {HTMLElement} container - Swatch container
 * @param {number} index - Index to highlight
 */
export function highlightSwatch(container, index) {
  [...container.children].forEach((swatch, i) => {
    swatch.classList.toggle('selected', i === index);
  });
}

/**
 * Select a color by index (for keyboard shortcuts)
 * @param {HTMLElement} container - Swatch container
 * @param {Array} colors - Color array
 * @param {number} index - Index to select
 * @param {Function} emit - Event emitter
 */
export function selectByIndex(container, colors, index, emit) {
  if (index >= 0 && index < colors.length) {
    highlightSwatch(container, index);
    emit('palette:color', { color: colors[index], index });
  }
}
