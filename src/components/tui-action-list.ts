import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

/**
 * <tui-action-list> - Selectable list with expandable action panels
 *
 * Clicking an item expands an action slot below it. One expanded at a time.
 *
 * @attr {Array} items - Array of { id: string, label: string, [sublabel]: string }
 * @attr {string} selected - ID of currently expanded item (or empty)
 *
 * @fires item-select - When an item is clicked (detail: { id, label })
 * @fires item-deselect - When expanded item is collapsed
 *
 * @slot actions - Content shown below the selected item. Receives `data-item-id` context.
 */
@customElement('tui-action-list')
export class ActionList extends LitElement {
  @property({ type: Array })
  items: Array<{ id: string; label: string; sublabel?: string }> = [];

  @property({ type: String, reflect: true })
  selected = '';

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
      }

      .item {
        padding: var(--spacing-sm) var(--spacing-md);
        color: var(--text-primary);
        font-size: var(--font-size-body, 0.85rem);
        cursor: pointer;
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        transition: background 0.1s;
      }

      .item:hover {
        background: var(--surface-elevated);
      }

      .item.active {
        color: var(--color-primary);
        background: var(--surface-elevated);
      }

      .sublabel {
        font-size: var(--font-size-caption, 0.6rem);
        color: var(--text-muted);
        margin-top: 2px;
      }

      .action-panel {
        background: var(--surface-elevated);
        border: 1px solid var(--color-primary);
        padding: var(--spacing-sm) var(--spacing-md);
        animation: expand 0.15s ease-out;
      }

      @keyframes expand {
        from { opacity: 0; max-height: 0; }
        to { opacity: 1; max-height: 200px; }
      }

      .empty {
        color: var(--text-muted);
        font-style: italic;
        font-size: var(--font-size-sm, 0.75rem);
        padding: var(--spacing-md);
        opacity: 0.4;
      }
    `,
  ];

  private _handleClick(id: string, label: string): void {
    if (this.selected === id) {
      this.selected = '';
      this.dispatchEvent(new CustomEvent('item-deselect', {
        bubbles: true, composed: true,
      }));
    } else {
      this.selected = id;
      this.dispatchEvent(new CustomEvent('item-select', {
        detail: { id, label },
        bubbles: true, composed: true,
      }));
    }
  }

  render() {
    if (this.items.length === 0) {
      return html`<div class="empty">No items</div>`;
    }

    return html`${this.items.map((item) => html`
      <div
        class="item ${this.selected === item.id ? 'active' : ''}"
        @click=${() => this._handleClick(item.id, item.label)}
      >
        <div>${item.label}</div>
        ${item.sublabel ? html`<div class="sublabel">${item.sublabel}</div>` : ''}
      </div>
      ${this.selected === item.id ? html`
        <div class="action-panel">
          <slot name="actions"></slot>
        </div>
      ` : ''}
    `)}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-action-list': ActionList;
  }
}
