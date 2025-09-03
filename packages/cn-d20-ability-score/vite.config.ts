import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts', // Entry point for your library
      formats: ['es'], // Output format (ES modules)
      fileName: 'index', // Output file name
    },
    rollupOptions: {
      external: /^lit/, // Treat 'lit' as an external dependency
    },
  },
});
