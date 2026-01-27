import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-sidebar.ts';

describe('tui-sidebar', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-sidebar side="left"></tui-sidebar>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-sidebar side="left"></tui-sidebar>`);
    expect(el.shadowRoot).to.exist;
  });

  it('reflects side attribute', async () => {
    const el = await fixture(html`<tui-sidebar side="right"></tui-sidebar>`);
    expect(el.side).to.equal('right');
  });

  it('renders slot for panels', async () => {
    const el = await fixture(html`
      <tui-sidebar side="left">
        <div id="panel1">Panel 1</div>
      </tui-sidebar>
    `);
    const slot = el.shadowRoot.querySelector('slot');
    expect(slot).to.exist;
  });

  it('can be collapsed', async () => {
    const el = await fixture(html`<tui-sidebar side="left" collapsed></tui-sidebar>`);
    expect(el.collapsed).to.be.true;
  });

  it('emits sidebar-collapse event on toggle', async () => {
    const el = await fixture(html`<tui-sidebar side="left"></tui-sidebar>`);
    
    let collapseEvent = null;
    el.addEventListener('sidebar-collapse', (e) => { collapseEvent = e.detail; });
    
    const collapseBtn = el.shadowRoot.querySelector('.collapse-btn');
    collapseBtn.click();
    
    expect(collapseEvent).to.exist;
    expect(collapseEvent.side).to.equal('left');
    expect(collapseEvent.collapsed).to.be.true;
  });

  it('has resize handle when not collapsed', async () => {
    const el = await fixture(html`<tui-sidebar side="left"></tui-sidebar>`);
    const handle = el.shadowRoot.querySelector('.resize-handle');
    expect(handle).to.exist;
  });

  it('hides resize handle when collapsed', async () => {
    const el = await fixture(html`<tui-sidebar side="left" collapsed></tui-sidebar>`);
    const handle = el.shadowRoot.querySelector('.resize-handle');
    expect(handle).to.not.exist;
  });

  it('emits sidebar-resize on drag', async () => {
    const el = await fixture(html`<tui-sidebar side="left" size="250"></tui-sidebar>`);
    
    let resizeEvent = null;
    el.addEventListener('sidebar-resize', (e) => { resizeEvent = e.detail; });
    
    const handle = el.shadowRoot.querySelector('.resize-handle');
    
    handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 250, clientY: 100, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 300, clientY: 100 }));
    document.dispatchEvent(new PointerEvent('pointerup', {}));
    
    expect(resizeEvent).to.exist;
    expect(resizeEvent.size).to.be.a('number');
  });
});
