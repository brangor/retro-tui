import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-toast.ts';

describe('tui-toast', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-toast></tui-toast>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-toast></tui-toast>`);
    expect(el.shadowRoot).to.exist;
  });

  it('has default position', async () => {
    const el = await fixture(html`<tui-toast></tui-toast>`);
    expect(el.position).to.equal('bottom');
  });

  it('reflects position attribute', async () => {
    const el = await fixture(html`<tui-toast position="top"></tui-toast>`);
    expect(el.position).to.equal('top');
    expect(el.getAttribute('position')).to.equal('top');
  });
});
