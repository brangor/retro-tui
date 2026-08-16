import { LitElement } from 'lit';
/**
 * <tui-action-list> - Selectable list with expandable action panels
 *
 * Clicking an item expands an action slot below it. One expanded at a time.
 *
 * @attr {Array} items - Array of { id: string, label: string, [sublabel]: string, [color]: string }
 *                       color maps to CSS vars: 'success' | 'error' | 'warning' | 'primary' | 'muted'
 * @attr {string} selected - ID of currently expanded item (or empty)
 *
 * @fires tui-list-item-select - When an item is clicked (detail: { id, label })
 * @fires tui-list-item-deselect - When expanded item is collapsed (detail: { id, label })
 *
 * @slot actions-{id} - Per-item action content shown below the item when selected.
 *                      One slot per item, named by item id. e.g. slot="actions-my-item-id"
 *                      While an item is collapsed its slot content is unplaced: it still
 *                      answers getComputedStyle, but with unresolved values (colours read
 *                      as rgb(0, 0, 0)). Expand the item before measuring it.
 */
export declare class ActionList extends LitElement {
    items: Array<{
        id: string;
        label: string;
        sublabel?: string;
        color?: string;
    }>;
    selected: string;
    static styles: import("lit").CSSResult[];
    private _handleClick;
    private _colorVar;
    private _hasActions;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-action-list': ActionList;
    }
}
