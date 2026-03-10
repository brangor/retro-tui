import { describe, it } from 'vitest';
import { expect } from '@open-wc/testing';
import { RectangularProjection } from '../../src/projections/rectangular.ts';

describe('RectangularProjection', () => {
  it('should convert screen coords to grid coords', () => {
    const projection = new RectangularProjection(20);
    const result = projection.screenToGrid(45, 65, { width: 100, height: 100 });
    expect(result).to.deep.equal({ x: 2, y: 3 });
  });

  it('should return null for out-of-bounds coords', () => {
    const projection = new RectangularProjection(20);
    const result = projection.screenToGrid(-5, -5, { width: 100, height: 100 });
    expect(result).to.be.null;
  });

  it('should convert grid coords to screen center', () => {
    const projection = new RectangularProjection(20);
    const result = projection.gridToScreen(2, 3, { width: 100, height: 100 });
    expect(result).to.deep.equal({ x: 50, y: 70 });
  });

  it('should generate square cell path', () => {
    const projection = new RectangularProjection(20);
    const path = projection.getCellPath(0, 0);
    expect(path).to.include('M 0,0');
  });

  it('should calculate pixel dimensions', () => {
    const projection = new RectangularProjection(20);
    const dims = projection.getDimensions(10, 8);
    expect(dims).to.deep.equal({ width: 200, height: 160 });
  });
});
