import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPostBySlug } from '$lib/utils/blog';
import { getAllPosts } from '$lib/utils/markdown';

export const prerender = true;

// Generate paths for all blog posts at build time
export const entries = () => {
  // Use the imported getAllPosts function
  const posts = getAllPosts();
  return posts.map((post: any) => ({ slug: post.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  // Get the post by slug
  const post = getPostBySlug(slug);

  // If post not found, return a 404
  if (!post) {
    error(404, `Post not found: ${slug}`);
  }

  return {
    post
  };
};
