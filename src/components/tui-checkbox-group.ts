// src/components/tui-checkbox-group.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { TuiEvent } from '../protocol/types.ts';
import type { Checkbox } from './tui-checkbox.ts';

@customElement('tui-checkbox-group')
export class CheckboxGroup extends LitElement {
  @property()
  name = '';

  @property()
  label = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Array })
  value: string[] = [];

  static styles = [
    sharedStyles,
    css`
      :host { display: block; }
      .group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm, 0.5rem);
      }
      .group-label {
        font-size: 0.8rem;
        color: var(--text-muted);
        margin-bottom: var(--spacing-xs, 0.25rem);
      }
    `,
  ];

  private _getChildren(): Checkbox[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot.assignedElements().filter(
      (el): el is Checkbox => el.tagName === 'TUI-CHECKBOX'
    );
  }

  private _syncChildren() {
    const children = this._getChildren();
    for (const child of children) {
      if (this.name) child.name = this.name;
      if (this.disabled) child.disabled = true;
    }
    this._syncValueFromChildren();
  }

  private _syncValueFromChildren() {
    const children = this._getChildren();
    this.value = children.filter(c => c.checked).map(c => c.value);
  }

  private _syncChildrenFromValue() {
    const children = this._getChildren();
    for (const child of children) {
      child.checked = this.value.includes(child.value);
    }
  }

  private _onSlotChange() {
    this._syncChildren();
  }

  private _onChange(e: Event) {
    e.stopPropagation();
    this._syncValueFromChildren();
    this.dispatchEvent(new CustomEvent('tui-change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value, name: this.name },
    }));
  }

  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this.value = [];
      this._syncChildrenFromValue();
      return;
    }
    const data = event.data as Record<string, unknown>;
    if (data.value != null) {
      this.value = data.value as string[];
      this._syncChildrenFromValue();
    }
    if (data.disabled != null) {
      this.disabled = Boolean(data.disabled);
      this._syncChildren();
    }
  }

  render() {
    return html`
      ${this.label ? html`<div class="group-label">${this.label}</div>` : ''}
      <div class="group" @tui-change=${this._onChange}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-checkbox-group': CheckboxGroup;
  }
}
