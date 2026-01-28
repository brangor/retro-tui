import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-statusbar.ts';

describe('tui-statusbar', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-statusbar></tui-statusbar>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-statusbar></tui-statusbar>`);
    expect(el.shadowRoot).to.exist;
  });
});

describe('tui-status-item', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-status-item></tui-status-item>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-status-item></tui-status-item>`);
    expect(el.shadowRoot).to.exist;
  });

  it('reflects label attribute', async () => {
    const el = await fixture(html`<tui-status-item label="Mode"></tui-status-item>`);
    expect(el.label).to.equal('Mode');
    const labelSpan = el.shadowRoot.querySelector('.label');
    expect(labelSpan.textContent).to.equal('Mode');
  });

  it('reflects value attribute', async () => {
    const el = await fixture(html`<tui-status-item value="Normal"></tui-status-item>`);
    expect(el.value).to.equal('Normal');
    const valueSpan = el.shadowRoot.querySelector('.value');
    expect(valueSpan.textContent).to.equal('Normal');
  });
});
