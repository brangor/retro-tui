import { LitElement } from 'lit';
/**
 * <tui-app> - Opinionated app shell layout
 *
 * Chrome-only layout providing:
 * - Header with menu bar
 * - Workspace (center, primary focus)
 * - Status bar (bottom)
 *
 * Focus Contexts:
 * - Tab cycles through focusable elements
 * - Arrow keys navigate within current context
 * - Escape retreats (close menu → close modal → nothing)
 *
 * @slot header - App title/branding (optional)
 * @slot menu - Menu bar items
 * @slot main - Primary content area (tui-workspace, tui-tiled, or any element)
 * @slot status - Status bar content (optional)
 *
 * @attr {string} title - App title displayed in header
 * @attr {string} subtitle - Subtitle shown after title
 * @attr {string} decorations - Corner decoration style: 'full' (default) | 'none' | 'header' | 'status'
 */
export declare class App extends LitElement {
    title: string;
    subtitle: string;
    compact: boolean;
    decorations: 'full' | 'none' | 'header' | 'status';
    private _focusContext;
    private _menuOpen;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    private _handleGlobalKeydown;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-app': App;
    }
}
