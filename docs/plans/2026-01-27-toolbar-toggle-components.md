# Toolbar Toggle Components Implementation Plan

**Goal:** Add `<tui-toggle>` and `<tui-checkbox>` components to retro-tui, enhance `<tui-toolbar>` with `slot="after"`, and integrate into quiltsketch for a narrow vertical tools panel.

**Architecture:** Create two new form-style components that follow retro-tui patterns (TypeScript, Lit decorators, shared styles). Enhance toolbar to expose orientation via CSS custom property and support an "after" slot. Update quiltsketch to use these components instead of custom HTML/CSS.

**Tech Stack:** Lit 3.x, TypeScript, CSS custom properties

---

## Task 1: Create `<tui-toggle>` Component

**Files:**
- Create: `src/components/tui-toggle.ts`
- Modify: `src/index.js` (add export)

**Step 1: Create the component file**

Create `src/components/tui-toggle.ts`:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-toggle> - Icon-based toggle button
 *
 * A compact toggle that displays different icons for on/off states.
 * Styled to match toolbar buttons.
 *
 * @fires change - Fired when toggle state changes, detail: { checked: boolean }
 *
 * @attr {string} icon-on - Icon to show when checked (default: ▣)
 * @attr {string} icon-off - Icon to show when unchecked (default: □)
 * @attr {boolean} checked - Current toggle state
 * @attr {boolean} disabled - Whether toggle is disabled
 * @attr {string} size - Button size: 'sm' | 'md' | 'lg'
 */
@customElement('tui-toggle')
export class Toggle extends LitElement {
  @property({ type: String, attribute: 'icon-on' })
  iconOn = '▣';

  @property({ type: String, attribute: 'icon-off' })
  iconOff = '□';

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md';

  static styles = [
    sharedStyles,
    css`
      :host {
        display: inline-block;
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--surface-base);
        border: var(--border-width) solid var(--border-default);
        color: var(--text-primary);
        font-family: inherit;
        cursor: pointer;
        transition: background 0.1s, border-color 0.1s, color 0.1s;
      }

      /* Sizes */
      :host([size='sm']) button {
        width: 24px;
        height: 24px;
        font-size: 0.875rem;
      }

      :host([size='md']) button,
      button {
        width: 32px;
        height: 32px;
        font-size: 1rem;
      }

      :host([size='lg']) button {
        width: 40px;
        height: 40px;
        font-size: 1.25rem;
      }

      /* Hover */
      button:hover:not(:disabled) {
        border-color: var(--text-primary);
      }

      /* Checked state */
      :host([checked]) button {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: var(--surface-base);
      }

      /* Disabled */
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Focus */
      button:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }
    `,
  ];

  private _handleClick() {
    if (this.disabled) return;
    
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const icon = this.checked ? this.iconOn : this.iconOff;
    
    return html`
      <button
        type="button"
        ?disabled=${this.disabled}
        aria-pressed=${this.checked}
        @click=${this._handleClick}
      >${icon}</button>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-toggle': Toggle;
  }
}
```

**Step 2: Add export to index.js**

Add to `src/index.js`:

```javascript
export { Toggle } from './components/tui-toggle.ts';
```

**Step 3: Verify component loads**

Run: `npm run dev`
Expected: No console errors, dev server starts

**Step 4: Commit**

```bash
git add src/components/tui-toggle.ts src/index.js
git commit -m "feat: add tui-toggle icon toggle component"
```

---

## Task 2: Create `<tui-checkbox>` Component

**Files:**
- Replace: `src/components/tui-checkbox.js` → `src/components/tui-checkbox.ts`
- Modify: `src/index.js` (update export)

**Step 1: Replace with TypeScript implementation**

Replace `src/components/tui-checkbox.js` with `src/components/tui-checkbox.ts`:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-checkbox> - Labeled checkbox with icon
 *
 * A checkbox with customizable icons and a label slot.
 * Default icons: □ (unchecked) / ▣ (checked)
 *
 * @fires change - Fired when checkbox state changes, detail: { checked: boolean }
 *
 * @slot - Label text
 *
 * @attr {string} icon-on - Icon when checked (default: ▣)
 * @attr {string} icon-off - Icon when unchecked (default: □)
 * @attr {boolean} checked - Current checkbox state
 * @attr {boolean} disabled - Whether checkbox is disabled
 */
@customElement('tui-checkbox')
export class Checkbox extends LitElement {
  @property({ type: String, attribute: 'icon-on' })
  iconOn = '▣';

  @property({ type: String, attribute: 'icon-off' })
  iconOff = '□';

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-sm);
        cursor: pointer;
        user-select: none;
      }

      :host([disabled]) {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .icon {
        font-size: 1rem;
        line-height: 1;
        color: var(--text-primary);
        transition: color 0.1s;
      }

      :host([checked]) .icon {
        color: var(--color-primary);
      }

      .label {
        font-size: 0.875rem;
        color: var(--text-primary);
      }

      /* Hover */
      :host(:hover:not([disabled])) .icon {
        color: var(--color-primary);
      }

      /* Focus */
      :host(:focus-visible) {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this.setAttribute('role', 'checkbox');
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', String(this.checked));
    }
  }

  private _handleClick = () => {
    if (this.disabled) return;
    this._toggle();
  };

  private _handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._toggle();
    }
  };

  private _toggle() {
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const icon = this.checked ? this.iconOn : this.iconOff;

    return html`
      <span class="icon">${icon}</span>
      <span class="label"><slot></slot></span>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-checkbox': Checkbox;
  }
}
```

**Step 2: Delete old JS file and update export**

Delete `src/components/tui-checkbox.js`.

Update `src/index.js`:

```javascript
export { Checkbox } from './components/tui-checkbox.ts';
```

**Step 3: Verify component loads**

Run: `npm run dev`
Expected: No console errors

**Step 4: Commit**

```bash
git add src/components/tui-checkbox.ts src/index.js
git rm src/components/tui-checkbox.js
git commit -m "feat: add tui-checkbox labeled checkbox component"
```

---

## Task 3: Enhance `<tui-toolbar>` with `slot="after"`

**Files:**
- Modify: `src/components/tui-toolbar.ts`

**Step 1: Add CSS custom property and after slot**

In `src/components/tui-toolbar.ts`, update styles to add:

```css
:host {
  --toolbar-direction: row;
}

:host([orientation='vertical']) {
  --toolbar-direction: column;
}

.after-slot {
  display: flex;
  flex-direction: var(--toolbar-direction);
  gap: var(--spacing-xs);
}

.after-slot:not(:empty)::before {
  content: '';
  display: block;
  background: var(--border-default);
}

:host([orientation='vertical']) .after-slot:not(:empty)::before {
  height: 1px;
  width: 100%;
  margin: var(--spacing-xs) 0;
}

:host(:not([orientation='vertical'])) .after-slot:not(:empty)::before {
  width: 1px;
  height: 100%;
  margin: 0 var(--spacing-xs);
}
```

Update render() to add after template (at end of container):

```html
<div class="after-slot">
  <slot name="after"></slot>
</div>
```

**Step 2: Verify toolbar still works**

Run: `npm run dev`
Expected: Toolbar renders, no errors

**Step 3: Commit**

```bash
git add src/components/tui-toolbar.ts
git commit -m "feat(toolbar): add slot=after with orientation inheritance"
```

---

## Task 4: Add Tests for New Components

**Files:**
- Create: `tests/tui-toggle.test.js`
- Create: `tests/tui-checkbox.test.js`

**Step 1: Create toggle tests**

Create `tests/tui-toggle.test.js`:

```javascript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../src/components/tui-toggle.ts';

describe('tui-toggle', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('tui-toggle');
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  it('renders with default icons', async () => {
    await el.updateComplete;
    const button = el.shadowRoot.querySelector('button');
    expect(button.textContent).toBe('□');
  });

  it('shows icon-on when checked', async () => {
    el.checked = true;
    await el.updateComplete;
    const button = el.shadowRoot.querySelector('button');
    expect(button.textContent).toBe('▣');
  });

  it('toggles on click', async () => {
    await el.updateComplete;
    const button = el.shadowRoot.querySelector('button');
    
    let changeEvent = null;
    el.addEventListener('change', (e) => { changeEvent = e; });
    
    button.click();
    await el.updateComplete;
    
    expect(el.checked).toBe(true);
    expect(changeEvent.detail.checked).toBe(true);
  });

  it('uses custom icons', async () => {
    el.iconOn = '🝮';
    el.iconOff = '◇';
    await el.updateComplete;
    
    expect(el.shadowRoot.querySelector('button').textContent).toBe('◇');
    
    el.checked = true;
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('button').textContent).toBe('🝮');
  });

  it('does not toggle when disabled', async () => {
    el.disabled = true;
    await el.updateComplete;
    
    el.shadowRoot.querySelector('button').click();
    await el.updateComplete;
    
    expect(el.checked).toBe(false);
  });
});
```

**Step 2: Create checkbox tests**

Create `tests/tui-checkbox.test.js`:

```javascript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../src/components/tui-checkbox.ts';

describe('tui-checkbox', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('tui-checkbox');
    el.textContent = 'Test Label';
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  it('renders with default unchecked icon', async () => {
    await el.updateComplete;
    const icon = el.shadowRoot.querySelector('.icon');
    expect(icon.textContent).toBe('□');
  });

  it('shows checked icon when checked', async () => {
    el.checked = true;
    await el.updateComplete;
    const icon = el.shadowRoot.querySelector('.icon');
    expect(icon.textContent).toBe('▣');
  });

  it('toggles on click', async () => {
    await el.updateComplete;
    
    let changeEvent = null;
    el.addEventListener('change', (e) => { changeEvent = e; });
    
    el.click();
    await el.updateComplete;
    
    expect(el.checked).toBe(true);
    expect(changeEvent.detail.checked).toBe(true);
  });

  it('has correct ARIA attributes', async () => {
    await el.updateComplete;
    expect(el.getAttribute('role')).toBe('checkbox');
    expect(el.getAttribute('aria-checked')).toBe('false');
    
    el.checked = true;
    await el.updateComplete;
    expect(el.getAttribute('aria-checked')).toBe('true');
  });
});
```

**Step 3: Run tests**

Run: `npm run test:run`
Expected: All tests pass

**Step 4: Commit**

```bash
git add tests/tui-toggle.test.js tests/tui-checkbox.test.js
git commit -m "test: add tests for tui-toggle and tui-checkbox"
```

---

## Task 5: Update QuiltSketch - Vertical Shape Buttons

**Files:**
- Modify: `quiltsketch/index.html` (CSS and HTML)
- Modify: `quiltsketch/src/main.js` (renderShapeConfig)

**Step 1: Update CSS for vertical shape buttons**

In `quiltsketch/index.html`, replace `.shape-config` and `.shape-btn` styles:

```css
/* Shape config - uses toolbar orientation */
.shape-config {
  display: none;
}

.shape-config.visible {
  display: flex;
  flex-direction: var(--toolbar-direction, column);
  gap: 4px;
}

.shape-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-base, #0a0a0a);
  border: 1px solid var(--border-default, #333);
  color: var(--text-primary, #e0e0e0);
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.1s, background 0.1s;
}

.shape-btn:hover {
  border-color: var(--text-primary, #e0e0e0);
}

.shape-btn.selected {
  background: var(--color-primary, #00d9ff);
  border-color: var(--color-primary, #00d9ff);
  color: #000;
}
```

**Step 2: Move shape config into toolbar's after slot**

Update HTML structure in `index.html`:

```html
<tui-panel 
  id="panel-tools" 
  slot="floating" 
  title="Tools"
  floating
  position-x="8"
  position-y="8"
  snap-edge="left"
  collapsible
>
  <tui-toolbar
    id="toolbar"
    orientation="vertical"
    selected="brush">
    <!-- Shape buttons in after slot -->
    <div slot="after" id="shapeConfig" class="shape-config">
      <!-- Rendered by JS -->
    </div>
    <!-- Fill toggle in after slot -->
    <div slot="after" id="fillConfig" class="shape-config">
      <tui-toggle 
        id="fillCornersToggle"
        icon-on="🝮" 
        icon-off="◇"
        title="Fill corners"
      ></tui-toggle>
    </div>
  </tui-toolbar>
</tui-panel>
```

**Step 3: Update renderShapeConfig in main.js**

Remove the label, render buttons directly:

```javascript
function renderShapeConfig() {
  const container = document.getElementById('shapeConfig');
  if (!container) return;

  // Show/hide based on current tool
  const supportsShapes = state.currentTool === 'brush' || state.currentTool === 'erase';
  container.classList.toggle('visible', supportsShapes);

  if (!supportsShapes) {
    container.innerHTML = '';
    return;
  }

  // Render shape buttons (no label, vertical stack)
  container.innerHTML = BRUSH_SHAPES.map(shape => {
    const selected = shape.id === state.currentShape ? 'selected' : '';
    return `
      <button 
        class="shape-btn ${selected}" 
        data-shape="${shape.id}"
        title="${shape.name}"
      >${shape.icon}</button>
    `;
  }).join('');

  // Add click handlers
  container.querySelectorAll('.shape-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      emit('shape:select', { id: btn.dataset.shape });
      renderShapeConfig();
    });
  });
}
```

**Step 4: Update fill config to use tui-toggle**

Update renderFillConfig and initFillConfig in main.js:

```javascript
function renderFillConfig() {
  const container = document.getElementById('fillConfig');
  const toggle = document.getElementById('fillCornersToggle');
  if (!container || !toggle) return;

  // Show/hide based on current tool
  const isFillTool = state.currentTool === 'bucket';
  container.classList.toggle('visible', isFillTool);

  if (!isFillTool) return;

  // Sync toggle state
  toggle.checked = state.fillCorners;
}

function initFillConfig() {
  const toggle = document.getElementById('fillCornersToggle');
  if (!toggle) return;

  toggle.addEventListener('change', () => {
    emit('fill:toggleCorners');
    renderFillConfig();
  });
}
```

**Step 5: Remove old HTML elements**

Remove from index.html:
- `<div class="shape-label">Shape:</div>`
- `<div class="shape-buttons" id="shapeButtons">`
- The old checkbox label/input for fill corners

**Step 6: Test locally**

Run: `npm run dev` in quiltsketch
Expected: Toolbar shows vertical shape buttons below tools, fill toggle appears for Fill tool

**Step 7: Commit**

```bash
git add index.html src/main.js
git commit -m "feat: use vertical shape buttons and tui-toggle for fill corners"
```

---

## Task 6: Push Changes and Deploy

**Step 1: Push retro-tui**

```bash
cd retro-tui
git push
```

**Step 2: Update quiltsketch dependency**

```bash
cd quiltsketch
rm -rf node_modules/retro-tui
npm cache clean --force
npm install
```

**Step 3: Test locally**

Run: `npm run dev`
Expected: Everything works with new components

**Step 4: Commit and deploy**

```bash
git add -A
git commit -m "chore: update retro-tui with toggle components"
git push
vercel --prod --force --yes
```

---

**Plan complete and saved to `docs/plans/2026-01-27-toolbar-toggle-components.md`.**

**Ready to execute? Use the executing-plans skill to implement task by task.**
