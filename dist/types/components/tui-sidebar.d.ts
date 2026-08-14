import { LitElement } from 'lit';
type SidebarSide = 'left' | 'right' | 'top' | 'bottom';
/**
 * <tui-sidebar> - Simple container for docked panels
 *
 * A minimal layout region that stacks panels. No header, no chrome.
 * Panels docked here retain their own collapse controls.
 *
 * @attr {string} side - Which edge: 'left' | 'right' | 'top' | 'bottom'
 * @attr {number} size - Width (left/right) or height (top/bottom) in pixels
 *
 * @slot - Panels to stack in the sidebar
 */
export declare class Sidebar extends LitElement {
    side: SidebarSide;
    size: number;
    private _dropIndex;
    static styles: import("lit").CSSResult[];
    /**
     * Get all panel elements in this sidebar
     */
    private _getPanels;
    /**
     * Calculate drop index based on cursor Y position
     */
    calculateDropIndex(cursorY: number): number;
    /**
     * Show drop indicator at specified index
     */
    showDropIndicator(index: number): void;
    /**
     * Hide drop indicator
     */
    hideDropIndicator(): void;
    /**
     * Insert panel at specified index in the sidebar
     */
    insertPanelAt(panel: HTMLElement, index: number): void;
    /**
     * Get the top position for the drop indicator
     */
    private _getDropIndicatorTop;
    connectedCallback(): void;
    updated(changedProperties: Map<string, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-sidebar': Sidebar;
    }
}
export {};
