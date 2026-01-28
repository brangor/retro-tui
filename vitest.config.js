import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.js', 'tests/**/*.test.js'],
    // Extended timeout for web component rendering
    testTimeout: 10000,
    // Pass even when no test files exist
    passWithNoTests: true,
  },
});
