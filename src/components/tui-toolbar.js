import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';
import './tui-button.ts';  // Import tui-button for use

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
 * 
 * @fires tool-select - When a tool button is clicked
 *   detail: { tool: string }
 * 
 * @slot - Tool buttons (or use .tools property)
 */
export class Toolbar extends LitElement {
  static properties = {
    orientation: { type: String, reflect: true },
    selected: { type: String },
    size: { type: String, reflect: true },
    selectionStyle: { type: String, attribute: 'selection-style' },
    tools: { type: Array },
  };

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

  constructor() {
    super();
    this.orientation = 'vertical';
    this.selected = '';
    this.size = 'md';
    this.selectionStyle = '';
    this.tools = [];
  }

  updated(changedProperties) {
    // Update CSS custom property when selection-style changes
    if (changedProperties.has('selectionStyle') && this.selectionStyle) {
      this.style.setProperty('--toolbar-selection-style', this.selectionStyle);
    }
  }

  _handleClick(toolId) {
    this.selected = toolId;
    this.dispatchEvent(new CustomEvent('tool-select', {
      bubbles: true,
      composed: true,
      detail: { tool: toolId }
    }));
  }

  render() {
    // If tools array provided, render from data
    if (this.tools && this.tools.length > 0) {
      return html`
        <div class="toolbar">
          ${this.tools.map(tool => {
            if (tool.divider) {
              return html`<div class="divider"></div>`;
            }
            return html`
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

if (!customElements.get('tui-toolbar')) {
  customElements.define('tui-toolbar', Toolbar);
}

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
export class Tool extends LitElement {
  static properties = {
    toolId: { type: String, attribute: 'tool-id' },
    icon: { type: String },
    active: { type: Boolean, reflect: true },
    size: { type: String },
  };

  static styles = css`
    :host {
      display: contents;
    }
  `;

  constructor() {
    super();
    this.toolId = '';
    this.icon = '';
    this.active = false;
    this.size = 'md';
  }

  _handleClick() {
    this.dispatchEvent(new CustomEvent('tool-select', {
      bubbles: true,
      composed: true,
      detail: { tool: this.toolId }
    }));
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

if (!customElements.get('tui-tool')) {
  customElements.define('tui-tool', Tool);
}
