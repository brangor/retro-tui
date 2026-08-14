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
export type BorderStyle = 'single' | 'heavy' | 'double' | 'rounded' | 'none';
export interface BorderChars {
    tl: string;
    tr: string;
    bl: string;
    br: string;
    h: string;
    v: string;
}
export declare const BORDER_CHARS: Record<Exclude<BorderStyle, 'none'>, BorderChars>;
/**
 * Get border characters for a given style, or null for 'none'.
 */
export declare function getBorderChars(style: BorderStyle): BorderChars | null;
/**
 * Build a title decoration string: ┌─ Title ─┐
 * Adapts characters to the border style.
 */
export declare function titleDecoration(style: BorderStyle): {
    before: string;
    after: string;
};
/**
 * Standard state-to-border mapping used across components.
 *   neutral  → single
 *   hover    → heavy
 *   selected → double
 */
export declare const STATE_BORDERS: {
    readonly neutral: BorderStyle;
    readonly hover: BorderStyle;
    readonly selected: BorderStyle;
};
