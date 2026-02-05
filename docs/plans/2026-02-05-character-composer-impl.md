# Character Composer Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add `<tui-character>` and `<tui-marquee>` components to retro-tui, enabling ASCII art mascots (like Ruth the Dog) with animation, events, and status text.

**Architecture:** Characters are defined as JS config objects with face/body templates and states. The `<tui-character>` component renders ASCII art, manages animation loops, and emits events. The `<tui-marquee>` component provides scrolling status text. Both work inside `<tui-panel>` for drag/minimize behaviors.

**Tech Stack:** Lit 3.x, TypeScript, Vitest for testing

**Design Doc:** `docs/plans/2026-02-05-character-composer-integration-design.md`

---

## Task 1: Create TypeScript Types for Character Config

**Files:**
- Create: `src/characters/types.ts`

**Step 1: Write the types file**

```typescript
// src/characters/types.ts

/**
 * Component variant with template values and optional tags
 */
export interface ComponentVariant {
  values: string[];
  tags?: string[];
  description?: string;
}

/**
 * A component (eyes, mouth, tail) with slots and variants
 */
export interface Component {
  slots: string[];
  variants: Record<string, ComponentVariant>;
  description?: string;
}

/**
 * Part definition (face or body) with template and components
 */
export interface CharacterPart {
  template: string[];
  components: Record<string, Component>;
}

/**
 * Animation configuration for a state
 */
export interface AnimationConfig {
  type: 'static' | 'sequence';
  fps?: number;
}

/**
 * State definition with component selections and animation
 */
export interface CharacterState {
  face?: Record<string, string | string[]>;
  body?: Record<string, string | string[]>;
  animation?: AnimationConfig;
  autoRevertAfter?: number;
  description?: string;
}

/**
 * Full character configuration
 */
export interface CharacterConfig {
  name: string;
  face: CharacterPart;
  body?: CharacterPart;
  states: Record<string, CharacterState>;
  defaultState: string;
}

/**
 * Frame change event detail
 */
export interface FrameChangeDetail {
  frame: number;
  face: string;
  body: string | null;
}

/**
 * State change event detail
 */
export interface StateChangeDetail {
  from: string | null;
  to: string;
  timestamp: number;
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit src/characters/types.ts`
Expected: No errors

**Step 3: Commit**

```bash
git add src/characters/types.ts
git commit -m "feat(characters): add TypeScript types for character config"
```

---

## Task 2: Create Ruth Character Config

**Files:**
- Create: `src/characters/ruth.ts`

**Step 1: Write Ruth's configuration**

```typescript
// src/characters/ruth.ts
import type { CharacterConfig } from './types.js';

export const RUTH: CharacterConfig = {
  name: 'Ruth the Dog',
  face: {
    template: [
      '▛▘╱────╲▘▜',
      ' ╱ {{EYES_TOP}} ╲',
      ' ╲ {{EYES_BOT}} ╱',
      '  {{MOUTH_TOP}}',
      '  {{MOUTH_BOT}}'
    ],
    components: {
      eyes: {
        slots: ['EYES_TOP', 'EYES_BOT'],
        variants: {
          default: { values: ['^ ^', 'o o'], tags: ['neutral', 'resting'] },
          sleepy: { values: ['_ _', 'ᯢ ᯐ'], tags: ['tired', 'drowsy'] },
          excited: { values: ['^ ^', '★ ★'], tags: ['happy', 'energetic'] },
          heart: { values: ['◠ ◠', '♥ ♥'], tags: ['love', 'excited'] },
          surprised: { values: ['◠ ◠', '☉ ☉'], tags: ['shocked', 'alert'] },
          suspicious: { values: ['◡ ◡', '⇀ ↼'], tags: ['skeptical', 'shifty'] },
          winking: { values: ['◜ ◟', 'o ◅'], tags: ['playful', 'happy'] },
          looking_left: { values: ['   ', '◑ ◑'], tags: ['directional'] },
          looking_right: { values: ['   ', '◐ ◐'], tags: ['directional'] },
          ponderous: { values: ['◡ ◡', '◕ ◕'], tags: ['thinking'] },
          thinking: { values: ['◡ ◡', '◔ ◔'], tags: ['analytical'] },
          angry: { values: ['↘ ↙', '♉♉'], tags: ['mad', 'furious'] }
        }
      },
      mouth: {
        slots: ['MOUTH_TOP', 'MOUTH_BOT'],
        variants: {
          closed: { values: ['  ╱╱ ', ' ╱   '], tags: ['neutral', 'quiet'] },
          open: { values: ['  ╱ ╱', ' ╱\\╱  '], tags: ['talking', 'barking'] },
          partial: { values: ['  ╱ ╱', ' ╱╱  '], tags: ['speaking'] },
          smile: { values: ['  ╱', ' ╱   '], tags: ['happy'] },
          panting: { values: ['  ╱ ╱ ', ' ╱ ∪╱ '], tags: ['excited', 'tired'] }
        }
      }
    }
  },
  body: {
    template: [
      '   {{TAIL_ROW1}}',
      '   {{TAIL_ROW2}}',
      '___{{TAIL_ROW3}}',
      '     ╲',
      ' ╲  __╲ |',
      '  || |  ╲  ╱',
      '  <<| | <<╲ ╲',
      '   <<.╱   <<╱'
    ],
    components: {
      tail: {
        slots: ['TAIL_ROW1', 'TAIL_ROW2', 'TAIL_ROW3'],
        variants: {
          neutral: { values: [' ~**~~', ' |**╱╱~', ',╱**╱╱~'], tags: ['resting'] },
          wag1: { values: ['  ~**~', ' ╱**╱~', ',╱**╱╱~'], tags: ['happy'] },
          wag2: { values: ['   ~**~', '  ╱**╱~', ' ,╱**╱'], tags: ['happy'] },
          wag3: { values: ['    ~~*', '   ╱**~', '  ,╱**'], tags: ['happy'] },
          tucked: { values: [' .__.', ' |**|', ',╱**╲'], tags: ['scared', 'sad'] },
          alert: { values: ['  !**!', '  |**|', ' ,╱**|'], tags: ['alert'] }
        }
      }
    }
  },
  states: {
    idle: {
      face: { eyes: 'default', mouth: 'closed' },
      body: { tail: 'neutral' },
      animation: { type: 'static' }
    },
    sleeping: {
      face: { eyes: 'sleepy', mouth: 'closed' },
      body: { tail: 'neutral' },
      animation: { type: 'static' },
      autoRevertAfter: 30
    },
    searching: {
      face: { eyes: ['looking_left', 'looking_right', 'ponderous', 'thinking'], mouth: 'closed' },
      body: { tail: ['neutral', 'wag1'] },
      animation: { type: 'sequence', fps: 2 }
    },
    ponderous: {
      face: { eyes: ['ponderous', 'thinking', 'ponderous'], mouth: 'closed' },
      body: { tail: 'neutral' },
      animation: { type: 'sequence', fps: 1 }
    },
    excited: {
      face: { eyes: 'excited', mouth: ['open', 'partial', 'closed'] },
      body: { tail: ['wag1', 'wag2', 'wag3'] },
      animation: { type: 'sequence', fps: 3 },
      autoRevertAfter: 5
    },
    found_deal: {
      face: { eyes: 'heart', mouth: ['smile', 'smile', 'panting'] },
      body: { tail: ['wag2', 'wag3', 'wag2'] },
      animation: { type: 'sequence', fps: 3 },
      autoRevertAfter: 8
    },
    talking: {
      face: { eyes: 'default', mouth: ['open', 'partial', 'closed', 'open'] },
      body: { tail: 'neutral' },
      animation: { type: 'sequence', fps: 4 },
      autoRevertAfter: 3
    },
    hover_anticipation: {
      face: { eyes: 'excited', mouth: 'smile' },
      body: { tail: ['wag1', 'wag2', 'wag1'] },
      animation: { type: 'sequence', fps: 3 },
      autoRevertAfter: 2
    },
    clicked: {
      face: { eyes: 'winking', mouth: ['smile', 'panting'] },
      body: { tail: ['wag1', 'wag2'] },
      animation: { type: 'sequence', fps: 3 },
      autoRevertAfter: 3
    },
    suspicious: {
      face: { eyes: 'suspicious', mouth: 'closed' },
      body: { tail: 'neutral' },
      animation: { type: 'static' },
      autoRevertAfter: 10
    },
    alert: {
      face: { eyes: 'surprised', mouth: 'open' },
      body: { tail: 'alert' },
      animation: { type: 'static' },
      autoRevertAfter: 5
    },
    happy: {
      face: { eyes: 'winking', mouth: ['smile', 'panting'] },
      body: { tail: ['wag1', 'wag2'] },
      animation: { type: 'sequence', fps: 2 },
      autoRevertAfter: 5
    }
  },
  defaultState: 'idle'
};
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit src/characters/ruth.ts`
Expected: No errors

**Step 3: Commit**

```bash
git add src/characters/ruth.ts
git commit -m "feat(characters): add Ruth the Dog character config"
```

---

## Task 3: Create Characters Index with defineCharacter Helper

**Files:**
- Create: `src/characters/index.ts`

**Step 1: Write the index file**

```typescript
// src/characters/index.ts
export type {
  CharacterConfig,
  CharacterPart,
  CharacterState,
  ComponentVariant,
  FrameChangeDetail,
  StateChangeDetail
} from './types.js';

export { RUTH } from './ruth.js';

import type { CharacterConfig } from './types.js';

/**
 * Helper to define a character with validation.
 * Returns the config unchanged but provides type checking.
 */
export function defineCharacter(config: CharacterConfig): CharacterConfig {
  if (!config.name) {
    throw new Error('Character must have a name');
  }
  if (!config.face) {
    throw new Error('Character must have a face');
  }
  if (!config.states || Object.keys(config.states).length === 0) {
    throw new Error('Character must have at least one state');
  }
  if (!config.defaultState || !config.states[config.defaultState]) {
    throw new Error(`Default state "${config.defaultState}" not found in states`);
  }
  return config;
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit src/characters/index.ts`
Expected: No errors

**Step 3: Commit**

```bash
git add src/characters/index.ts
git commit -m "feat(characters): add index with defineCharacter helper"
```

---

## Task 4: Create tui-character Component - Basic Rendering

**Files:**
- Create: `src/components/tui-character.ts`
- Create: `tests/tui-character.test.js`

**Step 1: Write failing test for basic rendering**

```javascript
// tests/tui-character.test.js
import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-character.ts';
import { RUTH } from '../src/characters/index.ts';

describe('tui-character', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-character></tui-character>`);
    expect(el).to.exist;
  });

  it('has shadow root with pre element', async () => {
    const el = await fixture(html`<tui-character .character=${RUTH}></tui-character>`);
    expect(el.shadowRoot).to.exist;
    const pre = el.shadowRoot.querySelector('pre');
    expect(pre).to.exist;
  });

  it('renders face template when character is set', async () => {
    const el = await fixture(html`<tui-character .character=${RUTH}></tui-character>`);
    const pre = el.shadowRoot.querySelector('pre');
    expect(pre.textContent).to.include('▛▘╱');
  });

  it('starts in default state', async () => {
    const el = await fixture(html`<tui-character .character=${RUTH}></tui-character>`);
    expect(el.state).to.equal('idle');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/tui-character.test.js`
Expected: FAIL - component not defined

**Step 3: Write tui-character component**

```typescript
// src/components/tui-character.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';
import type { CharacterConfig, CharacterState, FrameChangeDetail, StateChangeDetail } from '../characters/types.js';

@customElement('tui-character')
export class Character extends LitElement {
  @property({ type: Object })
  character: CharacterConfig | null = null;

  @property({ type: String, reflect: true })
  state = '';

  @property({ type: Number })
  frame = 0;

  @property({ type: Boolean })
  manual = false;

  @property({ type: Boolean })
  paused = false;

  @state()
  private _animationTimer: number | null = null;

  @state()
  private _autoRevertTimer: number | null = null;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        font-family: var(--font-mono, monospace);
      }

      pre {
        margin: 0;
        font-family: inherit;
        font-size: 0.85rem;
        line-height: 1.2;
        white-space: pre;
      }

      .character-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    if (this.character && !this.state) {
      this.state = this.character.defaultState;
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopAnimation();
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('character') && this.character) {
      if (!this.state) {
        this.state = this.character.defaultState;
      }
      if (!this.manual) {
        this._startAnimation();
      }
    }

    if (changedProperties.has('state') && this.character) {
      const oldState = changedProperties.get('state') as string | undefined;
      this._emitStateChange(oldState ?? null, this.state);
      if (!this.manual) {
        this._startAnimation();
      }
    }

    if (changedProperties.has('manual')) {
      if (this.manual) {
        this._stopAnimation();
      } else if (this.character) {
        this._startAnimation();
      }
    }

    if (changedProperties.has('paused')) {
      if (this.paused) {
        this._stopAnimation();
      } else if (!this.manual && this.character) {
        this._startAnimation();
      }
    }
  }

  private _stopAnimation(): void {
    if (this._animationTimer !== null) {
      window.clearInterval(this._animationTimer);
      this._animationTimer = null;
    }
    if (this._autoRevertTimer !== null) {
      window.clearTimeout(this._autoRevertTimer);
      this._autoRevertTimer = null;
    }
  }

  private _startAnimation(): void {
    this._stopAnimation();

    if (!this.character || this.paused || this.manual) return;

    const stateConfig = this.character.states[this.state];
    if (!stateConfig) return;

    const animation = stateConfig.animation;
    if (animation?.type === 'sequence' && animation.fps) {
      const frameDelay = 1000 / animation.fps;
      this._animationTimer = window.setInterval(() => {
        this.frame++;
        this._emitFrameChange();
      }, frameDelay);
    }

    if (stateConfig.autoRevertAfter) {
      this._autoRevertTimer = window.setTimeout(() => {
        this.setState(this.character!.defaultState);
      }, stateConfig.autoRevertAfter * 1000);
    }
  }

  private _emitStateChange(from: string | null, to: string): void {
    const detail: StateChangeDetail = { from, to, timestamp: Date.now() };
    this.dispatchEvent(new CustomEvent('state-change', {
      detail,
      bubbles: true,
      composed: true,
    }));
  }

  private _emitFrameChange(): void {
    const rendered = this._renderCharacter();
    const detail: FrameChangeDetail = {
      frame: this.frame,
      face: rendered.face,
      body: rendered.body,
    };
    this.dispatchEvent(new CustomEvent('frame-change', {
      detail,
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Transition to a new state.
   */
  async setState(newState: string): Promise<void> {
    if (!this.character || !this.character.states[newState]) {
      throw new Error(`Unknown state: "${newState}"`);
    }
    this.frame = 0;
    this.state = newState;
  }

  private _getVariantValue(
    part: 'face' | 'body',
    componentName: string,
    slotIndex: number
  ): string {
    if (!this.character) return '';

    const partConfig = this.character[part];
    if (!partConfig) return '';

    const stateConfig = this.character.states[this.state];
    if (!stateConfig) return '';

    const selection = stateConfig[part]?.[componentName];
    if (!selection) {
      // Return default variant
      const component = partConfig.components[componentName];
      if (!component) return '';
      const defaultVariant = Object.values(component.variants)[0];
      return defaultVariant?.values[slotIndex] ?? '';
    }

    // Handle array (sequence) or string (static)
    let variantName: string;
    if (Array.isArray(selection)) {
      variantName = selection[this.frame % selection.length];
    } else {
      variantName = selection;
    }

    const component = partConfig.components[componentName];
    if (!component) return '';

    const variant = component.variants[variantName];
    return variant?.values[slotIndex] ?? '';
  }

  private _renderPart(part: 'face' | 'body'): string {
    if (!this.character) return '';

    const partConfig = this.character[part];
    if (!partConfig) return '';

    let result = partConfig.template.join('\n');

    // Replace all component slots
    for (const [componentName, component] of Object.entries(partConfig.components)) {
      for (let i = 0; i < component.slots.length; i++) {
        const slot = component.slots[i];
        const value = this._getVariantValue(part, componentName, i);
        result = result.replace(`{{${slot}}}`, value);
      }
    }

    return result;
  }

  private _renderCharacter(): { face: string; body: string | null } {
    const face = this._renderPart('face');
    const body = this.character?.body ? this._renderPart('body') : null;
    return { face, body };
  }

  render() {
    if (!this.character) {
      return html`<pre>No character</pre>`;
    }

    const { face, body } = this._renderCharacter();

    return html`
      <div class="character-container">
        <pre>${face}</pre>
        ${body ? html`<pre>${body}</pre>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-character': Character;
  }
}
```

**Step 4: Run tests to verify they pass**

Run: `npm test -- --run tests/tui-character.test.js`
Expected: 4 tests PASS

**Step 5: Commit**

```bash
git add src/components/tui-character.ts tests/tui-character.test.js
git commit -m "feat(tui-character): add basic rendering and state management"
```

---

## Task 5: Add tui-character Event Tests

**Files:**
- Modify: `tests/tui-character.test.js`

**Step 1: Add event tests**

```javascript
// Add to tests/tui-character.test.js after existing tests

describe('tui-character events', () => {
  it('emits state-change event when state changes', async () => {
    const el = await fixture(html`<tui-character .character=${RUTH}></tui-character>`);

    let eventDetail = null;
    el.addEventListener('state-change', (e) => {
      eventDetail = e.detail;
    });

    await el.setState('excited');

    expect(eventDetail).to.exist;
    expect(eventDetail.from).to.equal('idle');
    expect(eventDetail.to).to.equal('excited');
  });

  it('emits frame-change events during animation', async () => {
    const el = await fixture(html`<tui-character .character=${RUTH}></tui-character>`);

    const frames = [];
    el.addEventListener('frame-change', (e) => {
      frames.push(e.detail.frame);
    });

    await el.setState('searching'); // Has animation

    // Wait for a few frames
    await new Promise(resolve => setTimeout(resolve, 600));

    expect(frames.length).to.be.greaterThan(0);
  });

  it('stops animation when manual is true', async () => {
    const el = await fixture(html`<tui-character .character=${RUTH} manual></tui-character>`);

    const frames = [];
    el.addEventListener('frame-change', (e) => {
      frames.push(e.detail.frame);
    });

    el.state = 'searching';
    await new Promise(resolve => setTimeout(resolve, 600));

    expect(frames.length).to.equal(0);
  });

  it('allows manual frame control', async () => {
    const el = await fixture(html`<tui-character .character=${RUTH} manual></tui-character>`);
    el.state = 'searching';

    el.frame = 0;
    await el.updateComplete;
    const frame0 = el.shadowRoot.querySelector('pre').textContent;

    el.frame = 1;
    await el.updateComplete;
    const frame1 = el.shadowRoot.querySelector('pre').textContent;

    // Frames should be different (different eye positions)
    expect(frame0).to.not.equal(frame1);
  });
});
```

**Step 2: Run tests**

Run: `npm test -- --run tests/tui-character.test.js`
Expected: All tests PASS

**Step 3: Commit**

```bash
git add tests/tui-character.test.js
git commit -m "test(tui-character): add event and animation tests"
```

---

## Task 6: Create tui-marquee Component

**Files:**
- Create: `src/components/tui-marquee.ts`
- Create: `tests/tui-marquee.test.js`

**Step 1: Write failing test**

```javascript
// tests/tui-marquee.test.js
import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-marquee.ts';

describe('tui-marquee', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-marquee></tui-marquee>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-marquee></tui-marquee>`);
    expect(el.shadowRoot).to.exist;
  });

  it('displays text property', async () => {
    const el = await fixture(html`<tui-marquee text="Hello World"></tui-marquee>`);
    expect(el.shadowRoot.textContent).to.include('Hello World');
  });

  it('accepts speed property', async () => {
    const el = await fixture(html`<tui-marquee text="Test" speed="100"></tui-marquee>`);
    expect(el.speed).to.equal(100);
  });

  it('can be paused', async () => {
    const el = await fixture(html`<tui-marquee text="Test" paused></tui-marquee>`);
    expect(el.paused).to.be.true;
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- --run tests/tui-marquee.test.js`
Expected: FAIL - component not defined

**Step 3: Write tui-marquee component**

```typescript
// src/components/tui-marquee.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

@customElement('tui-marquee')
export class Marquee extends LitElement {
  @property({ type: String })
  text = '';

  @property({ type: Number })
  speed = 50; // pixels per second

  @property({ type: Boolean, reflect: true })
  paused = false;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        overflow: hidden;
        font-family: var(--font-mono, monospace);
        font-size: 0.85rem;
        border-top: 1px solid var(--border-color, rgba(255, 255, 255, 0.2));
        padding: 4px 0;
        background: var(--surface, rgba(0, 0, 0, 0.3));
      }

      .marquee-container {
        display: flex;
        white-space: nowrap;
      }

      .marquee-content {
        display: inline-block;
        padding-left: 100%;
        animation: marquee-scroll var(--duration, 10s) linear infinite;
      }

      :host([paused]) .marquee-content {
        animation-play-state: paused;
      }

      .prefix {
        color: var(--color-info, #8be9fd);
        margin-right: 8px;
      }

      @keyframes marquee-scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100%);
        }
      }
    `,
  ];

  private _calculateDuration(): string {
    // Duration based on text length and speed
    const textLength = this.text.length * 10; // Approximate character width
    const duration = Math.max(5, textLength / this.speed);
    return `${duration}s`;
  }

  render() {
    const duration = this._calculateDuration();

    return html`
      <div class="marquee-container">
        <span class="marquee-content" style="--duration: ${duration}">
          <span class="prefix">▸▸</span>${this.text}
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-marquee': Marquee;
  }
}
```

**Step 4: Run tests to verify they pass**

Run: `npm test -- --run tests/tui-marquee.test.js`
Expected: 5 tests PASS

**Step 5: Commit**

```bash
git add src/components/tui-marquee.ts tests/tui-marquee.test.js
git commit -m "feat(tui-marquee): add scrolling status text component"
```

---

## Task 7: Export New Components from Index

**Files:**
- Modify: `src/index.js`

**Step 1: Add exports**

Add these lines to `src/index.js`:

```javascript
// Characters
export { Character } from './components/tui-character.ts';
export { Marquee } from './components/tui-marquee.ts';
export { RUTH, defineCharacter } from './characters/index.ts';
export type { CharacterConfig, FrameChangeDetail, StateChangeDetail } from './characters/types.ts';
```

**Step 2: Verify build works**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/index.js
git commit -m "feat: export tui-character, tui-marquee, and character config"
```

---

## Task 8: Create Demo Page

**Files:**
- Create: `examples/character/index.html`

**Step 1: Create demo directory and file**

```html
<!-- examples/character/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Character Composer Demo</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: #0a0a1a;
      color: #e0e0e0;
      font-family: 'Courier New', monospace;
      min-height: 100vh;
    }

    .demo-container {
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      color: #8be9fd;
      border-bottom: 1px solid #8be9fd;
      padding-bottom: 10px;
    }

    .controls {
      margin: 20px 0;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    button {
      background: #1a1a2e;
      color: #8be9fd;
      border: 1px solid #8be9fd;
      padding: 8px 16px;
      font-family: inherit;
      cursor: pointer;
    }

    button:hover {
      background: #8be9fd;
      color: #0a0a1a;
    }

    .event-log {
      margin-top: 20px;
      padding: 10px;
      background: #1a1a2e;
      border: 1px solid #444;
      max-height: 200px;
      overflow-y: auto;
      font-size: 0.8rem;
    }

    .event-log div {
      padding: 2px 0;
      border-bottom: 1px solid #333;
    }
  </style>
</head>
<body>
  <div class="demo-container">
    <h1>Ruth the Dog - Character Demo</h1>

    <tui-panel title="Ruth" color="cyan" style="width: 300px;">
      <tui-character id="ruth"></tui-character>
      <tui-marquee id="status" text="Waiting for action..."></tui-marquee>
    </tui-panel>

    <div class="controls">
      <button data-state="idle">Idle</button>
      <button data-state="searching">Searching</button>
      <button data-state="found_deal">Found Deal!</button>
      <button data-state="excited">Excited</button>
      <button data-state="suspicious">Suspicious</button>
      <button data-state="sleeping">Sleeping</button>
      <button data-state="talking">Talking</button>
      <button data-state="clicked">Clicked</button>
    </div>

    <h2>Event Log</h2>
    <div class="event-log" id="log"></div>
  </div>

  <script type="module">
    import '../src/index.js';
    import { RUTH } from '../src/characters/index.ts';

    const ruth = document.getElementById('ruth');
    const status = document.getElementById('status');
    const log = document.getElementById('log');

    // Set character
    ruth.character = RUTH;

    // Log events
    ruth.addEventListener('state-change', (e) => {
      const msg = `State: ${e.detail.from} → ${e.detail.to}`;
      log.innerHTML = `<div>${msg}</div>` + log.innerHTML;

      // Update marquee based on state
      const messages = {
        idle: 'Waiting for deals...',
        searching: 'Scanning stores...',
        found_deal: 'BLOODY BARGAIN FOUND!',
        excited: 'OH BOY OH BOY!',
        suspicious: 'Something seems off...',
        sleeping: 'Zzzzz...',
        talking: 'Woof woof!',
        clicked: 'Thanks for the pets!'
      };
      status.text = messages[e.detail.to] || 'Ruth is here!';
    });

    ruth.addEventListener('frame-change', (e) => {
      // Only log occasionally to avoid spam
      if (e.detail.frame % 5 === 0) {
        log.innerHTML = `<div>Frame: ${e.detail.frame}</div>` + log.innerHTML;
      }
    });

    // Button handlers
    document.querySelectorAll('[data-state]').forEach(btn => {
      btn.addEventListener('click', () => {
        ruth.setState(btn.dataset.state);
      });
    });

    // Click on Ruth
    ruth.addEventListener('click', () => {
      ruth.setState('clicked');
    });
  </script>
</body>
</html>
```

**Step 2: Test the demo**

Run: `npm run dev`
Then open: `http://localhost:3000/examples/character/`
Expected: Ruth renders, buttons change state, marquee updates

**Step 3: Commit**

```bash
git add examples/character/index.html
git commit -m "docs: add character composer demo page"
```

---

## Task 9: Run Full Test Suite and Final Verification

**Step 1: Run all tests**

Run: `npm test -- --run`
Expected: All tests pass (115 existing + 9 new = 124 total)

**Step 2: Run build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Run typecheck**

Run: `npm run typecheck`
Expected: No errors

**Step 4: Final commit if any cleanup needed**

```bash
git status
# If clean, skip this step
```

---

## Summary

After completing all tasks you will have:

1. **`src/characters/types.ts`** - TypeScript interfaces for character configs
2. **`src/characters/ruth.ts`** - Ruth the Dog character definition
3. **`src/characters/index.ts`** - Exports and defineCharacter helper
4. **`src/components/tui-character.ts`** - Character renderer with animation and events
5. **`src/components/tui-marquee.ts`** - Scrolling status text component
6. **`tests/tui-character.test.js`** - 8 tests for character component
7. **`tests/tui-marquee.test.js`** - 5 tests for marquee component
8. **`examples/character/index.html`** - Interactive demo

Total new tests: 13
Total new/modified files: 9
