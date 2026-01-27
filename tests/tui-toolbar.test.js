import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-toolbar.ts';

describe('tui-toolbar', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-toolbar></tui-toolbar>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-toolbar></tui-toolbar>`);
    expect(el.shadowRoot).to.exist;
  });

  it('reflects orientation attribute', async () => {
    const el = await fixture(html`<tui-toolbar orientation="horizontal"></tui-toolbar>`);
    expect(el.getAttribute('orientation')).to.equal('horizontal');
    expect(el.orientation).to.equal('horizontal');
  });

  it('handles tools array property', async () => {
    const tools = [
      { id: 'brush', icon: '🖌', name: 'Brush' },
      { id: 'eraser', icon: '🧹', name: 'Eraser' }
    ];
    const el = await fixture(html`<tui-toolbar .tools=${tools}></tui-toolbar>`);
    expect(el.tools).to.deep.equal(tools);
    expect(el.tools.length).to.equal(2);
  });

  it('handles selected property', async () => {
    const tools = [
      { id: 'brush', icon: '🖌' },
      { id: 'eraser', icon: '🧹' }
    ];
    const el = await fixture(html`<tui-toolbar .tools=${tools} selected="brush"></tui-toolbar>`);
    expect(el.selected).to.equal('brush');
  });
});
