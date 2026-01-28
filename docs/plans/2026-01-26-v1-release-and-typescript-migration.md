# v1.0.0 Release & TypeScript Migration Plan

**Date:** 2026-01-26
**Status:** Design Complete

## Overview

Stabilize retro-tui as a v1.0.0 JavaScript release, add baseline testing, then incrementally migrate all 14 components to TypeScript.

## Goals

- **v1.0.0 tagged** — Stable JavaScript release for quiltsketch deployment
- **GitHub package** — Consumable via `github:username/retro-tui#v1.0.0`
- **Smoke tests** — Baseline tests to catch breakages during migration
- **Incremental TypeScript** — Convert one component at a time, JS and TS coexist

## Phase 1: v1.0.0 Release (Complete)

### What's Done

- All 14 components working in JavaScript
- Selection style system implemented (`invert` / `border`)
- Toolbar hotkey display added
- Published to GitHub
- Tagged as `v1.0.0`

### Package Reference

QuiltSketch uses:
```json
{
  "dependencies": {
    "retro-tui": "github:username/retro-tui#v1.0.0"
  }
}
```

## Phase 2: Smoke Tests

### Setup

```bash
npm install -D vitest @open-wc/testing @vitest/browser
```

### Test Structure

One test file per component in `tests/`:

```
tests/
├── tui-button.test.js
├── tui-panel.test.js
├── tui-toolbar.test.js
└── ... (14 total)
```

### Test Template

```javascript
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-button.js';

describe('tui-button', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-button>Click</tui-button>`);
    expect(el).to.exist;
    expect(el.shadowRoot.querySelector('button')).to.exist;
  });

  it('reflects variant attribute', async () => {
    const el = await fixture(html`<tui-button variant="primary">Click</tui-button>`);
    expect(el.getAttribute('variant')).to.equal('primary');
  });

  it('handles disabled state', async () => {
    const el = await fixture(html`<tui-button disabled>Click</tui-button>`);
    expect(el.shadowRoot.querySelector('button').disabled).to.be.true;
  });
});
```

### What Tests Catch

- Import errors after file renames
- Missing dependencies
- Broken component registration
- Render crashes
- Attribute reflection issues

### npm Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

## Phase 3: TypeScript Migration

### Conversion Order

Priority based on usage and dependencies:

1. `tui-button.js` → `tui-button.ts` (foundation, used by toolbar/menu)
2. `tui-panel.js` → `tui-panel.ts` (core layout)
3. `tui-toolbar.js` → `tui-toolbar.ts` (depends on button)
4. `tui-menu.js` → `tui-menu.ts` (depends on button)
5. `tui-app.js` → `tui-app.ts` (shell component)
6. `tui-statusbar.js` → `tui-statusbar.ts`
7. `tui-modal.js` → `tui-modal.ts`
8. `tui-toast.js` → `tui-toast.ts`
9. `tui-console.js` → `tui-console.ts`
10. `tui-output.js` → `tui-output.ts`
11. `tui-table.js` → `tui-table.ts`
12. `tui-text.js` → `tui-text.ts`
13. `tui-card.js` → `tui-card.ts`
14. `tui-palette.js` → `tui-palette.ts`

### Per-Component Process

1. **Rename** `.js` → `.ts`
2. **Add type definitions** at top of file
3. **Convert properties** to `@property()` decorators
4. **Add method types** (parameters and returns)
5. **Type events** with `CustomEvent<T>`
6. **Run tests** to verify no regressions
7. **Update imports** in dependent components

### TypeScript Pattern

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type ButtonVariant = 'default' | 'primary' | 'danger' | 'ghost' | 'icon' | 'menu';
type ButtonSize = 'sm' | 'md' | 'lg';
type SelectionStyle = 'invert' | 'border';

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

@customElement('tui-button')
export class Button extends LitElement {
  /** Visual style */
  @property({ reflect: true })
  variant: ButtonVariant = 'default';

  /** Button sizing */
  @property({ reflect: true })
  size: ButtonSize = 'md';

  /** Selection feedback style - inherits from CSS if not set */
  @property({ attribute: 'selection-style' })
  selectionStyle?: SelectionStyle;

  /** Selected state (for toggle/toolbar use) */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /** Disabled state */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Full width */
  @property({ type: Boolean, reflect: true })
  block = false;

  // CSS stays exactly the same
  static styles = [sharedStyles, css`/* ... unchanged ... */`];

  render() {
    return html`
      <button ?disabled=${this.disabled} part="button">
        <slot></slot>
      </button>
    `;
  }
}

// Type augmentation for custom element
declare global {
  interface HTMLElementTagNameMap {
    'tui-button': Button;
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2021", "DOM", "DOM.Iterable"],
    "strict": true,
    "declaration": true,
    "declarationDir": "./types",
    "emitDeclarationOnly": false,
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "skipLibCheck": true,
    "allowJs": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Build Output

After migration:
- `dist/retro-tui.js` — Bundled ES module
- `types/*.d.ts` — Declaration files for consumers

## Phase 4: v2.0.0 Release

When all components are converted:

1. Run full test suite
2. Verify Storybook still works
3. Update quiltsketch to test with TypeScript version
4. Tag `v2.0.0`
5. Update quiltsketch package.json to `#v2.0.0`

## Components Summary

| Component | Lines | Complexity | Dependencies |
|-----------|-------|------------|--------------|
| tui-button | 303 | Medium | None |
| tui-panel | ~200 | Medium | None |
| tui-toolbar | 240 | Medium | tui-button |
| tui-menu | 287 | High | tui-button |
| tui-app | ~150 | Low | tui-panel |
| tui-statusbar | ~100 | Low | None |
| tui-modal | ~150 | Medium | None |
| tui-toast | ~200 | Medium | None |
| tui-console | 244 | Medium | None |
| tui-output | ~100 | Low | None |
| tui-table | ~150 | Medium | None |
| tui-text | ~80 | Low | None |
| tui-card | ~150 | Low | None |
| tui-palette | ~100 | Low | None |

## Success Criteria

- [ ] All 14 components have smoke tests passing
- [ ] All 14 components converted to TypeScript
- [ ] `npm run typecheck` passes
- [ ] `npm run test` passes
- [ ] Storybook renders all components
- [ ] QuiltSketch works with v2.0.0
- [ ] Declaration files generated

## References

- Selection styles design: `docs/plans/2026-01-26-selection-styles-and-button-unification.md`
- Design tokens: `docs/plans/2026-01-25-design-tokens.md`
- Lit TypeScript guide: https://lit.dev/docs/components/decorators/
