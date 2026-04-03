import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

/**
 * <tui-titlebar> - Application title bar
 *
 * @attr {string} app - Application name (left side)
 * @attr {string} section - Current section label (right side, caps)
 *
 * @slot - Action buttons in the middle
 */
@customElement('tui-titlebar')
export class Titlebar extends LitElement {
  @property({ type: String })
  app = '';

  @property({ type: String })
  section = '';

  static styles = [
    sharedStyles,
    css`
      :host {
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
    `,
  ];

  render() {
    return html`
      ${this.app ? html`
        <span class="app-name">${this.app}</span>
        <span class="divider">|</span>
      ` : ''}
      <slot></slot>
      ${this.section ? html`<span class="section">${this.section}</span>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-titlebar': Titlebar;
  }
}
