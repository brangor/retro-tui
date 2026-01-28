import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-button.ts';

describe('tui-button', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-button>Click</tui-button>`);
    expect(el).to.exist;
  });

  it('has shadow root with button element', async () => {
    const el = await fixture(html`<tui-button>Click</tui-button>`);
    expect(el.shadowRoot).to.exist;
    const button = el.shadowRoot.querySelector('button');
    expect(button).to.exist;
  });

  it('reflects variant attribute', async () => {
    const el = await fixture(html`<tui-button variant="primary">Click</tui-button>`);
    expect(el.getAttribute('variant')).to.equal('primary');
    expect(el.variant).to.equal('primary');
  });

  it('reflects size attribute', async () => {
    const el = await fixture(html`<tui-button size="lg">Click</tui-button>`);
    expect(el.getAttribute('size')).to.equal('lg');
    expect(el.size).to.equal('lg');
  });

  it('handles disabled state', async () => {
    const el = await fixture(html`<tui-button disabled>Click</tui-button>`);
    expect(el.disabled).to.be.true;
    const button = el.shadowRoot.querySelector('button');
    expect(button.disabled).to.be.true;
  });

  it('handles selected state', async () => {
    const el = await fixture(html`<tui-button selected>Click</tui-button>`);
    expect(el.selected).to.be.true;
    expect(el.hasAttribute('selected')).to.be.true;
  });

  it('slots content correctly', async () => {
    const el = await fixture(html`<tui-button>Test Label</tui-button>`);
    const slot = el.shadowRoot.querySelector('slot');
    expect(slot).to.exist;
    const assignedNodes = slot.assignedNodes();
    const textContent = assignedNodes.map(node => node.textContent).join('');
    expect(textContent).to.equal('Test Label');
  });
});
