// automaton.js — Sprite renderer using tui-grid + sprite utility
import '../src/components/tui-app.ts';
import '../src/components/tui-workspace.ts';
import '../src/components/tui-panel.ts';
import '../src/components/tui-grid.ts';
import { compose, createMoodCycler } from '../src/utils/sprite.js';
import spriteData from './ruth-sprite.json';

const grid = document.getElementById('ruth');
const cycler = createMoodCycler(spriteData.moods, 'idle_calm');

function tick() {
  const selections = cycler.next();
  const frame = compose(spriteData, selections);
  grid.setGrid(frame);
}

tick();
setInterval(tick, 500);

// Expose setMood for console testing
// Try: setMood('excited') or setMood('searching')
window.setMood = (name) => cycler.setMood(name);
