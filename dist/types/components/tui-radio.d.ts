import { LitElement } from 'lit';
import type { TuiEvent } from '../protocol/types';
export declare class Radio extends LitElement {
    checked: boolean;
    disabled: boolean;
    name: string;
    value: string;
    label: string;
    static styles: import("lit").CSSResult[];
    handleEvent(event: TuiEvent): void;
    private _select;
    private _onKeydown;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-radio': Radio;
    }
}
