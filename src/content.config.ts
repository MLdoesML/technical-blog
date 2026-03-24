import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.date(),
    updated: z.date().optional(),
    domain: z.enum([
      'ml-ai',
      'economics',
      'physics',
      'biology',
      'chemistry',
      'business-strategy',
    ]),
    tags: z.array(z.string()),
    summary: z.string().max(280),
    draft: z.boolean().default(false),
    math: z.boolean().default(false),
    toc: z.boolean().default(true),
    featured: z.boolean().default(false),
  }),
});

export const collections = { posts };
