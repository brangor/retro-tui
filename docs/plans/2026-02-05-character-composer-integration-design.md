# Character Composer Integration Design

**Date:** 2026-02-05
**Status:** Approved

## Overview

Integrate the `@dealwatcher/character-composer` system into retro-tui, enabling ASCII art mascots (like Ruth the Dog) to live in panels with full animation, interaction, and event-driven behaviors.

## Goals

- Ruth (and other mascots) can be placed in `<tui-panel>` to inherit drag, minimize-to-sidebar, and collapse behaviors
- Generic `<tui-character>` component works with any character config
- Event-driven architecture for hooking audio, push events, and interactions
- No over-engineering: experiences are "just JavaScript"

## Component Architecture

| Component | Purpose |
|-----------|---------|
| `<tui-character>` | Renders ASCII character from config, manages animation state, emits events |
| `<tui-marquee>` | Scrolling status text bar (replaces speech bubbles) |

**Usage pattern:**
```html
<tui-panel title="Ruth" collapsible dismissable floating>
  <tui-character .character=${RUTH} id="ruth"></tui-character>
  <tui-marquee .text=${ruthStatus}></tui-marquee>
</tui-panel>
```

## Character Configuration

Pre-built characters as JS modules (no runtime JSON fetching):

```javascript
// retro-tui/characters/ruth.ts
export const RUTH: CharacterConfig = {
  name: 'Ruth the Dog',
  face: {
    template: [
      "▛▘╱────╲▘▜",
      " ╱ {{EYES_TOP}} ╲",
      " ╲ {{EYES_BOT}} ╱",
      "  {{MOUTH_TOP}}",
      "  {{MOUTH_BOT}}"
    ],
    components: {
      eyes: {
        slots: ['EYES_TOP', 'EYES_BOT'],
        variants: {
          default: { values: ['^ ^', 'o o'], tags: ['neutral'] },
          heart: { values: ['◠ ◠', '♥ ♥'], tags: ['love', 'excited'] },
          // ... more variants
        }
      },
      mouth: {
        slots: ['MOUTH_TOP', 'MOUTH_BOT'],
        variants: {
          closed: { values: ['  ╱╱ ', ' ╱   '], tags: ['neutral'] },
          open: { values: ['  ╱ ╱', ' ╱\\╱  '], tags: ['talking'] },
          // ... more variants
        }
      }
    }
  },
  body: {
    template: [
      "   {{TAIL_ROW1}}",
      "   {{TAIL_ROW2}}",
      "___{{TAIL_ROW3}}",
      // ... rest of body
    ],
    components: {
      tail: {
        slots: ['TAIL_ROW1', 'TAIL_ROW2', 'TAIL_ROW3'],
        variants: {
          neutral: { values: [' ~**~~', ' |**╱╱~', ',╱**╱╱~'] },
          wag1: { values: ['  ~**~', ' ╱**╱~', ',╱**╱╱~'] },
          // ... more variants
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
    searching: {
      face: { eyes: ['looking_left', 'looking_right', 'ponderous'], mouth: 'closed' },
      body: { tail: ['neutral', 'wag1'] },
      animation: { type: 'sequence', fps: 2 }
    },
    found_deal: {
      face: { eyes: 'heart', mouth: ['smile', 'panting'] },
      body: { tail: ['wag1', 'wag2', 'wag3'] },
      animation: { type: 'sequence', fps: 3 },
      autoRevertAfter: 8
    },
    // ... more states
  },
  defaultState: 'idle'
};
```

**Custom characters:**
```javascript
import { defineCharacter } from 'retro-tui/characters';

const CLIPPY = defineCharacter({
  name: 'Clippy',
  face: { /* ... */ },
  states: { /* ... */ }
});
```

## Component API

### `<tui-character>`

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `character` | `CharacterConfig` | The character definition (RUTH, etc.) |
| `state` | `string` | Current state name ('idle', 'searching', etc.) |
| `frame` | `number` | Current animation frame (for manual control) |
| `manual` | `boolean` | If true, disables auto-animation |
| `paused` | `boolean` | Pause/resume animation |

**Methods:**
| Method | Description |
|--------|-------------|
| `setState(name, opts?)` | Transition to state, returns Promise |
| `render()` | Force re-render current frame |

**Events:**
| Event | Detail | Description |
|-------|--------|-------------|
| `state-change` | `{ from, to, timestamp }` | Fired on state transitions |
| `frame-change` | `{ frame, face, body }` | Fired each animation frame |
| `click` | Standard | For interaction handling |
| `mouseenter` | Standard | For hover states |

### `<tui-marquee>`

**Properties:**
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `string` | `''` | Text to scroll |
| `speed` | `number` | `50` | Pixels per second |
| `paused` | `boolean` | `false` | Pause scrolling |

## Experience Patterns

### Pattern 1: Reactive (push events)
```javascript
import { RetroPush } from 'retro-tui';

const push = new RetroPush('ws://localhost:3001');

push.on('deal', (deal) => {
  ruth.setState('found_deal');
  marquee.text = `Found: ${deal.title} - $${deal.price}`;
});

push.on('scan-start', () => ruth.setState('searching'));
push.on('error', () => ruth.setState('suspicious'));
```

### Pattern 2: Scripted sequence
```javascript
async function introSequence(ruth, marquee) {
  await ruth.setState('idle');
  marquee.text = "Waking up...";
  await delay(1500);

  await ruth.setState('excited');
  marquee.text = "Ready to find deals!";
  await delay(2000);

  await ruth.setState('searching');
  marquee.text = "Scanning stores...";
}
```

### Pattern 3: Interactive
```javascript
ruth.addEventListener('click', async () => {
  await ruth.setState('clicked');
  marquee.text = randomFrom(["WOOF!", "Pet me more!", "Got treats?"]);
});

ruth.addEventListener('mouseenter', () => {
  if (ruth.state === 'idle') ruth.setState('hover_anticipation');
});
```

### Pattern 4: Audio-synced (manual mode)
```javascript
ruth.manual = true;
ruth.state = 'talking';

audioScheduler.onFrame((frame) => {
  ruth.frame = frame;  // Audio drives animation
});
```

## File Structure

```
src/
├── components/
│   ├── tui-character.ts    # Main character renderer (~200 lines)
│   └── tui-marquee.ts      # Scrolling status text (~80 lines)
├── characters/
│   ├── index.ts            # Exports RUTH, defineCharacter()
│   ├── ruth.ts             # Ruth's config (~150 lines)
│   └── types.ts            # TypeScript interfaces (~50 lines)
└── index.ts                # Add exports
```

## What We're NOT Building

- Experience engine or DSL
- Speech bubbles
- Audio system (just events to hook into)
- Complex schema loader / runtime JSON fetching

## Dependencies

None new - just Lit (already in retro-tui)
