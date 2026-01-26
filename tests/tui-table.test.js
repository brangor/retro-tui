import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-table.js';

describe('tui-table', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-table></tui-table>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-table></tui-table>`);
    expect(el.shadowRoot).to.exist;
  });

  it('shows empty state when no data', async () => {
    const el = await fixture(html`<tui-table></tui-table>`);
    const empty = el.shadowRoot.querySelector('.empty');
    expect(empty).to.exist;
    expect(empty.textContent).to.equal('No data');
  });

  it('renders table after setData', async () => {
    const el = await fixture(html`<tui-table></tui-table>`);
    el.setData(['Name', 'Value'], [{ Name: 'test', Value: 123 }]);
    await el.updateComplete;
    const table = el.shadowRoot.querySelector('.table');
    expect(table).to.exist;
    const header = el.shadowRoot.querySelector('.header');
    expect(header).to.exist;
  });
});
