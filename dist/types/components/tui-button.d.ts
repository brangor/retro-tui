import { LitElement } from 'lit';
type ButtonVariant = 'default' | 'primary' | 'danger' | 'ghost' | 'icon' | 'menu' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';
type SelectionStyle = 'invert' | 'border';
/**
 * <tui-button> - Terminal-styled button
 *
 * A flexible button component that works standalone, in toolbars, or as menu triggers.
 * Supports two selection feedback styles: color inversion or border weight changes.
 *
 * @attr {string} variant - Visual style: 'default' | 'primary' | 'danger' | 'ghost' | 'icon' | 'menu'
 * @attr {string} size - Button sizing: 'sm' | 'md' | 'lg'
 * @attr {string} selection-style - Selection feedback: 'invert' | 'border' (inherits from --selection-style CSS property)
 * @attr {boolean} selected - Toggle/selected state for toolbar use
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} block - Full width display
 *
 * @slot - Button label/content
 *
 * @cssprop [--tui-button-bg] - Override background color
 * @cssprop [--tui-button-color] - Override text color
 * @cssprop [--tui-button-border-color] - Override border color
 * @cssprop [--tui-button-hover-bg] - Override hover background color
 * @cssprop [--tui-button-hover-color] - Override hover text color
 * @cssprop [--tui-button-hover-border-color] - Override hover border color
 * @cssprop [--selection-style] - Inherited selection style (invert | border)
 */
export declare class Button extends LitElement {
    static shadowRootOptions: {
        delegatesFocus: boolean;
        clonable?: boolean;
        customElementRegistry?: CustomElementRegistry;
        mode: ShadowRootMode;
        serializable?: boolean;
        slotAssignment?: SlotAssignmentMode;
    };
    variant: ButtonVariant;
    size: ButtonSize;
    selectionStyle?: SelectionStyle;
    toolId?: string;
    selected: boolean;
    disabled: boolean;
    block: boolean;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-button': Button;
    }
}
export {};
