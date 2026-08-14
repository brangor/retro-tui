import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// The jsdom environment gives import.meta.url an http: URL, so fileURLToPath
// can't be used here. Vitest runs with cwd set to the project root.
const pkg = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'));

describe('package contract', () => {
  it('ships only lit as a runtime dependency', () => {
    // Everything a consumer installs, they must actually need. `ws` belongs to
    // the push-server example; `@lit/context` left with the ToolState eviction.
    expect(Object.keys(pkg.dependencies)).toEqual(['lit']);
  });

  it('keeps ws available for the example server script', () => {
    // `npm run server` runs examples/push-server/server/index.js, which imports ws.
    expect(pkg.devDependencies).toHaveProperty('ws');
  });
});
