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
 * Use `attr` for declarative text styling: attr="bold reverse"
 *
 * @attr {string} attr - Space-separated text attributes (bold, dim, italic, underline, reverse, strikethrough, blink)
 */
@customElement('tui-text')
export class Text extends LitElement {
  @property({ type: String })
  content = '';

  @property({ type: String })
  attr = '';

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
    const attrClasses = this.attr
      .split(/\s+/)
      .filter(Boolean)
      .map(a => `tui-${a}`)
      .join(' ');

    const htmlContent = ansiToHtml(this.content || this.textContent || '');
    return html`<pre class="${attrClasses}" .innerHTML=${htmlContent}></pre>`;
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
