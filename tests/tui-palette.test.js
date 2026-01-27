import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-palette.ts';

describe('tui-palette', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-palette></tui-palette>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-palette></tui-palette>`);
    expect(el.shadowRoot).to.exist;
    const tabs = el.shadowRoot.querySelector('.tabs');
    expect(tabs).to.exist;
  });

  it('renders tabs for palettes', async () => {
    const palettes = { 'Box': ['─', '│'], 'Blocks': ['█', '▓'] };
    const el = await fixture(html`<tui-palette .palettes=${palettes} current-palette="Box"></tui-palette>`);
    await el.updateComplete;
    const tabButtons = el.shadowRoot.querySelectorAll('.tab');
    expect(tabButtons.length).to.equal(2);
  });

  it('reflects selected-char attribute', async () => {
    const el = await fixture(html`<tui-palette selected-char="█"></tui-palette>`);
    expect(el.selectedChar).to.equal('█');
  });

  it('reflects columns attribute', async () => {
    const el = await fixture(html`<tui-palette columns="10"></tui-palette>`);
    expect(el.columns).to.equal(10);
  });
});
