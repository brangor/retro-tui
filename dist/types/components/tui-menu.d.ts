import { LitElement, TemplateResult } from 'lit';
import './tui-button.ts';
/**
 * <tui-menu> - Menu bar with dropdown menus
 *
 * @slot - Menu items (tui-menu-item elements)
 *
 * Keyboard navigation:
 * - Arrow Left/Right: move between menu items
 * - Arrow Down/Enter: open dropdown
 * - Arrow Up/Down: navigate dropdown items
 * - Escape: close dropdown
 * - Alt+letter: hotkey access
 */
export declare class Menu extends LitElement {
    private _openMenu;
    static styles: import("lit").CSSResult[];
    render(): TemplateResult<1>;
}
/**
 * <tui-menu-item> - Single menu with dropdown
 *
 * Uses <tui-button variant="menu"> for the trigger.
 *
 * @attr {string} label - Menu label
 * @attr {string} hotkey - Hotkey letter (underlined)
 * @slot - Dropdown content (tui-menu-action elements)
 */
export declare class MenuItem extends LitElement {
    label: string;
    hotkey: string;
    private _open;
    private _outsideClickHandler;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _toggle;
    private _close;
    private _handleKeydown;
    render(): TemplateResult<1>;
}
/**
 * <tui-menu-action> - Single menu action/item
 *
 * @attr {string} label - Action label
 * @attr {string} shortcut - Keyboard shortcut hint
 * @attr {boolean} danger - Style as destructive action
 * @fires tui-menu-action-select - When activated (detail: { label })
 */
export declare class MenuAction extends LitElement {
    label: string;
    shortcut: string;
    danger: boolean;
    static styles: import("lit").CSSResult[];
    private _handleClick;
    render(): TemplateResult<1>;
}
/**
 * <tui-menu-divider> - Divider between menu items
 */
export declare class MenuDivider extends LitElement {
    static styles: import("lit").CSSResult;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-menu': Menu;
        'tui-menu-item': MenuItem;
        'tui-menu-action': MenuAction;
        'tui-menu-divider': MenuDivider;
    }
}
