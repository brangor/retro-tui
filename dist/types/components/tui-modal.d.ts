import { LitElement } from 'lit';
import { type BorderStyle } from '../utils/borders.js';
/**
 * <tui-modal> - Modal dialog with terminal aesthetic
 *
 * Panel behavior levels (from GridSketch):
 * - Expanded → full content, medium shadow
 * - Collapsed → header only, light shadow
 * - Popup/Modal → heavy shadow, dims background
 *
 * @attr {string} title - Modal title
 * @attr {string} border - Border style: single | heavy | double | rounded | none (default: double)
 * @attr {boolean} open - Whether modal is visible
 * @attr {boolean} closable - Show close button (default: true)
 *
 * @fires close - When modal is closed
 *
 * @slot - Modal content
 * @slot footer - Footer content (buttons, etc.)
 */
export declare class Modal extends LitElement {
    title: string;
    border: BorderStyle;
    open: boolean;
    closable: boolean;
    private _boundKeyHandler;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleKeydown;
    private _handleOverlayClick;
    /**
     * Open the modal
     */
    show(): void;
    /**
     * Close the modal
     */
    close(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-modal': Modal;
    }
}
