// src/components/tui-radio-group.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { TuiEvent } from '../protocol/types.ts';
import type { Radio } from './tui-radio.ts';

@customElement('tui-radio-group')
export class RadioGroup extends LitElement {
  @property()
  name = '';

  @property()
  label = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property()
  value = '';

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

  private _getChildren(): Radio[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot.assignedElements().filter(
      (el): el is Radio => el.tagName === 'TUI-RADIO'
    );
  }

  private _syncChildren() {
    const children = this._getChildren();
    for (const child of children) {
      if (this.name) child.name = this.name;
      if (this.disabled) child.disabled = true;
      child.checked = child.value === this.value;
    }
  }

  private _onSlotChange() {
    this._syncChildren();
  }

  private _onChange(e: Event) {
    e.stopPropagation();
    const detail = (e as CustomEvent).detail;
    this.value = detail.value;
    for (const child of this._getChildren()) {
      child.checked = child.value === this.value;
    }
    this.dispatchEvent(new CustomEvent('tui-change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value, name: this.name },
    }));
  }

  private _onKeydown(e: KeyboardEvent) {
    const children = this._getChildren();
    if (children.length === 0) return;
    const currentIndex = children.findIndex(c => c.value === this.value);

    let nextIndex: number;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % children.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + children.length) % children.length;
    } else {
      return;
    }

    this.value = children[nextIndex].value;
    for (const child of children) {
      child.checked = child.value === this.value;
    }
    children[nextIndex].focus();
    this.dispatchEvent(new CustomEvent('tui-change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value, name: this.name },
    }));
  }

  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this.value = '';
      for (const child of this._getChildren()) {
        child.checked = false;
      }
      return;
    }
    const data = event.data as Record<string, unknown>;
    if (data.value != null) {
      this.value = String(data.value);
      this._syncChildren();
    }
    if (data.disabled != null) {
      this.disabled = Boolean(data.disabled);
      this._syncChildren();
    }
  }

  render() {
    return html`
      ${this.label ? html`<div class="group-label">${this.label}</div>` : ''}
      <div class="group" role="radiogroup" @tui-change=${this._onChange} @keydown=${this._onKeydown}>
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-radio-group': RadioGroup;
  }
}
