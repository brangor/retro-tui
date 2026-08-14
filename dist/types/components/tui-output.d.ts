import { LitElement } from 'lit';
import type { TuiEvent } from '../protocol/types';
/**
 * <tui-output> - Scrolling log output with ANSI color support
 *
 * @attr {number} max-lines - Maximum lines to keep (default: 500)
 * @attr {boolean} autoscroll - Auto-scroll to bottom on new content
 * @attr {boolean} timestamps - Show timestamps on each line
 * @attr {string} attr - Space-separated text attributes applied to the output container (bold, dim, italic, etc.)
 *
 * @method append(text) - Add a line of text
 * @method clear() - Clear all output
 */
export declare class Output extends LitElement {
    maxLines: number;
    autoscroll: boolean;
    timestamps: boolean;
    attr: string;
    private _lines;
    static styles: import("lit").CSSResult[];
    /**
     * Append a line of text (supports ANSI codes)
     * @param text - Text to append
     */
    append(text: string): void;
    /**
     * Clear all output
     */
    clear(): void;
    /** Accept a protocol event */
    handleEvent(event: TuiEvent): void;
    /** Check if the user is scrolled near the bottom (within 1 line height) */
    private _isNearBottom;
    private scrollToBottom;
    private get _attrClasses();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-output': Output;
    }
}
