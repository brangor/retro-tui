import { describe, it, vi } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-input.ts';

describe('tui-input', () => {
  it('renders a native input', async () => {
    const el = await fixture(html`<tui-input></tui-input>`);
    const input = el.shadowRoot!.querySelector('input');
    expect(input).to.exist;
  });

  it('renders label when set', async () => {
    const el = await fixture(html`<tui-input label="Username"></tui-input>`);
    const label = el.shadowRoot!.querySelector('label');
    expect(label).to.exist;
    expect(label!.textContent).to.contain('Username');
  });

  it('does not render label when not set', async () => {
    const el = await fixture(html`<tui-input></tui-input>`);
    const label = el.shadowRoot!.querySelector('label');
    expect(label).to.not.exist;
  });

  it('passes placeholder to native input', async () => {
    const el = await fixture(html`<tui-input placeholder="type here..."></tui-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.placeholder).to.equal('type here...');
  });

  it('reflects value property', async () => {
    const el = await fixture(html`<tui-input value="hello"></tui-input>`) as any;
    expect(el.value).to.equal('hello');
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.value).to.equal('hello');
  });

  it('disables native input when disabled', async () => {
    const el = await fixture(html`<tui-input disabled></tui-input>`);
    const input = el.shadowRoot!.querySelector('input')!;
    expect(input.disabled).to.be.true;
  });

  it('fires tui-input event on keystroke', async () => {
    const el = await fixture(html`<tui-input></tui-input>`) as any;
    const handler = vi.fn();
    el.addEventListener('tui-input', handler);
    const input = el.shadowRoot!.querySelector('input')!;
    input.value = 'a';
    input.dispatchEvent(new Event('input'));
    expect(handler.mock.calls).to.have.length(1);
    expect(handler.mock.calls[0][0].detail.value).to.equal('a');
  });

  it('fires tui-change event on blur', async () => {
    const el = await fixture(html`<tui-input></tui-input>`) as any;
    const handler = vi.fn();
    el.addEventListener('tui-change', handler);
    const input = el.shadowRoot!.querySelector('input')!;
    input.value = 'test';
    input.dispatchEvent(new Event('change'));
    expect(handler.mock.calls).to.have.length(1);
    expect(handler.mock.calls[0][0].detail.value).to.equal('test');
  });

  it('handles handleEvent to set value', async () => {
    const el = await fixture(html`<tui-input></tui-input>`) as any;
    el.handleEvent({ channel: 'test', type: 'input', id: 'x', data: { value: 'pushed' } });
    await el.updateComplete;
    expect(el.value).to.equal('pushed');
  });

  it('handles handleEvent for clear type', async () => {
    const el = await fixture(html`<tui-input value="something"></tui-input>`) as any;
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    expect(el.value).to.equal('');
  });
});
