import { describe, it, expect } from 'vitest';
import { SEMANTIC_COLORS, SEMANTIC_TOKENS } from '../src/styles/semantics.ts';
import { Panel } from '../src/components/tui-panel.ts';
import { Stat } from '../src/components/tui-stat.ts';
import { StripItem } from '../src/components/tui-status-strip.ts';
import { Statusbar } from '../src/components/tui-statusbar.ts';

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
];

const RETIRED_LITERALS = ['cyan', 'green', 'magenta', 'yellow', 'red'];

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

  it('maps every semantic value to a design token, never a raw colour', () => {
    // Raw hex would defeat theming — the reason the literals were removed.
    for (const value of SEMANTIC_COLORS) {
      expect(SEMANTIC_TOKENS[value]).toMatch(/^--/);
    }
  });
});
