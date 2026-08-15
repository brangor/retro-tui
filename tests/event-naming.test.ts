import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Not `new URL(..., import.meta.url)`: the jsdom test environment replaces the
// global URL with its own, which Node's fileURLToPath rejects ("must be of scheme
// file") and whose relative resolution picks up jsdom's document base. Not
// `process.cwd()` either — that binds the test to where it was invoked from.
// `import.meta.dirname` is a plain absolute path with none of those problems.
const DIR = join(import.meta.dirname, '../src/components');

// Matches `new CustomEvent('name'` and `new Event("name"` alike. Deliberately not
// an AST parse: it sees literal-named constructions, which is every dispatch in
// this library. A name built from a variable or template literal would slip past,
// so don't introduce one.
const EVENT_CONSTRUCTION = /new (?:Custom)?Event\(\s*(['"])([^'"]+)\1/g;
const FIRES_TAG = /@fires\s+(\S+)/g;

const files = readdirSync(DIR).filter((f) => /\.(ts|js)$/.test(f));
const read = (file: string) => readFileSync(join(DIR, file), 'utf8');
const dispatched = (src: string) => [...src.matchAll(EVENT_CONSTRUCTION)].map((m) => m[2]);
const documented = (src: string) => [...src.matchAll(FIRES_TAG)].map((m) => m[1]);

describe('event naming', () => {
  it.each(files)('%s dispatches only tui-prefixed events', (file) => {
    for (const name of dispatched(read(file))) {
      // Bare names collide: `toggle`, `close` and `copy` are real DOM events, and
      // every retro-tui event is bubbles+composed, so it reaches document.
      expect(name, `"${name}" in ${file} is not tui-prefixed`).toMatch(/^tui-/);
    }
  });

  it.each(files)('%s documents only tui-prefixed events in @fires', (file) => {
    for (const name of documented(read(file))) {
      expect(name, `@fires "${name}" in ${file} is not tui-prefixed`).toMatch(/^tui-/);
    }
  });

  // Whole-corpus, because the two sets have to be compared across files: the form
  // protocol is dispatched by five components but documented once per component.
  //
  // Checks the converse of the assertions above — that every dispatched name is
  // also documented. Without it, an undocumented event is invisible, and a typo
  // (`@fires tui-panel-togle`) passes every prefix check while documenting an
  // event that does not exist.
  it('every dispatched event has a matching @fires tag, and vice versa', () => {
    const sources = files.map(read);
    const allDispatched = new Set(sources.flatMap(dispatched));
    const allDocumented = new Set(sources.flatMap(documented));

    const undocumented = [...allDispatched].filter((n) => !allDocumented.has(n)).sort();
    const phantom = [...allDocumented].filter((n) => !allDispatched.has(n)).sort();

    expect(undocumented, 'dispatched but missing an @fires tag').toEqual([]);
    expect(phantom, '@fires tag for an event nothing dispatches (typo?)').toEqual([]);
  });
});
