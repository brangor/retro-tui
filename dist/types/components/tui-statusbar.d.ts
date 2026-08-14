import { LitElement } from 'lit';
type StatusbarColor = 'cyan' | 'green' | 'magenta' | 'yellow';
/**
 * <tui-statusbar> - Status bar for displaying context info
 *
 * Unified terminal aesthetic with vertical dividers between items.
 * Matches GridSketch's hacker-style status bar.
 *
 * @slot - Status items (use tui-status-item)
 * @attr {string} color - Border color: cyan | green | magenta | yellow
 */
export declare class Statusbar extends LitElement {
    color: StatusbarColor;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
/**
 * <tui-status-item> - Single status bar item
 *
 * @attr {string} label - Item label (displayed in bar color)
 * @attr {string} value - Item value (displayed in green)
 * @attr {boolean} highlight - Use yellow for value instead of green
 */
export declare class StatusItem extends LitElement {
    label: string;
    value: string;
    highlight: boolean;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-statusbar': Statusbar;
        'tui-status-item': StatusItem;
    }
}
export {};
