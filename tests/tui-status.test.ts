// tests/tui-status.test.ts
import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-status.ts';

describe('tui-status', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-status></tui-status>`);
    expect(el).to.exist;
    expect(el.shadowRoot).to.exist;
  });

  it('renders state and message', async () => {
    const el = await fixture(html`<tui-status state="success" message="Done"></tui-status>`);
    const badge = el.shadowRoot.querySelector('.badge');
    expect(badge).to.exist;
    expect(badge.classList.contains('success')).to.be.true;
    const msg = el.shadowRoot.querySelector('.message');
    expect(msg.textContent).to.contain('Done');
  });

  it('renders different states with correct classes', async () => {
    for (const state of ['success', 'error', 'info', 'warn', 'pending']) {
      const el = await fixture(html`<tui-status state="${state}" message="test"></tui-status>`);
      const badge = el.shadowRoot.querySelector('.badge');
      expect(badge.classList.contains(state)).to.be.true;
    }
  });

  it('shows indicator symbol per state', async () => {
    const el = await fixture(html`<tui-status state="success" message="OK"></tui-status>`);
    const indicator = el.shadowRoot.querySelector('.indicator');
    expect(indicator).to.exist;
    expect(indicator.textContent.trim()).to.equal('✓');
  });

  it('handles handleEvent for status type', async () => {
    const el = await fixture(html`<tui-status></tui-status>`);
    el.handleEvent({
      channel: 'test', type: 'status', id: 'x',
      data: { state: 'error', message: 'Failed' },
    });
    await el.updateComplete;
    expect(el.state).to.equal('error');
    expect(el.message).to.equal('Failed');
    const badge = el.shadowRoot.querySelector('.badge');
    expect(badge.classList.contains('error')).to.be.true;
  });

  it('handles handleEvent for clear type', async () => {
    const el = await fixture(html`<tui-status state="success" message="OK"></tui-status>`);
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    expect(el.state).to.equal('');
    expect(el.message).to.equal('');
  });
});
