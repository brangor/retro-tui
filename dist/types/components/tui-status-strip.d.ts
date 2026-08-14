import { LitElement } from 'lit';
import type { SemanticColor } from '../styles/semantics.js';
/**
 * <tui-status-strip> - Single-line status bar with box-draw separators
 *
 * Right-aligned, full caps, semantic colors. Used as the C zone in zone layouts.
 *
 * @attr {string} label - Left-side label (e.g. "STATUS", "RESULTS", "CONFIG")
 *
 * @slot - tui-strip-item children
 */
export declare class StatusStrip extends LitElement {
    label: string;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
/**
 * <tui-strip-item> - Single item in a status strip
 *
 * @attr {string} color - Semantic color. See docs/api/semantic-colors.md
 * @attr {string} indicator - Optional indicator: '●' for active, '○' for inactive
 */
export declare class StripItem extends LitElement {
    color: SemanticColor;
    indicator: string;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-status-strip': StatusStrip;
        'tui-strip-item': StripItem;
    }
}
