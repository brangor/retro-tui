// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { getProjection } from '../../src/projections/index.ts';

describe('Projection Registry', () => {
  it('should return rectangular projection', () => {
    const p = getProjection('rectangular', 20);
    expect(p).toBeDefined();
    expect(p.cellSize).toBe(20);
  });

  it('should return isometric projection', () => {
    const p = getProjection('isometric', 40);
    expect(p).toBeDefined();
  });

  it('should return triangular projection', () => {
    const p = getProjection('triangular', 50);
    expect(p).toBeDefined();
  });

  it('should throw for unknown projection', () => {
    expect(() => getProjection('unknown' as any, 20)).toThrow();
  });
});
