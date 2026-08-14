import { LitElement } from 'lit';
import { type BorderStyle } from '../utils/borders.js';
type PanelColor = 'primary' | 'secondary' | 'error' | 'success' | 'info' | 'cyan' | 'green' | 'magenta' | 'yellow' | 'red' | '';
type PanelVariant = 'bright' | 'classic';
type SelectionStyle = 'invert' | 'border' | '';
type PanelBorder = BorderStyle;
/**
 * <tui-panel> - Floating panel with terminal aesthetic
 *
 * Panels are floating by default and can be dragged within a tui-workspace.
 * They snap visually to edges when dragged near them.
 * Dismissable panels minimize to edge tabs instead of hiding.
 *
 * Two style variants:
 * - 'bright' (default): Header highlights when active, bold borders
 * - 'classic': Box-draw aesthetic with shadows, subtle color changes
 *
 * Focus states:
 * - neutral: default appearance
 * - selected: emphasized (bold border or medium shadow)
 * - active: strongest emphasis (header highlight or heavy shadow)
 *
 * @attr {string} title - Panel title
 * @attr {string} color - Semantic color: primary | secondary | error | success | info
 * @attr {string} border - Border style: single | heavy | double | rounded | none (default: single)
 * @attr {string} variant - 'bright' | 'classic'
 * @attr {string} selection-style - Selection feedback style: 'invert' | 'border'
 * @attr {boolean} full - Fill container completely (disables drag/resize, keeps collapse)
 * @attr {boolean} floating - Whether panel is floating (default: true)
 * @attr {string} snap-edge - Edge the panel is snapped to: 'left' | 'right' | 'top' | ''
 * @attr {number} position-x - X position in pixels
 * @attr {number} position-y - Y position in pixels
 * @attr {boolean} collapsible - Whether panel can be collapsed
 * @attr {boolean} collapsed - Current collapsed state
 * @attr {boolean} dismissable - Whether panel can be minimized to edge
 * @attr {boolean} minimized - Whether panel is currently minimized to edge tab
 * @attr {boolean} resizable - Whether panel can be resized
 * @attr {boolean} selected - Panel is selected but not focused
 * @attr {boolean} active - Panel is active/focused
 * @attr {string} persist-id - LocalStorage key for state persistence
 *
 * @fires toggle - When panel is collapsed/expanded
 * @fires panel-move - When panel is dragged
 * @fires panel-drag-end - When panel drag ends
 * @fires panel-dismiss - When panel is dismissed (only if not floating+dismissable)
 * @fires panel-minimize - When panel minimizes to edge tab
 * @fires panel-restore - When panel restores from minimized state
 * @fires panel-resize - When panel is resized
 * @fires focus-request - When panel wants focus
 *
 * @slot - Panel content
 */
export declare class Panel extends LitElement {
    title: string;
    color: PanelColor;
    border: PanelBorder;
    variant: PanelVariant;
    selectionStyle: SelectionStyle;
    collapsible: boolean;
    collapsed: boolean;
    selected: boolean;
    active: boolean;
    persistId: string;
    dismissable: boolean;
    full: boolean;
    floating: boolean;
    snapEdge: 'left' | 'right' | 'top' | '';
    positionX: number;
    positionY: number;
    resizable: boolean;
    minimized: boolean;
    panelWidth: number | null;
    panelHeight: number | null;
    maxWidth: number | null;
    maxHeight: number | null;
    minWidth: number;
    minHeight: number;
    docked: 'left' | 'right' | 'top' | 'bottom' | '';
    private _isDragging;
    private _dragStartX;
    private _dragStartY;
    private _dragOffsetX;
    private _dragOffsetY;
    private _isResizing;
    private _resizeStartX;
    private _resizeStartY;
    private _resizeStartWidth;
    private _resizeStartHeight;
    private _preMinimizeX;
    private _preMinimizeY;
    private _preMinimizeWidth;
    private _preMinimizeHeight;
    static styles: import("lit").CSSResult[];
    private _handleClick;
    connectedCallback(): void;
    disconnectedCallback(): void;
    toggle(): void;
    dismiss(): void;
    /**
     * Minimize panel to edge tab
     */
    minimize(): void;
    /**
     * Restore panel from minimized state
     */
    restore(): void;
    private _onEdgeTabClick;
    /**
     * Restore panel position/state from localStorage
     * @returns true if restored, false if no stored state
     */
    restorePosition(): boolean;
    private _onDragStart;
    private _onDragMove;
    private _onDragEnd;
    private _onResizeStart;
    private _onResizeMove;
    private _onResizeEnd;
    private _onCollapseClick;
    private _onDismissClick;
    firstUpdated(): void;
    willUpdate(changedProperties: Map<string, unknown>): void;
    updated(changedProperties: Map<string, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-panel': Panel;
    }
}
export {};
