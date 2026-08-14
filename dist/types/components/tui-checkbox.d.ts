import { LitElement } from 'lit';
import type { TuiEvent } from '../protocol/types';
export declare class Checkbox extends LitElement {
    checked: boolean;
    disabled: boolean;
    name: string;
    value: string;
    label: string;
    static styles: import("lit").CSSResult[];
    handleEvent(event: TuiEvent): void;
    private _toggle;
    private _onKeydown;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-checkbox': Checkbox;
    }
}
