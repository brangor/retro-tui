import { describe, it, expect } from 'vitest';
import { parseAreas } from '../src/components/tui-tiled.ts';

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

  it('applies minmax sizing for full-width bottom row', () => {
    const result = parseAreas('main aside | footer footer');
    expect(result.rows).toBe('1fr minmax(120px, auto)');
  });

  it('applies auto top and minmax bottom when both are full-width', () => {
    const result = parseAreas('header header | main sidebar | footer footer');
    expect(result.rows).toBe('auto 1fr minmax(120px, auto)');
  });

  it('uses 1fr for non-full-width rows', () => {
    const result = parseAreas('a b | c d');
    expect(result.rows).toBe('1fr 1fr');
  });

  it('handles single-row full-width as auto (top rule wins)', () => {
    const result = parseAreas('main');
    expect(result.rows).toBe('auto');
    expect(result.cols).toBe('1fr');
    expect(result.slotNames).toEqual(['main']);
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
    expect(result.rows).toBe('1fr minmax(120px, auto)');
    expect(result.cols).toBe('1fr 1fr');
    expect(result.slotNames).toEqual(['main', 'aside', 'footer']);
  });

  it('handles uneven column counts across rows', () => {
    const result = parseAreas('a b c | d d d');
    expect(result.cols).toBe('1fr 1fr 1fr');
    expect(result.rows).toBe('1fr minmax(120px, auto)');
  });
});
