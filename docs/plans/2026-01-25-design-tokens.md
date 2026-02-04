# RetroTUI Design Tokens

**Date:** 2026-01-25
**Status:** In Progress

## Overview

Add a design token system to RetroTUI for themeable components. Start with CSS custom properties, structured for future migration to JSON/JS exports.

## Goals

- **Personal exploration platform** — Easy to experiment with different aesthetics
- **Semantic color system** — 5 core colors (primary, secondary, error, success, info) with contrast-safe bg/fg pairs
- **Structural tokens** — Border widths, radii, spacing
- **Storybook theme switching** — Toggle between themes in the toolbar
- **Simple but capable** — Flat structure for now, expand to component-level tokens when needed

## Token Categories

### Semantic Colors

| Token | Purpose |
|-------|---------|
| `--color-primary` | Main accent, active states |
| `--color-primary-bg` | Background for primary containers |
| `--color-primary-fg` | Text on primary backgrounds |
| `--color-secondary` | Secondary accent, headers |
| `--color-secondary-bg` | Background for secondary containers |
| `--color-secondary-fg` | Text on secondary backgrounds |
| `--color-error` | Errors, danger actions |
| `--color-error-bg` | Background for error containers |
| `--color-error-fg` | Text on error backgrounds |
| `--color-success` | Success states, confirmations |
| `--color-success-bg` | Background for success containers |
| `--color-success-fg` | Text on success backgrounds |
| `--color-info` | Informational, neutral highlights |
| `--color-info-bg` | Background for info containers |
| `--color-info-fg` | Text on info backgrounds |

### Surfaces

| Token | Purpose |
|-------|---------|
| `--surface-base` | Main background |
| `--surface-elevated` | Panels, cards, modals |
| `--surface-overlay` | Dropdowns, tooltips |
| `--text-primary` | Main text |
| `--text-muted` | Secondary/dim text |
| `--border-default` | Standard borders |

### Structural

| Token | Purpose |
|-------|---------|
| `--border-width` | Line thickness |
| `--border-radius` | Corner rounding |
| `--spacing-xs` | 0.25rem |
| `--spacing-sm` | 0.5rem |
| `--spacing-md` | 1rem |
| `--spacing-lg` | 1.5rem |
| `--font-mono` | Monospace font stack |

### Legacy Mappings

For backwards compatibility with existing components:

```css
--bg: var(--surface-base);
--text: var(--text-primary);
--text-dim: var(--text-muted);
--border: var(--border-default);
--cyan: var(--color-primary);
--green: var(--color-secondary);
--yellow: #f1fa8c;
--red: var(--color-error);
--magenta: #ff79c6;
```

## Themes

### Terminal Classic

The original dark terminal look — tinted dark backgrounds with colored text.

**Philosophy:** Subtle, low-key, colored accents on dark surfaces.

```css
--color-primary: #00ffff;      /* cyan */
--color-primary-bg: #002b36;   /* dark tinted bg */
--color-primary-fg: #00ffff;   /* colored text */

--surface-base: #0a0a0a;
--border-width: 1px;
--border-radius: 0;
```

### Vibrant Sci-fi

Bold, saturated colors — solid color backgrounds with contrasting text.

**Philosophy:** High visual impact, SNES/GC sci-fi vibes, solid color blocks.

```css
--color-primary: #ff00ff;      /* magenta */
--color-primary-bg: #ff00ff;   /* solid bright bg */
--color-primary-fg: #000000;   /* dark text on bright */

--surface-base: #0d0d1a;
--border-width: 2px;
--border-radius: 2px;
```

## Implementation

### Files

- `retro-tui/src/styles/tokens.css` — Token definitions with both themes
- `retro-tui-docs/.storybook/preview.js` — Theme switcher decorator
- `retro-tui-docs/.storybook/preview-head.html` — Base styles using tokens

### Theme Switching

Storybook toolbar with `globalTypes`:

```javascript
globalTypes: {
  theme: {
    name: 'Theme',
    defaultValue: 'terminal-classic',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'terminal-classic', title: 'Terminal Classic' },
        { value: 'vibrant-scifi', title: 'Vibrant Sci-fi' },
      ],
    },
  },
},
```

Theme applied via decorator:

```javascript
decorators: [
  (story, context) => {
    const theme = context.globals.theme || 'terminal-classic';
    document.body.classList.remove('theme-terminal-classic', 'theme-vibrant-scifi');
    document.body.classList.add(`theme-${theme}`);
    return story();
  },
],
```

## Migration Path

### Current (Phase 1)
- CSS custom properties in `tokens.css`
- Components use legacy variables (`--cyan`, `--green`)
- Legacy mappings bridge old → new

### Next (Phase 2)
- Update components to use semantic tokens (`--color-primary-bg`)
- Dramatic visual differences between themes

### Future (Phase 3)
- JSON token source file
- Build step generates CSS + JS exports
- TypeScript types for token names

## Component Updates Needed

To fully leverage the token system, components should adopt semantic tokens:

### Example: `retro-panel` with solid headers

```css
/* Current */
.header {
  background: transparent;
  color: var(--cyan);
}

/* With tokens - Terminal Classic */
.header {
  background: var(--color-primary-bg);  /* #002b36 - tinted */
  color: var(--color-primary-fg);       /* #00ffff - cyan text */
}

/* With tokens - Vibrant Sci-fi */
.header {
  background: var(--color-primary-bg);  /* #ff00ff - solid magenta */
  color: var(--color-primary-fg);       /* #000000 - dark text */
}
```

## Ideas to Explore

From brainstorming session:

1. **Responsive canvas** — Grid fills available space, not fixed 30×20
2. **ncurses-style layouts** — Resizable panes, splits, tmux patterns
3. **SNES/GC sci-fi vibes** — More visual weight, artistic depth
4. **Text-mode Reddit inspiration** — Vibrant solid color menubars
5. **CRT effects** — Scanlines, glow, curvature (optional layer)

## References

- `retro-tui/src/styles/tokens.css` — Token definitions
- `retro-tui-docs/.storybook/preview.js` — Storybook config
- Storybook running at `http://localhost:6006/`
