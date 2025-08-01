// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: [
        { 
          find: 'cyan-lit', 
          replacement: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../packages/cyan-lit') 
        },
        { 
          find: 'cyan-css', 
          replacement: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../packages/cyan-css') 
        },
      ]
    }
  }
});
