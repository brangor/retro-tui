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
        isosketch: resolve(__dirname, 'examples/isosketch.html'),
        quiltsketch: resolve(__dirname, 'examples/quiltsketch-demo.html'),
        panels: resolve(__dirname, 'examples/panels-demo.html'),
        paint: resolve(__dirname, 'examples/paint/index.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
});
