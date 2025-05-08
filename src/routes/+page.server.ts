import { getFeaturedPosts } from '$lib/utils/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    featuredPosts: getFeaturedPosts(6)
  };
};
