import { describe, it } from 'vitest';
import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/tui-button.ts';

describe('tui-button with tool-id', () => {
  it('should accept tool-id attribute', async () => {
    const el = await fixture(html`
      <tui-button tool-id="pencil">Pencil</tui-button>
    `);
    expect((el as any).toolId).to.equal('pencil');
  });

  it('should still work without tool-id', async () => {
    const el = await fixture(html`
      <tui-button>Normal</tui-button>
    `);
    expect((el as any).toolId).to.be.undefined;
    expect((el as any).selected).to.be.false;
  });
});
