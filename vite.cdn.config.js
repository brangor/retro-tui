import { defineConfig } from 'vite';

// Self-contained build for <script type="module"> users.
//
// Unlike vite.config.js, Lit is deliberately NOT external — script-tag users
// have no bundler and no way to supply it. Bundler consumers must keep using
// dist/retro-tui.js, which leaves Lit external so the page has exactly one Lit
// module instance (sharedStyles is a Lit CSSResult meant to be composed into
// consumers' own components, which breaks across two instances).
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      formats: ['es'],
      fileName: () => 'retro-tui.cdn.js',
    },
    emptyOutDir: false, // vite.config.js writes here first — don't wipe it
  },
});
