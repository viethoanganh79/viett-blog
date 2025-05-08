// This script reads markdown files and generates JSON files with the product content
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to our content directory
const contentDirectory = path.join(__dirname, '../src/content/products');
const outputDirectory = path.join(__dirname, '../static/content');

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

// Get all markdown files from the content directory
const files = fs.readdirSync(contentDirectory);

// Process each file
const products = files
  .filter(file => file.endsWith('.md'))
  .map(file => {
    // Read the file content
    const filePath = path.join(contentDirectory, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Parse the frontmatter
    const { data, content } = matter(fileContent);

    // Convert markdown to HTML
    const html = marked.parse(content);

    // Generate a slug if not provided
    const fileName = file.replace('.md', '');
    const generatedSlug = data.name ? data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : fileName;

    // Return the product data
    return {
      id: data.id || fileName,
      slug: data.slug || generatedSlug,
      name: data.name || 'Untitled Product',
      description: data.description || '',
      price: parseFloat(data.price) || 0,
      image: data.image || '/images/products/default.jpg',
      images: data.images || [data.image || '/images/products/default.jpg'],
      category: data.category || 'uncategorized',
      featured: data.featured || false,
      inStock: data.inStock !== undefined ? data.inStock : true,
      visible: data.visible !== undefined ? data.visible : true,
      content,
      html
    };
  });

// Write all products to a JSON file
fs.writeFileSync(
  path.join(outputDirectory, 'products.json'),
  JSON.stringify(products, null, 2)
);

// Write each product to its own JSON file
products.forEach(product => {
  fs.writeFileSync(
    path.join(outputDirectory, `product-${product.id}.json`),
    JSON.stringify(product, null, 2)
  );
});

// Get all unique categories
const categories = [...new Set(products.map(product => product.category))];

// Write categories to a JSON file
fs.writeFileSync(
  path.join(outputDirectory, 'categories.json'),
  JSON.stringify(categories, null, 2)
);

// Write products by category to JSON files
categories.forEach(category => {
  const productsInCategory = products.filter(product => product.category === category);
  fs.writeFileSync(
    path.join(outputDirectory, `category-${category}.json`),
    JSON.stringify(productsInCategory, null, 2)
  );
});

console.log(`Generated ${products.length} product files and ${categories.length} category files in ${outputDirectory}`);
