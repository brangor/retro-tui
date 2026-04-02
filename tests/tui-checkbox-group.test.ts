import { describe, it, vi } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-checkbox.ts';
import '../src/components/tui-checkbox-group.ts';

describe('tui-checkbox-group', () => {
  it('renders a slot for children', async () => {
    const el = await fixture(html`<tui-checkbox-group></tui-checkbox-group>`);
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).to.exist;
  });

  it('renders label when set', async () => {
    const el = await fixture(html`<tui-checkbox-group label="Options"></tui-checkbox-group>`);
    expect(el.shadowRoot!.textContent).to.contain('Options');
  });

  it('tracks checked children in value array', async () => {
    const el = await fixture(html`
      <tui-checkbox-group name="opts">
        <tui-checkbox value="a" checked></tui-checkbox>
        <tui-checkbox value="b"></tui-checkbox>
        <tui-checkbox value="c" checked></tui-checkbox>
      </tui-checkbox-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    expect(el.value).to.deep.equal(['a', 'c']);
  });

  it('updates value when child is toggled', async () => {
    const el = await fixture(html`
      <tui-checkbox-group name="opts">
        <tui-checkbox value="a"></tui-checkbox>
        <tui-checkbox value="b"></tui-checkbox>
      </tui-checkbox-group>
    `) as any;
    await el.updateComplete;
    const handler = vi.fn();
    el.addEventListener('tui-change', handler);

    const checkbox = el.querySelector('tui-checkbox[value="a"]');
    checkbox.shadowRoot!.querySelector('.checkbox')!.click();
    await el.updateComplete;

    expect(el.value).to.deep.equal(['a']);
    expect(handler.mock.calls).to.have.length(1);
    expect(handler.mock.calls[0][0].detail.value).to.deep.equal(['a']);
    expect(handler.mock.calls[0][0].detail.name).to.equal('opts');
  });

  it('propagates disabled to children', async () => {
    const el = await fixture(html`
      <tui-checkbox-group disabled>
        <tui-checkbox value="a"></tui-checkbox>
        <tui-checkbox value="b"></tui-checkbox>
      </tui-checkbox-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    const children = el.querySelectorAll('tui-checkbox');
    children.forEach((child: any) => {
      expect(child.disabled).to.be.true;
    });
  });

  it('handles handleEvent to set value', async () => {
    const el = await fixture(html`
      <tui-checkbox-group>
        <tui-checkbox value="a"></tui-checkbox>
        <tui-checkbox value="b"></tui-checkbox>
      </tui-checkbox-group>
    `) as any;
    await el.updateComplete;
    await new Promise(r => setTimeout(r, 0));
    el.handleEvent({ channel: 'test', type: 'checkbox-group', id: 'x', data: { value: ['b'] } });
    await el.updateComplete;
    const checkboxB = el.querySelector('tui-checkbox[value="b"]');
    expect(checkboxB.checked).to.be.true;
    const checkboxA = el.querySelector('tui-checkbox[value="a"]');
    expect(checkboxA.checked).to.be.false;
  });

  it('handles handleEvent for clear type', async () => {
    const el = await fixture(html`
      <tui-checkbox-group>
        <tui-checkbox value="a" checked></tui-checkbox>
        <tui-checkbox value="b" checked></tui-checkbox>
      </tui-checkbox-group>
    `) as any;
    await el.updateComplete;
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    const children = el.querySelectorAll('tui-checkbox');
    children.forEach((child: any) => {
      expect(child.checked).to.be.false;
    });
  });
});
