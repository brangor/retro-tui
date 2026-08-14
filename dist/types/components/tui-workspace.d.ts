import { LitElement } from 'lit';
/**
 * <tui-workspace> - Container for main content and floating panels
 *
 * Manages layout and constrains floating panels to bounds.
 * Panels snap visually to edges when dragged near them.
 *
 * @slot main - The primary content area (canvas)
 * @slot floating - Floating panels that sit above main content
 *
 * @fires bounds-change - When workspace bounds change
 * @fires layout-change - When panel layout changes
 */
export declare class Workspace extends LitElement {
    private static readonly SNAP_ZONE;
    private _bounds;
    private _snapPreview;
    private _resizeObserver;
    get bounds(): DOMRect;
    /**
     * Get state of all floating panels in the workspace
     */
    getPanelStates(): Array<{
        id: string;
        title: string;
        snapEdge?: 'left' | 'right' | 'top';
        x: number;
        y: number;
        width?: number;
        height?: number;
        collapsed: boolean;
        visible: boolean;
    }>;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _detectSnapEdge;
    private _handlePanelMove;
    private _handlePanelDragEnd;
    private _handlePanelResize;
    private _handlePanelDismiss;
    private _handlePanelMinimize;
    private _handlePanelRestore;
    /**
     * Stack minimized tabs vertically on each edge
     */
    private _reflowMinimizedTabs;
    private _emitLayoutChange;
    private _getFloatingPanels;
    private _constrainAllPanels;
    private _onFloatingSlotChange;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-workspace': Workspace;
    }
}
