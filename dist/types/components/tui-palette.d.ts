import { LitElement } from 'lit';
type Palettes = Record<string, string[]>;
/**
 * <tui-palette> - Tabbed character picker
 *
 * @attr {Object} palettes - Map of palette names to char arrays
 *   Example: { 'Box': ['─', '│', ...], 'Blocks': ['█', '▓', ...] }
 *
 * @attr {string} currentPalette - Active palette name
 * @attr {string} selectedChar - Currently selected character
 * @attr {number} columns - Number of columns in character grid (default: 8)
 *
 * @fires tui-palette-change - When tab is clicked
 *   detail: { palette: string, firstChar: string }
 *
 * @fires tui-palette-char-select - When character is clicked
 *   detail: { char: string }
 */
export declare class Palette extends LitElement {
    palettes: Palettes;
    currentPalette: string;
    selectedChar: string;
    columns: number;
    static styles: import("lit").CSSResult[];
    private get _chars();
    private _selectPalette;
    private _selectChar;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-palette': Palette;
    }
}
export {};
