import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import { BORDER_CHARS } from '../utils/borders.js';

// Static CSS character values from shared border module
const S = BORDER_CHARS.single;
const H = BORDER_CHARS.heavy;
const D = BORDER_CHARS.double;

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type CardRank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'X' | 'J' | 'Q' | 'K' | 'A' | '';
type CardSuit = '♥' | '♠' | '♦' | '♣' | '';
type CardSize = 'sm' | 'md' | 'lg';

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-card> - Playing card with terminal box-draw aesthetic
 * 
 * Three visual states using different box-drawing characters:
 * - neutral: single line border (┌──┐)
 * - hovered: thick/bold line border (┏━━┓)
 * - selected: double line border (╔══╗)
 * 
 * Inspired by terminaire card game styling.
 * 
 * @attr {string} rank - Card rank: 2-10, J, Q, K, A (or X for 10)
 * @attr {string} suit - Card suit: ♥ ♠ ♦ ♣
 * @attr {boolean} face-down - Show card back instead of face
 * @attr {boolean} selected - Card is selected (double border)
 * @attr {boolean} disabled - Card cannot be interacted with
 * @attr {string} size - 'sm' | 'md' | 'lg'
 * 
 * @fires card-click - When card is clicked
 *   detail: { rank, suit }
 * 
 * @slot - Custom content (overrides rank/suit display)
 */
@customElement('tui-card')
export class Card extends LitElement {
  @property({ type: String })
  rank: CardRank = '';

  @property({ type: String })
  suit: CardSuit = '';

  @property({ type: Boolean, attribute: 'face-down', reflect: true })
  faceDown = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  size: CardSize = 'md';

  static styles = [
    sharedStyles,
    css`
      :host {
        display: inline-block;
        font-family: inherit;
        user-select: none;
      }

      /* ═══════════════════════════════════════════════════════════════════
         CARD STRUCTURE
         Uses CSS pseudo-elements for box-drawing corners.
         State mapping (from borders.ts): single → neutral, heavy → hover, double → selected
         ═══════════════════════════════════════════════════════════════════ */

      .card {
        position: relative;
        background: var(--surface-base);
        cursor: pointer;
        transition: transform 0.1s, box-shadow 0.1s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      /* Size variants */
      .card.size-sm {
        width: 32px;
        height: 44px;
        font-size: 0.75rem;
      }

      .card.size-md {
        width: 48px;
        height: 66px;
        font-size: var(--spacing-md);
      }

      .card.size-lg {
        width: 64px;
        height: 88px;
        font-size: 1.25rem;
      }

      /* ═══════════════════════════════════════════════════════════════════
         NEUTRAL STATE - Single line border ${unsafeCSS(S.tl)}${unsafeCSS(S.h)}${unsafeCSS(S.h)}${unsafeCSS(S.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      .card {
        border: var(--border-width) solid var(--border-default);
      }

      .card::before {
        content: '${unsafeCSS(S.tl)}';
        position: absolute;
        top: -1px;
        left: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card::after {
        content: '${unsafeCSS(S.tr)}';
        position: absolute;
        top: -1px;
        right: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card-bottom::before {
        content: '${unsafeCSS(S.bl)}';
        position: absolute;
        bottom: -1px;
        left: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      .card-bottom::after {
        content: '${unsafeCSS(S.br)}';
        position: absolute;
        bottom: -1px;
        right: -1px;
        color: var(--border-default);
        font-size: 0.6em;
        line-height: 1;
      }

      /* ═══════════════════════════════════════════════════════════════════
         HOVER STATE - Heavy line border ${unsafeCSS(H.tl)}${unsafeCSS(H.h)}${unsafeCSS(H.h)}${unsafeCSS(H.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      .card:hover:not(.disabled) {
        border-color: var(--text-primary);
        box-shadow: 2px 2px 0 rgba(255,255,255,0.08);
        transform: translateY(-2px);
      }

      .card:hover:not(.disabled)::before { content: '${unsafeCSS(H.tl)}'; color: var(--text-primary); }
      .card:hover:not(.disabled)::after { content: '${unsafeCSS(H.tr)}'; color: var(--text-primary); }
      .card:hover:not(.disabled) .card-bottom::before { content: '${unsafeCSS(H.bl)}'; color: var(--text-primary); }
      .card:hover:not(.disabled) .card-bottom::after { content: '${unsafeCSS(H.br)}'; color: var(--text-primary); }

      /* ═══════════════════════════════════════════════════════════════════
         SELECTED STATE - Double line border ${unsafeCSS(D.tl)}${unsafeCSS(D.h)}${unsafeCSS(D.h)}${unsafeCSS(D.tr)}
         ═══════════════════════════════════════════════════════════════════ */

      :host([selected]) .card {
        border-color: var(--color-primary);
        box-shadow: 3px 3px 0 rgba(88, 166, 255, 0.2);
      }

      :host([selected]) .card::before { content: '${unsafeCSS(D.tl)}'; color: var(--color-primary); }
      :host([selected]) .card::after { content: '${unsafeCSS(D.tr)}'; color: var(--color-primary); }
      :host([selected]) .card-bottom::before { content: '${unsafeCSS(D.bl)}'; color: var(--color-primary); }
      :host([selected]) .card-bottom::after { content: '${unsafeCSS(D.br)}'; color: var(--color-primary); }

      /* Selected + hover */
      :host([selected]) .card:hover:not(.disabled) {
        box-shadow: 4px 4px 0 rgba(88, 166, 255, 0.3);
      }

      /* ═══════════════════════════════════════════════════════════════════
         CARD CONTENT
         ═══════════════════════════════════════════════════════════════════ */

      .suit {
        color: var(--text-primary);
      }

      .suit.red {
        color: var(--color-error);
      }

      .rank {
        font-weight: normal;
      }

      .face {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 0.1em;
      }

      /* Corner indicators */
      .corner {
        position: absolute;
        font-size: 0.65em;
        line-height: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .corner-top {
        top: 3px;
        left: 3px;
      }

      .corner-bottom {
        bottom: 3px;
        right: 3px;
        transform: rotate(180deg);
      }

      /* Face down (card back) */
      :host([face-down]) .face {
        display: none;
      }

      :host([face-down]) .corner {
        display: none;
      }

      .card-back {
        display: none;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
          45deg,
          var(--border-default),
          var(--border-default) 2px,
          var(--surface-elevated) 2px,
          var(--surface-elevated) 4px
        );
      }

      :host([face-down]) .card-back {
        display: block;
      }

      /* Disabled */
      :host([disabled]) .card {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .card-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
      }
    `,
  ];

  get isRed(): boolean {
    return this.suit === '♥' || this.suit === '♦';
  }

  private _handleClick(): void {
    if (this.disabled) return;
    
    this.dispatchEvent(new CustomEvent('card-click', {
      bubbles: true,
      composed: true,
      detail: { rank: this.rank, suit: this.suit }
    }));
  }

  render() {
    const suitClass = this.isRed ? 'suit red' : 'suit';
    const sizeClass = `size-${this.size}`;

    return html`
      <div 
        class="card ${sizeClass} ${this.disabled ? 'disabled' : ''}"
        @click=${this._handleClick}
      >
        <div class="card-back"></div>
        
        <div class="corner corner-top">
          <span class="rank">${this.rank}</span>
          <span class="${suitClass}">${this.suit}</span>
        </div>
        
        <div class="face">
          <slot>
            <span class="${suitClass}" style="font-size: 1.5em;">${this.suit}</span>
          </slot>
        </div>
        
        <div class="corner corner-bottom">
          <span class="rank">${this.rank}</span>
          <span class="${suitClass}">${this.suit}</span>
        </div>
        
        <div class="card-bottom"></div>
      </div>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-card': Card;
  }
}
