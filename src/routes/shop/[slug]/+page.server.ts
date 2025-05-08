import { getProductBySlug, getProductsByCategory, getAllProducts } from '$lib/utils/product';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

// Generate entries for all product slugs
export const entries = () => {
  const products = getAllProducts();
  return products.map(product => ({ slug: product.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
  const product = getProductBySlug(params.slug);

  if (!product) {
    throw error(404, {
      message: 'Product not found'
    });
  }

  // Get related products from the same category, excluding the current product and invisible products
  let relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.slug !== product.slug && p.visible)
    .slice(0, 4);

  // If we don't have enough related products from the same category, add some random visible products
  if (relatedProducts.length < 4) {
    const otherProducts = getAllProducts()
      .filter(p => p.slug !== product.slug && p.category !== product.category && p.visible)
      .slice(0, 4 - relatedProducts.length);

    relatedProducts = [...relatedProducts, ...otherProducts];
  }

  return {
    product,
    relatedProducts
  };
};
