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
      entry: 'src/index.js',
      name: 'RetroTUI',
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
