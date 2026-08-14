import { LitElement } from 'lit';
import type { TuiEvent } from '../protocol/types';
export declare class Status extends LitElement {
    state: string;
    message: string;
    static styles: import("lit").CSSResult[];
    handleEvent(event: TuiEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-status': Status;
    }
}
