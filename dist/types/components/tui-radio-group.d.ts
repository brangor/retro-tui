import { LitElement } from 'lit';
import type { TuiEvent } from '../protocol/types';
/**
 * Groups `tui-radio` children and reports the selected value.
 *
 * @fires tui-change - When the selection changes (detail: { value, name })
 */
export declare class RadioGroup extends LitElement {
    name: string;
    label: string;
    disabled: boolean;
    value: string;
    static styles: import("lit").CSSResult[];
    private _getChildren;
    private _syncChildren;
    private _onSlotChange;
    private _onChange;
    private _onKeydown;
    handleEvent(event: TuiEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-radio-group': RadioGroup;
    }
}
