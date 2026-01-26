import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'RetroTUI',
      fileName: 'retro-tui',
    },
    rollupOptions: {
      external: ['lit'],
    },
  },
  server: {
    port: 3000,
  },
});
