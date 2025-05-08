// Import necessary modules
// We're using pre-generated JSON files instead of filesystem operations
import { products as importedProducts, categories as importedCategories } from './product-content-loader';

// Define the Product type
export interface Product {
  id: string;
  slug: string; // URL-friendly identifier
  name: string;
  description: string;
  price: number;
  image: string; // Main image (for backward compatibility)
  images?: string[]; // Array of additional images
  category: string;
  featured: boolean;
  inStock: boolean;
  visible: boolean; // Whether to show the product on the shop page
  content?: string;
  html?: string;
}

// Cache for products to avoid fetching multiple times
let productsCache: Product[] | null = null;

/**
 * Get all products with their metadata and content
 */
export function getAllProducts(): Product[] {
  // If we have cached products, return them
  if (productsCache) {
    return productsCache;
  }

  try {
    // In a browser environment, we need to use the pre-generated JSON files
    // This is a static import that will be bundled with the app
    // The JSON file is generated during the build process
    const products = getHardcodedProducts();

    // Sort products by name
    productsCache = products.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
    return productsCache;
  } catch (error) {
    console.error('Error getting products:', error);
    return getFallbackProducts();
  }
}

/**
 * Get products from the pre-generated JSON files
 */
function getHardcodedProducts(): Product[] {
  // Use the imported products from the pre-generated JSON file
  return importedProducts;
}

/**
 * Fallback to hardcoded products if JSON import fails
 */
function getFallbackProducts(): Product[] {
  return [
    {
      id: 'p1',
      slug: 'mechanical-keyboard',
      name: 'Mechanical Keyboard',
      description: 'A high-quality mechanical keyboard with RGB lighting and Cherry MX switches.',
      price: 129.99,
      image: '/images/posts/hello-world.png',
      category: 'electronics',
      featured: true,
      inStock: true,
      visible: true
    },
    {
      id: 'p2',
      slug: 'wireless-mouse',
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with long battery life and precision tracking.',
      price: 49.99,
      image: '/images/posts/sveltekit-learn.png',
      category: 'electronics',
      featured: true,
      inStock: true,
      visible: true
    }
  ];
}

/**
 * Get a single product by ID
 */
export function getProductById(id: string): Product | undefined {
  return getAllProducts().find(product => product.id === id);
}

/**
 * Get a single product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find(product => product.slug === slug);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  return getAllProducts().filter(product => product.category === category);
}

/**
 * Get all unique categories from all products
 */
export function getAllCategories(): string[] {
  // Use the imported categories from the pre-generated JSON file
  return importedCategories;
}

/**
 * Get featured products
 */
export function getFeaturedProducts(count = 3): Product[] {
  return getAllProducts()
    .filter(product => product.featured)
    .slice(0, count);
}

/**
 * Search products by name or description
 */
export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllProducts().filter(
    product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery)
  );
}
