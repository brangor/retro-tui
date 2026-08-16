import { LitElement } from 'lit';
import type { TuiEvent } from '../protocol/types';
/**
 * <tui-console> - Interactive command console with history
 *
 * @attr {string} prompt - Command prompt (default: "> ")
 * @attr {string} prompt-attr - Space-separated text attributes for the prompt (bold, dim, italic, etc.)
 * @attr {number} history-size - Max history entries (default: 100)
 *
 * @fires tui-console-command - When a command is submitted (detail: { command: string })
 *
 * @method print(text) - Print output to console
 * @method clear() - Clear console output
 */
export declare class Console extends LitElement {
    prompt: string;
    promptAttr: string;
    historySize: number;
    private _lines;
    private _inputValue;
    private _historyIndex;
    private _history;
    static styles: import("lit").CSSResult[];
    /**
     * Print output to console
     * @param text - Text to print (supports ANSI codes)
     */
    print(text: string): void;
    /**
     * Clear console output
     */
    clear(): void;
    /** Accept a protocol event */
    handleEvent(event: TuiEvent): void;
    private scrollToBottom;
    private focusInput;
    private handleKeydown;
    private submitCommand;
    private navigateHistory;
    private handleInput;
    private get _promptClasses();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-console': Console;
    }
}
