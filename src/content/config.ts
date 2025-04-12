import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.enum(['dev', 'ai', 'daily']),
    author: z.string(),
    image: z.string().optional(),
    lang: z.enum(['en', 'tr']),
  }),
});

export const collections = {
  'blog': blogCollection,
};
