import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-text.ts';

describe('tui-text', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-text></tui-text>`);
    expect(el).to.exist;
  });

  it('has shadow root with pre element', async () => {
    const el = await fixture(html`<tui-text></tui-text>`);
    expect(el.shadowRoot).to.exist;
    const pre = el.shadowRoot.querySelector('pre');
    expect(pre).to.exist;
  });

  it('reflects content property', async () => {
    const el = await fixture(html`<tui-text content="Hello World"></tui-text>`);
    expect(el.content).to.equal('Hello World');
  });
});
