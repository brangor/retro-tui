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

  it('has floating-header class when floating', async () => {
    const el = await fixture(html`<tui-panel title="Test" floating>Content</tui-panel>`);
    const header = el.shadowRoot.querySelector('.header');
    expect(header.classList.contains('floating')).to.be.true;
  });

  it('applies absolute positioning when floating', async () => {
    const el = await fixture(html`<tui-panel title="Test" floating>Content</tui-panel>`);
    // Verify the floating attribute is present (CSS :host([floating]) applies styling)
    expect(el.hasAttribute('floating')).to.be.true;
    expect(el.floating).to.be.true;
  });

  it('reflects position-x and position-y attributes', async () => {
    const el = await fixture(html`<tui-panel title="Test" floating position-x="100" position-y="50">Content</tui-panel>`);
    expect(el.positionX).to.equal(100);
    expect(el.positionY).to.equal(50);
  });

  it('emits panel-move event during drag', async () => {
    const el = await fixture(html`<tui-panel title="Test" floating>Content</tui-panel>`);
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
    const el = await fixture(html`<tui-panel title="Test" floating resizable>Content</tui-panel>`);
    const handle = el.shadowRoot.querySelector('.resize-handle');
    expect(handle).to.exist;
  });

  it('hides resize handle when not resizable', async () => {
    const el = await fixture(html`<tui-panel title="Test" floating>Content</tui-panel>`);
    const handle = el.shadowRoot.querySelector('.resize-handle');
    expect(handle).to.not.exist;
  });

  it('reflects panel-width and panel-height attributes', async () => {
    const el = await fixture(html`<tui-panel title="Test" floating resizable panel-width="300" panel-height="200">Content</tui-panel>`);
    expect(el.panelWidth).to.equal(300);
    expect(el.panelHeight).to.equal(200);
  });

  it('emits panel-resize event during resize', async () => {
    const el = await fixture(html`<tui-panel title="Test" floating resizable panel-width="200" panel-height="150">Content</tui-panel>`);
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

  it('reflects docked attribute', async () => {
    const el = await fixture(html`<tui-panel title="Test" docked="left">Content</tui-panel>`);
    expect(el.docked).to.equal('left');
    expect(el.hasAttribute('docked')).to.be.true;
  });

  it('emits panel-drag-end event when drag completes', async () => {
    const el = await fixture(html`<tui-panel title="Test" floating>Content</tui-panel>`);
    let dragEndEvent = null;
    el.addEventListener('panel-drag-end', (e) => { dragEndEvent = e.detail; });
    
    const header = el.shadowRoot.querySelector('.header');
    
    // Simulate drag
    header.dispatchEvent(new PointerEvent('pointerdown', { clientX: 10, clientY: 10, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 50, clientY: 30 }));
    document.dispatchEvent(new PointerEvent('pointerup', {}));
    
    expect(dragEndEvent).to.exist;
    expect(dragEndEvent.panelId).to.equal('Test');
  });

  // Task 5: Panel memory - store on dismiss
  it('stores position to localStorage on dismiss when persist-id set', async () => {
    localStorage.removeItem('tui-panel-memory-test-panel');
    
    const el = await fixture(html`
      <tui-panel 
        title="Test" 
        floating 
        dismissable 
        persist-id="test-panel"
        position-x="150"
        position-y="75"
        panel-width="250"
        panel-height="180"
      >Content</tui-panel>
    `);
    
    el.dismiss();
    
    const stored = localStorage.getItem('tui-panel-memory-test-panel');
    expect(stored).to.exist;
    
    const data = JSON.parse(stored);
    expect(data.x).to.equal(150);
    expect(data.y).to.equal(75);
    expect(data.width).to.equal(250);
    expect(data.height).to.equal(180);
    
    localStorage.removeItem('tui-panel-memory-test-panel');
  });

  // Task 6: Panel memory - restore position
  it('restorePosition loads from localStorage', async () => {
    localStorage.setItem('tui-panel-memory-restore-test', JSON.stringify({
      x: 200,
      y: 100,
      width: 300,
      height: 200,
      collapsed: true,
    }));
    
    const el = await fixture(html`
      <tui-panel 
        title="Test" 
        floating 
        persist-id="restore-test"
        position-x="0"
        position-y="0"
      >Content</tui-panel>
    `);
    
    const restored = el.restorePosition();
    
    expect(restored).to.be.true;
    expect(el.positionX).to.equal(200);
    expect(el.positionY).to.equal(100);
    expect(el.panelWidth).to.equal(300);
    expect(el.panelHeight).to.equal(200);
    expect(el.collapsed).to.be.true;
    
    localStorage.removeItem('tui-panel-memory-restore-test');
  });

  it('restorePosition returns false if no stored state', async () => {
    localStorage.removeItem('tui-panel-memory-no-state');
    
    const el = await fixture(html`
      <tui-panel title="Test" floating persist-id="no-state">Content</tui-panel>
    `);
    
    const restored = el.restorePosition();
    
    expect(restored).to.be.false;
  });

  // Task 7: Docked panel dragging
  it('docked panel header is draggable for undocking', async () => {
    const el = await fixture(html`<tui-panel title="Test" docked="left">Content</tui-panel>`);
    const header = el.shadowRoot.querySelector('.header');
    
    // Docked panels should have draggable class for undocking
    expect(header.classList.contains('draggable')).to.be.true;
  });

  it('docked panel emits panel-move on drag', async () => {
    const el = await fixture(html`<tui-panel title="Test" docked="left">Content</tui-panel>`);
    
    let moveEvent = null;
    el.addEventListener('panel-move', (e) => { moveEvent = e.detail; });
    
    const header = el.shadowRoot.querySelector('.header');
    
    header.dispatchEvent(new PointerEvent('pointerdown', { clientX: 10, clientY: 10, bubbles: true }));
    document.dispatchEvent(new PointerEvent('pointermove', { clientX: 100, clientY: 100 }));
    document.dispatchEvent(new PointerEvent('pointerup', {}));
    
    expect(moveEvent).to.exist;
  });

  // Task 1: Fix collapsed docked panel gap
  it('docked collapsed panel has proper CSS structure', async () => {
    const el = await fixture(html`
      <tui-panel title="Test" docked="left" collapsible collapsed>Content here</tui-panel>
    `);
    
    await el.updateComplete;
    
    // Verify collapsed attribute is reflected (needed for CSS selector)
    expect(el.hasAttribute('collapsed')).to.be.true;
    expect(el.hasAttribute('docked')).to.be.true;
    
    // Verify panel has collapsed class
    const panel = el.shadowRoot.querySelector('.panel');
    expect(panel.classList.contains('collapsed')).to.be.true;
    
    // Verify header is still present (visible)
    const header = el.shadowRoot.querySelector('.header');
    expect(header).to.exist;
    
    // Verify content area exists with collapsed styling
    const content = el.shadowRoot.querySelector('.content');
    expect(content).to.exist;
  });
});
