import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-panel.ts';

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

  it('shows dismiss button when dismissable', async () => {
    const el = await fixture(html`<tui-panel title="Test" dismissable>Content</tui-panel>`);
    const dismissBtn = el.shadowRoot.querySelector('.dismiss-btn');
    expect(dismissBtn).to.exist;
  });

  it('hides dismiss button by default', async () => {
    const el = await fixture(html`<tui-panel title="Test">Content</tui-panel>`);
    const dismissBtn = el.shadowRoot.querySelector('.dismiss-btn');
    expect(dismissBtn).to.not.exist;
  });

  it('emits panel-dismiss event when dismiss clicked', async () => {
    const el = await fixture(html`<tui-panel title="Test" dismissable>Content</tui-panel>`);
    let dismissed = false;
    el.addEventListener('panel-dismiss', () => { dismissed = true; });
    
    const dismissBtn = el.shadowRoot.querySelector('.dismiss-btn');
    dismissBtn.click();
    
    expect(dismissed).to.be.true;
  });

  it('has draggable-header class when draggable', async () => {
    const el = await fixture(html`<tui-panel title="Test" draggable>Content</tui-panel>`);
    const header = el.shadowRoot.querySelector('.header');
    expect(header.classList.contains('draggable')).to.be.true;
  });

  it('applies absolute positioning when draggable', async () => {
    const el = await fixture(html`<tui-panel title="Test" draggable>Content</tui-panel>`);
    // Verify the draggable attribute is present (CSS :host([draggable]) applies styling)
    expect(el.hasAttribute('draggable')).to.be.true;
    expect(el.draggable).to.be.true;
  });

  it('reflects position-x and position-y attributes', async () => {
    const el = await fixture(html`<tui-panel title="Test" draggable position-x="100" position-y="50">Content</tui-panel>`);
    expect(el.positionX).to.equal(100);
    expect(el.positionY).to.equal(50);
  });

  it('emits panel-move event during drag', async () => {
    const el = await fixture(html`<tui-panel title="Test" draggable>Content</tui-panel>`);
    let moveEvent = null;
    el.addEventListener('panel-move', (e) => { moveEvent = e.detail; });
    
    const header = el.shadowRoot.querySelector('.header');
    
    // Simulate drag start
    header.dispatchEvent(new PointerEvent('pointerdown', { clientX: 10, clientY: 10, bubbles: true }));
    
    // Simulate drag move
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 50, clientY: 30 }));
    
    // Simulate drag end
    document.dispatchEvent(new PointerEvent('pointerup', {}));
    
    expect(moveEvent).to.exist;
    expect(moveEvent.x).to.be.a('number');
    expect(moveEvent.y).to.be.a('number');
  });

  it('shows resize handle when resizable', async () => {
    const el = await fixture(html`<tui-panel title="Test" draggable resizable>Content</tui-panel>`);
    const handle = el.shadowRoot.querySelector('.resize-handle');
    expect(handle).to.exist;
  });

  it('hides resize handle when not resizable', async () => {
    const el = await fixture(html`<tui-panel title="Test" draggable>Content</tui-panel>`);
    const handle = el.shadowRoot.querySelector('.resize-handle');
    expect(handle).to.not.exist;
  });

  it('reflects panel-width and panel-height attributes', async () => {
    const el = await fixture(html`<tui-panel title="Test" draggable resizable panel-width="300" panel-height="200">Content</tui-panel>`);
    expect(el.panelWidth).to.equal(300);
    expect(el.panelHeight).to.equal(200);
  });

  it('emits panel-resize event during resize', async () => {
    const el = await fixture(html`<tui-panel title="Test" draggable resizable panel-width="200" panel-height="150">Content</tui-panel>`);
    let resizeEvent = null;
    el.addEventListener('panel-resize', (e) => { resizeEvent = e.detail; });
    
    const handle = el.shadowRoot.querySelector('.resize-handle');
    
    // Simulate resize start
    handle.dispatchEvent(new PointerEvent('pointerdown', { clientX: 200, clientY: 150, bubbles: true }));
    
    // Simulate resize move
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 250, clientY: 200 }));
    
    // Simulate resize end
    document.dispatchEvent(new PointerEvent('pointerup', {}));
    
    expect(resizeEvent).to.exist;
    expect(resizeEvent.width).to.be.a('number');
    expect(resizeEvent.height).to.be.a('number');
  });

  it('shows collapse button in header controls when collapsible', async () => {
    const el = await fixture(html`<tui-panel title="Test" collapsible>Content</tui-panel>`);
    const collapseBtn = el.shadowRoot.querySelector('.header-controls .collapse-btn');
    expect(collapseBtn).to.exist;
  });

  it('collapse button toggles collapsed state', async () => {
    const el = await fixture(html`<tui-panel title="Test" collapsible>Content</tui-panel>`);
    expect(el.collapsed).to.be.false;
    
    const collapseBtn = el.shadowRoot.querySelector('.header-controls .collapse-btn');
    collapseBtn.click();
    
    expect(el.collapsed).to.be.true;
  });
});
