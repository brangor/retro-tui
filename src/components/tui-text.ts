import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import { ansiToHtml } from '../utils/ansi.js';

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-text> - Static text block with ANSI color support
 * 
 * Set content via textContent or the content property.
 */
@customElement('tui-text')
export class Text extends LitElement {
  @property({ type: String })
  content = '';

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      pre {
        margin: 0;
        font-family: inherit;
        font-size: 0.85rem;
        line-height: 1.4;
        white-space: pre-wrap;
        word-break: break-all;
      }
    `,
  ];

  render() {
    const htmlContent = ansiToHtml(this.content || this.textContent || '');
    return html`<pre .innerHTML=${htmlContent}></pre>`;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-text': Text;
  }
}
