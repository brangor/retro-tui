import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-card.ts';

describe('tui-card', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-card></tui-card>`);
    expect(el).to.exist;
  });

  it('has shadow root with card element', async () => {
    const el = await fixture(html`<tui-card></tui-card>`);
    expect(el.shadowRoot).to.exist;
    const card = el.shadowRoot.querySelector('.card');
    expect(card).to.exist;
  });

  it('reflects rank attribute', async () => {
    const el = await fixture(html`<tui-card rank="A"></tui-card>`);
    expect(el.rank).to.equal('A');
  });

  it('reflects suit attribute', async () => {
    const el = await fixture(html`<tui-card suit="♥"></tui-card>`);
    expect(el.suit).to.equal('♥');
  });

  it('handles selected state', async () => {
    const el = await fixture(html`<tui-card selected></tui-card>`);
    expect(el.selected).to.be.true;
    expect(el.hasAttribute('selected')).to.be.true;
  });

  it('handles disabled state', async () => {
    const el = await fixture(html`<tui-card disabled></tui-card>`);
    expect(el.disabled).to.be.true;
    expect(el.hasAttribute('disabled')).to.be.true;
  });

  it('handles face-down state', async () => {
    const el = await fixture(html`<tui-card face-down></tui-card>`);
    expect(el.faceDown).to.be.true;
    expect(el.hasAttribute('face-down')).to.be.true;
  });

  it('reflects size attribute', async () => {
    const el = await fixture(html`<tui-card size="lg"></tui-card>`);
    expect(el.size).to.equal('lg');
  });
});
