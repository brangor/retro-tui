import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

/**
 * <tui-action-list> - Selectable list with expandable action panels
 *
 * Clicking an item expands an action slot below it. One expanded at a time.
 *
 * @attr {Array} items - Array of { id: string, label: string, [sublabel]: string, [color]: string }
 *                       color maps to CSS vars: 'success' | 'error' | 'warning' | 'primary' | 'muted'
 * @attr {string} selected - ID of currently expanded item (or empty)
 *
 * @fires item-select - When an item is clicked (detail: { id, label })
 * @fires item-deselect - When expanded item is collapsed
 *
 * @slot actions-{id} - Per-item action content shown below the item when selected.
 *                      One slot per item, named by item id. e.g. slot="actions-my-item-id"
 */
@customElement('tui-action-list')
export class ActionList extends LitElement {
  @property({ type: Array })
  items: Array<{ id: string; label: string; sublabel?: string; color?: string }> = [];

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

      .item.active,
      .item.active:hover {
        background: var(--text-primary);
        color: var(--surface-base);
      }

      .sublabel {
        font-size: var(--font-size-caption, 0.6rem);
        color: var(--text-muted);
        margin-top: 2px;
      }

      .item.active .sublabel,
      .item.active:hover .sublabel {
        color: var(--surface-elevated);
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

  private _colorVar(color?: string): string {
    const map: Record<string, string> = {
      success: 'var(--color-success)',
      error:   'var(--color-error)',
      warning: 'var(--color-warning)',
      primary: 'var(--color-primary)',
      muted:   'var(--text-muted)',
    };
    return color ? (map[color] ?? color) : '';
  }

  private _hasActions(id: string): boolean {
    const slot = this.shadowRoot?.querySelector(`slot[name="actions-${id}"]`) as HTMLSlotElement | null;
    return !!slot && slot.assignedNodes().length > 0;
  }

  render() {
    if (this.items.length === 0) {
      return html`<div class="empty">No items</div>`;
    }

    return html`${this.items.map((item) => {
      const colorStyle = this._colorVar(item.color);
      const isActive = this.selected === item.id;
      return html`
        <div
          class="item ${isActive ? 'active' : ''}"
          @click=${() => this._handleClick(item.id, item.label)}
        >
          <div style=${colorStyle && !isActive ? `color: ${colorStyle}` : ''}>${item.label}</div>
          ${item.sublabel ? html`<div class="sublabel">${item.sublabel}</div>` : ''}
        </div>
        ${isActive ? html`
          <div class="action-panel" style=${this._hasActions(item.id) ? '' : 'display:none'}>
            <slot name="actions-${item.id}" @slotchange=${() => this.requestUpdate()}></slot>
          </div>
        ` : nothing}
      `;
    })}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-action-list': ActionList;
  }
}
