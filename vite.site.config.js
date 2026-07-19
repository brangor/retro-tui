import { defineConfig } from 'vite';
import { resolve } from 'path';

// Separate config for building the landing page + examples as a static site.
// The main vite.config.js is library mode (dist/retro-tui.js).
// This config builds all HTML pages as a deployable multi-page app.
export default defineConfig({
  base: '/retro-tui/',
  build: {
    outDir: 'site',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        panels: resolve(__dirname, 'examples/panels-demo.html'),
        inputs: resolve(__dirname, 'examples/inputs-demo.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
});
