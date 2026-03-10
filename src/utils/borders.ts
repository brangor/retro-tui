/**
 * Box-drawing border character sets and CSS generation utilities.
 *
 * Standard mapping (matches ncurses convention):
 *   single  → neutral state
 *   heavy   → hover / emphasis state
 *   double  → selected / active state
 *   rounded → soft variant of single
 *   none    → no visible border
 */

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export type BorderStyle = 'single' | 'heavy' | 'double' | 'rounded' | 'none';

export interface BorderChars {
  tl: string; // top-left corner
  tr: string; // top-right corner
  bl: string; // bottom-left corner
  br: string; // bottom-right corner
  h: string;  // horizontal line
  v: string;  // vertical line
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHARACTER SETS
// ═══════════════════════════════════════════════════════════════════════════════

export const BORDER_CHARS: Record<Exclude<BorderStyle, 'none'>, BorderChars> = {
  single:  { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
  heavy:   { tl: '┏', tr: '┓', bl: '┗', br: '┛', h: '━', v: '┃' },
  double:  { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
  rounded: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' },
};

/**
 * Get border characters for a given style, or null for 'none'.
 */
export function getBorderChars(style: BorderStyle): BorderChars | null {
  if (style === 'none') return null;
  return BORDER_CHARS[style];
}

/**
 * Build a title decoration string: ┌─ Title ─┐
 * Adapts characters to the border style.
 */
export function titleDecoration(style: BorderStyle): { before: string; after: string } {
  const chars = getBorderChars(style);
  if (!chars) return { before: '', after: '' };
  return {
    before: `${chars.tl}${chars.h} `,
    after: ` ${chars.h}${chars.tr}`,
  };
}

/**
 * Standard state-to-border mapping used across components.
 *   neutral  → single
 *   hover    → heavy
 *   selected → double
 */
export const STATE_BORDERS = {
  neutral: 'single' as BorderStyle,
  hover: 'heavy' as BorderStyle,
  selected: 'double' as BorderStyle,
} as const;
