import { describe, it, vi } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-radio.ts';

describe('tui-radio', () => {
  it('renders unselected glyph by default', async () => {
    const el = await fixture(html`<tui-radio></tui-radio>`);
    const glyph = el.shadowRoot!.querySelector('.glyph');
    expect(glyph).to.exist;
    expect(glyph!.textContent).to.equal('◯');
  });

  it('renders selected glyph when checked', async () => {
    const el = await fixture(html`<tui-radio checked></tui-radio>`);
    const glyph = el.shadowRoot!.querySelector('.glyph');
    expect(glyph!.textContent).to.equal('◉');
  });

  it('renders label from attribute', async () => {
    const el = await fixture(html`<tui-radio label="Option A"></tui-radio>`);
    expect(el.shadowRoot!.textContent).to.contain('Option A');
  });

  it('selects on click', async () => {
    const el = await fixture(html`<tui-radio></tui-radio>`) as any;
    const container = el.shadowRoot!.querySelector('.radio');
    container!.click();
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('does not deselect on click when already checked', async () => {
    const el = await fixture(html`<tui-radio checked></tui-radio>`) as any;
    const container = el.shadowRoot!.querySelector('.radio');
    container!.click();
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('does not select when disabled', async () => {
    const el = await fixture(html`<tui-radio disabled></tui-radio>`) as any;
    const container = el.shadowRoot!.querySelector('.radio');
    container!.click();
    await el.updateComplete;
    expect(el.checked).to.be.false;
  });

  it('fires tui-change event on select', async () => {
    const el = await fixture(html`<tui-radio value="opt1" name="group1"></tui-radio>`) as any;
    const handler = vi.fn();
    el.addEventListener('tui-change', handler);
    const container = el.shadowRoot!.querySelector('.radio');
    container!.click();
    expect(handler.mock.calls).to.have.length(1);
    const detail = handler.mock.calls[0][0].detail;
    expect(detail.checked).to.be.true;
    expect(detail.value).to.equal('opt1');
    expect(detail.name).to.equal('group1');
  });

  it('does not fire event when already checked', async () => {
    const el = await fixture(html`<tui-radio checked></tui-radio>`) as any;
    const handler = vi.fn();
    el.addEventListener('tui-change', handler);
    const container = el.shadowRoot!.querySelector('.radio');
    container!.click();
    expect(handler.mock.calls).to.have.length(0);
  });

  it('sets aria-checked and role=radio', async () => {
    const el = await fixture(html`<tui-radio></tui-radio>`) as any;
    const container = el.shadowRoot!.querySelector('.radio');
    expect(container!.getAttribute('role')).to.equal('radio');
    expect(container!.getAttribute('aria-checked')).to.equal('false');
  });

  it('handles handleEvent to set checked', async () => {
    const el = await fixture(html`<tui-radio></tui-radio>`) as any;
    el.handleEvent({ channel: 'test', type: 'radio', id: 'x', data: { checked: true } });
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('handles handleEvent for clear type', async () => {
    const el = await fixture(html`<tui-radio checked></tui-radio>`) as any;
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    expect(el.checked).to.be.false;
  });

  it('selects on Space keypress', async () => {
    const el = await fixture(html`<tui-radio></tui-radio>`) as any;
    const container = el.shadowRoot!.querySelector('.radio');
    container!.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('sets tabindex=-1 when disabled', async () => {
    const el = await fixture(html`<tui-radio disabled></tui-radio>`);
    const container = el.shadowRoot!.querySelector('.radio');
    expect(container!.getAttribute('tabindex')).to.equal('-1');
  });
});
