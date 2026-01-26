import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-menu.js';

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
});

describe('tui-menu-divider', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-menu-divider></tui-menu-divider>`);
    expect(el).to.exist;
  });
});
