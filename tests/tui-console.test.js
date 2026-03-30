import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-console.ts';

describe('tui-console', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-console></tui-console>`);
    expect(el).to.exist;
  });

  it('has shadow root with output and input areas', async () => {
    const el = await fixture(html`<tui-console></tui-console>`);
    expect(el.shadowRoot).to.exist;
    const output = el.shadowRoot.querySelector('.output');
    expect(output).to.exist;
    const inputLine = el.shadowRoot.querySelector('.input-line');
    expect(inputLine).to.exist;
    const input = el.shadowRoot.querySelector('input');
    expect(input).to.exist;
  });

  it('reflects prompt attribute', async () => {
    const el = await fixture(html`<tui-console prompt="$ "></tui-console>`);
    expect(el.prompt).to.equal('$ ');
    const promptSpan = el.shadowRoot.querySelector('.prompt');
    expect(promptSpan.textContent).to.equal('$ ');
  });

  it('has default prompt', async () => {
    const el = await fixture(html`<tui-console></tui-console>`);
    expect(el.prompt).to.equal('❯ ');
  });

  it('reflects history-size attribute', async () => {
    const el = await fixture(html`<tui-console history-size="50"></tui-console>`);
    expect(el.historySize).to.equal(50);
  });

  it('handles log event via handleEvent', async () => {
    const el = await fixture(html`<tui-console></tui-console>`);
    el.handleEvent({
      channel: 'test', type: 'log', id: 'x',
      data: { message: 'Server output' },
    });
    await el.updateComplete;
    const lines = el.shadowRoot.querySelectorAll('.line');
    expect(lines.length).to.equal(1);
    expect(lines[0].textContent).to.contain('Server output');
  });

  it('handles clear event via handleEvent', async () => {
    const el = await fixture(html`<tui-console></tui-console>`);
    el.print('something');
    el.handleEvent({ channel: 'test', type: 'clear', id: 'x', data: {} });
    await el.updateComplete;
    const lines = el.shadowRoot.querySelectorAll('.line');
    expect(lines.length).to.equal(0);
  });
});
