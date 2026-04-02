import { describe, it, vi } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-radio.ts';
import '../src/components/tui-radio-group.ts';

describe('tui-radio-group', () => {
  it('renders a slot for children', async () => {
    const el = await fixture(html`<tui-radio-group></tui-radio-group>`);
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
  });

  it('renders label when set', async () => {
    const el = await fixture(html`<tui-radio-group label="Theme"></tui-radio-group>`);
    expect(el.shadowRoot!.textContent).to.contain('Theme');
  });

  it('has role=radiogroup', async () => {
    const el = await fixture(html`<tui-radio-group></tui-radio-group>`);
    const group = el.shadowRoot!.querySelector('.group');
    expect(group!.getAttribute('role')).to.equal('radiogroup');
  });

  it('selects initial value from attribute', async () => {
    const el = await fixture(html`
      <tui-radio-group value="b">
        <tui-radio value="a"></tui-radio>
        <tui-radio value="b"></tui-radio>
        <tui-radio value="c"></tui-radio>
      </tui-radio-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    const radioB = el.querySelector('tui-radio[value="b"]');
    expect(radioB.checked).to.be.true;
    const radioA = el.querySelector('tui-radio[value="a"]');
    expect(radioA.checked).to.be.false;
  });

  it('enforces mutual exclusivity on child click', async () => {
    const el = await fixture(html`
      <tui-radio-group name="theme" value="a">
        <tui-radio value="a"></tui-radio>
        <tui-radio value="b"></tui-radio>
      </tui-radio-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));

    const handler = vi.fn();
    el.addEventListener('tui-change', handler);

    const radioB = el.querySelector('tui-radio[value="b"]');
    radioB.shadowRoot!.querySelector('.radio')!.click();
    await el.updateComplete;

    expect(el.value).to.equal('b');
    expect(radioB.checked).to.be.true;
    const radioA = el.querySelector('tui-radio[value="a"]');
    expect(radioA.checked).to.be.false;
    expect(handler.mock.calls).to.have.length(1);
    expect(handler.mock.calls[0][0].detail.value).to.equal('b');
    expect(handler.mock.calls[0][0].detail.name).to.equal('theme');
  });

  it('navigates with arrow keys', async () => {
    const el = await fixture(html`
      <tui-radio-group value="a">
        <tui-radio value="a"></tui-radio>
        <tui-radio value="b"></tui-radio>
        <tui-radio value="c"></tui-radio>
      </tui-radio-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));

    const group = el.shadowRoot!.querySelector('.group')!;
    group.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    expect(el.value).to.equal('b');
  });

  it('wraps arrow navigation', async () => {
    const el = await fixture(html`
      <tui-radio-group value="c">
        <tui-radio value="a"></tui-radio>
        <tui-radio value="b"></tui-radio>
        <tui-radio value="c"></tui-radio>
      </tui-radio-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));

    const group = el.shadowRoot!.querySelector('.group')!;
    group.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    expect(el.value).to.equal('a');
  });

  it('propagates disabled to children', async () => {
    const el = await fixture(html`
      <tui-radio-group disabled>
        <tui-radio value="a"></tui-radio>
        <tui-radio value="b"></tui-radio>
      </tui-radio-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    const children = el.querySelectorAll('tui-radio');
    children.forEach((child: any) => {
      expect(child.disabled).to.be.true;
    });
  });

  it('handles handleEvent to set value', async () => {
    const el = await fixture(html`
      <tui-radio-group>
        <tui-radio value="a"></tui-radio>
        <tui-radio value="b"></tui-radio>
      </tui-radio-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    el.handleEvent({ channel: 'test', type: 'radio-group', id: 'x', data: { value: 'b' } });
    await el.updateComplete;
    expect(el.value).to.equal('b');
    expect(el.querySelector('tui-radio[value="b"]').checked).to.be.true;
    expect(el.querySelector('tui-radio[value="a"]').checked).to.be.false;
  });

  it('handles handleEvent for clear type', async () => {
    const el = await fixture(html`
      <tui-radio-group value="a">
        <tui-radio value="a"></tui-radio>
        <tui-radio value="b"></tui-radio>
      </tui-radio-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    expect(el.value).to.equal('');
    const children = el.querySelectorAll('tui-radio');
    children.forEach((child: any) => {
      expect(child.checked).to.be.false;
    });
  });
});
