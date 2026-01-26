import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-panel.js';

describe('tui-panel', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-panel title="Test">Content</tui-panel>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-panel title="Test">Content</tui-panel>`);
    expect(el.shadowRoot).to.exist;
  });

  it('reflects title attribute', async () => {
    const el = await fixture(html`<tui-panel title="My Panel">Content</tui-panel>`);
    expect(el.getAttribute('title')).to.equal('My Panel');
    expect(el.title).to.equal('My Panel');
  });

  it('reflects color attribute', async () => {
    const el = await fixture(html`<tui-panel title="Test" color="primary">Content</tui-panel>`);
    expect(el.getAttribute('color')).to.equal('primary');
    expect(el.color).to.equal('primary');
  });

  it('handles collapsible state', async () => {
    const el = await fixture(html`<tui-panel title="Test" collapsible>Content</tui-panel>`);
    expect(el.collapsible).to.be.true;
    expect(el.collapsed).to.be.false;
    
    // Toggle should work
    el.toggle();
    expect(el.collapsed).to.be.true;
  });
});
