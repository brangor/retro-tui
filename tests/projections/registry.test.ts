import { describe, it } from 'vitest';
import { expect } from '@open-wc/testing';
import { getProjection } from '../../src/projections/index.ts';

describe('Projection Registry', () => {
  it('should return rectangular projection', () => {
    const p = getProjection('rectangular', 20);
    expect(p).to.exist;
    expect(p.cellSize).to.equal(20);
  });

  it('should return isometric projection', () => {
    const p = getProjection('isometric', 40);
    expect(p).to.exist;
  });

  it('should return triangular projection', () => {
    const p = getProjection('triangular', 50);
    expect(p).to.exist;
  });

  it('should throw for unknown projection', () => {
    expect(() => getProjection('unknown' as any, 20)).to.throw();
  });
});
