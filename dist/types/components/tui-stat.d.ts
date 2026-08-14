import { LitElement } from 'lit';
import type { SemanticColor } from '../styles/semantics.js';
/**
 * <tui-stat> - Right-aligned label/value stat display
 *
 * @attr {string} label - Uppercase label text
 * @attr {string} value - Value text
 * @attr {string} color - Semantic color for value. See docs/api/semantic-colors.md
 */
export declare class Stat extends LitElement {
    label: string;
    value: string;
    color: SemanticColor;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-stat': Stat;
    }
}
