# Selection Styles & Button Unification

**Date:** 2026-01-26
**Status:** Design Complete

## Overview

Introduce a consistent selection style system across components and unify button behavior so `retro-button` can serve toolbar, menu, and standard button use cases. Also improve Storybook controls to be context-aware.

## Goals

- **Two selection paradigms** — "invert" (color swap) and "border" (weight change) available across components
- **Unified button** — `retro-button` works in toolbars, menus, and standalone
- **Better Storybook UX** — Controls that actually work for showcase stories
- **TypeScript prototype** — Convert `retro-button` to TS as a foundation

## Part 1: Selection Style System

### The Two Paradigms

| Style | Visual | Best for |
|-------|--------|----------|
| `invert` | Background/foreground color swap | Focus, single active item, menus |
| `border` | Border weight changes (single → heavy → double) | Multi-select, dense UIs, toolbars |

### State Mapping

| State | `invert` | `border` |
|-------|----------|----------|
| neutral | default colors, single border | default colors, single border |
| hovered | slight bg tint | heavy border (`━`) |
| selected | — | double border (`═`) |
| active/focused | full inversion (bg ↔ fg) | double border + subtle accent |

### Implementation

**CSS property (inheritable):**
```css
--selection-style: invert | border;
```

**HTML attribute (overrides inherited):**
```html
<retro-panel selection-style="border">
```

**Fallback chain:** Component attribute → inherited CSS property → default (`invert`)

### Usage Examples

```html
<!-- All children inherit border-weight selection -->
<retro-app selection-style="border">
  <retro-panel title="Files" active>...</retro-panel>
  <retro-toolbar>...</retro-toolbar>
</retro-app>

<!-- Override locally -->
<retro-app selection-style="border">
  <retro-menu selection-style="invert">
    <!-- menus invert, rest use border -->
  </retro-menu>
</retro-app>
```

### Components Affected

- `retro-button` — new attribute
- `retro-panel` — replaces `variant="bright|classic"` distinction
- `retro-toolbar` — inherits or sets for children
- `retro-menu` — inherits or sets for children

## Part 2: Button Variants & Unification

### Current State

Variants: `default`, `primary`, `danger`, `ghost`

Problems:
- `transform: translateY(1px)` on active — too playful for terminal aesthetic
- Toolbar has its own `.tool-btn` styles, not reusable
- Menu triggers have their own `.trigger` styles, not reusable

### Proposed Changes

**New variants:**

| Variant | Shape | Use Case |
|---------|-------|----------|
| `icon` | Square, fixed size (28/36/44px based on `size`) | Toolbar buttons, icon-only |
| `menu` | No border until hover, full-width option | Menu bar triggers |

**Removed behaviors:**
- ~~`transform: translateY(1px)` on active~~ — No bounce

**New properties:**
- `selection-style` — inherits or overrides
- `selected` — boolean for toggle/toolbar states

### After Changes

```html
<!-- Toolbar using buttons -->
<retro-toolbar selection-style="border">
  <retro-button variant="icon">✏️</retro-button>
  <retro-button variant="icon">🪣</retro-button>
  <retro-button variant="icon" selected>⬜</retro-button>
</retro-toolbar>

<!-- Menu bar using buttons -->
<retro-menu selection-style="invert">
  <retro-button variant="menu">File</retro-button>
  <retro-button variant="menu">Edit</retro-button>
</retro-menu>
```

### What Gets Replaced

- `retro-toolbar`'s internal `.tool-btn` → `<retro-button variant="icon">`
- `retro-menu-item`'s `.trigger` → `<retro-button variant="menu">`

## Part 3: Storybook Improvements

### The Problem

"All variants" stories show controls that don't affect the story.

### Solution: Story Metadata

**Story types:**

| Type | Controls Behavior |
|------|-------------------|
| Playground | All controls active, single instance |
| Showcase | Cross-cutting controls apply to all, dimension prop hidden |

**Implementation:**

```js
export const AllColors = {
  parameters: {
    showcase: {
      dimension: 'color',  // Hide this control, it defines the showcase
    },
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      ${['cyan', 'green', 'magenta', 'yellow', 'red'].map(color => html`
        <retro-panel 
          title="${color} Panel" 
          color=${color}
          variant=${args.variant}
          ?collapsible=${args.collapsible}
        >
          <p>Content</p>
        </retro-panel>
      `)}
    </div>
  `,
};
```

### Enriched argTypes

```js
argTypes: {
  variant: {
    control: 'select',
    options: ['bright', 'classic'],
    description: 'Visual style for focus states',
    table: {
      type: { summary: '"bright" | "classic"' },
      defaultValue: { summary: 'bright' },
      category: 'Appearance',
    },
  },
  collapsible: {
    control: 'boolean',
    description: 'Enables collapse toggle',
    table: { category: 'Behavior' },
  },
  collapsed: {
    control: 'boolean',
    description: 'Current collapse state. Only applies when collapsible is true.',
    table: { category: 'Behavior' },
    if: { arg: 'collapsible' },  // Conditional visibility
  },
},
```

## Part 4: TypeScript Prototype (retro-button)

### Goal

Convert `retro-button.js` to TypeScript to evaluate DX and establish patterns for other components.

### What Changes

| Aspect | Before (JS) | After (TS) |
|--------|-------------|------------|
| File | `retro-button.js` | `retro-button.ts` |
| Properties | `static properties = {...}` | `@property()` decorators |
| Types | JSDoc comments | TypeScript types |
| Enums | String literals | Union types enforced |

### Target API

```typescript
@customElement('retro-button')
export class RetroButton extends LitElement {
  /** Visual style */
  @property({ reflect: true })
  variant: 'default' | 'primary' | 'danger' | 'ghost' | 'icon' | 'menu' = 'default';

  /** Button sizing */
  @property({ reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  /** Selection feedback style - inherits from CSS if not set */
  @property({ attribute: 'selection-style' })
  selectionStyle?: 'invert' | 'border';

  /** Selected state (for toggle/toolbar use) */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /** Disabled state */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Full width */
  @property({ type: Boolean, reflect: true })
  block = false;
}
```

### Build Setup Needed

1. `npm install -D typescript` in retro-tui
2. Create `tsconfig.json` with Lit decorator support
3. Update `vite.config.js` to handle `.ts` files
4. Configure to emit `.d.ts` declaration files

### CSS Changes

- Remove `transform: translateY(1px)` from `:active`
- Add `variant="icon"` styles (square, fixed sizes)
- Add `variant="menu"` styles (transparent, full-width)
- Add `selection-style` aware hover/active states
- Add `selected` state styling

## Deliverables

1. **`retro-tui-docs/stories/Foundations/SelectionStyles.mdx`** — Visual vocabulary doc for Storybook
2. **`retro-tui/src/components/retro-button.ts`** — TypeScript prototype with new variants
3. **Updated stories** — Showcase metadata and enriched argTypes
4. **TypeScript setup** — tsconfig, vite updates

## References

- Terminaire box-drawing patterns: `1-Terminal-Stuff/terminaire/src/Deck.ts`
- Design tokens: `docs/plans/2026-01-25-design-tokens.md`
- Reference images: Debian installer dialogs, terminal context menus
