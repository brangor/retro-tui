import { LitElement } from 'lit';
type StatColor = 'primary' | 'success' | 'warning' | 'error' | 'muted' | '';
/**
 * <tui-stat> - Right-aligned label/value stat display
 *
 * @attr {string} label - Uppercase label text
 * @attr {string} value - Value text
 * @attr {string} color - Semantic color for value: primary | success | warning | error | muted
 */
export declare class Stat extends LitElement {
    label: string;
    value: string;
    color: StatColor;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-stat': Stat;
    }
}
export {};
