import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

/**
 * <tui-zone-layout> - A/B/C zone layout with titlebar
 *
 * Standard layout: titlebar on top, two tall columns (A/B), one full-width row (C).
 *
 * @attr {string} app - App name for titlebar
 * @attr {string} section - Section label for titlebar
 *
 * @slot titlebar-actions - Buttons in the titlebar
 * @slot a - Left column (primary interaction)
 * @slot b - Right column (secondary interaction)
 * @slot c - Bottom row (status/supplemental)
 */
@customElement('tui-zone-layout')
export class ZoneLayout extends LitElement {
  @property({ type: String })
  app = '';

  @property({ type: String })
  section = '';

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--surface-base);
      }

      .titlebar {
        display: flex;
        align-items: center;
        height: 32px;
        padding: 0 var(--spacing-md);
        background: var(--surface-elevated);
        border-bottom: var(--border-width, 2px) solid var(--color-primary);
        flex-shrink: 0;
        gap: var(--spacing-md);
      }

      .app-name {
        color: var(--color-primary);
        font-size: var(--font-size-sm, 0.75rem);
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }

      .divider {
        color: var(--border-default);
        font-size: var(--font-size-sm, 0.75rem);
      }

      .section {
        margin-left: auto;
        color: var(--text-muted);
        font-size: var(--font-size-xs, 0.6rem);
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }

      .grid {
        flex: 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr auto;
        grid-template-areas:
          "zone-a zone-b"
          "zone-c zone-c";
        gap: 1px;
        background: var(--border-default);
        min-height: 0;
      }

      ::slotted([slot="a"]) {
        grid-area: zone-a;
        background: var(--surface-base);
        min-height: 0;
        overflow: auto;
      }

      ::slotted([slot="b"]) {
        grid-area: zone-b;
        background: var(--surface-base);
        min-height: 0;
        overflow: auto;
      }

      ::slotted([slot="c"]) {
        grid-area: zone-c;
        background: var(--surface-base);
      }
    `,
  ];

  render() {
    return html`
      <div class="titlebar">
        ${this.app ? html`
          <span class="app-name">${this.app}</span>
          <span class="divider">|</span>
        ` : ''}
        <slot name="titlebar-actions"></slot>
        ${this.section ? html`<span class="section">${this.section}</span>` : ''}
      </div>
      <div class="grid">
        <slot name="a"></slot>
        <slot name="b"></slot>
        <slot name="c"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-zone-layout': ZoneLayout;
  }
}
