# ncurses Standards Alignment

**Date:** 2026-03-08
**Status:** Design

## Overview

Adopt three ncurses conventions as universal retro-tui standards: a state-driven border system, complete ANSI color support, and a composable text attribute system. These formalize patterns already emerging in the codebase and make retro-tui speak the same visual language as terminal UIs.

## Motivation

retro-tui already uses box-drawing characters and ANSI colors, but inconsistently across components. `tui-card` has a clear single → heavy → double border progression for interaction states. `tui-table` declares a `border` type but doesn't render box-draw characters. `tui-button` simulates border weight with box-shadow. `tui-panel` uses `border-width` changes. The ANSI parser handles foreground colors but not backgrounds or reverse video.

Aligning with ncurses conventions gives us:
- A shared visual grammar rooted in 40 years of terminal UI precedent
- Consistent interaction feedback across all components
- Complete ANSI compatibility for piped terminal output
- A declarative attribute system for web developers who don't want escape codes

## Standard 1: State-Driven Border System

### The Rule

Border weight communicates interaction state. Every bordered component follows the same visual grammar:

| State | Border | Box-Draw | Meaning |
|-------|--------|----------|---------|
| **Neutral** | Single line | `┌─┐│└─┘` | Present, resting |
| **Hover / Focus** | Heavy line | `┏━┓┃┗━┛` | Being interacted with |
| **Selected / Active** | Double line | `╔═╗║╚═╝` | Promoted, chosen |

This maps to ncurses conventions: single-line is `box()` default, heavy is bold/active window, double is dialog/promoted element.

### Implementation

#### Shared Border Mixin

Define a reusable set of CSS custom properties and character sets in `src/styles/borders.ts`:

```typescript
// Border character sets
export const BORDER_CHARS = {
  single: { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
  heavy:  { tl: '┏', tr: '┓', bl: '┗', br: '┛', h: '━', v: '┃' },
  double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
} as const;

export type BorderWeight = 'single' | 'heavy' | 'double' | 'none';
```

Shared CSS for state-driven borders (consumed by all bordered components):

```css
/* Base: single */
--_border-tl: '┌'; --_border-tr: '┐';
--_border-bl: '└'; --_border-br: '┘';
--_border-color: var(--border-default);

/* Hover/Focus: heavy */
:hover, :focus-within {
  --_border-tl: '┏'; --_border-tr: '┓';
  --_border-bl: '┗'; --_border-br: '┛';
  --_border-color: var(--text-primary);
}

/* Selected/Active: double */
[selected], [active] {
  --_border-tl: '╔'; --_border-tr: '╗';
  --_border-bl: '╚'; --_border-br: '╝';
  --_border-color: var(--color-primary);
}
```

#### Components Affected

| Component | Current Border Approach | Change Needed |
|-----------|------------------------|---------------|
| `tui-card` | Already uses single → heavy → double via `::before`/`::after` | Extract to shared system, keep as-is |
| `tui-panel` | `border-width` changes (1px → 2px) | Replace with box-draw character corners + shared weight system |
| `tui-button` | `box-shadow` tricks for border selection style | Replace `selection-style="border"` with actual box-draw character weight |
| `tui-table` | `border` attribute declared but not rendered as box-draw | Implement box-draw rendering using shared character set |
| `tui-statusbar` | Solid CSS border | Add box-draw corner characters |
| `tui-modal` | (if it has borders) | Adopt shared system |
| `tui-console` | `border-top` on input line | Consider box-draw separator |

#### Migration Strategy

1. Create `src/styles/borders.ts` with character sets and shared CSS
2. Update `tui-card` to import from shared system (currently self-contained — extract, don't break)
3. Update `tui-panel` to use box-draw corners instead of `border-width` changes
4. Update `tui-button` `selection-style="border"` to use real box-draw weight
5. Update `tui-table` to render actual box-draw characters from its `border` attribute
6. Remaining components adopt incrementally

#### Panel Title Decorations

Panel title decorations should adapt to border weight:

```
Neutral:    ┌─ Title ─┐
Hover:      ┏━ Title ━┓
Selected:   ╔═ Title ═╗
```

The panel already has `title::before` and `title::after` pseudo-elements with `'┌─ '` and `' ─┐'`. These should update with state.

## Standard 2: Complete ANSI Color Support

### Current State

`src/utils/ansi.js` handles:
- Foreground colors: 30-37, 90-97 (standard + bright)
- Styles: bold (1), dim (2), italic (3), underline (4)
- Reset: 0

### Missing (required for ncurses compatibility)

| ANSI Code | Meaning | Priority |
|-----------|---------|----------|
| 7 | Reverse video (swap fg/bg) | **High** — used everywhere in terminal UIs for selection |
| 40-47 | Standard background colors | **High** — common in colored output |
| 100-107 | Bright background colors | **High** — common in colored output |
| 38;5;N | 256-color foreground | **Medium** — used by modern CLI tools |
| 48;5;N | 256-color background | **Medium** — used by modern CLI tools |
| 38;2;R;G;B | Truecolor foreground | **Low** — nice to have |
| 48;2;R;G;B | Truecolor background | **Low** — nice to have |
| 9 | Strikethrough | **Low** |
| 8 | Hidden/invisible | **Low** |

### Implementation

Extend `ansiToHtml()` in `src/utils/ansi.js`:

```javascript
// Background colors
const ANSI_BG_COLORS = {
  40: 'black', 41: 'red', 42: 'green', 43: 'yellow',
  44: 'blue', 45: 'magenta', 46: 'cyan', 47: 'white',
  100: 'black', 101: 'red', 102: 'green', 103: 'yellow',
  104: 'blue', 105: 'magenta', 106: 'cyan', 107: 'white',
};
```

Add CSS classes to `shared.js`:

```css
/* Background colors */
.ansi-bg-black { background: #484848; }
.ansi-bg-red { background: var(--color-error); }
.ansi-bg-green { background: var(--color-secondary); }
.ansi-bg-yellow { background: var(--color-secondary); }
.ansi-bg-blue { background: var(--color-primary); }
.ansi-bg-magenta { background: var(--color-primary); }
.ansi-bg-cyan { background: #56d4dd; }
.ansi-bg-white { background: var(--text-primary); }

/* Reverse video */
.ansi-reverse {
  filter: invert(1);
  /* OR use CSS custom properties to swap --fg and --bg */
}

/* Strikethrough */
.ansi-strikethrough { text-decoration: line-through; }

/* Hidden */
.ansi-hidden { visibility: hidden; }
```

For reverse video, the cleanest approach is to track current fg/bg state in the parser and emit explicit color classes rather than using CSS `filter: invert()`, which would also invert background images.

For 256-color and truecolor, emit inline `style` attributes:

```javascript
// 38;5;N → foreground 256-color
// 48;5;N → background 256-color
if (code === 38 && codes[i+1] === 5) {
  const colorIndex = codes[i+2];
  result += `<span style="color: ${lookup256(colorIndex)}">`;
  i += 2;
}
```

### Affected Components

Every component that calls `ansiToHtml()` gets this for free:
- `tui-text` — static text with ANSI
- `tui-output` — scrolling log output
- `tui-console` — interactive console output

No component changes needed — just parser + CSS updates.

## Standard 3: Composable Text Attributes

### The Problem

Web developers building with retro-tui shouldn't need to know ANSI escape codes. They need a declarative way to apply terminal text styling.

### Declarative `attr` Property

Add an `attr` property to text-rendering components:

```html
<!-- Declarative (for web devs) -->
<tui-text attr="bold">Important message</tui-text>
<tui-text attr="bold reverse">Selected item</tui-text>
<tui-text attr="dim italic">Hint text</tui-text>

<!-- ANSI still works (for piped terminal output) -->
<tui-text content="\x1b[1;7mSelected item\x1b[0m"></tui-text>
```

### Attribute Vocabulary

Maps 1:1 to ncurses `A_*` attributes and ANSI codes:

| Attribute | CSS Class | ANSI Code | ncurses |
|-----------|-----------|-----------|---------|
| `bold` | `.tui-bold` | 1 | `A_BOLD` |
| `dim` | `.tui-dim` | 2 | `A_DIM` |
| `italic` | `.tui-italic` | 3 | — |
| `underline` | `.tui-underline` | 4 | `A_UNDERLINE` |
| `reverse` | `.tui-reverse` | 7 | `A_REVERSE` |
| `strikethrough` | `.tui-strikethrough` | 9 | — |
| `blink` | `.tui-blink` | 5 | `A_BLINK` |

### CSS Utility Classes

Add to `src/styles/shared.js` so they're available in all component shadow DOMs:

```css
/* Text attribute utilities */
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

### Implementation on `tui-text`

```typescript
@property({ type: String })
attr = '';

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

### Components That Get `attr`

| Component | How | Notes |
|-----------|-----|-------|
| `tui-text` | `attr` property on `<pre>` wrapper | Primary use case |
| `tui-output` | Individual lines via ANSI parser | Already works via `ansiToHtml()` |
| `tui-console` | Output lines via ANSI parser; prompt could get `attr` | `prompt-attr` for styled prompts |
| `tui-status-item` | `attr` on label and/or value | `label-attr`, `value-attr` |

## Implementation Order

### Phase 1: ANSI Parser (no component changes)
1. Extend `ansiToHtml()` with background colors, reverse video
2. Add `.ansi-bg-*` and `.ansi-reverse` classes to `shared.js`
3. All text components get this for free

### Phase 2: Text Attributes
1. Add `.tui-*` utility classes to `shared.js`
2. Add `attr` property to `tui-text`
3. Add `prompt-attr` to `tui-console`

### Phase 3: Border System
1. Create `src/styles/borders.ts` with shared character sets + CSS
2. Extract `tui-card` border logic into shared system
3. Update `tui-panel` title decorations and border corners
4. Update `tui-button` `selection-style="border"` to use real box-draw weight
5. Update `tui-table` to render box-draw characters from its `border` attribute
6. Remaining components adopt incrementally

### Phase 4: Consistency Pass
1. Audit all components for border/text attribute consistency
2. Ensure all themes produce correct contrast with new background colors
3. Update design tokens doc to reference border + attribute standards

## Testing

- ANSI parser: unit tests for each new code path (bg colors, reverse, 256-color)
- Border system: visual regression tests or Storybook stories showing all three states per component
- Text attributes: verify `attr` produces correct CSS classes, composes with ANSI content

## References

- ncurses `curs_attr(3)` — attribute constants and behavior
- ncurses `curs_border(3)` — `wborder()` character specification
- ECMA-48 — SGR (Select Graphic Rendition) parameter table
- Unicode Box Drawing block (U+2500–U+257F)
- Existing: `docs/plans/2026-01-25-design-tokens.md`
- Existing: `docs/plans/2026-01-26-selection-styles-and-button-unification.md`
