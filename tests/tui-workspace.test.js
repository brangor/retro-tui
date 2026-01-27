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

  it('shows snap preview when panel dragged near edge', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <tui-panel slot="floating" title="Test" floating position-x="50" position-y="50">Content</tui-panel>
      </tui-workspace>
    `);
    
    const panel = el.querySelector('tui-panel');
    panel.dispatchEvent(new CustomEvent('panel-move', {
      detail: { panelId: 'Test', x: 5, y: 100 },
      bubbles: true,
      composed: true,
    }));
    
    await el.updateComplete;
    
    // Snap preview should be shown
    const snapPreview = el.shadowRoot.querySelector('.snap-preview');
    expect(snapPreview).to.exist;
    expect(snapPreview.classList.contains('left')).to.be.true;
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

  it('snaps panel to left edge on drag end near left', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <tui-panel slot="floating" title="Test" floating position-x="50" position-y="50">Content</tui-panel>
      </tui-workspace>
    `);
    
    const panel = el.querySelector('tui-panel');
    
    // Move panel near left edge (within snap zone of 20px)
    panel.dispatchEvent(new CustomEvent('panel-move', {
      detail: { panelId: 'Test', x: 5, y: 100 },
      bubbles: true,
      composed: true,
    }));
    
    // End drag
    panel.dispatchEvent(new CustomEvent('panel-drag-end', {
      detail: { panelId: 'Test', x: 5, y: 100 },
      bubbles: true,
      composed: true,
    }));
    
    await el.updateComplete;
    
    // Panel should snap to left edge
    expect(panel.positionX).to.equal(0);
    expect(panel.snapEdge).to.equal('left');
  });

  it('getPanelStates returns floating panel info', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <tui-panel slot="floating" id="tools" title="Tools" floating position-x="100" position-y="50">Tools</tui-panel>
        <tui-panel slot="floating" id="colors" title="Colors" floating position-x="200" position-y="80">Colors</tui-panel>
      </tui-workspace>
    `);
    
    await new Promise(r => setTimeout(r, 50));
    
    const states = el.getPanelStates();
    
    expect(states).to.be.an('array');
    expect(states.length).to.equal(2);
    
    const tools = states.find(p => p.id === 'tools');
    expect(tools).to.exist;
    expect(tools.title).to.equal('Tools');
    expect(tools.x).to.equal(100);
    expect(tools.y).to.equal(50);
    expect(tools.visible).to.be.true;
    
    const colors = states.find(p => p.id === 'colors');
    expect(colors).to.exist;
    expect(colors.x).to.equal(200);
  });

  it('sets snapEdge on panel when snapped to edge', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <tui-panel slot="floating" title="Test" floating position-x="50" position-y="50">Content</tui-panel>
      </tui-workspace>
    `);
    
    const panel = el.querySelector('tui-panel');
    
    // Initially no snap edge
    expect(panel.snapEdge).to.equal('');
    
    // Move near right edge (use panel width from snap calculation)
    panel.dispatchEvent(new CustomEvent('panel-move', {
      detail: { panelId: 'Test', x: 780, y: 100 },
      bubbles: true,
      composed: true,
    }));
    
    // End drag
    panel.dispatchEvent(new CustomEvent('panel-drag-end', {
      detail: { panelId: 'Test', x: 780, y: 100 },
      bubbles: true,
      composed: true,
    }));
    
    await el.updateComplete;
    
    expect(panel.snapEdge).to.equal('right');
  });

  it('clears snapEdge when dropped away from edges', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <tui-panel slot="floating" title="Test" floating position-x="50" position-y="50" snap-edge="left">Content</tui-panel>
      </tui-workspace>
    `);
    
    const panel = el.querySelector('tui-panel');
    
    // Move to center
    panel.dispatchEvent(new CustomEvent('panel-move', {
      detail: { panelId: 'Test', x: 300, y: 200 },
      bubbles: true,
      composed: true,
    }));
    
    // End drag in center
    panel.dispatchEvent(new CustomEvent('panel-drag-end', {
      detail: { panelId: 'Test', x: 300, y: 200 },
      bubbles: true,
      composed: true,
    }));
    
    await el.updateComplete;
    
    // Snap edge should be cleared
    expect(panel.snapEdge).to.equal('');
  });

  it('emits layout-change when panel drag ends', async () => {
    const el = await fixture(html`
      <tui-workspace>
        <tui-panel slot="floating" title="Test" floating position-x="50" position-y="50">Content</tui-panel>
      </tui-workspace>
    `);
    
    let layoutEvent = null;
    el.addEventListener('layout-change', (e) => { layoutEvent = e.detail; });
    
    const panel = el.querySelector('tui-panel');
    panel.dispatchEvent(new CustomEvent('panel-drag-end', {
      detail: { panelId: 'Test', x: 100, y: 100 },
      bubbles: true,
      composed: true,
    }));
    
    expect(layoutEvent).to.exist;
    expect(layoutEvent.panels).to.be.an('array');
  });
});
