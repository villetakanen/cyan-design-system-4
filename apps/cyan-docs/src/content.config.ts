// 1. Import utilities from `astro:content`

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const customElements = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/books/custom-elements' }),
  schema: z.object({
    title: z.string(),
    noun: z.string().optional(),
  }),
});

export const collections = { customElements };
