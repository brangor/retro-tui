import { describe, it } from 'vitest';
import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/tui-canvas.ts';

describe('tui-canvas with projections', () => {
  it('should default to rectangular projection', async () => {
    const el = await fixture(html`
      <tui-canvas width="8" height="8" cell-size="20"></tui-canvas>
    `);
    expect(el.projection).to.equal('rectangular');
  });

  it('should accept isometric projection', async () => {
    const el = await fixture(html`
      <tui-canvas projection="isometric" width="8" height="8" cell-size="40"></tui-canvas>
    `);
    expect(el.projection).to.equal('isometric');
  });

  it('should accept triangular projection', async () => {
    const el = await fixture(html`
      <tui-canvas projection="triangular" width="8" height="8" cell-size="50"></tui-canvas>
    `);
    expect(el.projection).to.equal('triangular');
  });
});
