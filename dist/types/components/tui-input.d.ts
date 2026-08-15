import { LitElement } from 'lit';
import type { TuiEvent } from '../protocol/types';
/**
 * Text input.
 *
 * @fires tui-input - On every keystroke (detail: { value, name })
 * @fires tui-change - When the value is committed (detail: { value, name })
 */
export declare class Input extends LitElement {
    value: string;
    placeholder: string;
    disabled: boolean;
    name: string;
    label: string;
    static styles: import("lit").CSSResult[];
    handleEvent(event: TuiEvent): void;
    private _onInput;
    private _onChange;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-input': Input;
    }
}
