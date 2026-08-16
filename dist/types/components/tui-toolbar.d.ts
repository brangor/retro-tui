import { LitElement } from 'lit';
import type { ControlSize, SelectionStyle } from '../styles/semantics.js';
import './tui-button.ts';
type ToolbarOrientation = 'vertical' | 'horizontal';
interface ToolDefinition {
    id: string;
    icon?: string;
    name?: string;
    key?: string;
    divider?: boolean;
}
/**
 * <tui-toolbar> - Tool button group with terminal aesthetic
 *
 * Uses <tui-button variant="icon"> internally for consistent styling.
 * Supports vertical (default) or horizontal orientation.
 * Emits tui-tool-select event when a tool is clicked.
 *
 * @attr {string} orientation - 'vertical' | 'horizontal'
 * @attr {string} selected - Currently selected tool id
 * @attr {string} size - Button size: 'sm' | 'md' | 'lg'
 * @attr {string} selection-style - Selection feedback: 'invert' | 'border'
 * @attr {boolean} show-hotkeys - Show keyboard shortcuts next to tools (default: true)
 *
 * @fires tui-tool-select - When a tool button is clicked
 *   detail: { tool: string }
 *
 * @slot - Tool buttons (or use .tools property)
 */
export declare class Toolbar extends LitElement {
    orientation: ToolbarOrientation;
    selected: string;
    size: ControlSize;
    selectionStyle: SelectionStyle;
    tools: ToolDefinition[];
    showHotkeys: boolean;
    static styles: import("lit").CSSResult[];
    updated(changedProperties: Map<string, unknown>): void;
    private _handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
/**
 * <tui-tool> - Individual tool button for use in slots
 *
 * Wraps <tui-button variant="icon"> for use inside <tui-toolbar> slots.
 *
 * @attr {string} tool-id - Tool identifier
 * @attr {string} icon - Icon character to display
 * @attr {boolean} active - Whether this tool is active
 * @attr {string} size - Tool size: 'sm' | 'md' | 'lg'
 *
 * @fires tui-tool-select - When this tool is clicked (detail: { tool })
 */
export declare class Tool extends LitElement {
    toolId: string;
    icon: string;
    active: boolean;
    size: ControlSize;
    static styles: import("lit").CSSResult;
    private _handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-toolbar': Toolbar;
        'tui-tool': Tool;
    }
}
export {};
