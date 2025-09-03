import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
    exclude: ['src/**/*.browser.test.ts'],
  },
  // @vitest/browser config for browser tests
  plugins: [],
});
