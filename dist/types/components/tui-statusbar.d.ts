import { LitElement } from 'lit';
import type { SemanticColor } from '../styles/semantics.js';
/**
 * <tui-statusbar> - Status bar for displaying context info
 *
 * Unified terminal aesthetic with vertical dividers between items.
 * Matches GridSketch's hacker-style status bar.
 *
 * @slot - Status items (use tui-status-item)
 * @attr {string} color - Semantic color, painting the border and the dividers
 *                        between slotted items (default: primary).
 *                        See docs/api/semantic-colors.md
 */
export declare class Statusbar extends LitElement {
    color: SemanticColor;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
/**
 * <tui-status-item> - Single status bar item
 *
 * @attr {string} label - Item label (rendered in --color-primary, independent of
 *                        the bar's own color)
 * @attr {string} value - Item value (rendered in --color-secondary)
 * @attr {boolean} highlight - Repaints the value in --color-warning to draw the
 *                             eye to it. Also reflected to the host, so consumers
 *                             can hang their own styling off it.
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
