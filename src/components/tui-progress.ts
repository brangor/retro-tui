// src/components/tui-progress.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { TuiEvent, ProgressData } from '../protocol/types';

@customElement('tui-progress')
export class Progress extends LitElement {
  @property({ type: Number })
  value = 0;

  @property({ type: String })
  label = '';

  @property({ type: Number })
  total = 0;

  @property({ type: Number })
  current = 0;

  static styles = [
    sharedStyles,
    css`
      :host { display: block; }
      .progress { padding: var(--spacing-sm); font-size: 0.8rem; }
      .header { display: flex; justify-content: space-between; margin-bottom: var(--spacing-xs); color: var(--text-primary); }
      .label { color: var(--text-primary); }
      .stats { display: flex; gap: var(--spacing-sm); color: var(--text-muted); }
      .bar-track { height: 12px; background: var(--surface-base); border: var(--border-width) solid var(--border-default); overflow: hidden; }
      .bar-fill { height: 100%; background: var(--color-primary); transition: width 0.2s ease; }
    `,
  ];

  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this.value = 0;
      this.label = '';
      this.total = 0;
      this.current = 0;
      return;
    }
    const data = event.data as unknown as ProgressData;
    if (data.value != null) this.value = data.value;
    if (data.label != null) this.label = data.label;
    if (data.total != null) this.total = data.total;
    if (data.current != null) this.current = data.current;
  }

  private get _clampedValue(): number {
    return Math.max(0, Math.min(1, this.value));
  }

  render() {
    const pct = Math.round(this._clampedValue * 100);
    return html`
      <div class="progress">
        <div class="header">
          ${this.label ? html`<span class="label">${this.label}</span>` : ''}
          <span class="stats">
            ${this.total > 0 ? html`<span class="count">${this.current}/${this.total}</span>` : ''}
            <span class="percentage">${pct}%</span>
          </span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-progress': Progress;
  }
}
