import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPostsByTag } from '$lib/utils/blog';
import { getAllTags } from '$lib/utils/markdown';

export const prerender = true;

// Generate paths for all tags at build time
export const entries = () => {
  // Use the imported getAllTags function
  const tags = getAllTags();
  return tags.map((tag: string) => ({ tag }));
};

export const load: PageServerLoad = async ({ params }) => {
  const { tag } = params;

  // Get posts with this tag
  const posts = getPostsByTag(tag);

  // If no posts found with this tag, return a 404
  if (posts.length === 0) {
    error(404, `No posts found with tag: ${tag}`);
  }

  return {
    tag,
    posts
  };
};
