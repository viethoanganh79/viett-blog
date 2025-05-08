// This file loads the pre-generated JSON content for products
import type { Product } from './product-markdown';

// Import the JSON files directly
// These will be bundled with the app during the build process
import productsData from '../../../static/content/products.json';
import categoriesData from '../../../static/content/categories.json';

// Type assertion to help TypeScript understand the imported JSON
const products = productsData as Product[];
const categories = categoriesData as string[];

// Export the data
export { products, categories };
