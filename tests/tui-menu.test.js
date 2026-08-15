import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-menu.ts';

describe('tui-menu', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-menu></tui-menu>`);
    expect(el).to.exist;
  });
});

describe('tui-menu-item', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-menu-item label="File"></tui-menu-item>`);
    expect(el).to.exist;
  });

  it('reflects label attribute', async () => {
    const el = await fixture(html`<tui-menu-item label="Edit"></tui-menu-item>`);
    expect(el.getAttribute('label')).to.equal('Edit');
    expect(el.label).to.equal('Edit');
  });
});

describe('tui-menu-action', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-menu-action label="Save"></tui-menu-action>`);
    expect(el).to.exist;
  });

  // The event was a bare `action` before 5.0.0, carrying no detail — a handler had
  // to read e.target.label to learn which action ran. `tui-menu-action` was the
  // obvious prefixed name but was rejected: it is identical to the element that
  // fires it, so `-select` names the verb.
  it('emits tui-menu-action-select with { label }', async () => {
    const el = await fixture(html`<tui-menu-action label="Save"></tui-menu-action>`);
    let detail = null;
    el.addEventListener('tui-menu-action-select', (e) => { detail = e.detail; });

    el.shadowRoot.querySelector('button').click();

    expect(detail).to.deep.equal({ label: 'Save' });
  });

  it('bubbles out of a containing tui-menu', async () => {
    const el = await fixture(html`
      <tui-menu label="File"><tui-menu-action label="Quit"></tui-menu-action></tui-menu>
    `);
    let detail = null;
    el.addEventListener('tui-menu-action-select', (e) => { detail = e.detail; });

    el.querySelector('tui-menu-action').shadowRoot.querySelector('button').click();

    expect(detail).to.deep.equal({ label: 'Quit' });
  });
});

describe('tui-menu-divider', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-menu-divider></tui-menu-divider>`);
    expect(el).to.exist;
  });
});
