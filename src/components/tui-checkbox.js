import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';

/**
 * <tui-checkbox> - Terminal-styled button
 **/

export class Button extends LitElement {
  static properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    selectionStyle: { type: String, attribute: 'selection-style' },
    selected: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    id: {type: String, reflect: true}
  };

  constructor() {
    super();
    this.variant = 'default';
    this.size = 'md';
    this.selectionStyle = undefined;
    this.selected = false;
    this.disabled = false;
    this.id = String(Math.random() * 1000)
  }

  static styles = [
  ];

  // ▣ || □
  // ▢ and a custom filled version
  // ◈ || ◇
  // ◉ || ◎ || ○ || ◌ || ◍
  // classic ☐ ☑ ☒ ☓
  // gid966-gid971 are all interesting as well, but not unicode supported I think

  // slider button? ◐ || ◑ / ◒ || ◓ 
  render() {
    return html`
      <input type="checkbox" ?disabled=${this.disabled}>
        <slot></slot>
      </input>
    `;
  }
}

customElements.define('tui-checkbox', Button);
