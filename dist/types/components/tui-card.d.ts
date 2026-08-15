import { LitElement } from 'lit';
import type { ControlSize } from '../styles/semantics.js';
type CardRank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'X' | 'J' | 'Q' | 'K' | 'A' | '';
type CardSuit = '♥' | '♠' | '♦' | '♣' | '';
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
 * @fires tui-card-click - When card is clicked
 *   detail: { rank, suit }
 *
 * @slot - Custom content (overrides rank/suit display)
 */
export declare class Card extends LitElement {
    rank: CardRank;
    suit: CardSuit;
    faceDown: boolean;
    selected: boolean;
    disabled: boolean;
    size: ControlSize;
    static styles: import("lit").CSSResult[];
    get isRed(): boolean;
    private _handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-card': Card;
    }
}
export {};
