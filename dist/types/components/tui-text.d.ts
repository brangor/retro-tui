import { LitElement } from 'lit';
/**
 * <tui-text> - Static text block with ANSI color support
 *
 * Set content via textContent or the content property.
 * Use `attr` for declarative text styling: attr="bold reverse"
 *
 * @attr {string} attr - Space-separated text attributes (bold, dim, italic, underline, reverse, strikethrough, blink)
 */
export declare class Text extends LitElement {
    content: string;
    attr: string;
    variant: 'body' | 'caption' | 'subtitle' | 'label' | '';
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-text': Text;
    }
}
