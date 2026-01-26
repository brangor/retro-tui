import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';
import { ansiToHtml } from '../utils/ansi.js';

/**
 * <retro-console> - Interactive command console with history
 * 
 * @attr {string} prompt - Command prompt (default: "> ")
 * @attr {number} history-size - Max history entries (default: 100)
 * 
 * @fires command - When a command is submitted { detail: string }
 * 
 * @method print(text) - Print output to console
 * @method clear() - Clear console output
 */
export class RetroConsole extends LitElement {
  static properties = {
    prompt: { type: String },
    historySize: { type: Number, attribute: 'history-size' },
    _lines: { state: true },
    _inputValue: { state: true },
    _historyIndex: { state: true },
  };

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        height: 200px;
      }

      .console {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: var(--surface-base);
        font-size: 0.8rem;
      }

      .output {
        flex: 1;
        overflow-y: auto;
        padding: var(--spacing-sm);
        line-height: 1.4;
      }

      .line {
        white-space: pre-wrap;
        word-break: break-all;
      }

      .line.command {
        color: var(--color-primary);
      }

      .line.command::before {
        content: attr(data-prompt);
        color: var(--color-secondary);
      }

      .input-line {
        display: flex;
        align-items: center;
        padding: var(--spacing-sm);
        border-top: 1px solid var(--border-default);
        background: var(--surface-elevated);
      }

      .prompt {
        color: var(--color-secondary);
        margin-right: var(--spacing-xs);
        flex-shrink: 0;
      }

      input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-primary);
        font-family: inherit;
        font-size: inherit;
        outline: none;
        caret-color: var(--color-primary);
      }

      /* Scrollbar */
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
    `,
  ];

  constructor() {
    super();
    this.prompt = '❯ ';
    this.historySize = 100;
    this._lines = [];
    this._inputValue = '';
    this._history = [];
    this._historyIndex = -1;
  }

  /**
   * Print output to console
   * @param {string} text - Text to print (supports ANSI codes)
   */
  print(text) {
    const newLines = text.split('\n').map(line => ({
      id: Date.now() + Math.random(),
      text: line,
      html: ansiToHtml(line),
      type: 'output',
    }));
    this._lines = [...this._lines, ...newLines];
    this.updateComplete.then(() => this.scrollToBottom());
  }

  /**
   * Clear console output
   */
  clear() {
    this._lines = [];
  }

  scrollToBottom() {
    const output = this.shadowRoot?.querySelector('.output');
    if (output) {
      output.scrollTop = output.scrollHeight;
    }
  }

  focusInput() {
    const input = this.shadowRoot?.querySelector('input');
    input?.focus();
  }

  handleKeydown(e) {
    switch (e.key) {
      case 'Enter':
        this.submitCommand();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.navigateHistory(1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.navigateHistory(-1);
        break;
      case 'l':
        if (e.ctrlKey) {
          e.preventDefault();
          this.clear();
        }
        break;
      case 'c':
        if (e.ctrlKey) {
          e.preventDefault();
          this._inputValue = '';
          this.print('^C');
        }
        break;
    }
  }

  submitCommand() {
    const cmd = this._inputValue.trim();
    if (!cmd) return;

    // Add to output
    this._lines = [...this._lines, {
      id: Date.now(),
      text: cmd,
      html: cmd,
      type: 'command',
      prompt: this.prompt,
    }];

    // Add to history
    this._history = [...this._history.slice(-this.historySize + 1), cmd];
    this._historyIndex = -1;

    // Clear input
    this._inputValue = '';

    // Emit event
    this.dispatchEvent(new CustomEvent('command', {
      detail: cmd,
      bubbles: true,
      composed: true,
    }));

    this.updateComplete.then(() => this.scrollToBottom());
  }

  navigateHistory(direction) {
    const newIndex = this._historyIndex + direction;
    
    if (newIndex < 0) {
      this._historyIndex = -1;
      this._inputValue = '';
    } else if (newIndex < this._history.length) {
      this._historyIndex = newIndex;
      this._inputValue = this._history[this._history.length - 1 - newIndex];
    }
  }

  render() {
    return html`
      <div class="console" @click=${this.focusInput}>
        <div class="output">
          ${this._lines.map(line => html`
            <div class="line ${line.type}" data-prompt=${line.prompt || ''}>
              <span .innerHTML=${line.html}></span>
            </div>
          `)}
        </div>
        <div class="input-line">
          <span class="prompt">${this.prompt}</span>
          <input
            type="text"
            .value=${this._inputValue}
            @input=${e => this._inputValue = e.target.value}
            @keydown=${this.handleKeydown}
            autocomplete="off"
            spellcheck="false"
          />
        </div>
      </div>
    `;
  }
}

customElements.define('retro-console', RetroConsole);
