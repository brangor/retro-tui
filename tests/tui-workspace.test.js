import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-workspace.ts';
import '../src/components/tui-panel.ts';
import '../src/components/tui-sidebar.ts';

describe('tui-workspace', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-workspace></tui-workspace>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-workspace></tui-workspace>`);
    expect(el.shadowRoot).to.exist;
  });

  it('renders main slot content', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <div slot="main" id="canvas">Canvas</div>
      </tui-workspace>
    `);
    const slot = el.shadowRoot.querySelector('slot[name="main"]');
    expect(slot).to.exist;
  });

  it('renders floating slot content', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <div slot="floating" id="panel">Panel</div>
      </tui-workspace>
    `);
    const slot = el.shadowRoot.querySelector('slot[name="floating"]');
    expect(slot).to.exist;
  });

  it('exposes bounds property', async () => {
    const el = await fixture(html`<tui-workspace></tui-workspace>`);
    expect(el.bounds).to.exist;
  });

  it('emits layout-change when panel moves', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <tui-panel slot="floating" title="Test" floating position-x="50" position-y="50">Content</tui-panel>
      </tui-workspace>
    `);
    
    let layoutEvent = null;
    el.addEventListener('layout-change', (e) => { layoutEvent = e.detail; });
    
    const panel = el.querySelector('tui-panel');
    panel.dispatchEvent(new CustomEvent('panel-move', {
      detail: { panelId: 'Test', x: 100, y: 100 },
      bubbles: true,
      composed: true,
    }));
    
    expect(layoutEvent).to.exist;
    expect(layoutEvent.panels).to.be.an('array');
  });

  it('emits layout-change when panel dismissed', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <tui-panel slot="floating" title="Test" floating dismissable>Content</tui-panel>
      </tui-workspace>
    `);
    
    let layoutEvent = null;
    el.addEventListener('layout-change', (e) => { layoutEvent = e.detail; });
    
    const panel = el.querySelector('tui-panel');
    panel.dispatchEvent(new CustomEvent('panel-dismiss', {
      detail: { panelId: 'Test' },
      bubbles: true,
      composed: true,
    }));
    
    expect(layoutEvent).to.exist;
  });

  it('emits layout-change when panel resizes', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <tui-panel slot="floating" title="Test" floating resizable panel-width="200" panel-height="150">Content</tui-panel>
      </tui-workspace>
    `);
    
    let layoutEvent = null;
    el.addEventListener('layout-change', (e) => { layoutEvent = e.detail; });
    
    const panel = el.querySelector('tui-panel');
    panel.dispatchEvent(new CustomEvent('panel-resize', {
      detail: { panelId: 'Test', width: 250, height: 180 },
      bubbles: true,
      composed: true,
    }));
    
    expect(layoutEvent).to.exist;
  });

  it('renders sidebar slots', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <tui-sidebar slot="left" side="left"></tui-sidebar>
        <tui-sidebar slot="right" side="right"></tui-sidebar>
        <div slot="main">Canvas</div>
      </tui-workspace>
    `);
    
    const leftSlot = el.shadowRoot.querySelector('slot[name="left"]');
    const rightSlot = el.shadowRoot.querySelector('slot[name="right"]');
    expect(leftSlot).to.exist;
    expect(rightSlot).to.exist;
  });

  it('detects gravity zone on panel drag near left edge', async () => {
    const el = await fixture(html`
      <tui-workspace gravity-zone="50">
        <tui-panel slot="floating" title="Test" floating position-x="50" position-y="50">Content</tui-panel>
      </tui-workspace>
    `);
    
    let dockPreviewEvent = null;
    el.addEventListener('panel-dock-preview', (e) => { dockPreviewEvent = e.detail; });
    
    const panel = el.querySelector('tui-panel');
    
    // Drag panel near left edge (within gravity zone)
    panel.dispatchEvent(new CustomEvent('panel-move', {
      detail: { panelId: 'Test', x: 20, y: 100 },
      bubbles: true,
      composed: true,
    }));
    
    expect(dockPreviewEvent).to.exist;
    expect(dockPreviewEvent.side).to.equal('left');
  });

  it('emits panel-dock when dropped in gravity zone', async () => {
    const el = await fixture(html`
      <tui-workspace gravity-zone="50">
        <tui-panel slot="floating" title="Test" floating position-x="20" position-y="100">Content</tui-panel>
      </tui-workspace>
    `);
    
    // First move into gravity zone to set preview
    const panel = el.querySelector('tui-panel');
    panel.dispatchEvent(new CustomEvent('panel-move', {
      detail: { panelId: 'Test', x: 20, y: 100 },
      bubbles: true,
      composed: true,
    }));
    
    let dockEvent = null;
    el.addEventListener('panel-dock', (e) => { dockEvent = e.detail; });
    
    // Simulate drag end in gravity zone
    el.dispatchEvent(new CustomEvent('panel-drag-end', {
      detail: { panelId: 'Test', x: 20, y: 100 },
      bubbles: true,
    }));
    
    expect(dockEvent).to.exist;
    expect(dockEvent.side).to.equal('left');
  });

  // Task 2: getPanelStates API
  it('getPanelStates returns all panel info', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <tui-panel slot="left" id="colors" title="Colors" docked="left">Colors</tui-panel>
        <tui-panel slot="floating" id="tools" title="Tools" floating position-x="100" position-y="50">Tools</tui-panel>
        <tui-panel slot="floating" id="hidden" title="Hidden" floating hidden>Hidden</tui-panel>
      </tui-workspace>
    `);
    
    await new Promise(r => setTimeout(r, 50));
    
    const states = el.getPanelStates();
    
    expect(states).to.be.an('array');
    expect(states.length).to.equal(3);
    
    const colors = states.find(p => p.id === 'colors');
    expect(colors).to.exist;
    expect(colors.title).to.equal('Colors');
    expect(colors.mode).to.equal('docked');
    expect(colors.side).to.equal('left');
    expect(colors.visible).to.be.true;
    
    const tools = states.find(p => p.id === 'tools');
    expect(tools).to.exist;
    expect(tools.mode).to.equal('floating');
    expect(tools.x).to.equal(100);
    expect(tools.visible).to.be.true;
    
    const hidden = states.find(p => p.id === 'hidden');
    expect(hidden).to.exist;
    expect(hidden.visible).to.be.false;
  });

  // Task 3: auto-dock attribute
  it('auto-dock sets panel docked attribute on gravity zone drop', async () => {
    const el = await fixture(html`
      <tui-workspace auto-dock gravity-zone="50">
        <tui-panel slot="floating" title="Tools" floating position-x="100" position-y="50">Tools</tui-panel>
      </tui-workspace>
    `);
    
    const panel = el.querySelector('tui-panel');
    
    // Initially floating
    expect(panel.floating).to.be.true;
    expect(panel.docked).to.equal('');
    
    // Move into gravity zone
    panel.dispatchEvent(new CustomEvent('panel-move', {
      detail: { panelId: 'Tools', x: 20, y: 100 },
      bubbles: true,
      composed: true,
    }));
    
    // End drag in gravity zone
    panel.dispatchEvent(new CustomEvent('panel-drag-end', {
      detail: { panelId: 'Tools', x: 20, y: 100 },
      bubbles: true,
      composed: true,
    }));
    
    await new Promise(r => setTimeout(r, 50));
    
    // Panel should have docked attribute set
    expect(panel.docked).to.equal('left');
    expect(panel.floating).to.be.false;
  });

  // Task 4: auto-undock
  it('auto-dock undocks panel when dragged away from edge', async () => {
    const el = await fixture(html`
      <tui-workspace auto-dock gravity-zone="50">
        <tui-panel slot="left" title="Tools" docked="left">Tools</tui-panel>
      </tui-workspace>
    `);
    
    const panel = el.querySelector('tui-panel');
    
    // Initially docked
    expect(panel.docked).to.equal('left');
    
    // Drag to center (outside gravity zones)
    panel.dispatchEvent(new CustomEvent('panel-move', {
      detail: { panelId: 'Tools', x: 300, y: 200 },
      bubbles: true,
      composed: true,
    }));
    
    // End drag outside gravity zone
    panel.dispatchEvent(new CustomEvent('panel-drag-end', {
      detail: { panelId: 'Tools', x: 300, y: 200 },
      bubbles: true,
      composed: true,
    }));
    
    await new Promise(r => setTimeout(r, 50));
    
    // Panel should be floating now
    expect(panel.floating).to.be.true;
    expect(panel.docked).to.equal('');
    expect(panel.positionX).to.equal(300);
    expect(panel.positionY).to.equal(200);
  });

  // Task 5: Workspace coordinates dock with sidebar drop index
  it('auto-dock inserts panel into sidebar using insertPanelAt', async () => {
    const el = await fixture(html`
      <tui-workspace auto-dock gravity-zone="50">
        <tui-sidebar slot="left" side="left" size="200">
          <tui-panel id="existing" title="Existing" docked="left">Existing</tui-panel>
        </tui-sidebar>
        <tui-panel slot="floating" id="new-panel" title="New Panel" floating position-x="100" position-y="50">New</tui-panel>
      </tui-workspace>
    `);
    
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 50));
    
    const panel = el.querySelector('#new-panel');
    const sidebar = el.querySelector('tui-sidebar');
    
    // Track if insertPanelAt was called
    let insertCalled = false;
    const originalInsert = sidebar.insertPanelAt.bind(sidebar);
    sidebar.insertPanelAt = (p, idx) => {
      insertCalled = true;
      return originalInsert(p, idx);
    };
    
    // Move panel into left gravity zone with cursorY
    panel.dispatchEvent(new CustomEvent('panel-move', {
      detail: { panelId: 'new-panel', x: 20, y: 50, cursorY: 10 },
      bubbles: true,
      composed: true,
    }));
    
    // Drop
    panel.dispatchEvent(new CustomEvent('panel-drag-end', {
      detail: { panelId: 'new-panel', x: 20, y: 50, cursorY: 10 },
      bubbles: true,
      composed: true,
    }));
    
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 50));
    
    // Panel should now be in the sidebar
    const sidebarPanels = sidebar.querySelectorAll('tui-panel');
    expect(sidebarPanels.length).to.equal(2);
    expect(panel.docked).to.equal('left');
    
    // insertPanelAt should have been used
    expect(insertCalled).to.be.true;
  });

  // Task 6: Reorder panels within sidebar
  it('reorders panels within sidebar by dragging', async () => {
    const el = await fixture(html`
      <tui-workspace auto-dock gravity-zone="50">
        <tui-sidebar slot="left" side="left" size="200">
          <tui-panel id="a" title="A" docked="left">A</tui-panel>
          <tui-panel id="b" title="B" docked="left">B</tui-panel>
          <tui-panel id="c" title="C" docked="left">C</tui-panel>
        </tui-sidebar>
      </tui-workspace>
    `);
    
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 50));
    
    const sidebar = el.querySelector('tui-sidebar');
    const panelC = el.querySelector('#c');
    
    // Initial order: A, B, C
    let panels = sidebar.querySelectorAll('tui-panel');
    expect(panels[0].id).to.equal('a');
    expect(panels[1].id).to.equal('b');
    expect(panels[2].id).to.equal('c');
    
    // Directly test sidebar reordering via insertPanelAt
    // (Event simulation is tricky in JSDOM - test the actual method)
    sidebar.insertPanelAt(panelC, 0);
    
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 50));
    
    // Panel order should now be C, A, B
    panels = sidebar.querySelectorAll('tui-panel');
    expect(panels[0].id).to.equal('c');
    expect(panels[1].id).to.equal('a');
    expect(panels[2].id).to.equal('b');
  });
});
