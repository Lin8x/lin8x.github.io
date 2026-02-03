import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()), // Technologies
    tracks: z.array(z.string()), // ['cloud', 'dataengineer', 'gamedev', 'software-engineer']
    image: z.string().optional(),
    links: z.object({
      github: z.string().optional(),
      demo: z.string().optional(),
      docs: z.string().optional(),
    }).optional(),
    featured: z.boolean().default(false), // If true, appears at top of track
  }),
});

export const collections = {
  projects: projectsCollection,
};
