import { describe, it, vi } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-checkbox.ts';

describe('tui-checkbox', () => {
  it('renders unchecked glyph by default', async () => {
    const el = await fixture(html`<tui-checkbox></tui-checkbox>`);
    const glyph = el.shadowRoot!.querySelector('.glyph');
    expect(glyph).to.exist;
    expect(glyph!.textContent).to.equal('□');
  });

  it('renders checked glyph when checked', async () => {
    const el = await fixture(html`<tui-checkbox checked></tui-checkbox>`);
    const glyph = el.shadowRoot!.querySelector('.glyph');
    expect(glyph!.textContent).to.equal('▣');
  });

  it('renders label from attribute', async () => {
    const el = await fixture(html`<tui-checkbox label="Dark mode"></tui-checkbox>`);
    expect(el.shadowRoot!.textContent).to.contain('Dark mode');
  });

  it('renders label from slot', async () => {
    const el = await fixture(html`<tui-checkbox>Slot label</tui-checkbox>`);
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
  });

  it('toggles on click', async () => {
    const el = await fixture(html`<tui-checkbox></tui-checkbox>`) as any;
    const container = el.shadowRoot!.querySelector('.checkbox');
    container!.click();
    await el.updateComplete;
    expect(el.checked).to.be.true;
    expect(el.shadowRoot!.querySelector('.glyph')!.textContent).to.equal('▣');
  });

  it('toggles on Space key', async () => {
    const el = await fixture(html`<tui-checkbox></tui-checkbox>`) as any;
    const container = el.shadowRoot!.querySelector('.checkbox');
    container!.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('toggles on Enter key', async () => {
    const el = await fixture(html`<tui-checkbox></tui-checkbox>`) as any;
    const container = el.shadowRoot!.querySelector('.checkbox');
    container!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('does not toggle when disabled', async () => {
    const el = await fixture(html`<tui-checkbox disabled></tui-checkbox>`) as any;
    const container = el.shadowRoot!.querySelector('.checkbox');
    container!.click();
    await el.updateComplete;
    expect(el.checked).to.be.false;
  });

  it('fires tui-change event on toggle', async () => {
    const el = await fixture(html`<tui-checkbox value="opt1" name="prefs"></tui-checkbox>`) as any;
    const handler = vi.fn();
    el.addEventListener('tui-change', handler);
    const container = el.shadowRoot!.querySelector('.checkbox');
    container!.click();
    expect(handler.mock.calls).to.have.length(1);
    const detail = handler.mock.calls[0][0].detail;
    expect(detail.checked).to.be.true;
    expect(detail.value).to.equal('opt1');
    expect(detail.name).to.equal('prefs');
  });

  it('sets aria-checked attribute', async () => {
    const el = await fixture(html`<tui-checkbox></tui-checkbox>`) as any;
    const container = el.shadowRoot!.querySelector('.checkbox');
    expect(container!.getAttribute('aria-checked')).to.equal('false');
    container!.click();
    await el.updateComplete;
    expect(container!.getAttribute('aria-checked')).to.equal('true');
  });

  it('handles handleEvent to set checked', async () => {
    const el = await fixture(html`<tui-checkbox></tui-checkbox>`) as any;
    el.handleEvent({ channel: 'test', type: 'checkbox', id: 'x', data: { checked: true } });
    await el.updateComplete;
    expect(el.checked).to.be.true;
  });

  it('handles handleEvent for clear type', async () => {
    const el = await fixture(html`<tui-checkbox checked></tui-checkbox>`) as any;
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    expect(el.checked).to.be.false;
  });
});
