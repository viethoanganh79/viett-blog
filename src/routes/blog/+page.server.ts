import { getPosts, getAllTags } from '$lib/utils/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    posts: getPosts(),
    tags: getAllTags()
  };
};
