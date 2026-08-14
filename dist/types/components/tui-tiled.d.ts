import { LitElement, nothing } from 'lit';
type TiledPreset = 'monitor' | 'viewer' | 'console' | 'console-split' | 'triad';
type TiledLabels = 'caption' | 'titlebar' | '';
interface ParsedGrid {
    areas: string;
    rows: string;
    cols: string;
    slotNames: string[];
}
/** Default height of a full-width bottom row. Override per-instance with the
 *  `--tui-tiled-footer-height` custom property. See docs/api/tui-tiled.md. */
export declare const DEFAULT_FOOTER_HEIGHT = "120px";
/**
 * Parse a pipe-separated areas shorthand into CSS grid values.
 *
 * Input:  "header header | main sidebar | footer footer"
 * Output: {
 *   areas: '"header header" "main sidebar" "footer footer"',
 *   rows:  'auto 1fr auto',
 *   cols:  '1fr 1fr',
 *   slotNames: ['header', 'main', 'sidebar', 'footer']
 * }
 */
export declare function parseAreas(shorthand: string): ParsedGrid;
/**
 * <tui-tiled> - CSS grid layout with named slots and preset templates
 *
 * A pure layout component. Compose with tui-titlebar and tui-status-strip
 * for app shell chrome — chrome goes OUTSIDE the grid, not in it.
 *
 * Row sizing is inferred from the layout shape: a full-width first row sizes to
 * content, a full-width last row takes a fixed footer height, everything else
 * flexes — and at least one row always flexes. Full contract, including the
 * ambiguous two-row case: docs/api/tui-tiled.md
 *
 * @attr {string} preset - Named layout: 'monitor' | 'viewer' | 'console' | 'console-split' | 'triad'
 * @attr {string} areas - Custom grid-template-areas shorthand. '|' separates rows. Overrides preset.
 *                        When used with preset, acts as ordered display labels mapped to the preset's slot names.
 *                        e.g. preset="console-split" areas="DOWNLOAD | HISTORY | CONSOLE"
 * @attr {string} gap - CSS grid gap value (default: '1px')
 * @attr {string} labels - Zone label style: 'caption' (small overlay) | 'titlebar' (full bar) | '' (none)
 * @cssprop --tui-tiled-footer-height - Height of a full-width bottom row (default: 120px)
 */
export declare class Tiled extends LitElement {
    preset: TiledPreset | '';
    areas: string;
    gap: string;
    labels: TiledLabels;
    static styles: import("lit").CSSResult[];
    private _getGrid;
    private _getDisplayLabels;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-tiled': Tiled;
    }
}
export {};
