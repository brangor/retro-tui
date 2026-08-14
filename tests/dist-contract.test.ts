import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Nothing has ever tested a built artifact — which is how a UMD build that
// could not load shipped for months. These assertions read dist/, which is
// committed; if they fail after a source change, run `npm run build`.
const dist = (f: string) => resolve(process.cwd(), 'dist', f);

describe('built artifacts', () => {
  it('leaves lit external in the bundler build', () => {
    const src = readFileSync(dist('retro-tui.js'), 'utf8');
    expect(src).toMatch(/from\s*["']lit["']/);
  });

  it('bundles lit into the CDN build', () => {
    const src = readFileSync(dist('retro-tui.cdn.js'), 'utf8');
    // Any surviving bare import means a script tag gets an unresolved specifier.
    const bareImports = src.match(/^import[^;]*from\s*["'][^."'][^"']*["']/gm) ?? [];
    expect(bareImports).toEqual([]);
  });

  it('no longer ships the broken UMD artifact', () => {
    // It was built with lit external but referenced a window.lit global that
    // Lit has never shipped, so it failed on load for every script-tag user.
    expect(existsSync(dist('retro-tui.umd.cjs'))).toBe(false);
  });

  it('registers components when the CDN bundle alone is loaded', async () => {
    expect(customElements.get('tui-tiled')).toBeUndefined();
    await import(/* @vite-ignore */ dist('retro-tui.cdn.js'));
    expect(customElements.get('tui-tiled')).toBeDefined();
    expect(customElements.get('tui-console')).toBeDefined();
  });
});
