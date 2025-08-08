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

const application = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/books/application' }),
  schema: z.object({
    title: z.string(),
    noun: z.string().optional(),
  }),
});

const styles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/books/styles' }),
  schema: z.object({
    title: z.string(),
    noun: z.string().optional(),
    topic: z.enum(['Core', 'Utils', 'Atomics']).optional(),
  }),
});

const principles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/books/principles' }),
  schema: z.object({
    title: z.string(),
    noun: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { customElements, application, styles, principles };
