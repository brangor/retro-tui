import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIR = resolve(process.cwd(), 'src/components');

// Matches `new CustomEvent('name'` and `new Event("name"` alike. Deliberately not
// an AST parse: it sees literal-named constructions, which is every dispatch in
// this library. A name built from a variable or template literal would slip past,
// so don't introduce one.
const EVENT_CONSTRUCTION = /new (?:Custom)?Event\(\s*(['"])([^'"]+)\1/g;

describe('event naming', () => {
  const files = readdirSync(DIR).filter((f) => f.endsWith('.ts'));

  it.each(files)('%s dispatches only tui-prefixed events', (file) => {
    const src = readFileSync(join(DIR, file), 'utf8');
    const names = [...src.matchAll(EVENT_CONSTRUCTION)].map((m) => m[2]);
    for (const name of names) {
      // Bare names collide: `toggle`, `close` and `copy` are real DOM events, and
      // every retro-tui event is bubbles+composed, so it reaches document.
      expect(name, `"${name}" in ${file} is not tui-prefixed`).toMatch(/^tui-/);
    }
  });

  it.each(files)('%s documents only tui-prefixed events in @fires', (file) => {
    const src = readFileSync(join(DIR, file), 'utf8');
    const documented = [...src.matchAll(/@fires\s+(\S+)/g)].map((m) => m[1]);
    for (const name of documented) {
      expect(name, `@fires "${name}" in ${file} is not tui-prefixed`).toMatch(/^tui-/);
    }
  });
});
