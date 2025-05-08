import { getAllProducts, getAllCategories } from '$lib/utils/product';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
  return {
    products: getAllProducts(),
    categories: getAllCategories()
  };
};
