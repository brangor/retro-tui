import { describe, it, expect } from 'vitest';
import { overlay, createGrid, bodyToGrid, compose, createMoodCycler } from '../../src/utils/sprite.js';
import type { CharGrid, Layer, SpriteDefinition, MoodCycler } from '../../src/utils/sprite.js';

describe('createGrid', () => {
  it('creates a grid of nulls with given dimensions', () => {
    const grid: CharGrid = createGrid(3, 2);
    expect(grid).to.deep.equal([
      [null, null, null],
      [null, null, null],
    ]);
  });
});

describe('overlay', () => {
  it('stamps layer data onto base at the given position', () => {
    const base = createGrid(5, 3);
    base[0][0] = 'A';
    const layer: Layer = {
      location: { x: 1, y: 0 },
      size: { width: 2, height: 2 },
      data: [['X', 'Y'], ['Z', null]],
    };
    const result = overlay(base, layer);
    expect(result[0]).to.deep.equal(['A', 'X', 'Y', null, null]);
    expect(result[1]).to.deep.equal([null, 'Z', null, null, null]);
    expect(result[2]).to.deep.equal([null, null, null, null, null]);
  });

  it('skips null cells in overlay data', () => {
    const base = createGrid(3, 1);
    base[0][1] = 'B';
    const result = overlay(base, {
      location: { x: 0, y: 0 },
      size: { width: 3, height: 1 },
      data: [['X', null, 'Z']],
    });
    expect(result[0]).to.deep.equal(['X', 'B', 'Z']);
  });

  it('clips overlay that extends beyond grid bounds', () => {
    const base = createGrid(2, 2);
    const result = overlay(base, {
      location: { x: 1, y: 1 },
      size: { width: 3, height: 3 },
      data: [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']],
    });
    expect(result[1][1]).to.equal('A');
    expect(result).to.have.length(2);
    expect(result[1]).to.have.length(2);
  });

  it('does not mutate the base grid', () => {
    const base = createGrid(2, 2);
    base[0][0] = 'O';
    overlay(base, {
      location: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      data: [['X']],
    });
    expect(base[0][0]).to.equal('O');
  });
});

describe('bodyToGrid', () => {
  it('converts string lines to a 2D char grid', () => {
    const grid = bodyToGrid(['AB', 'CD'], 2, 2);
    expect(grid).to.deep.equal([['A', 'B'], ['C', 'D']]);
  });

  it('treats spaces as null', () => {
    const grid = bodyToGrid(['A B'], 3, 1);
    expect(grid).to.deep.equal([['A', null, 'B']]);
  });

  it('pads short lines with null', () => {
    const grid = bodyToGrid(['A'], 3, 1);
    expect(grid).to.deep.equal([['A', null, null]]);
  });
});

describe('compose', () => {
  const sprite: SpriteDefinition = {
    size: { width: 5, height: 2 },
    body: { default: ['ABCDE', 'FGHIJ'] },
    layers: [
      {
        name: 'eyes',
        location: { x: 1, y: 0 },
        size: { width: 3, height: 1 },
        frames: {
          open:   [['O', ' ', 'O']],
          closed: [['-', ' ', '-']],
        },
      },
    ],
    moods: {},
  };

  it('composes body with named layer frames', () => {
    const frame = compose(sprite, { eyes: 'open' });
    // Space between eyes is transparent — base 'C' shows through
    expect(frame[0]).to.deep.equal(['A', 'O', 'C', 'O', 'E']);
  });

  it('falls back to first frame name if key not found', () => {
    const frame = compose(sprite, { eyes: 'nonexistent' });
    expect(frame[0]).to.deep.equal(['A', 'O', 'C', 'O', 'E']);
  });
});

describe('createMoodCycler', () => {
  const moods = {
    idle: { eyes: ['open'], mouth: ['closed'], tail: ['neutral'] },
    excited: { eyes: ['wide'], mouth: ['open', 'closed'], tail: ['wag1', 'wag2', 'wag3'] },
  };

  it('cycles through frame names for current mood', () => {
    const cycler: MoodCycler = createMoodCycler(moods, 'idle');
    const s1 = cycler.next();
    expect(s1).to.deep.equal({ eyes: 'open', mouth: 'closed', tail: 'neutral' });
    const s2 = cycler.next();
    expect(s2).to.deep.equal({ eyes: 'open', mouth: 'closed', tail: 'neutral' });
  });

  it('advances each layer cycle independently', () => {
    const cycler = createMoodCycler(moods, 'excited');
    const s1 = cycler.next();
    expect(s1).to.deep.equal({ eyes: 'wide', mouth: 'open', tail: 'wag1' });
    const s2 = cycler.next();
    expect(s2).to.deep.equal({ eyes: 'wide', mouth: 'closed', tail: 'wag2' });
    const s3 = cycler.next();
    expect(s3).to.deep.equal({ eyes: 'wide', mouth: 'open', tail: 'wag3' });
  });

  it('resets cycles when mood changes', () => {
    const cycler = createMoodCycler(moods, 'excited');
    cycler.next();
    cycler.setMood('idle');
    const s = cycler.next();
    expect(s).to.deep.equal({ eyes: 'open', mouth: 'closed', tail: 'neutral' });
  });

  it('returns current mood name', () => {
    const cycler = createMoodCycler(moods, 'idle');
    expect(cycler.mood).to.equal('idle');
    cycler.setMood('excited');
    expect(cycler.mood).to.equal('excited');
  });

  it('ignores setMood with unknown name', () => {
    const cycler = createMoodCycler(moods, 'idle');
    cycler.setMood('nonexistent');
    expect(cycler.mood).to.equal('idle');
  });
});
