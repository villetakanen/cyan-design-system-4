// @ts-check

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: [
        {
          find: 'cyan-lit',
          replacement: path.resolve(
            path.dirname(fileURLToPath(import.meta.url)),
            '../../packages/cyan-lit',
          ),
        },
        {
          find: 'cyan-css',
          replacement: path.resolve(
            path.dirname(fileURLToPath(import.meta.url)),
            '../../packages/cyan-css',
          ),
        },
        {
          find: 'cn-editor',
          replacement: path.resolve(
            path.dirname(fileURLToPath(import.meta.url)),
            '../../packages/cn-editor',
          ),
        },
        {
          find: 'cn-story-clock',
          replacement: path.resolve(
            path.dirname(fileURLToPath(import.meta.url)),
            '../../packages/cn-story-clock',
          ),
        },
        {
          find: 'cn-dice',
          replacement: path.resolve(
            path.dirname(fileURLToPath(import.meta.url)),
            '../../packages/cn-dice',
          ),
        },
        {
          find: 'cn-d20-ability-score',
          replacement: path.resolve(
            path.dirname(fileURLToPath(import.meta.url)),
            '../../packages/cn-d20-ability-score',
          ),
        },
        {
          find: '@',
          replacement: path.resolve(
            path.dirname(fileURLToPath(import.meta.url)),
            './src',
          ),
        },
      ],
    },
  },

  integrations: [mdx()],
});
