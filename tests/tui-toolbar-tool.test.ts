import { describe, it } from 'vitest';
import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/tui-toolbar.ts';

describe('tui-toolbar with tool-id', () => {
  it('should pass tool-id to generated buttons', async () => {
    const el = await fixture(html`
      <tui-toolbar .tools=${[
        { id: 'pencil', icon: 'P', name: 'Pencil' },
        { id: 'eraser', icon: 'E', name: 'Eraser' },
      ]}></tui-toolbar>
    `);

    const buttons = el.shadowRoot!.querySelectorAll('tui-button');
    expect(buttons).to.have.length(2);
    expect(buttons[0].getAttribute('tool-id')).to.equal('pencil');
    expect(buttons[1].getAttribute('tool-id')).to.equal('eraser');
  });
});
