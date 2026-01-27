import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-output.ts';

describe('tui-output', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-output></tui-output>`);
    expect(el).to.exist;
  });

  it('has shadow root with output container', async () => {
    const el = await fixture(html`<tui-output></tui-output>`);
    expect(el.shadowRoot).to.exist;
    const output = el.shadowRoot.querySelector('.output');
    expect(output).to.exist;
  });

  it('reflects autoscroll attribute', async () => {
    const el = await fixture(html`<tui-output autoscroll></tui-output>`);
    expect(el.autoscroll).to.be.true;
  });

  it('reflects max-lines attribute', async () => {
    const el = await fixture(html`<tui-output max-lines="100"></tui-output>`);
    expect(el.maxLines).to.equal(100);
  });
});
