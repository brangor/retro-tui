import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-table.ts';

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

  it('handles table event via handleEvent (full data)', async () => {
    const el = await fixture(html`<tui-table></tui-table>`);
    el.handleEvent({
      channel: 'test', type: 'table', id: 'x',
      data: { columns: ['Name', 'Score'], rows: [{ Name: 'Alice', Score: 100 }] },
    });
    await el.updateComplete;
    const header = el.shadowRoot.querySelector('.header');
    expect(header).to.exist;
    const cells = el.shadowRoot.querySelectorAll('.row:not(.header) .cell');
    expect(cells.length).to.equal(2);
    expect(cells[0].textContent).to.contain('Alice');
  });

  it('handles table event via handleEvent (upsert)', async () => {
    const el = await fixture(html`<tui-table></tui-table>`);
    el.setData(['Name', 'Score'], [{ Name: 'Alice', Score: 100 }]);
    el.handleEvent({
      channel: 'test', type: 'table', id: 'x',
      data: { key: 'Bob', row: { Name: 'Bob', Score: 200 } },
    });
    await el.updateComplete;
    const rows = el.shadowRoot.querySelectorAll('.row:not(.header)');
    expect(rows.length).to.equal(2);
  });

  it('handles clear event via handleEvent', async () => {
    const el = await fixture(html`<tui-table></tui-table>`);
    el.setData(['Name'], [{ Name: 'Alice' }]);
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    const empty = el.shadowRoot.querySelector('.empty');
    expect(empty).to.exist;
  });
});
