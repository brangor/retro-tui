import { describe, it } from 'vitest';
import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/tui-grid.ts';

describe('tui-grid', () => {
  it('renders as a custom element', async () => {
    const el = await fixture(html`<tui-grid cols="3" rows="2"></tui-grid>`);
    expect(el).to.exist;
    expect(el.tagName.toLowerCase()).to.equal('tui-grid');
  });

  it('defaults to 16x16 grid with 10x18 cell size', async () => {
    const el = await fixture(html`<tui-grid></tui-grid>`) as any;
    expect(el.cols).to.equal(16);
    expect(el.rows).to.equal(16);
    expect(el.cellWidth).to.equal(10);
    expect(el.cellHeight).to.equal(18);
  });

  it('renders an SVG element in shadow DOM', async () => {
    const el = await fixture(html`<tui-grid cols="3" rows="2"></tui-grid>`);
    const svg = el.shadowRoot!.querySelector('svg');
    expect(svg).to.exist;
  });

  it('renders text elements when grid data is set', async () => {
    const el = await fixture(html`<tui-grid cols="3" rows="1"></tui-grid>`) as any;
    el.setGrid([['A', null, 'B']]);
    await el.updateComplete;
    const texts = el.shadowRoot!.querySelectorAll('text');
    expect(texts.length).to.equal(2);
    expect(texts[0].textContent).to.equal('A');
    expect(texts[1].textContent).to.equal('B');
  });

  it('computes SVG viewBox from cols/rows and cell size', async () => {
    const el = await fixture(html`
      <tui-grid cols="5" rows="3" cell-width="10" cell-height="20"></tui-grid>
    `) as any;
    const svg = el.shadowRoot!.querySelector('svg');
    expect(svg!.getAttribute('viewBox')).to.equal('0 0 50 60');
  });
});
