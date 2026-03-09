// @vitest-environment node
import { describe, it, vi, expect } from 'vitest';
import { renderGrid, isometricOrder } from '../../src/utils/canvas-renderer.js';
import { RectangularProjection } from '../../src/projections/rectangular.ts';
import { IsometricProjection } from '../../src/projections/isometric.ts';
import { TriangularProjection } from '../../src/projections/triangular.ts';

describe('renderGrid', () => {
  it('should render filled cells as SVG paths', () => {
    const projection = new RectangularProjection(20);
    const grid = [
      [{ color: '#ff0000' }, null],
      [null, { color: '#00ff00' }],
    ];

    const svg = renderGrid({
      grid,
      projection,
      cellRenderer: (x, y, cell) => ({ fill: cell.color }),
    });

    expect(svg).to.include('fill="#ff0000"');
    expect(svg).to.include('fill="#00ff00"');
    // Two paths total (two filled cells)
    expect(svg.match(/<path /g).length).to.equal(2);
  });

  it('should skip null cells', () => {
    const projection = new RectangularProjection(20);
    const grid = [[null, null], [null, null]];

    const svg = renderGrid({
      grid,
      projection,
      cellRenderer: (x, y, cell) => ({ fill: cell.color }),
    });

    expect(svg).to.equal('');
  });

  it('should skip cells when cellRenderer returns null', () => {
    const projection = new RectangularProjection(20);
    const grid = [
      [{ color: '#ff0000', hidden: true }, { color: '#00ff00' }],
    ];

    const svg = renderGrid({
      grid,
      projection,
      cellRenderer: (x, y, cell) => cell.hidden ? null : { fill: cell.color },
    });

    expect(svg).to.not.include('#ff0000');
    expect(svg).to.include('#00ff00');
    expect(svg.match(/<path /g).length).to.equal(1);
  });

  it('should include stroke attributes when specified', () => {
    const projection = new RectangularProjection(20);
    const grid = [[{ color: '#ff0000' }]];

    const svg = renderGrid({
      grid,
      projection,
      cellRenderer: () => ({ fill: '#ff0000', stroke: '#000', strokeWidth: 0.5 }),
    });

    expect(svg).to.include('stroke="#000"');
    expect(svg).to.include('stroke-width="0.5"');
  });

  it('should include opacity when less than 1', () => {
    const projection = new RectangularProjection(20);
    const grid = [[{ color: '#ff0000' }]];

    const svg = renderGrid({
      grid,
      projection,
      cellRenderer: () => ({ fill: '#ff0000', opacity: 0.5 }),
    });

    expect(svg).to.include('opacity="0.5"');
  });

  it('should omit stroke and opacity when using defaults', () => {
    const projection = new RectangularProjection(20);
    const grid = [[{ color: '#ff0000' }]];

    const svg = renderGrid({
      grid,
      projection,
      cellRenderer: () => ({ fill: '#ff0000' }),
    });

    expect(svg).to.not.include('stroke=');
    expect(svg).to.not.include('opacity=');
  });

  it('should render triangular regions when regions are specified', () => {
    const projection = new TriangularProjection(40);
    const grid = [[{
      top: { color: '#ff0000' },
      right: { color: '#00ff00' },
      bottom: null,
      left: null,
    }]];

    const svg = renderGrid({
      grid,
      projection,
      regions: ['top', 'right', 'bottom', 'left'],
      cellRenderer: (x, y, cell, region) => {
        if (!cell[region]) return null;
        return { fill: cell[region].color };
      },
    });

    expect(svg).to.include('#ff0000');
    expect(svg).to.include('#00ff00');
    expect(svg.match(/<path /g).length).to.equal(2);
  });

  it('should call getDimensions on the projection', () => {
    const projection = new IsometricProjection(40);
    const spy = vi.spyOn(projection, 'getDimensions');

    const grid = Array(4).fill(null).map(() => Array(6).fill(null));
    grid[0][0] = { color: '#fff' };

    renderGrid({
      grid,
      projection,
      cellRenderer: (x, y, cell) => ({ fill: cell.color }),
    });

    expect(spy).toHaveBeenCalledWith(6, 4);
  });

  it('should use custom sortOrder when provided', () => {
    const projection = new RectangularProjection(20);
    const order = [];
    const grid = [
      [{ color: '#a' }, { color: '#b' }],
      [{ color: '#c' }, { color: '#d' }],
    ];

    renderGrid({
      grid,
      projection,
      sortOrder: (w, h) => {
        // Reverse order
        const coords = [];
        for (let y = h - 1; y >= 0; y--) {
          for (let x = w - 1; x >= 0; x--) {
            coords.push({ x, y });
          }
        }
        return coords;
      },
      cellRenderer: (x, y, cell) => {
        order.push({ x, y });
        return { fill: cell.color };
      },
    });

    // Should iterate in reverse order
    expect(order[0]).to.deep.equal({ x: 1, y: 1 });
    expect(order[3]).to.deep.equal({ x: 0, y: 0 });
  });

  it('should produce aligned paths for isometric projection', () => {
    const projection = new IsometricProjection(40);
    const grid = Array(8).fill(null).map(() => Array(8).fill(null));
    grid[0][0] = { color: '#fff' };

    const svg = renderGrid({
      grid,
      projection,
      cellRenderer: (x, y, cell) => ({ fill: cell.color }),
    });

    // The path should contain the correct origin offset (gridHeight * tileWidth/2 = 8 * 20 = 160)
    expect(svg).to.include('160');
  });
});

describe('isometricOrder', () => {
  it('should iterate all cells', () => {
    const coords = isometricOrder(4, 3);
    expect(coords.length).to.equal(12);
  });

  it('should iterate by ascending (x + y) sum', () => {
    const coords = isometricOrder(3, 3);
    let lastSum = -1;
    for (const { x, y } of coords) {
      expect(x + y).to.be.at.least(lastSum);
      lastSum = x + y;
    }
  });

  it('should start with (0, 0)', () => {
    const coords = isometricOrder(4, 4);
    expect(coords[0]).to.deep.equal({ x: 0, y: 0 });
  });

  it('should end with bottom-right cell', () => {
    const coords = isometricOrder(4, 3);
    const last = coords[coords.length - 1];
    expect(last).to.deep.equal({ x: 3, y: 2 });
  });

  it('should handle 1x1 grid', () => {
    const coords = isometricOrder(1, 1);
    expect(coords).to.deep.equal([{ x: 0, y: 0 }]);
  });
});
