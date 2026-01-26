import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-modal.js';

describe('tui-modal', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-modal></tui-modal>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-modal></tui-modal>`);
    expect(el.shadowRoot).to.exist;
  });

  it('reflects title attribute', async () => {
    const el = await fixture(html`<tui-modal title="Test Modal"></tui-modal>`);
    expect(el.title).to.equal('Test Modal');
    expect(el.getAttribute('title')).to.equal('Test Modal');
  });

  it('starts closed by default', async () => {
    const el = await fixture(html`<tui-modal></tui-modal>`);
    expect(el.open).to.be.false;
    expect(el.hasAttribute('open')).to.be.false;
  });

  it('can be opened via attribute', async () => {
    const el = await fixture(html`<tui-modal open></tui-modal>`);
    expect(el.open).to.be.true;
    expect(el.hasAttribute('open')).to.be.true;
  });
});
