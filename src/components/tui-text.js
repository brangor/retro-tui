import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';
import { ansiToHtml } from '../utils/ansi.js';

/**
 * <tui-text> - Static text block with ANSI color support
 * 
 * Set content via textContent or the content property.
 */
export class Text extends LitElement {
  static properties = {
    content: { type: String },
  };

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

  constructor() {
    super();
    this.content = '';
  }

  render() {
    const htmlContent = ansiToHtml(this.content || this.textContent || '');
    return html`<pre .innerHTML=${htmlContent}></pre>`;
  }
}

if (!customElements.get('tui-text')) {
  customElements.define('tui-text', Text);
}
