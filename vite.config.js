import { defineConfig } from 'vite';
import { copyFileSync } from 'fs';

const copyTokens = {
  name: 'copy-tokens-css',
  closeBundle() {
    copyFileSync('src/styles/tokens.css', 'dist/tokens.css');
    copyFileSync('src/styles/tokens.css.d.ts', 'dist/tokens.css.d.ts');
  },
};

export default defineConfig({
  plugins: [copyTokens],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'RetroTUI',
      // ESM only. Vite defaults to ['es','umd']; the UMD output referenced a
      // window.lit global that Lit has never shipped, so it failed on load for
      // every script-tag user. That audience is served by vite.cdn.config.js.
      formats: ['es'],
      fileName: 'retro-tui',
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        globals: { lit: 'lit' },
      },
    },
  },
  server: {
    port: 3000,
  },
});
