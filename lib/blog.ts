import { loader } from 'fumadocs-core/source';
import { defineCollections } from 'fumadocs-mdx/macro';
import { z } from 'zod';

export const blogRoute = '/blog';

const posts = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: z.object({
    title: z.string(),
    // Search engines and AI agents show this under the title, so every post needs one.
    description: z.string(),
    date: z.iso.date(),
    author: z.string(),
  }),
});

export const blog = loader({ baseUrl: blogRoute, source: posts.toFumadocsSource() });

export type Post = ReturnType<typeof blog.getPages>[number];

/** Every post, newest first. */
export function allPosts(): Post[] {
  return blog.getPages().sort((a, b) => b.data.date.localeCompare(a.data.date));
}

/** A post's date as readers see it, such as "September 27, 2026". */
export function postDate(post: Post): string {
  return new Date(`${post.data.date}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
