# tui-panel Bug Fixes Design

**Date:** 2026-01-27  
**Status:** Complete

## Overview

Two bugs were introduced in recent tui-panel changes:
1. Dragging doesn't work at all
2. Collapse only hides content, doesn't shrink panel to header bar

## Bug 1: Draggable Not Working

### Root Cause

The property name `draggable` conflicts with the native HTML `draggable` attribute. When `draggable="true"` is set on any HTML element, the browser enables native HTML5 drag-and-drop behavior, which:
- Intercepts pointer events
- Shows a "ghost image" when dragging
- Prevents custom drag handlers from receiving events

### Evidence

```typescript
// tui-panel.ts line 74
@property({ type: Boolean, reflect: true })
draggable = false;
```

When Lit reflects this to an attribute, the browser sees `<tui-panel draggable>` and enables native drag-and-drop.

### Fix

Rename the property from `draggable` to `floating`:
- Clearer semantic meaning (panel floats above content)
- No conflict with native HTML attributes
- Matches the "Floating" category already used in Storybook argTypes

### Files to Update

1. `src/components/tui-panel.ts`
   - Property declaration: `draggable` → `floating`
   - CSS selectors: `:host([draggable])` → `:host([floating])`
   - Conditional checks: `this.draggable` → `this.floating`
   - `firstUpdated` and `updated` checks

2. `src/components/tui-workspace.ts`
   - `hasAttribute('draggable')` → `hasAttribute('floating')`

3. `tests/tui-panel.test.js`
   - All `draggable` attribute usage

4. `tests/tui-workspace.test.js`
   - All `draggable` attribute usage

5. `retro-tui-docs/stories/Panel.stories.js`
   - argTypes and story usage

6. `docs/plans/*.md`
   - Documentation references (optional, low priority)

---

## Bug 2: Collapse Doesn't Shrink Panel

### Root Cause

The `.panel` container has `height: 100%` which prevents it from shrinking when content is hidden:

```css
.panel {
  /* ... */
  height: 100%;  /* ← Forces panel to fill container */
}

.content {
  flex: 1;  /* ← Tries to grow to fill space */
}

.collapsed .content {
  max-height: 0;  /* ← Content shrinks, but parent doesn't */
}
```

### Fix

When collapsed, the panel should shrink to just the header. Two changes needed:

1. **Remove `height: 100%` from `.panel`** - Let it size to content naturally
2. **Use `min-height` instead** - Preserve the fill-container behavior when not collapsed

```css
.panel {
  min-height: 100%;  /* Fill container when expanded */
  height: auto;      /* Size to content */
}

.collapsed {
  min-height: 0;     /* Allow shrinking when collapsed */
  height: auto;
}
```

Alternative approach if the above causes layout issues:
- Keep `height: 100%` but add `:host` level handling
- Use `display: grid` with `grid-template-rows: auto 1fr` and animate row size

### Files to Update

1. `src/components/tui-panel.ts` - CSS changes only

---

## Implementation Order

1. **Fix Bug 1 first** (draggable → floating rename)
   - This is a pure rename with no logic changes
   - Easy to verify: dragging should work immediately after

2. **Fix Bug 2 second** (collapse shrinking)
   - More nuanced CSS changes
   - May need iteration to get animation smooth

---

## Testing

### Manual Testing (Storybook)
- [ ] Draggable story: Panel can be dragged by header
- [ ] Resizable story: Panel can be resized by corner handle
- [ ] FloatingWorkspace story: All panels draggable and dismissable
- [ ] Collapsible story: Panel shrinks to header bar when collapsed
- [ ] Collapse animation is smooth

### Automated Tests
- Existing tests should pass after updating attribute names
- No new tests needed (existing coverage is sufficient)

---

## Alternatives Considered

### Bug 1 Alternatives

| Option | Pros | Cons |
|--------|------|------|
| `floating` | Clear meaning, no conflicts | Breaking change |
| `movable` | Describes behavior | Less semantic |
| Override native draggable | No breaking change | Hacky, fragile |

**Decision:** Use `floating` - clearer and matches existing terminology.

### Bug 2 Alternatives

| Option | Pros | Cons |
|--------|------|------|
| `min-height` approach | Simple CSS change | May affect layout |
| Grid with row animation | Smooth animation | More complex |
| `display: none` (revert) | Works reliably | No animation |

**Decision:** Try `min-height` approach first, fall back to grid if needed.

---

## Additional Issue Discovered

### `docked` Empty String Reflecting to DOM

**Root cause:** The `docked` property defaulted to empty string `''` and was reflected to the DOM as `docked=""`. This matched the CSS selector `:host([docked])` which applied `position: relative !important`, overriding the floating panel's `position: absolute`.

**Fix:** Added a custom converter to prevent empty string from reflecting:

```typescript
@property({ 
  type: String, 
  reflect: true,
  converter: {
    fromAttribute: (value: string | null) => value || '',
    toAttribute: (value: string) => value || null  // Don't reflect empty string
  }
})
docked: 'left' | 'right' | 'top' | 'bottom' | '' = '';
```

---

## Implementation Complete

All fixes applied and verified:
- [x] Renamed `draggable` → `floating` in tui-panel.ts, tui-workspace.ts, tests, and stories
- [x] Fixed collapse CSS with `min-height` approach
- [x] Fixed `docked` empty string reflection issue
- [x] Updated design docs to reflect `floating` terminology
- [x] Created Workspace.stories.js with 5 stories demonstrating the full docking system
- [x] All 105 tests passing
