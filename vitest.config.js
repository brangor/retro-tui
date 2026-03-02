import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{js,ts}', 'tests/**/*.test.{js,ts}'],
    // Extended timeout for web component rendering
    testTimeout: 10000,
    // Pass even when no test files exist
    passWithNoTests: true,
  },
});
