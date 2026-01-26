import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';

/**
 * <retro-palette> - Tabbed character picker
 *
 * @attr {Object} palettes - Map of palette names to char arrays
 *   Example: { 'Box': ['─', '│', ...], 'Blocks': ['█', '▓', ...] }
 *
 * @attr {string} currentPalette - Active palette name
 * @attr {string} selectedChar - Currently selected character
 * @attr {number} columns - Number of columns in character grid (default: 8)
 *
 * @fires palette-change - When tab is clicked
 *   detail: { palette: string, firstChar: string }
 *
 * @fires char-select - When character is clicked
 *   detail: { char: string }
 */
export class RetroPalette extends LitElement {
  static properties = {
    palettes: { type: Object },
    currentPalette: { type: String, attribute: 'current-palette' },
    selectedChar: { type: String, attribute: 'selected-char' },
    columns: { type: Number },
  };

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      .tabs {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
        padding: var(--spacing-sm);
        border-bottom: var(--border-width) solid var(--border-default);
      }

      .tab {
        padding: 0.2rem 0.4rem;
        background: transparent;
        border: var(--border-width) solid var(--border-default);
        color: var(--text-muted);
        font-family: inherit;
        font-size: 0.7rem;
        cursor: pointer;
        transition: border 0.1s, color 0.1s;
      }

      .tab:hover {
        border-color: var(--text-muted);
      }

      /* Active tab: bold border */
      .tab.active {
        border: 2px solid var(--color-secondary);
        color: var(--color-secondary);
        padding: calc(0.2rem - 1px) calc(0.4rem - 1px);
      }

      .grid {
        display: grid;
        gap: 2px;
        padding: var(--spacing-sm);
      }

      .char {
        width: 28px;
        height: 28px;
        background: var(--surface-base);
        border: var(--border-width) solid var(--border-default);
        color: var(--text-primary);
        font-family: inherit;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        transition: border 0.1s, background 0.1s;
      }

      .char:hover {
        background: var(--border-default);
      }

      /* Selected char: bold border */
      .char.selected {
        border: 2px solid var(--color-secondary);
        color: var(--color-secondary);
      }
    `,
  ];

  constructor() {
    super();
    this.palettes = {};
    this.currentPalette = '';
    this.selectedChar = '';
    this.columns = 8;
  }

  get _chars() {
    return this.palettes[this.currentPalette] || [];
  }

  _selectPalette(name) {
    const firstChar = this.palettes[name]?.[0] || '';
    this.dispatchEvent(new CustomEvent('palette-change', {
      bubbles: true,
      composed: true,
      detail: { palette: name, firstChar },
    }));
  }

  _selectChar(char) {
    this.dispatchEvent(new CustomEvent('char-select', {
      bubbles: true,
      composed: true,
      detail: { char },
    }));
  }

  render() {
    const paletteNames = Object.keys(this.palettes);

    return html`
      <div class="tabs">
        ${paletteNames.map(name => html`
          <button
            class="tab ${name === this.currentPalette ? 'active' : ''}"
            @click=${() => this._selectPalette(name)}
          >${name}</button>
        `)}
      </div>
      <div class="grid" style="grid-template-columns: repeat(${this.columns}, 28px)">
        ${this._chars.map(char => html`
          <button
            class="char ${char === this.selectedChar ? 'selected' : ''}"
            @click=${() => this._selectChar(char)}
          >${char}</button>
        `)}
      </div>
    `;
  }
}

customElements.define('retro-palette', RetroPalette);
