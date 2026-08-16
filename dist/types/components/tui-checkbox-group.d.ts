import { LitElement } from 'lit';
import type { TuiEvent } from '../protocol/types';
/**
 * Groups `tui-checkbox` children and reports their combined value.
 *
 * @fires tui-change - When any child checkbox changes (detail: { value, name })
 */
export declare class CheckboxGroup extends LitElement {
    name: string;
    label: string;
    disabled: boolean;
    value: string[];
    static styles: import("lit").CSSResult[];
    private _getChildren;
    private _syncChildren;
    private _syncValueFromChildren;
    private _syncChildrenFromValue;
    private _onSlotChange;
    private _onChange;
    handleEvent(event: TuiEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-checkbox-group': CheckboxGroup;
    }
}
