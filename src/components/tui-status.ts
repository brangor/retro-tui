// src/components/tui-status.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { TuiEvent, StatusData } from '../protocol/types.ts';

const INDICATORS: Record<string, string> = {
  success: '✓',
  error: '✗',
  warn: '⚠',
  info: 'ℹ',
  pending: '…',
};

@customElement('tui-status')
export class Status extends LitElement {
  @property({ type: String })
  state = '';

  @property({ type: String })
  message = '';

  static styles = [
    sharedStyles,
    css`
      :host { display: block; }
      .badge {
        display: flex; align-items: center; gap: var(--spacing-sm);
        padding: var(--spacing-sm); font-size: 0.8rem;
        border-left: 3px solid transparent;
      }
      .badge.success { border-left-color: var(--color-success); color: var(--color-success); }
      .badge.error { border-left-color: var(--color-error); color: var(--color-error); }
      .badge.warn { border-left-color: var(--color-info); color: var(--color-info); }
      .badge.info { border-left-color: var(--color-primary); color: var(--color-primary); }
      .badge.pending { border-left-color: var(--text-muted); color: var(--text-muted); }
      .indicator { flex-shrink: 0; }
      .message { color: var(--text-primary); }
      .empty { color: var(--text-muted); font-style: italic; padding: var(--spacing-sm); }
    `,
  ];

  handleEvent(event: TuiEvent): void {
    if (event.type === 'clear') {
      this.state = '';
      this.message = '';
      return;
    }
    const data = event.data as unknown as StatusData;
    if (data.state != null) this.state = data.state;
    if (data.message != null) this.message = data.message;
  }

  render() {
    if (!this.state) {
      return html`<div class="empty">No status</div>`;
    }
    return html`
      <div class="badge ${this.state}">
        <span class="indicator">${INDICATORS[this.state] ?? ''}</span>
        <span class="message">${this.message}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-status': Status;
  }
}
