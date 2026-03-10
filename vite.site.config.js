import { defineConfig } from 'vite';

// Separate config for building the landing page as a static site.
// The main vite.config.js is library mode (dist/retro-tui.js).
// This config builds index.html as a deployable app.
export default defineConfig({
  base: '/retro-tui/',
  build: {
    outDir: 'site',
  },
  server: {
    port: 3000,
  },
});
