import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import { ansiToHtml } from '../utils/ansi.js';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface OutputLine {
  id: number;
  text: string;
  html: string;
  timestamp: string | null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-output> - Scrolling log output with ANSI color support
 * 
 * @attr {number} max-lines - Maximum lines to keep (default: 500)
 * @attr {boolean} autoscroll - Auto-scroll to bottom on new content
 * @attr {boolean} timestamps - Show timestamps on each line
 * 
 * @method append(text) - Add a line of text
 * @method clear() - Clear all output
 */
@customElement('tui-output')
export class Output extends LitElement {
  @property({ type: Number, attribute: 'max-lines' })
  maxLines = 500;

  @property({ type: Boolean })
  autoscroll = true;

  @property({ type: Boolean })
  timestamps = false;

  @state()
  private _lines: OutputLine[] = [];

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        height: fit-content;
      }

      .output {
        height: 100%;
        overflow-y: auto;
        background: var(--surface-base);
        padding: var(--spacing-sm);
        font-size: 0.8rem;
        line-height: 1.4;
      }

      .line {
        white-space: pre-wrap;
        word-break: break-all;
        color: var(--text-primary);
      }

      .timestamp {
        color: var(--text-muted);
        margin-right: var(--spacing-sm);
        font-size: 0.75rem;
      }

      .empty {
        color: var(--text-muted);
        font-style: italic;
      }

      /* Scrollbar styling */
      .output::-webkit-scrollbar {
        width: 8px;
      }

      .output::-webkit-scrollbar-track {
        background: var(--surface-base);
      }

      .output::-webkit-scrollbar-thumb {
        background: var(--border-default);
        border-radius: 4px;
      }

      .output::-webkit-scrollbar-thumb:hover {
        background: var(--text-muted);
      }
    `,
  ];

  /**
   * Append a line of text (supports ANSI codes)
   * @param text - Text to append
   */
  append(text: string): void {
    const timestamp = this.timestamps 
      ? new Date().toLocaleTimeString('en-US', { hour12: false })
      : null;
    
    const newLines: OutputLine[] = text.split('\n').map(line => ({
      id: Date.now() + Math.random(),
      text: line,
      html: ansiToHtml(line),
      timestamp,
    }));

    this._lines = [...this._lines, ...newLines].slice(-this.maxLines);

    if (this.autoscroll) {
      this.updateComplete.then(() => this.scrollToBottom());
    }
  }

  /**
   * Clear all output
   */
  clear(): void {
    this._lines = [];
  }

  private scrollToBottom(): void {
    const output = this.shadowRoot?.querySelector('.output');
    if (output) {
      output.scrollTop = output.scrollHeight;
    }
  }

  render() {
    return html`
      <div class="output">
        ${this._lines.length === 0 
          ? html`<div class="empty">Waiting for output...</div>`
          : this._lines.map(line => html`
              <div class="line">
                ${line.timestamp ? html`<span class="timestamp">[${line.timestamp}]</span>` : ''}
                <span .innerHTML=${line.html}></span>
              </div>
            `)
        }
      </div>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-output': Output;
  }
}
