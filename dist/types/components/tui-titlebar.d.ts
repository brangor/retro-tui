import { LitElement } from 'lit';
/**
 * <tui-titlebar> - Application title bar
 *
 * @attr {string} app - Application name (left side)
 * @attr {string} section - Current section label (right side, caps)
 *
 * @slot - Action buttons in the middle
 */
export declare class Titlebar extends LitElement {
    app: string;
    section: string;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-titlebar': Titlebar;
    }
}
