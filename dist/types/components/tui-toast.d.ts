import { LitElement } from 'lit';
type ToastPosition = 'bottom' | 'top' | 'bottom-right';
type ToastType = 'info' | 'success' | 'warning' | 'error' | null;
interface ToastOptions {
    type?: ToastType;
    title?: string;
    duration?: number;
}
/**
 * <tui-toast> - Terminal-styled toast notifications
 *
 * Box-draw aesthetic, not Material Design.
 * Displays briefly then fades out.
 *
 * Usage:
 *   const toast = document.querySelector('tui-toast');
 *   toast.show('File saved!');
 *   toast.show('Error occurred', { type: 'error', duration: 5000 });
 *
 * @attr {string} position - 'bottom' | 'top' | 'bottom-right'
 */
export declare class Toast extends LitElement {
    position: ToastPosition;
    private _queue;
    private _current;
    private _visible;
    static styles: import("lit").CSSResult[];
    /**
     * Show a toast message
     * @param message - The message to display
     * @param options - Toast options
     */
    show(message: string, options?: ToastOptions): void;
    private _getDefaultTitle;
    private _showNext;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-toast': Toast;
    }
}
export declare function tuiToast(message: string, options?: ToastOptions): void;
export {};
