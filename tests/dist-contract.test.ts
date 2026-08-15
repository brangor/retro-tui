import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

// Nothing has ever tested a built artifact — which is how a UMD build that
// could not load shipped for months. These assertions read dist/, which is
// committed; if they fail after a source change, run `npm run build`.
const dist = (f: string) => resolve(process.cwd(), 'dist', f);

// Same regex and same `import.meta.dirname` reasoning as tests/event-naming.test.ts
// (jsdom replaces the global URL, so `new URL(..., import.meta.url)` is unusable).
const EVENT_CONSTRUCTION = /new (?:Custom)?Event\(\s*(['"])([^'"]+)\1/g;
const COMPONENTS = join(import.meta.dirname, '../src/components');

const eventsIn = (src: string) => new Set([...src.matchAll(EVENT_CONSTRUCTION)].map((m) => m[2]));

const sortedEvents = (src: string) => [...eventsIn(src)].sort();

const sourceEvents = () => {
  const files = readdirSync(COMPONENTS).filter((f) => /\.(ts|js)$/.test(f));
  const all = files.map((f) => readFileSync(join(COMPONENTS, f), 'utf8')).join('\n');
  return sortedEvents(all);
};

describe('built artifacts', () => {
  it('leaves lit external in the bundler build', () => {
    const src = readFileSync(dist('retro-tui.js'), 'utf8');
    expect(src).toMatch(/from\s*["']lit["']/);
  });

  it('bundles lit into the CDN build', () => {
    const src = readFileSync(dist('retro-tui.cdn.js'), 'utf8');
    // Any surviving bare import means a script tag gets an unresolved specifier.
    const bareImports = src.match(/^import[^;]*from\s*["'][^."'][^"']*["']/gm) ?? [];
    expect(bareImports).toEqual([]);
  });

  it('no longer ships the broken UMD artifact', () => {
    // It was built with lit external but referenced a window.lit global that
    // Lit has never shipped, so it failed on load for every script-tag user.
    expect(existsSync(dist('retro-tui.umd.cjs'))).toBe(false);
  });

  // Every assertion above reads bundle *shape*, never bundle *content*, so a
  // stale dist/ passed them all: the 4.0.0 artifact rode this branch through a
  // whole event rename undetected. The public event vocabulary is the part of
  // dist/ consumers bind listeners to, so that is what gets compared. A set
  // comparison, deliberately — not a diff of the bundles.
  it.each(['retro-tui.js', 'retro-tui.cdn.js'])(
    '%s dispatches exactly the event set src/components does',
    (file) => {
      // The CDN build bundles lit, but lit itself constructs no literal-named
      // events, so both bundles are expected to carry the identical set.
      expect(sortedEvents(readFileSync(dist(file), 'utf8')), 'run `npm run build`').toEqual(
        sourceEvents(),
      );
    },
  );

  it('registers components when the CDN bundle alone is loaded', async () => {
    expect(customElements.get('tui-tiled')).toBeUndefined();
    await import(/* @vite-ignore */ dist('retro-tui.cdn.js'));
    expect(customElements.get('tui-tiled')).toBeDefined();
    expect(customElements.get('tui-console')).toBeDefined();
  });
});
