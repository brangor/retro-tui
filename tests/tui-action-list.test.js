import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-action-list.ts';

const ITEMS = [{ id: 'alpha', label: 'Alpha' }];

describe('tui-action-list', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-action-list></tui-action-list>`);
    expect(el).to.exist;
  });

  it('emits tui-list-item-select with { id, label }', async () => {
    const el = await fixture(html`<tui-action-list .items=${ITEMS}></tui-action-list>`);
    let detail = null;
    el.addEventListener('tui-list-item-select', (e) => { detail = e.detail; });

    el.shadowRoot.querySelector('.item').click();

    expect(detail).to.deep.equal({ id: 'alpha', label: 'Alpha' });
  });

  // Deselect carried no detail at all before 5.0.0, so a handler could not tell
  // which item had been cleared. It now mirrors its select counterpart.
  it('emits tui-list-item-deselect with { id, label }', async () => {
    const el = await fixture(html`<tui-action-list .items=${ITEMS} selected="alpha"></tui-action-list>`);
    let detail = null;
    el.addEventListener('tui-list-item-deselect', (e) => { detail = e.detail; });

    el.shadowRoot.querySelector('.item').click();

    expect(detail).to.deep.equal({ id: 'alpha', label: 'Alpha' });
  });
});
