# ncurses Standards Alignment — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add three universal standards to retro-tui: complete ANSI color support, composable text attributes, and a state-driven border system.

**Architecture:** Phase 1 extends `ansiToHtml()` with background colors and reverse video — zero component changes, all text components benefit. Phase 2 adds `.tui-*` utility classes and an `attr` property to text components. Phase 3 creates a shared border module (`borders.ts`) with box-draw character sets and CSS, then migrates components one by one.

**Tech Stack:** Lit, TypeScript, vitest, `@open-wc/testing`

**Note on tests:** The jsdom environment has a pre-existing ESM compatibility issue (`ERR_REQUIRE_ESM` from `html-encoding-sniffer`). ANSI parser tests are pure unit tests that don't need jsdom — configure them to run in `node` environment via `// @vitest-environment node` comment at top of test file. Component tests will need the jsdom fix eventually but that's out of scope.

**Design doc:** `docs/plans/2026-03-08-ncurses-standards-alignment.md`

---

## Phase 1: Complete ANSI Color Support

### Task 1: ANSI Parser — Background Colors

**Files:**
- Modify: `src/utils/ansi.js` (add `ANSI_BG_COLORS` map, handle codes 40-47 and 100-107)
- Create: `tests/ansi.test.js`

**Step 1: Write the failing tests**

Create `tests/ansi.test.js`:

```javascript
// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { ansiToHtml, stripAnsi } from '../src/utils/ansi.js';

describe('ansiToHtml', () => {
  // Existing behavior (regression safety)
  it('converts foreground colors', () => {
    const result = ansiToHtml('\x1b[31mred text\x1b[0m');
    expect(result).toContain('class="ansi-red"');
    expect(result).toContain('red text');
  });

  it('converts bold', () => {
    const result = ansiToHtml('\x1b[1mbold\x1b[0m');
    expect(result).toContain('class="ansi-bold"');
  });

  it('escapes HTML', () => {
    const result = ansiToHtml('<script>alert("xss")</script>');
    expect(result).toContain('&lt;script&gt;');
    expect(result).not.toContain('<script>');
  });

  it('returns empty string for falsy input', () => {
    expect(ansiToHtml('')).toBe('');
    expect(ansiToHtml(null)).toBe('');
    expect(ansiToHtml(undefined)).toBe('');
  });

  // New: background colors
  it('converts standard background colors (40-47)', () => {
    const result = ansiToHtml('\x1b[41mred bg\x1b[0m');
    expect(result).toContain('ansi-bg-red');
    expect(result).toContain('red bg');
  });

  it('converts bright background colors (100-107)', () => {
    const result = ansiToHtml('\x1b[102mbright green bg\x1b[0m');
    expect(result).toContain('ansi-bg-green');
  });

  it('combines foreground and background', () => {
    const result = ansiToHtml('\x1b[31;42mred on green\x1b[0m');
    expect(result).toContain('ansi-red');
    expect(result).toContain('ansi-bg-green');
  });
});

describe('stripAnsi', () => {
  it('removes all ANSI codes', () => {
    expect(stripAnsi('\x1b[31;42mbold\x1b[0m')).toBe('bold');
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `cd /Users/brandon-mbp/Code/brando/retro-tui && npx vitest run tests/ansi.test.js`

Expected: Background color tests FAIL (no `ansi-bg-*` classes generated).

**Step 3: Add background color support to parser**

In `src/utils/ansi.js`, add the background color map after `ANSI_STYLES`:

```javascript
const ANSI_BG_COLORS = {
  40: 'black', 41: 'red', 42: 'green', 43: 'yellow',
  44: 'blue', 45: 'magenta', 46: 'cyan', 47: 'white',
  100: 'black', 101: 'red', 102: 'green', 103: 'yellow',
  104: 'blue', 105: 'magenta', 106: 'cyan', 107: 'white',
};
```

In the `for (const code of codes)` loop, add after the `ANSI_STYLES` check:

```javascript
} else if (ANSI_BG_COLORS[code]) {
  const className = `ansi-bg-${ANSI_BG_COLORS[code]}`;
  result += `<span class="${className}">`;
  openTags.push(className);
}
```

**Step 4: Run tests to verify they pass**

Run: `cd /Users/brandon-mbp/Code/brando/retro-tui && npx vitest run tests/ansi.test.js`

Expected: All PASS.

**Step 5: Commit**

```bash
git add tests/ansi.test.js src/utils/ansi.js
git commit -m "feat(ansi): add background color support (codes 40-47, 100-107)"
```

---

### Task 2: ANSI Parser — Reverse Video

**Files:**
- Modify: `src/utils/ansi.js` (handle code 7)
- Modify: `tests/ansi.test.js`

**Step 1: Write the failing test**

Add to `tests/ansi.test.js` inside the `ansiToHtml` describe block:

```javascript
  // Reverse video
  it('converts reverse video (code 7)', () => {
    const result = ansiToHtml('\x1b[7mreversed\x1b[0m');
    expect(result).toContain('ansi-reverse');
    expect(result).toContain('reversed');
  });

  it('combines reverse with foreground color', () => {
    const result = ansiToHtml('\x1b[31;7mred reversed\x1b[0m');
    expect(result).toContain('ansi-red');
    expect(result).toContain('ansi-reverse');
  });
```

**Step 2: Run tests to verify new tests fail**

Run: `cd /Users/brandon-mbp/Code/brando/retro-tui && npx vitest run tests/ansi.test.js`

Expected: Reverse video tests FAIL.

**Step 3: Add reverse video to parser**

In `src/utils/ansi.js`, add code 7 to `ANSI_STYLES`:

```javascript
const ANSI_STYLES = {
  1: 'bold',
  2: 'dim',
  3: 'italic',
  4: 'underline',
  7: 'reverse',
  9: 'strikethrough',
};
```

No other changes needed — the existing `ANSI_STYLES` handler already emits `ansi-${name}` classes.

**Step 4: Run tests to verify they pass**

Run: `cd /Users/brandon-mbp/Code/brando/retro-tui && npx vitest run tests/ansi.test.js`

Expected: All PASS.

**Step 5: Commit**

```bash
git add src/utils/ansi.js tests/ansi.test.js
git commit -m "feat(ansi): add reverse video and strikethrough support"
```

---

### Task 3: ANSI Parser — 256-Color Mode

**Files:**
- Modify: `src/utils/ansi.js` (handle 38;5;N and 48;5;N sequences)
- Modify: `tests/ansi.test.js`

**Step 1: Write the failing tests**

Add to `tests/ansi.test.js`:

```javascript
  // 256-color mode
  it('converts 256-color foreground (38;5;N)', () => {
    const result = ansiToHtml('\x1b[38;5;196mred256\x1b[0m');
    expect(result).toContain('style="color:');
    expect(result).toContain('red256');
  });

  it('converts 256-color background (48;5;N)', () => {
    const result = ansiToHtml('\x1b[48;5;21mbluebg\x1b[0m');
    expect(result).toContain('style="background-color:');
    expect(result).toContain('bluebg');
  });
```

**Step 2: Run tests to verify they fail**

Run: `cd /Users/brandon-mbp/Code/brando/retro-tui && npx vitest run tests/ansi.test.js`

Expected: 256-color tests FAIL.

**Step 3: Add 256-color support**

Add a 256-color lookup function to `src/utils/ansi.js` (before `ansiToHtml`):

```javascript
/**
 * Convert 256-color index to hex color
 * 0-7: standard colors, 8-15: bright colors,
 * 16-231: 6x6x6 color cube, 232-255: grayscale
 */
function color256ToHex(n) {
  // Standard colors (0-7)
  const standard = ['#000000','#aa0000','#00aa00','#aa5500','#0000aa','#aa00aa','#00aaaa','#aaaaaa'];
  // Bright colors (8-15)
  const bright = ['#555555','#ff5555','#55ff55','#ffff55','#5555ff','#ff55ff','#55ffff','#ffffff'];

  if (n < 8) return standard[n];
  if (n < 16) return bright[n - 8];
  if (n < 232) {
    // 6x6x6 color cube
    const idx = n - 16;
    const r = Math.floor(idx / 36);
    const g = Math.floor((idx % 36) / 6);
    const b = idx % 6;
    const toHex = v => (v === 0 ? 0 : 55 + v * 40).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  // Grayscale (232-255)
  const gray = 8 + (n - 232) * 10;
  const hex = gray.toString(16).padStart(2, '0');
  return `#${hex}${hex}${hex}`;
}
```

In the `for` loop inside `ansiToHtml`, add before the closing `}`:

```javascript
} else if (code === 38 && codes[i + 1] === 5 && codes[i + 2] !== undefined) {
  // 256-color foreground: 38;5;N
  const hex = color256ToHex(codes[i + 2]);
  result += `<span style="color: ${hex}">`;
  openTags.push('256fg');
  // Skip the next two codes (5 and N) — adjust loop index
  // Note: since we're iterating `codes` with for..of, we need to
  // switch to index-based iteration
} else if (code === 48 && codes[i + 1] === 5 && codes[i + 2] !== undefined) {
  // 256-color background: 48;5;N
  const hex = color256ToHex(codes[i + 2]);
  result += `<span style="background-color: ${hex}">`;
  openTags.push('256bg');
}
```

**Important:** The current `for (const code of codes)` loop needs to become index-based (`for (let i = 0; i < codes.length; i++)`) to support skipping ahead for multi-part sequences. When processing 38;5;N or 48;5;N, increment `i` by 2 to skip the `5` and `N` parts.

Full replacement of the loop:

```javascript
for (let i = 0; i < codes.length; i++) {
  const code = codes[i];
  if (code === 0) {
    result += openTags.map(() => '</span>').join('');
    openTags = [];
  } else if (code === 38 && codes[i + 1] === 5 && codes[i + 2] !== undefined) {
    const hex = color256ToHex(codes[i + 2]);
    result += `<span style="color: ${hex}">`;
    openTags.push('256fg');
    i += 2;
  } else if (code === 48 && codes[i + 1] === 5 && codes[i + 2] !== undefined) {
    const hex = color256ToHex(codes[i + 2]);
    result += `<span style="background-color: ${hex}">`;
    openTags.push('256bg');
    i += 2;
  } else if (code === 38 && codes[i + 1] === 2 && codes.length > i + 4) {
    // Truecolor foreground: 38;2;R;G;B
    const r = codes[i + 2], g = codes[i + 3], b = codes[i + 4];
    result += `<span style="color: rgb(${r},${g},${b})">`;
    openTags.push('tcfg');
    i += 4;
  } else if (code === 48 && codes[i + 1] === 2 && codes.length > i + 4) {
    // Truecolor background: 48;2;R;G;B
    const r = codes[i + 2], g = codes[i + 3], b = codes[i + 4];
    result += `<span style="background-color: rgb(${r},${g},${b})">`;
    openTags.push('tcbg');
    i += 4;
  } else if (ANSI_COLORS[code]) {
    const className = `ansi-${ANSI_COLORS[code]}`;
    result += `<span class="${className}">`;
    openTags.push(className);
  } else if (ANSI_BG_COLORS[code]) {
    const className = `ansi-bg-${ANSI_BG_COLORS[code]}`;
    result += `<span class="${className}">`;
    openTags.push(className);
  } else if (ANSI_STYLES[code]) {
    const className = `ansi-${ANSI_STYLES[code]}`;
    result += `<span class="${className}">`;
    openTags.push(className);
  }
}
```

**Step 4: Run tests to verify they pass**

Run: `cd /Users/brandon-mbp/Code/brando/retro-tui && npx vitest run tests/ansi.test.js`

Expected: All PASS.

**Step 5: Commit**

```bash
git add src/utils/ansi.js tests/ansi.test.js
git commit -m "feat(ansi): add 256-color and truecolor support"
```

---

### Task 4: ANSI CSS Classes in Shared Styles

**Files:**
- Modify: `src/styles/shared.js` (add `.ansi-bg-*`, `.ansi-reverse`, `.ansi-strikethrough`, `.ansi-hidden` classes)

**Step 1: No test needed — CSS-only change**

This is purely additive CSS that the parser already emits classes for.

**Step 2: Add CSS classes**

In `src/styles/shared.js`, add after the existing `.ansi-dim` rule:

```css
  .ansi-italic { font-style: italic; }
  .ansi-underline { text-decoration: underline; }
  .ansi-reverse {
    background: var(--text-primary);
    color: var(--surface-base);
  }
  .ansi-strikethrough { text-decoration: line-through; }
  .ansi-hidden { visibility: hidden; }

  /* Background colors */
  .ansi-bg-black { background-color: #484848; }
  .ansi-bg-red { background-color: var(--color-error); }
  .ansi-bg-green { background-color: var(--color-secondary); }
  .ansi-bg-yellow { background-color: #d29922; }
  .ansi-bg-blue { background-color: var(--color-primary); }
  .ansi-bg-magenta { background-color: #bc8cff; }
  .ansi-bg-cyan { background-color: #56d4dd; }
  .ansi-bg-white { background-color: var(--text-primary); }
```

**Step 3: Commit**

```bash
git add src/styles/shared.js
git commit -m "feat(styles): add ANSI background, reverse, strikethrough CSS classes"
```

---

## Phase 2: Composable Text Attributes

### Task 5: Text Attribute Utility Classes

**Files:**
- Modify: `src/styles/shared.js` (add `.tui-*` utility classes)

**Step 1: Add utility classes**

In `src/styles/shared.js`, add after the ANSI classes:

```css
  /* ═══ Text Attribute Utilities ═══
     Declarative terminal text styling.
     Usage: class="tui-bold tui-reverse"
     Maps 1:1 to ncurses A_* attributes. */
  .tui-bold { font-weight: bold; }
  .tui-dim { opacity: 0.6; }
  .tui-italic { font-style: italic; }
  .tui-underline { text-decoration: underline; }
  .tui-reverse {
    background: var(--text-primary);
    color: var(--surface-base);
  }
  .tui-strikethrough { text-decoration: line-through; }
  .tui-blink {
    animation: tui-blink 1s step-end infinite;
  }

  @keyframes tui-blink {
    50% { opacity: 0; }
  }
```

**Step 2: Commit**

```bash
git add src/styles/shared.js
git commit -m "feat(styles): add .tui-* text attribute utility classes"
```

---

### Task 6: `attr` Property on `tui-text`

**Files:**
- Modify: `src/components/tui-text.ts` (add `attr` property)
- Modify: `tests/tui-text.test.js` (add `attr` tests)

**Step 1: Write the failing tests**

Add to `tests/tui-text.test.js`:

```javascript
  it('applies attr classes to pre element', async () => {
    const el = await fixture(html`<tui-text attr="bold reverse" content="test"></tui-text>`);
    const pre = el.shadowRoot.querySelector('pre');
    expect(pre.classList.contains('tui-bold')).to.be.true;
    expect(pre.classList.contains('tui-reverse')).to.be.true;
  });

  it('handles single attr', async () => {
    const el = await fixture(html`<tui-text attr="dim" content="test"></tui-text>`);
    const pre = el.shadowRoot.querySelector('pre');
    expect(pre.classList.contains('tui-dim')).to.be.true;
  });

  it('handles empty attr', async () => {
    const el = await fixture(html`<tui-text attr="" content="test"></tui-text>`);
    const pre = el.shadowRoot.querySelector('pre');
    // Should not have any tui- classes
    const tuiClasses = Array.from(pre.classList).filter(c => c.startsWith('tui-'));
    expect(tuiClasses).to.have.length(0);
  });
```

**Step 2: Run tests to verify they fail**

Run: `cd /Users/brandon-mbp/Code/brando/retro-tui && npx vitest run tests/tui-text.test.js`

Expected: New tests FAIL (no `attr` property exists).

Note: If jsdom issue blocks this, these tests can be verified manually in the browser. Move forward with implementation and verify via Storybook or `index.html`.

**Step 3: Add `attr` property to `tui-text`**

In `src/components/tui-text.ts`:

Add the property:

```typescript
@property({ type: String })
attr = '';
```

Update `render()`:

```typescript
render() {
  const attrClasses = this.attr
    .split(/\s+/)
    .filter(Boolean)
    .map(a => `tui-${a}`)
    .join(' ');

  const htmlContent = ansiToHtml(this.content || this.textContent || '');
  return html`<pre class="${attrClasses}" .innerHTML=${htmlContent}></pre>`;
}
```

**Step 4: Run tests or manually verify**

Run: `cd /Users/brandon-mbp/Code/brando/retro-tui && npx vitest run tests/tui-text.test.js`

Or manual: Add `<tui-text attr="bold reverse" content="Hello"></tui-text>` to `index.html` and inspect.

**Step 5: Commit**

```bash
git add src/components/tui-text.ts tests/tui-text.test.js
git commit -m "feat(tui-text): add attr property for declarative text styling"
```

---

### Task 7: `attr` Support on `tui-output` and `tui-console`

**Files:**
- Modify: `src/components/tui-output.ts` (add `attr` for default line styling)
- Modify: `src/components/tui-console.ts` (add `prompt-attr` for prompt styling)

**Step 1: Add `attr` to `tui-output`**

In `src/components/tui-output.ts`, add:

```typescript
@property({ type: String })
attr = '';
```

Update the line rendering in `render()` to apply attr classes to the output container:

```typescript
render() {
  const attrClasses = this.attr
    .split(/\s+/)
    .filter(Boolean)
    .map(a => `tui-${a}`)
    .join(' ');

  return html`
    <div class="output ${attrClasses}">
      ...existing line rendering...
    </div>
  `;
}
```

**Step 2: Add `prompt-attr` to `tui-console`**

In `src/components/tui-console.ts`, add:

```typescript
@property({ type: String, attribute: 'prompt-attr' })
promptAttr = '';
```

Update the prompt rendering:

```typescript
get _promptClasses(): string {
  return ['prompt', ...this.promptAttr.split(/\s+/).filter(Boolean).map(a => `tui-${a}`)].join(' ');
}
```

In `render()`, change `<span class="prompt">` to `<span class="${this._promptClasses}">`.

**Step 3: Commit**

```bash
git add src/components/tui-output.ts src/components/tui-console.ts
git commit -m "feat: add attr to tui-output, prompt-attr to tui-console"
```

---

## Phase 3: State-Driven Border System

### Task 8: Create Shared Border Module

**Files:**
- Create: `src/styles/borders.ts`
- Create: `tests/borders.test.ts`

**Step 1: Write the test**

Create `tests/borders.test.ts`:

```typescript
// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { BORDER_CHARS, borderCharsFor } from '../src/styles/borders.js';

describe('BORDER_CHARS', () => {
  it('has single, heavy, and double character sets', () => {
    expect(BORDER_CHARS.single.tl).toBe('┌');
    expect(BORDER_CHARS.heavy.tl).toBe('┏');
    expect(BORDER_CHARS.double.tl).toBe('╔');
  });

  it('each set has all 6 characters', () => {
    for (const weight of ['single', 'heavy', 'double'] as const) {
      const chars = BORDER_CHARS[weight];
      expect(chars).toHaveProperty('tl');
      expect(chars).toHaveProperty('tr');
      expect(chars).toHaveProperty('bl');
      expect(chars).toHaveProperty('br');
      expect(chars).toHaveProperty('h');
      expect(chars).toHaveProperty('v');
    }
  });
});

describe('borderCharsFor', () => {
  it('returns single chars for neutral state', () => {
    expect(borderCharsFor('neutral')).toEqual(BORDER_CHARS.single);
  });

  it('returns heavy chars for hover state', () => {
    expect(borderCharsFor('hover')).toEqual(BORDER_CHARS.heavy);
  });

  it('returns double chars for selected state', () => {
    expect(borderCharsFor('selected')).toEqual(BORDER_CHARS.double);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/brandon-mbp/Code/brando/retro-tui && npx vitest run tests/borders.test.ts`

Expected: FAIL — module doesn't exist.

**Step 3: Create `src/styles/borders.ts`**

```typescript
import { css } from 'lit';

// ═══════════════════════════════════════════════════════════════════════════════
// BORDER CHARACTER SETS
// Maps to Unicode Box Drawing block (U+2500–U+257F)
// Aligned with ncurses wborder() conventions
// ═══════════════════════════════════════════════════════════════════════════════

export interface BorderCharSet {
  tl: string;  // top-left corner
  tr: string;  // top-right corner
  bl: string;  // bottom-left corner
  br: string;  // bottom-right corner
  h: string;   // horizontal line
  v: string;   // vertical line
}

export type BorderWeight = 'single' | 'heavy' | 'double' | 'none';
export type BorderState = 'neutral' | 'hover' | 'selected';

export const BORDER_CHARS: Record<Exclude<BorderWeight, 'none'>, BorderCharSet> = {
  single: { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
  heavy:  { tl: '┏', tr: '┓', bl: '┗', br: '┛', h: '━', v: '┃' },
  double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
} as const;

/**
 * State → border weight mapping.
 * This is the universal visual grammar:
 *   neutral  → single (resting)
 *   hover    → heavy  (interacting)
 *   selected → double (promoted)
 */
const STATE_TO_WEIGHT: Record<BorderState, Exclude<BorderWeight, 'none'>> = {
  neutral: 'single',
  hover: 'heavy',
  selected: 'double',
};

/**
 * Get the border character set for an interaction state.
 */
export function borderCharsFor(state: BorderState): BorderCharSet {
  return BORDER_CHARS[STATE_TO_WEIGHT[state]];
}

/**
 * Generate title decoration strings for a given state.
 * Returns { before, after } for use in ::before / ::after pseudo-elements
 * or template literals.
 *
 * Example: titleDecoration('neutral') → { before: '┌─ ', after: ' ─┐' }
 */
export function titleDecoration(state: BorderState): { before: string; after: string } {
  const chars = borderCharsFor(state);
  return {
    before: `${chars.tl}${chars.h} `,
    after: ` ${chars.h}${chars.tr}`,
  };
}
```

**Step 4: Run test to verify it passes**

Run: `cd /Users/brandon-mbp/Code/brando/retro-tui && npx vitest run tests/borders.test.ts`

Expected: All PASS.

**Step 5: Commit**

```bash
git add src/styles/borders.ts tests/borders.test.ts
git commit -m "feat(borders): add shared border character sets and state mapping"
```

---

### Task 9: Migrate `tui-card` to Shared Border System

**Files:**
- Modify: `src/components/tui-card.ts` (import from `borders.ts`, use constants instead of hardcoded chars)

**Step 1: Verify existing card tests pass**

Run: `cd /Users/brandon-mbp/Code/brando/retro-tui && npx vitest run tests/tui-card.test.js`

Note status (may fail due to jsdom issue — that's pre-existing, not our problem).

**Step 2: Import border system and replace hardcoded characters**

In `src/components/tui-card.ts`, add import:

```typescript
import { BORDER_CHARS } from '../styles/borders.js';
```

The card currently uses CSS `content: '┌'` etc. in pseudo-elements — these are CSS strings, not runtime values. Since CSS pseudo-element content can't use JS variables directly in Lit static styles, we keep the CSS approach but add a comment documenting the alignment:

```css
/* Border characters aligned with src/styles/borders.ts
   neutral: single (┌┐└┘), hover: heavy (┏┓┗┛), selected: double (╔╗╚╝) */
```

This is a documentation-only change for `tui-card` since it already follows the convention correctly. The value is that `borders.ts` is now the canonical reference.

**Step 3: Commit**

```bash
git add src/components/tui-card.ts
git commit -m "refactor(tui-card): document border alignment with shared border system"
```

---

### Task 10: Migrate `tui-panel` Title Decorations

**Files:**
- Modify: `src/components/tui-panel.ts` (title pseudo-elements adapt to state)

**Step 1: Current behavior**

Panel title always shows `┌─ Title ─┐` regardless of state. Border emphasis is done via `border-width` changes. We want:
- Neutral: `┌─ Title ─┐` (single)
- Hover: header shows same (panel hover is via drag, not decoration change)
- Selected: `╔═ Title ═╗` (double) — when `selected` attribute is set
- Active: `╔═ Title ═╗` (double) — when `active` attribute is set

**Step 2: Update title pseudo-elements**

In `src/components/tui-panel.ts`, update the `.title` CSS:

Replace:

```css
.title::before {
  content: '┌─ ';
  opacity: 0.7;
}

.title::after {
  content: ' ─┐';
  opacity: 0.7;
}
```

With:

```css
/* Neutral: single line title decorations */
.title::before {
  content: '┌─ ';
  opacity: 0.7;
}

.title::after {
  content: ' ─┐';
  opacity: 0.7;
}
```

Add selected/active state overrides (in the BRIGHT variant section):

```css
/* Selected: double line title decorations */
:host([selected]) .title::before { content: '╔═ '; }
:host([selected]) .title::after { content: ' ═╗'; }

/* Active: double line title decorations */
:host([active]) .title::before { content: '╔═ '; }
:host([active]) .title::after { content: ' ═╗'; }
```

And in the CLASSIC variant section, add the same overrides scoped to `[variant="classic"]`.

**Step 3: Manually verify**

Open dev server (`npm run dev`), check panels in different states — title decorations should change between single and double borders.

**Step 4: Commit**

```bash
git add src/components/tui-panel.ts
git commit -m "feat(tui-panel): state-driven title decorations (single/double)"
```

---

### Task 11: Migrate `tui-modal` Title Decorations

**Files:**
- Modify: `src/components/tui-modal.ts` (modal always uses double borders since it's a promoted element)

**Step 1: Update modal title**

Modals are always "promoted" (they overlay everything), so they should always use double-line decoration. Change:

```css
.title::before {
  content: '┌─ ';
}
.title::after {
  content: ' ─┐';
}
```

To:

```css
/* Modals are promoted elements — always double border */
.title::before {
  content: '╔═ ';
}
.title::after {
  content: ' ═╗';
}
```

Also update the modal's outer border from `2px solid` to include the double-line character set convention comment:

```css
.modal {
  background: var(--surface-elevated);
  /* Double border — modals are promoted/selected elements */
  border: 2px solid var(--text-primary);
  ...
}
```

**Step 2: Commit**

```bash
git add src/components/tui-modal.ts
git commit -m "feat(tui-modal): use double-line title decoration (promoted element)"
```

---

### Task 12: Add `border` Attribute to `tui-panel`

**Files:**
- Modify: `src/components/tui-panel.ts` (add `border` attribute for explicit override)

**Step 1: Add border property**

This allows authors to explicitly set a panel's base border weight. The state-driven system remains the default, but `border="double"` forces double regardless of state.

```typescript
import type { BorderWeight } from '../styles/borders.js';

@property({ type: String, reflect: true })
border: BorderWeight = 'single';
```

**Step 2: Add CSS for explicit border overrides**

```css
/* Explicit border weight overrides */
:host([border="double"]) .title::before { content: '╔═ '; }
:host([border="double"]) .title::after { content: ' ═╗'; }

:host([border="heavy"]) .title::before { content: '┏━ '; }
:host([border="heavy"]) .title::after { content: ' ━┓'; }

:host([border="none"]) .title::before,
:host([border="none"]) .title::after { content: ''; }
```

**Step 3: Commit**

```bash
git add src/components/tui-panel.ts
git commit -m "feat(tui-panel): add border attribute for explicit weight override"
```

---

### Task 13: Consistency Audit and Documentation

**Files:**
- Modify: `docs/plans/2026-03-08-ncurses-standards-alignment.md` (mark as Implemented)

**Step 1: Verify all tests pass**

Run: `cd /Users/brandon-mbp/Code/brando/retro-tui && npx vitest run tests/ansi.test.js tests/borders.test.ts`

Expected: All PASS.

**Step 2: Manual visual audit**

Open `npm run dev` and check:
- [ ] `tui-text attr="bold reverse"` renders correctly
- [ ] `tui-text attr="dim italic"` renders correctly
- [ ] `tui-output` displays background colors from ANSI input
- [ ] `tui-panel` shows `┌─ Title ─┐` in neutral, `╔═ Title ═╗` when `active`
- [ ] `tui-modal` always shows `╔═ Title ═╗`
- [ ] `tui-card` still works: single → heavy → double on neutral → hover → selected

**Step 3: Update design doc status**

Change the status line in `docs/plans/2026-03-08-ncurses-standards-alignment.md`:

```markdown
**Status:** Implemented (Phase 1-3)
```

**Step 4: Final commit**

```bash
git add docs/plans/2026-03-08-ncurses-standards-alignment.md
git commit -m "docs: mark ncurses standards alignment as implemented"
```

---

## Summary

| Task | Phase | Description |
|------|-------|-------------|
| 1 | ANSI | Background colors (40-47, 100-107) |
| 2 | ANSI | Reverse video + strikethrough |
| 3 | ANSI | 256-color and truecolor |
| 4 | ANSI | CSS classes in shared styles |
| 5 | Text | `.tui-*` utility classes |
| 6 | Text | `attr` property on `tui-text` |
| 7 | Text | `attr` on `tui-output`, `prompt-attr` on `tui-console` |
| 8 | Borders | Shared `borders.ts` module |
| 9 | Borders | Migrate `tui-card` (document alignment) |
| 10 | Borders | Migrate `tui-panel` title decorations |
| 11 | Borders | Migrate `tui-modal` title decorations |
| 12 | Borders | Add `border` attribute to `tui-panel` |
| 13 | All | Consistency audit and docs |
