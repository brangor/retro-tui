// tests/tui-progress.test.ts
import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-progress.ts';

describe('tui-progress', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-progress></tui-progress>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
  });

  it('renders a progress bar', async () => {
    const el = await fixture(html`<tui-progress value="0.5"></tui-progress>`);
    const bar = el.shadowRoot.querySelector('.bar-fill');
    expect(bar).to.exist;
    expect(bar.style.width).to.equal('50%');
  });

  it('shows label when set', async () => {
    const el = await fixture(html`<tui-progress value="0.3" label="Downloading..."></tui-progress>`);
    const label = el.shadowRoot.querySelector('.label');
    expect(label).to.exist;
    expect(label.textContent).to.contain('Downloading...');
  });

  it('shows count when total and current are set', async () => {
    const el = await fixture(html`<tui-progress value="0.5" total="10" current="5"></tui-progress>`);
    const count = el.shadowRoot.querySelector('.count');
    expect(count).to.exist;
    expect(count.textContent).to.contain('5/10');
  });

  it('shows percentage text', async () => {
    const el = await fixture(html`<tui-progress value="0.73"></tui-progress>`);
    const pct = el.shadowRoot.querySelector('.percentage');
    expect(pct).to.exist;
    expect(pct.textContent).to.contain('73%');
  });

  it('clamps value between 0 and 1', async () => {
    const el = await fixture(html`<tui-progress value="1.5"></tui-progress>`);
    const bar = el.shadowRoot.querySelector('.bar-fill');
    expect(bar.style.width).to.equal('100%');
  });

  it('handles handleEvent for progress type', async () => {
    const el = await fixture(html`<tui-progress></tui-progress>`);
    el.handleEvent({
      channel: 'test', type: 'progress', id: 'x',
      data: { value: 0.6, label: 'Test', total: 10, current: 6 },
    });
    await el.updateComplete;
    expect(el.value).to.equal(0.6);
    expect(el.label).to.equal('Test');
    const bar = el.shadowRoot.querySelector('.bar-fill');
    expect(bar.style.width).to.equal('60%');
  });

  it('handles handleEvent for clear type', async () => {
    const el = await fixture(html`<tui-progress value="0.5" label="Test"></tui-progress>`);
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    expect(el.value).to.equal(0);
    expect(el.label).to.equal('');
  });
});
