import { describe, it, expect } from 'vitest';
import { parseAreas } from '../src/components/tui-tiled.ts';

// Mirrors FOOTER_ROW in src/components/tui-tiled.ts. Stated literally so a
// change to the contract fails these tests loudly rather than tracking silently.
const FOOTER = 'var(--tui-tiled-footer-height, 120px)';

describe('parseAreas', () => {
  it('parses a single row into one-row grid', () => {
    const result = parseAreas('left center right');
    expect(result.areas).toBe('"left center right"');
    expect(result.cols).toBe('1fr 1fr 1fr');
    expect(result.rows).toBe('1fr');
    expect(result.slotNames).toEqual(['left', 'center', 'right']);
  });

  it('parses pipe-separated rows', () => {
    const result = parseAreas('header header | main sidebar | footer footer');
    expect(result.areas).toBe('"header header" "main sidebar" "footer footer"');
    expect(result.cols).toBe('1fr 1fr');
    expect(result.slotNames).toEqual(['header', 'main', 'sidebar', 'footer']);
  });

  it('deduplicates slot names preserving order', () => {
    const result = parseAreas('a a | b c | a a');
    expect(result.slotNames).toEqual(['a', 'b', 'c']);
  });

  it('applies auto sizing for full-width top row', () => {
    const result = parseAreas('status status | main aside');
    expect(result.rows).toBe('auto 1fr');
  });

  it('applies the footer token height for full-width bottom row', () => {
    const result = parseAreas('main aside | footer footer');
    expect(result.rows).toBe(`1fr ${FOOTER}`);
  });

  it('applies auto top and fixed bottom when both are full-width', () => {
    const result = parseAreas('header header | main sidebar | footer footer');
    expect(result.rows).toBe(`auto 1fr ${FOOTER}`);
  });

  it('uses 1fr for non-full-width rows', () => {
    const result = parseAreas('a b | c d');
    expect(result.rows).toBe('1fr 1fr');
  });

  it('sizes a lone full-width row as flexible, not auto', () => {
    // The chrome rules (auto top / fixed bottom) require more than one row —
    // a single row is always content and must fill the frame.
    const result = parseAreas('main');
    expect(result.rows).toBe('1fr');
    expect(result.cols).toBe('1fr');
    expect(result.slotNames).toEqual(['main']);
  });

  it('keeps a flexible row when a two-row layout is all full-width', () => {
    // 'main | footer' is the console preset. Without a 1fr row, MAIN shrink-wraps
    // its content and the frame is left with dead space below the footer.
    const result = parseAreas('main | footer');
    expect(result.rows).toBe(`1fr ${FOOTER}`);
  });

  it('gives every preset at least one flexible row', () => {
    // A height-bounded grid needs one 1fr row to absorb the frame height.
    const shorthands = [
      'status status | main aside-1 | main aside-2', // monitor
      'primary secondary | detail detail',           // viewer
      'main | footer',                               // console
      'main aside | footer footer',                  // console-split
      'left center right',                           // triad
    ];
    for (const shorthand of shorthands) {
      expect(parseAreas(shorthand).rows.split(' '), shorthand).toContain('1fr');
    }
  });

  it('handles the monitor preset pattern', () => {
    const result = parseAreas('status status | main aside-1 | main aside-2');
    expect(result.areas).toBe('"status status" "main aside-1" "main aside-2"');
    expect(result.rows).toBe('auto 1fr 1fr');
    expect(result.cols).toBe('1fr 1fr');
    expect(result.slotNames).toEqual(['status', 'main', 'aside-1', 'aside-2']);
  });

  it('handles the console-split preset pattern', () => {
    const result = parseAreas('main aside | footer footer');
    expect(result.rows).toBe(`1fr ${FOOTER}`);
    expect(result.cols).toBe('1fr 1fr');
    expect(result.slotNames).toEqual(['main', 'aside', 'footer']);
  });

  it('handles uneven column counts across rows', () => {
    const result = parseAreas('a b c | d d d');
    expect(result.cols).toBe('1fr 1fr 1fr');
    expect(result.rows).toBe(`1fr ${FOOTER}`);
  });
});
