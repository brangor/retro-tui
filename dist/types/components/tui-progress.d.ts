import { LitElement } from 'lit';
import type { TuiEvent } from '../protocol/types';
export declare class Progress extends LitElement {
    value: number;
    label: string;
    total: number;
    current: number;
    static styles: import("lit").CSSResult[];
    handleEvent(event: TuiEvent): void;
    private get _clampedValue();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-progress': Progress;
    }
}
