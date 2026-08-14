import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { parseAreas } from '../src/components/tui-tiled.ts';
import '../src/components/tui-tiled.ts';

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

describe('<tui-tiled> rendering', () => {
  const gridOf = (el: HTMLElement) =>
    el.shadowRoot!.querySelector('.grid') as HTMLElement;

  it('applies the resolved grid template to the shadow DOM', async () => {
    const el = await fixture(html`<tui-tiled preset="console-split"></tui-tiled>`);
    const grid = gridOf(el);
    expect(grid.style.gridTemplateAreas).toBe('"main aside" "footer footer"');
    expect(grid.style.gridTemplateRows).toBe(`1fr ${FOOTER}`);
    expect(grid.style.gridTemplateColumns).toBe('1fr 1fr');
  });

  it('resolves every preset to its documented template', async () => {
    const expected: Record<string, string> = {
      'monitor':       'auto 1fr 1fr',
      'viewer':        `1fr ${FOOTER}`,
      'console':       `1fr ${FOOTER}`,
      'console-split': `1fr ${FOOTER}`,
      'triad':         '1fr',
    };
    for (const [preset, rows] of Object.entries(expected)) {
      const el = await fixture(html`<tui-tiled preset=${preset}></tui-tiled>`);
      expect(gridOf(el).style.gridTemplateRows, `preset=${preset}`).toBe(rows);
    }
  });

  it('renders one zone and one named slot per area', async () => {
    const el = await fixture(html`<tui-tiled preset="console-split"></tui-tiled>`);
    const zones = el.shadowRoot!.querySelectorAll('.zone');
    const slots = [...el.shadowRoot!.querySelectorAll('slot')].map(s => s.name);
    expect(zones.length).toBe(3);
    expect(slots).toEqual(['main', 'aside', 'footer']);
  });

  it('assigns each zone to its grid area', async () => {
    const el = await fixture(html`<tui-tiled preset="triad"></tui-tiled>`);
    const areas = [...el.shadowRoot!.querySelectorAll('.zone')]
      .map(z => (z as HTMLElement).style.gridArea);
    expect(areas).toEqual(['left', 'center', 'right']);
  });

  it('prefers preset over a custom areas shorthand for layout', async () => {
    // With both set, `areas` supplies display labels, not the grid itself.
    const el = await fixture(
      html`<tui-tiled preset="triad" areas="a b | c d"></tui-tiled>`
    );
    expect(gridOf(el).style.gridTemplateAreas).toBe('"left center right"');
  });

  it('uses a custom areas shorthand when no preset is set', async () => {
    const el = await fixture(html`<tui-tiled areas="a b | c c"></tui-tiled>`);
    const grid = gridOf(el);
    expect(grid.style.gridTemplateAreas).toBe('"a b" "c c"');
    expect(grid.style.gridTemplateRows).toBe(`1fr ${FOOTER}`);
  });

  it('renders nothing without a preset or areas', async () => {
    const el = await fixture(html`<tui-tiled></tui-tiled>`);
    expect(el.shadowRoot!.querySelector('.grid')).toBeNull();
  });

  it('applies the gap attribute', async () => {
    const el = await fixture(html`<tui-tiled preset="triad" gap="4px"></tui-tiled>`);
    expect(gridOf(el).style.gap).toBe('4px');
  });

  it('renders no zone labels by default', async () => {
    const el = await fixture(html`<tui-tiled preset="triad"></tui-tiled>`);
    expect(el.shadowRoot!.querySelector('.zone-label')).toBeNull();
    expect(el.shadowRoot!.querySelector('.zone-titlebar')).toBeNull();
  });

  it('renders caption labels from slot names', async () => {
    const el = await fixture(html`<tui-tiled preset="triad" labels="caption"></tui-tiled>`);
    const labels = [...el.shadowRoot!.querySelectorAll('.zone-label')]
      .map(n => n.textContent?.trim());
    expect(labels).toEqual(['left', 'center', 'right']);
  });

  it('renders titlebar labels and marks the zones', async () => {
    const el = await fixture(html`<tui-tiled preset="triad" labels="titlebar"></tui-tiled>`);
    const bars = [...el.shadowRoot!.querySelectorAll('.zone-titlebar')]
      .map(n => n.textContent?.trim());
    expect(bars).toEqual(['left', 'center', 'right']);
    expect(el.shadowRoot!.querySelectorAll('.zone.has-titlebar').length).toBe(3);
  });

  it('maps areas onto preset slots as display labels', async () => {
    const el = await fixture(html`
      <tui-tiled preset="console-split" areas="DOWNLOAD | HISTORY | CONSOLE" labels="caption"></tui-tiled>
    `);
    const labels = [...el.shadowRoot!.querySelectorAll('.zone-label')]
      .map(n => n.textContent?.trim());
    const slots = [...el.shadowRoot!.querySelectorAll('slot')].map(s => s.name);
    expect(labels).toEqual(['DOWNLOAD', 'HISTORY', 'CONSOLE']);
    // Slot names stay the preset's — only the visible label changes.
    expect(slots).toEqual(['main', 'aside', 'footer']);
  });

  it('references the footer token rather than a hardcoded height', async () => {
    // jsdom does no layout, so this asserts the override PATH exists. Whether
    // an override resolves to real pixels is the browser-mode follow-up.
    const el = await fixture(html`<tui-tiled preset="console"></tui-tiled>`);
    expect(gridOf(el).style.gridTemplateRows).toContain('--tui-tiled-footer-height');
  });
});
