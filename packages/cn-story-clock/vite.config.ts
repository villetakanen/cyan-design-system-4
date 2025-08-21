import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'CnStoryClock',
      fileName: (format) => `cn-story-clock.${format}.js`,
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        globals: {
          lit: 'lit',
        },
      },
    },
  },
});
