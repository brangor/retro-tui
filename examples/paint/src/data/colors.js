/**
 * Color palette definitions
 * Each palette is an array of {name, value} objects
 */

export const PALETTES = {
  'Terminal': [
    { name: 'Black',   value: '#0d1117' },
    { name: 'Red',     value: '#f85149' },
    { name: 'Green',   value: '#3fb950' },
    { name: 'Yellow',  value: '#d29922' },
    { name: 'Blue',    value: '#58a6ff' },
    { name: 'Magenta', value: '#bc8cff' },
    { name: 'Cyan',    value: '#39c5cf' },
    { name: 'White',   value: '#c9d1d9' },
  ],
  'Grayscale': [
    { name: 'Black',     value: '#000000' },
    { name: 'Dark Gray', value: '#333333' },
    { name: 'Gray',      value: '#666666' },
    { name: 'Mid Gray',  value: '#999999' },
    { name: 'Light',     value: '#cccccc' },
    { name: 'White',     value: '#ffffff' },
  ],
  'Neon': [
    { name: 'Hot Pink',   value: '#ff1493' },
    { name: 'Electric',   value: '#00ffff' },
    { name: 'Lime',       value: '#00ff00' },
    { name: 'Orange',     value: '#ff6600' },
    { name: 'Purple',     value: '#9900ff' },
    { name: 'Yellow',     value: '#ffff00' },
  ],
};

export const DEFAULT_PALETTE = 'Terminal';
export const DEFAULT_COLOR = PALETTES[DEFAULT_PALETTE][6]; // Cyan
