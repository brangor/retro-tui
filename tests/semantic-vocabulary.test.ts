import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SEMANTIC_COLORS, SEMANTIC_TOKENS } from '../src/styles/semantics.ts';
import { Panel } from '../src/components/tui-panel.ts';
import { Stat } from '../src/components/tui-stat.ts';
import { StripItem } from '../src/components/tui-status-strip.ts';
import { Statusbar } from '../src/components/tui-statusbar.ts';
import { Button } from '../src/components/tui-button.ts';

/** Flatten a Lit component's static styles into one CSS string. */
const cssOf = (ctor: { styles?: unknown }): string => {
  const styles = Array.isArray(ctor.styles) ? ctor.styles : [ctor.styles];
  return styles.map((s: any) => s?.cssText ?? '').join('\n');
};

const COLOUR_COMPONENTS: Array<[string, { styles?: unknown }]> = [
  ['tui-panel', Panel],
  ['tui-stat', Stat],
  ['tui-strip-item', StripItem],
  ['tui-statusbar', Statusbar],
  ['tui-button', Button],
];

const RETIRED_LITERALS = ['cyan', 'green', 'magenta', 'yellow', 'red'];

// ─── JSDoc scanning ───────────────────────────────────────────────────────────
// The CSS assertions above never read a comment, which is how tui-statusbar's
// `@attr {string} color - Border color: cyan | green | magenta | yellow` survived
// 4.0.0 intact — documenting a vocabulary the component had already stopped
// accepting. Deliberately a regex over folded @attr/@fires text rather than an AST
// parse: the target is one sentence in a doc comment, not a type.
//
// Same reasoning as tests/event-naming.test.ts on `import.meta.dirname`: jsdom
// replaces the global URL, so `new URL(..., import.meta.url)` is not usable here.
const DIR = join(import.meta.dirname, '../src/components');
const SOURCES = readdirSync(DIR)
  .filter((f) => /\.(ts|js)$/.test(f))
  .map((f) => [f, readFileSync(join(DIR, f), 'utf8')] as const);

const LITERAL_WORD = new RegExp(`\\b(${RETIRED_LITERALS.join('|')})\\b`, 'i');

/**
 * Every `@attr` / `@fires` tag in a source file, continuation lines folded into
 * one string, filtered down to those that talk about colour at all.
 */
const colourTags = (src: string): string[] => {
  const tags: string[] = [];
  let open: string | null = null;
  const close = () => {
    if (open) tags.push(open);
    open = null;
  };

  for (const raw of src.split('\n')) {
    const inComment = /^\s*\*/.test(raw);
    const text = raw.replace(/^\s*\*\s?/, '').trim();
    if (!inComment) {
      close();
    } else if (/^@(attr|fires)\b/.test(text)) {
      close();
      open = text;
    } else if (open !== null) {
      // A new tag, the end of the block, or a blank line ends the current tag.
      if (/^@/.test(text) || /\*\//.test(raw) || text === '') close();
      else open += ` ${text}`;
    }
  }
  close();

  return tags.filter((t) => /colou?r/i.test(t));
};

describe('semantic colour vocabulary', () => {
  it.each(COLOUR_COMPONENTS)('%s styles every semantic value', (_name, ctor) => {
    const css = cssOf(ctor);
    for (const value of SEMANTIC_COLORS) {
      expect(css, `missing [color="${value}"]`).toContain(`[color="${value}"]`);
    }
  });

  it.each(COLOUR_COMPONENTS)('%s no longer accepts literal colour names', (_name, ctor) => {
    const css = cssOf(ctor);
    for (const literal of RETIRED_LITERALS) {
      expect(css, `literal [color="${literal}"] survives`).not.toContain(`[color="${literal}"]`);
    }
  });

  it.each(SOURCES)('%s documents no retired literal colour name', (_file, src) => {
    for (const tag of colourTags(src)) {
      expect(tag, `JSDoc still names a retired literal colour`).not.toMatch(LITERAL_WORD);
    }
  });

  it('sees the JSDoc that 4.0.0 left behind', () => {
    // Guards the guard: if colourTags stops folding continuation lines or stops
    // matching, the assertion above goes quietly green. This is the exact text
    // that shipped in tui-statusbar.ts from 4.0.0 until it was corrected.
    const stale = `/**
 * <tui-statusbar>
 *
 * @slot - Status items (use tui-status-item)
 * @attr {string} color - Border color: cyan | green | magenta | yellow
 */`;
    const tags = colourTags(stale);
    expect(tags).toHaveLength(1);
    expect(tags[0]).toMatch(LITERAL_WORD);
  });

  it('maps every semantic value to a design token, never a raw colour', () => {
    // Raw hex would defeat theming — the reason the literals were removed.
    for (const value of SEMANTIC_COLORS) {
      expect(SEMANTIC_TOKENS[value]).toMatch(/^--/);
    }
  });
});
