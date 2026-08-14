import { LitElement } from 'lit';
type LinkType = 'external' | 'copy';
/**
 * <tui-link> - Terminal-styled link with action icons
 *
 * @attr {string} href - URL for external links or value for copy links
 * @attr {string} type - 'external' (opens in browser, arrow icon) | 'copy' (copies to clipboard, copy icon)
 *
 * @fires copy - When a copy link is clicked (detail: { value: string })
 *
 * @slot - Link text
 */
export declare class Link extends LitElement {
    href: string;
    type: LinkType;
    private _copied;
    static styles: import("lit").CSSResult[];
    private _handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-link': Link;
    }
}
export {};
