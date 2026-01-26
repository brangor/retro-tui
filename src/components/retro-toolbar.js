import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';

/**
 * <retro-toolbar> - Tool button group with terminal aesthetic
 * 
 * Supports vertical (default) or horizontal orientation.
 * Emits tool-select event when a tool is clicked.
 * 
 * @attr {string} orientation - 'vertical' | 'horizontal'
 * @attr {string} selected - Currently selected tool id
 * @attr {string} size - Button size: 'sm' | 'md' | 'lg'
 * 
 * @fires tool-select - When a tool button is clicked
 *   detail: { tool: string }
 * 
 * @slot - Tool buttons (or use .tools property)
 */
export class RetroToolbar extends LitElement {
  static properties = {
    orientation: { type: String, reflect: true },
    selected: { type: String },
    size: { type: String, reflect: true },
    tools: { type: Array },
  };

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
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
         TOOL BUTTONS
         ═══════════════════════════════════════════════════════════════════ */

      .tool-btn {
        width: 36px;
        height: 36px;
        padding: 0;
        background: var(--surface-base);
        border: var(--border-width) solid var(--border-default);
        color: var(--text-primary);
        font-family: inherit;
        font-size: var(--spacing-md);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.1s, border-color 0.1s, color 0.1s;
      }

      .tool-btn:hover {
        background: var(--border-default);
        border-color: var(--text-muted);
      }

      .tool-btn:focus {
        outline: 1px solid var(--color-primary);
        outline-offset: 1px;
      }

      .tool-btn.active {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: var(--surface-base);
      }

      .tool-btn.active:hover {
        filter: brightness(1.1);
      }

      /* Size variants */
      :host([size="sm"]) .tool-btn {
        width: 28px;
        height: 28px;
        font-size: 0.85rem;
      }

      :host([size="lg"]) .tool-btn {
        width: 44px;
        height: 44px;
        font-size: 1.25rem;
      }

      /* Divider */
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
    this.tools = [];
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
              <button
                class="tool-btn ${this.selected === tool.id ? 'active' : ''}"
                title="${tool.name || tool.id}${tool.key ? ` (${tool.key})` : ''}"
                @click=${() => this._handleClick(tool.id)}
              >
                ${tool.icon || tool.id.charAt(0).toUpperCase()}
              </button>
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

customElements.define('retro-toolbar', RetroToolbar);

/**
 * <retro-tool> - Individual tool button for use in slots
 * 
 * @attr {string} tool-id - Tool identifier
 * @attr {string} icon - Icon character to display
 * @attr {boolean} active - Whether this tool is active
 */
export class RetroTool extends LitElement {
  static properties = {
    toolId: { type: String, attribute: 'tool-id' },
    icon: { type: String },
    active: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host {
      display: contents;
    }

    button {
      width: 36px;
      height: 36px;
      padding: 0;
      background: var(--surface-base);
      border: var(--border-width) solid var(--border-default);
      color: var(--text-primary);
      font-family: inherit;
      font-size: var(--spacing-md);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.1s, border-color 0.1s;
    }

    button:hover {
      background: var(--border-default);
    }

    :host([active]) button {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--surface-base);
    }
  `;

  constructor() {
    super();
    this.toolId = '';
    this.icon = '';
    this.active = false;
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
      <button @click=${this._handleClick}>
        <slot>${this.icon}</slot>
      </button>
    `;
  }
}

customElements.define('retro-tool', RetroTool);
