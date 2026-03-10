/**
 * ANSI escape code to HTML converter
 * Handles terminal colors (standard, 256, truecolor), background colors,
 * and text attributes (bold, dim, italic, underline, reverse, strikethrough).
 */

const ANSI_COLORS = {
  30: 'black', 31: 'red', 32: 'green', 33: 'yellow',
  34: 'blue', 35: 'magenta', 36: 'cyan', 37: 'white',
  90: 'black', 91: 'red', 92: 'green', 93: 'yellow',
  94: 'blue', 95: 'magenta', 96: 'cyan', 97: 'white',
};

const ANSI_BG_COLORS = {
  40: 'black', 41: 'red', 42: 'green', 43: 'yellow',
  44: 'blue', 45: 'magenta', 46: 'cyan', 47: 'white',
  100: 'black', 101: 'red', 102: 'green', 103: 'yellow',
  104: 'blue', 105: 'magenta', 106: 'cyan', 107: 'white',
};

const ANSI_STYLES = {
  1: 'bold',
  2: 'dim',
  3: 'italic',
  4: 'underline',
  7: 'reverse',
  9: 'strikethrough',
};

/**
 * Convert 256-color index to hex color.
 * 0-7: standard, 8-15: bright, 16-231: 6x6x6 cube, 232-255: grayscale
 */
function color256ToHex(n) {
  const standard = ['#000000','#aa0000','#00aa00','#aa5500','#0000aa','#aa00aa','#00aaaa','#aaaaaa'];
  const bright = ['#555555','#ff5555','#55ff55','#ffff55','#5555ff','#ff55ff','#55ffff','#ffffff'];

  if (n < 8) return standard[n];
  if (n < 16) return bright[n - 8];
  if (n < 232) {
    const idx = n - 16;
    const r = Math.floor(idx / 36);
    const g = Math.floor((idx % 36) / 6);
    const b = idx % 6;
    const toHex = v => (v === 0 ? 0 : 55 + v * 40).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  const gray = 8 + (n - 232) * 10;
  const hex = gray.toString(16).padStart(2, '0');
  return `#${hex}${hex}${hex}`;
}

/**
 * Convert ANSI escape codes to HTML with span classes/styles.
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

  const ansiRegex = /\x1b\[([0-9;]+)m/g;

  let result = '';
  let lastIndex = 0;
  let openTags = [];
  let match;

  while ((match = ansiRegex.exec(html)) !== null) {
    result += html.slice(lastIndex, match.index);
    lastIndex = match.index + match[0].length;

    const codes = match[1].split(';').map(Number);

    for (let i = 0; i < codes.length; i++) {
      const code = codes[i];
      if (code === 0) {
        // Reset — close all open tags
        result += openTags.map(() => '</span>').join('');
        openTags = [];
      } else if (code === 38 && codes[i + 1] === 5 && codes[i + 2] !== undefined) {
        // 256-color foreground: 38;5;N
        const hex = color256ToHex(codes[i + 2]);
        result += `<span style="color: ${hex}">`;
        openTags.push('256fg');
        i += 2;
      } else if (code === 48 && codes[i + 1] === 5 && codes[i + 2] !== undefined) {
        // 256-color background: 48;5;N
        const hex = color256ToHex(codes[i + 2]);
        result += `<span style="background-color: ${hex}">`;
        openTags.push('256bg');
        i += 2;
      } else if (code === 38 && codes[i + 1] === 2 && codes.length > i + 4) {
        // Truecolor foreground: 38;2;R;G;B
        const r = codes[i + 2], g = codes[i + 3], b = codes[i + 4];
        result += `<span style="color: rgb(${r},${g},${b})">`;
        openTags.push('tcfg');
        i += 4;
      } else if (code === 48 && codes[i + 1] === 2 && codes.length > i + 4) {
        // Truecolor background: 48;2;R;G;B
        const r = codes[i + 2], g = codes[i + 3], b = codes[i + 4];
        result += `<span style="background-color: rgb(${r},${g},${b})">`;
        openTags.push('tcbg');
        i += 4;
      } else if (ANSI_COLORS[code]) {
        const className = `ansi-${ANSI_COLORS[code]}`;
        result += `<span class="${className}">`;
        openTags.push(className);
      } else if (ANSI_BG_COLORS[code]) {
        const className = `ansi-bg-${ANSI_BG_COLORS[code]}`;
        result += `<span class="${className}">`;
        openTags.push(className);
      } else if (ANSI_STYLES[code]) {
        const className = `ansi-${ANSI_STYLES[code]}`;
        result += `<span class="${className}">`;
        openTags.push(className);
      }
    }
  }

  result += html.slice(lastIndex);
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
