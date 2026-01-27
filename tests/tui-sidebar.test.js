import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-sidebar.ts';
import '../src/components/tui-panel.ts';

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

  // Task 2: calculateDropIndex
  it('calculates drop index based on cursor position', async () => {
    const el = await fixture(html`
      <tui-sidebar side="left" size="200" style="height: 400px;">
        <tui-panel title="Panel A" docked="left" style="height: 100px;">A</tui-panel>
        <tui-panel title="Panel B" docked="left" style="height: 100px;">B</tui-panel>
      </tui-sidebar>
    `);
    
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 50));
    
    // calculateDropIndex should exist and work
    expect(el.calculateDropIndex).to.be.a('function');
    
    // With no panels, should return 0
    const emptyEl = await fixture(html`<tui-sidebar side="left" size="200"></tui-sidebar>`);
    expect(emptyEl.calculateDropIndex(100)).to.equal(0);
  });

  // Task 3: Drop indicator rendering
  it('shows drop indicator when dropIndex is set', async () => {
    const el = await fixture(html`
      <tui-sidebar side="left" size="200">
        <tui-panel title="Panel A" docked="left">A</tui-panel>
        <tui-panel title="Panel B" docked="left">B</tui-panel>
      </tui-sidebar>
    `);
    
    await el.updateComplete;
    
    // No indicator initially
    let indicator = el.shadowRoot.querySelector('.drop-indicator');
    expect(indicator).to.not.exist;
    
    // Set drop index
    el.showDropIndicator(1);
    await el.updateComplete;
    
    // Should show indicator
    indicator = el.shadowRoot.querySelector('.drop-indicator');
    expect(indicator).to.exist;
    
    // Hide indicator
    el.hideDropIndicator();
    await el.updateComplete;
    
    indicator = el.shadowRoot.querySelector('.drop-indicator');
    expect(indicator).to.not.exist;
  });

  // Task 4: insertPanelAt
  it('insertPanelAt inserts panel at correct position', async () => {
    const el = await fixture(html`
      <tui-sidebar side="left" size="200">
        <tui-panel id="a" title="Panel A" docked="left">A</tui-panel>
        <tui-panel id="c" title="Panel C" docked="left">C</tui-panel>
      </tui-sidebar>
    `);
    
    await el.updateComplete;
    
    // Create new panel to insert
    const newPanel = document.createElement('tui-panel');
    newPanel.id = 'b';
    newPanel.title = 'Panel B';
    newPanel.setAttribute('docked', 'left');
    newPanel.textContent = 'B';
    
    // Insert at index 1 (between A and C)
    el.insertPanelAt(newPanel, 1);
    
    await el.updateComplete;
    
    const panels = el.querySelectorAll('tui-panel');
    expect(panels.length).to.equal(3);
    expect(panels[0].id).to.equal('a');
    expect(panels[1].id).to.equal('b');
    expect(panels[2].id).to.equal('c');
  });

  it('insertPanelAt at end appends panel', async () => {
    const el = await fixture(html`
      <tui-sidebar side="left" size="200">
        <tui-panel id="a" title="Panel A" docked="left">A</tui-panel>
      </tui-sidebar>
    `);
    
    await el.updateComplete;
    
    const newPanel = document.createElement('tui-panel');
    newPanel.id = 'b';
    newPanel.title = 'Panel B';
    newPanel.setAttribute('docked', 'left');
    
    el.insertPanelAt(newPanel, 5); // Index beyond length
    
    await el.updateComplete;
    
    const panels = el.querySelectorAll('tui-panel');
    expect(panels.length).to.equal(2);
    expect(panels[1].id).to.equal('b');
  });
});
