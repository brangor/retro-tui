/**
 * Simple ANSI escape code to HTML converter
 * Handles common terminal colors and styles
 */

const ANSI_COLORS = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'white',
  90: 'black',   // bright black (gray)
  91: 'red',     // bright red
  92: 'green',   // bright green
  93: 'yellow',  // bright yellow
  94: 'blue',    // bright blue
  95: 'magenta', // bright magenta
  96: 'cyan',    // bright cyan
  97: 'white',   // bright white
};

const ANSI_STYLES = {
  1: 'bold',
  2: 'dim',
  3: 'italic',
  4: 'underline',
};

/**
 * Convert ANSI escape codes to HTML with span classes
 * @param {string} text - Text with ANSI escape codes
 * @returns {string} HTML string with styled spans
 */
export function ansiToHtml(text) {
  if (!text) return '';
  
  // Escape HTML first
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Replace ANSI codes with spans
  // Matches: \x1b[Nm or \x1b[N;Nm patterns
  const ansiRegex = /\x1b\[([0-9;]+)m/g;
  
  let result = '';
  let lastIndex = 0;
  let openTags = [];
  let match;

  while ((match = ansiRegex.exec(html)) !== null) {
    // Add text before this match
    result += html.slice(lastIndex, match.index);
    lastIndex = match.index + match[0].length;

    const codes = match[1].split(';').map(Number);
    
    for (const code of codes) {
      if (code === 0) {
        // Reset - close all open tags
        result += openTags.map(() => '</span>').join('');
        openTags = [];
      } else if (ANSI_COLORS[code]) {
        const className = `ansi-${ANSI_COLORS[code]}`;
        result += `<span class="${className}">`;
        openTags.push(className);
      } else if (ANSI_STYLES[code]) {
        const className = `ansi-${ANSI_STYLES[code]}`;
        result += `<span class="${className}">`;
        openTags.push(className);
      }
    }
  }

  // Add remaining text
  result += html.slice(lastIndex);
  
  // Close any remaining open tags
  result += openTags.map(() => '</span>').join('');

  return result;
}

/**
 * Strip ANSI codes from text
 * @param {string} text - Text with ANSI escape codes
 * @returns {string} Plain text without ANSI codes
 */
export function stripAnsi(text) {
  return text.replace(/\x1b\[[0-9;]*m/g, '');
}
