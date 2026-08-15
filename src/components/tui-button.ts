import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { ControlSize, SelectionStyle, SemanticColor } from '../styles/semantics.js';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type ButtonVariant = 'default' | 'filled' | 'outline' | 'ghost' | 'icon' | 'menu';

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-button> - Terminal-styled button
 *
 * A flexible button component that works standalone, in toolbars, or as menu triggers.
 * Supports two selection feedback styles: color inversion or border weight changes.
 *
 * @attr {string} variant - Treatment: 'default' | 'filled' | 'outline' | 'ghost' | 'icon' | 'menu'
 * @attr {string} color - Semantic accent: 'primary' | 'secondary' | 'success' | 'warning' |
 *                        'error' | 'info' | 'muted'. Only the 'filled' and 'outline'
 *                        treatments read it; 'default', 'ghost', 'icon' and 'menu' carry
 *                        their own colours and ignore it.
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
@customElement('tui-button')
export class Button extends LitElement {
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ reflect: true })
  variant: ButtonVariant = 'default';

  @property({ reflect: true })
  color: SemanticColor = '';

  @property({ reflect: true })
  size: ControlSize = 'md';

  @property({ attribute: 'selection-style' })
  selectionStyle?: SelectionStyle;

  @property({ attribute: 'tool-id' })
  toolId?: string;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  block = false;

  static styles = [
    sharedStyles,
    css`
      /* ═══════════════════════════════════════════════════════════════════
         HOST & THEMING HOOKS
         ═══════════════════════════════════════════════════════════════════ */

      :host {
        /* Inherit selection style from parent or default to invert */
        --_selection-style: var(--selection-style, invert);

        /* Themeable properties with fallbacks */
        --_btn-bg: var(--tui-button-bg, var(--surface-base));
        --_btn-color: var(--tui-button-color, var(--text-primary));
        --_btn-border-color: var(--tui-button-border-color, var(--border-default));
        --_btn-border-width: var(--border-width, 1px);

        /* Hover overrides - default to standard behavior if not set */
        --_btn-hover-bg: var(--tui-button-hover-bg, var(--border-default));
        --_btn-hover-color: var(--tui-button-hover-color, var(--_btn-color));
        --_btn-hover-border-color: var(--tui-button-hover-border-color, var(--text-muted));

        /* The accent the filled and outline treatments paint with. The color
           attribute overrides it; unset, both treatments read as primary. */
        --_btn-accent: var(--color-primary);

        /* Size tokens */
        --_btn-padding-x: var(--spacing-md);
        --_btn-padding-y: var(--spacing-sm);
        --_btn-font-size: 0.85rem;
        --_btn-icon-size: 36px;

        display: inline-block;
      }

      :host([block]) {
        display: block;
      }

      /* ═══════════════════════════════════════════════════════════════════
         BASE BUTTON
         ═══════════════════════════════════════════════════════════════════ */

      button {
        font-family: var(--font-mono, inherit);
        font-size: var(--_btn-font-size);
        padding: var(--_btn-padding-y) var(--_btn-padding-x);
        background: var(--_btn-bg);
        border: var(--_btn-border-width) solid var(--_btn-border-color);
        border-radius: var(--border-radius, 0);
        color: var(--_btn-color);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-xs);
        text-transform: uppercase;
        letter-spacing: 0.03em;
        width: 100%;
        transition:
          background 0.1s ease-out,
          border-color 0.1s ease-out,
          color 0.1s ease-out,
          box-shadow 0.1s ease-out,
          filter 0.1s ease-out;

        &:hover:not(:disabled) {
          background: var(--_btn-hover-bg);
          color: var(--_btn-hover-color);
          border-color: var(--_btn-hover-border-color);
        }

        &:focus {
          outline: 1px solid var(--color-primary);
          outline-offset: 1px;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      /* ═══════════════════════════════════════════════════════════════════
         SIZES
         ═══════════════════════════════════════════════════════════════════ */

      :host([size="sm"]) {
        --_btn-padding-x: var(--spacing-sm);
        --_btn-padding-y: var(--spacing-xs);
        --_btn-font-size: 0.75rem;
        --_btn-icon-size: 28px;
      }

      :host([size="lg"]) {
        --_btn-padding-x: var(--spacing-lg);
        --_btn-padding-y: var(--spacing-md);
        --_btn-font-size: 1rem;
        --_btn-icon-size: 44px;
      }

      /* ═══════════════════════════════════════════════════════════════════
         SEMANTIC COLOUR — sets the accent the filled/outline treatments use
         ═══════════════════════════════════════════════════════════════════ */

      :host([color="primary"])   { --_btn-accent: var(--color-primary); }
      :host([color="secondary"]) { --_btn-accent: var(--color-secondary); }
      :host([color="success"])   { --_btn-accent: var(--color-success); }
      :host([color="warning"])   { --_btn-accent: var(--color-warning); }
      :host([color="error"])     { --_btn-accent: var(--color-error); }
      :host([color="info"])      { --_btn-accent: var(--color-info); }

      /* muted is a de-emphasis accent, meant for the outline treatment. Under
         filled it becomes the background behind --surface-base text, which does
         not clear AA contrast in the dark themes — reach for ghost instead. */
      :host([color="muted"])     { --_btn-accent: var(--text-muted); }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: FILLED — solid accent, brightens on hover
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="filled"]) {
        --_btn-bg: var(--_btn-accent);
        --_btn-color: var(--surface-base);
        --_btn-border-color: var(--_btn-accent);

        & button:hover:not(:disabled) {
          filter: brightness(1.15);
          background: var(--_btn-accent);
          border-color: var(--_btn-accent);
        }
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: GHOST
         No border until hover
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="ghost"]) {
        --_btn-bg: transparent;
        --_btn-color: var(--text-muted);
        --_btn-border-color: transparent;

        & button:hover:not(:disabled) {
          background: transparent;
          border-color: var(--border-default);
          color: var(--text-primary);
        }
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: OUTLINE — accent border and text, fills on hover
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="outline"]) {
        --_btn-bg: transparent;
        --_btn-color: var(--_btn-accent);
        --_btn-border-color: var(--_btn-accent);

        & button:hover:not(:disabled) {
          background: var(--_btn-accent);
          color: var(--surface-base);
          border-color: var(--_btn-accent);
        }
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: ICON
         Square button for toolbars
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="icon"]) {
        --_btn-bg: var(--surface-base);
        --_btn-color: var(--text-primary);
        --_btn-border-color: var(--border-default);

        & button {
          width: var(--_btn-icon-size);
          height: var(--_btn-icon-size);
          padding: 0;
          font-size: var(--spacing-md);
        }
      }

      /* ═══════════════════════════════════════════════════════════════════
         VARIANT: MENU
         Transparent trigger for menu bars
         ═══════════════════════════════════════════════════════════════════ */

      :host([variant="menu"]) {
        --_btn-bg: transparent;
        --_btn-color: var(--text-primary);
        --_btn-border-color: transparent;

        & button {
          text-transform: none;
          letter-spacing: normal;
          padding: var(--spacing-xs) var(--spacing-sm);

          &:hover:not(:disabled) {
            background: var(--text-primary);
            color: var(--surface-base);
            border-color: transparent;
          }
        }
      }

      /* ═══════════════════════════════════════════════════════════════════
         SELECTED STATE: INVERT STYLE (default)
         Color swap on selected
         ═══════════════════════════════════════════════════════════════════ */

      :host([selected]) button {
        background: var(--text-primary);
        color: var(--surface-base);
        border-color: var(--text-primary);
      }

      :host([selected]) button:hover:not(:disabled) {
        filter: brightness(1.1);
      }

      /* Icon variant with invert selection */
      :host([variant="icon"][selected]) button {
        background: var(--color-primary);
        color: var(--surface-base);
        border-color: var(--color-primary);
      }

      /* ═══════════════════════════════════════════════════════════════════
         SELECTED STATE: BORDER STYLE
         Progressive border weight: single → heavy → double
         Uses box-shadow to avoid layout shifts (no border-width changes)
         ═══════════════════════════════════════════════════════════════════ */

      /* Border style: hover shows heavy border via box-shadow */
      :host([selection-style="border"]) button:hover:not(:disabled) {
        background: var(--_btn-bg);
        border-color: var(--text-primary);
        box-shadow: 0 0 0 1px var(--text-primary);
      }

      /* Border style: selected shows double line with visible gap
         Structure: border (outer) → gap (bg color) → inner line */
      :host([selection-style="border"][selected]) button {
        background: var(--_btn-bg);
        color: var(--_btn-color);
        border-color: var(--text-primary);
        box-shadow: 
          inset 0 0 0 2px var(--_btn-bg),
          inset 0 0 0 3px var(--text-primary);
      }

      :host([selection-style="border"][selected]) button:hover:not(:disabled) {
        filter: none;
        background: var(--surface-elevated);
      }

      /* Border style for icon variant */
      :host([selection-style="border"][variant="icon"]) button:hover:not(:disabled) {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 1px var(--color-primary);
      }

      :host([selection-style="border"][variant="icon"][selected]) button {
        border-color: var(--color-primary);
        box-shadow: 
          inset 0 0 0 2px var(--_btn-bg),
          inset 0 0 0 3px var(--color-primary);
      }
    `,
  ];

  render() {
    return html`
      <button ?disabled=${this.disabled} part="button">
        <slot></slot>
      </button>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-button': Button;
  }
}
