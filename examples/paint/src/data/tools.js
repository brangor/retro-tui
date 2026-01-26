/**
 * Tool definitions for the paint app
 */

export const TOOLS = [
  { id: 'brush', key: 'B', icon: '●', name: 'Brush' },
  { id: 'fill',  key: 'F', icon: '▣', name: 'Fill' },
  { id: 'erase', key: 'E', icon: '⌫', name: 'Erase' },
];

// Quick lookup maps
export const TOOLS_BY_KEY = Object.fromEntries(TOOLS.map(t => [t.key, t]));
export const TOOLS_BY_ID = Object.fromEntries(TOOLS.map(t => [t.id, t]));
