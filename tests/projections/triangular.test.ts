import { describe, it } from 'vitest';
import { expect } from '@open-wc/testing';
import { TriangularProjection } from '../../src/projections/triangular.ts';

describe('TriangularProjection', () => {
  it('should identify top triangle region', () => {
    const projection = new TriangularProjection(50);
    // Near top of cell (0,0): x=25, y=5
    const result = projection.screenToGrid(25, 5, { width: 200, height: 200 });
    expect(result).to.deep.equal({ x: 0, y: 0, region: 'top' });
  });

  it('should identify right triangle region', () => {
    const projection = new TriangularProjection(50);
    // Near right of cell (0,0): x=45, y=25
    const result = projection.screenToGrid(45, 25, { width: 200, height: 200 });
    expect(result).to.deep.equal({ x: 0, y: 0, region: 'right' });
  });

  it('should identify bottom triangle region', () => {
    const projection = new TriangularProjection(50);
    // Near bottom of cell (0,0): x=25, y=45
    const result = projection.screenToGrid(25, 45, { width: 200, height: 200 });
    expect(result).to.deep.equal({ x: 0, y: 0, region: 'bottom' });
  });

  it('should identify left triangle region', () => {
    const projection = new TriangularProjection(50);
    // Near left of cell (0,0): x=5, y=25
    const result = projection.screenToGrid(5, 25, { width: 200, height: 200 });
    expect(result).to.deep.equal({ x: 0, y: 0, region: 'left' });
  });

  it('should generate triangle SVG path for region', () => {
    const projection = new TriangularProjection(50);
    const path = projection.getCellPath(0, 0, 'top');
    expect(path).to.include('M');
    expect(path).to.include('Z');
  });

  it('should return full square path when no region specified', () => {
    const projection = new TriangularProjection(50);
    const path = projection.getCellPath(0, 0);
    expect(path).to.include('M 0,0');
  });

  it('should calculate pixel dimensions same as rectangular', () => {
    const projection = new TriangularProjection(50);
    const dims = projection.getDimensions(10, 8);
    expect(dims).to.deep.equal({ width: 500, height: 400 });
  });
});
