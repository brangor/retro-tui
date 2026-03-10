import { describe, it } from 'vitest';
import { expect } from '@open-wc/testing';
import { IsometricProjection } from '../../src/projections/isometric.ts';

describe('IsometricProjection', () => {
  it('should round-trip grid coords through screen coords', () => {
    const projection = new IsometricProjection(40);
    const dims = projection.getDimensions(8, 8);
    const screen = projection.gridToScreen(3, 2, dims);
    const grid = projection.screenToGrid(screen.x, screen.y, dims);
    expect(grid).to.deep.equal({ x: 3, y: 2 });
  });

  it('should return null for out-of-bounds', () => {
    const projection = new IsometricProjection(40);
    const dims = projection.getDimensions(8, 8);
    const result = projection.screenToGrid(-100, -100, dims);
    expect(result).to.be.null;
  });

  it('should produce diamond-shaped cell path', () => {
    const projection = new IsometricProjection(40);
    const path = projection.getCellPath(0, 0);
    expect(path).to.include('M');
    expect(path).to.include('Z');
  });

  it('should calculate dimensions for isometric grid', () => {
    const projection = new IsometricProjection(40);
    const dims = projection.getDimensions(8, 8);
    expect(dims.width).to.be.greaterThan(0);
    expect(dims.height).to.be.greaterThan(0);
  });
});
