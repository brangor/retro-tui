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

  @property({ type: String, reflect: true })
  variant: 'body' | 'caption' | 'subtitle' | 'label' | '' = '';

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

      :host([variant="caption"]) pre {
        font-size: var(--font-size-caption, 0.6rem);
        color: var(--text-muted);
      }

      :host([variant="subtitle"]) pre {
        font-size: var(--font-size-sm, 0.75rem);
        color: var(--text-muted);
      }

      :host([variant="label"]) pre {
        font-size: var(--font-size-label, 0.75rem);
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      :host([variant="body"]) pre {
        font-size: var(--font-size-body, 0.85rem);
        color: var(--text-primary);
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
