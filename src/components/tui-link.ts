import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

type LinkType = 'external' | 'copy';

/**
 * <tui-link> - Terminal-styled link with action icons
 *
 * @attr {string} href - URL for external links or value for copy links
 * @attr {string} type - 'external' (opens in browser, arrow icon) | 'copy' (copies to clipboard, copy icon)
 *
 * @fires copy - When a copy link is clicked (detail: { value: string })
 *
 * @slot - Link text
 */
@customElement('tui-link')
export class Link extends LitElement {
  @property({ type: String })
  href = '';

  @property({ type: String, reflect: true })
  type: LinkType = 'external';

  @state()
  private _copied = false;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: inline;
      }

      .link {
        color: var(--color-primary);
        text-decoration: underline;
        text-decoration-style: dotted;
        text-underline-offset: 2px;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        background: none;
        border: none;
        padding: 0;
      }

      .link:hover {
        text-decoration-style: solid;
      }

      .icon {
        color: var(--color-primary);
        font-size: 0.75em;
        margin-left: 0.3em;
        opacity: 0.7;
      }

      .link:hover .icon {
        opacity: 1;
      }

      .copied {
        color: var(--color-success);
        font-size: var(--font-size-caption, 0.6rem);
        margin-left: 0.5em;
        animation: fade-out 1.5s forwards;
      }

      @keyframes fade-out {
        0%, 70% { opacity: 1; }
        100% { opacity: 0; }
      }
    `,
  ];

  private _handleClick(): void {
    if (this.type === 'external' && this.href) {
      window.open(this.href, '_blank', 'noopener');
    } else if (this.type === 'copy' && this.href) {
      navigator.clipboard.writeText(this.href).then(() => {
        this._copied = true;
        this.dispatchEvent(new CustomEvent('copy', {
          detail: { value: this.href },
          bubbles: true,
          composed: true,
        }));
        setTimeout(() => { this._copied = false; }, 1500);
      });
    }
  }

  render() {
    const icon = this.type === 'external' ? '↗' : '⧉';
    return html`
      <button class="link" @click=${this._handleClick}>
        <slot></slot><span class="icon">${icon}</span>
      </button>${this._copied ? html`<span class="copied">copied</span>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-link': Link;
  }
}
