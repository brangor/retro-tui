import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import './tui-button.ts'; // Import tui-button for use

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type ToolbarOrientation = 'vertical' | 'horizontal';
type ButtonSize = 'sm' | 'md' | 'lg';
type SelectionStyle = 'invert' | 'border';

interface ToolDefinition {
  id: string;
  icon?: string;
  name?: string;
  key?: string;
  divider?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TOOLBAR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-toolbar> - Tool button group with terminal aesthetic
 *
 * Uses <tui-button variant="icon"> internally for consistent styling.
 * Supports vertical (default) or horizontal orientation.
 * Emits tool-select event when a tool is clicked.
 *
 * @attr {string} orientation - 'vertical' | 'horizontal'
 * @attr {string} selected - Currently selected tool id
 * @attr {string} size - Button size: 'sm' | 'md' | 'lg'
 * @attr {string} selection-style - Selection feedback: 'invert' | 'border'
 * @attr {boolean} show-hotkeys - Show keyboard shortcuts next to tools (default: true)
 *
 * @fires tool-select - When a tool button is clicked
 *   detail: { tool: string }
 *
 * @slot - Tool buttons (or use .tools property)
 */
@customElement('tui-toolbar')
export class Toolbar extends LitElement {
  @property({ reflect: true })
  orientation: ToolbarOrientation = 'vertical';

  @property()
  selected = '';

  @property({ reflect: true })
  size: ButtonSize = 'md';

  @property({ attribute: 'selection-style' })
  selectionStyle: SelectionStyle | '' = '';

  @property({ type: Array })
  tools: ToolDefinition[] = [];

  @property({ type: Boolean, attribute: 'show-hotkeys' })
  showHotkeys = true;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        /* Pass selection-style to children */
        --selection-style: var(--toolbar-selection-style, invert);
      }

      .toolbar {
        display: flex;
        gap: var(--spacing-xs);
      }

      :host([orientation="vertical"]) .toolbar,
      :host(:not([orientation])) .toolbar {
        flex-direction: column;
      }

      :host([orientation="horizontal"]) .toolbar {
        flex-direction: row;
        flex-wrap: wrap;
      }

      /* ═══════════════════════════════════════════════════════════════════
         TOOL WITH HOTKEY
         ═══════════════════════════════════════════════════════════════════ */

      .tool-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
      }

      .hotkey {
        font-size: 0.65rem;
        color: var(--text-muted, #888);
        font-family: var(--font-mono);
        text-transform: uppercase;
        min-width: 1ch;
        text-align: center;
      }

      /* Vertical: hotkey to the left */
      :host([orientation="vertical"]) .tool-item,
      :host(:not([orientation])) .tool-item {
        flex-direction: row;
      }

      /* Horizontal: hotkey above */
      :host([orientation="horizontal"]) .tool-item {
        flex-direction: column;
      }

      :host([orientation="horizontal"]) .hotkey {
        font-size: 0.6rem;
        line-height: 1;
      }

      /* ═══════════════════════════════════════════════════════════════════
         DIVIDER
         ═══════════════════════════════════════════════════════════════════ */

      .divider {
        background: var(--border-default);
      }

      :host([orientation="vertical"]) .divider,
      :host(:not([orientation])) .divider {
        height: 1px;
        width: 100%;
        margin: var(--spacing-xs) 0;
      }

      :host([orientation="horizontal"]) .divider {
        width: 1px;
        height: 24px;
        margin: 6px var(--spacing-xs);
      }
    `,
  ];

  updated(changedProperties: Map<string, unknown>) {
    // Update CSS custom property when selection-style changes
    if (changedProperties.has('selectionStyle') && this.selectionStyle) {
      this.style.setProperty('--toolbar-selection-style', this.selectionStyle);
    }
  }

  private _handleClick(toolId: string) {
    this.selected = toolId;
    this.dispatchEvent(
      new CustomEvent('tool-select', {
        bubbles: true,
        composed: true,
        detail: { tool: toolId },
      })
    );
  }

  render() {
    // If tools array provided, render from data
    if (this.tools && this.tools.length > 0) {
      return html`
        <div class="toolbar">
          ${this.tools.map((tool) => {
            if (tool.divider) {
              return html`<div class="divider"></div>`;
            }
            return html`
              <div class="tool-item">
                ${this.showHotkeys && tool.key
                  ? html`<span class="hotkey">${tool.key}</span>`
                  : ''}
                <tui-button
                  variant="icon"
                  size=${this.size}
                  ?selected=${this.selected === tool.id}
                  selection-style=${this.selectionStyle || 'invert'}
                  title="${tool.name || tool.id}${tool.key ? ` (${tool.key})` : ''}"
                  @click=${() => this._handleClick(tool.id)}
                >
                  ${tool.icon || tool.id.charAt(0).toUpperCase()}
                </tui-button>
              </div>
            `;
          })}
        </div>
      `;
    }

    // Otherwise, use slot
    return html`
      <div class="toolbar">
        <slot></slot>
      </div>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TOOL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-tool> - Individual tool button for use in slots
 *
 * Wraps <tui-button variant="icon"> for use inside <tui-toolbar> slots.
 *
 * @attr {string} tool-id - Tool identifier
 * @attr {string} icon - Icon character to display
 * @attr {boolean} active - Whether this tool is active
 * @attr {string} size - Button size: 'sm' | 'md' | 'lg'
 */
@customElement('tui-tool')
export class Tool extends LitElement {
  @property({ attribute: 'tool-id' })
  toolId = '';

  @property()
  icon = '';

  @property({ type: Boolean, reflect: true })
  active = false;

  @property()
  size: ButtonSize = 'md';

  static styles = css`
    :host {
      display: contents;
    }
  `;

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent('tool-select', {
        bubbles: true,
        composed: true,
        detail: { tool: this.toolId },
      })
    );
  }

  render() {
    return html`
      <tui-button
        variant="icon"
        size=${this.size}
        ?selected=${this.active}
        @click=${this._handleClick}
      >
        <slot>${this.icon}</slot>
      </tui-button>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-toolbar': Toolbar;
    'tui-tool': Tool;
  }
}
