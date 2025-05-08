import { getAllProducts as getMarkdownProducts, getProductById as getMarkdownProductById, getProductBySlug as getMarkdownProductBySlug, getFeaturedProducts as getMarkdownFeaturedProducts, getProductsByCategory as getMarkdownProductsByCategory, getAllCategories as getMarkdownAllCategories, searchProducts as searchMarkdownProducts } from './product-markdown';

// Re-export the Product interface and functions from product-markdown.ts
export type { Product } from './product-markdown';

/**
 * Get all products
 */
export function getAllProducts() {
  return getMarkdownProducts();
}

/**
 * Get a single product by ID
 */
export function getProductById(id: string) {
  return getMarkdownProductById(id);
}

/**
 * Get a single product by slug
 */
export function getProductBySlug(slug: string) {
  return getMarkdownProductBySlug(slug);
}

/**
 * Get featured products
 */
export function getFeaturedProducts(count = 4) {
  return getMarkdownFeaturedProducts(count);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string) {
  return getMarkdownProductsByCategory(category);
}

/**
 * Get all unique categories from all products
 */
export function getAllCategories() {
  return getMarkdownAllCategories();
}

/**
 * Search products by name or description
 */
export function searchProducts(query: string) {
  return searchMarkdownProducts(query);
}
