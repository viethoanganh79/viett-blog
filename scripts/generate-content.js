// This script reads markdown files and generates JSON files with the content
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to our content directory
const contentDirectory = path.join(__dirname, '../src/content/blog');
const outputDirectory = path.join(__dirname, '../static/content');

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

// Get all markdown files from the content directory
const files = fs.readdirSync(contentDirectory);

// Process each file
const posts = files
  .filter(file => file.endsWith('.md'))
  .map(file => {
    // Read the file content
    const filePath = path.join(contentDirectory, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Parse the frontmatter
    const { data, content } = matter(fileContent);

    // Convert markdown to HTML
    const html = marked.parse(content);

    // Return the post data
    return {
      slug: data.slug || file.replace('.md', ''),
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      author: data.author || 'Anonymous',
      image: data.image || '/images/posts/default.jpg',
      content,
      html
    };
  });

// Sort posts by date (newest first)
const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Write all posts to a JSON file
fs.writeFileSync(
  path.join(outputDirectory, 'posts.json'),
  JSON.stringify(sortedPosts, null, 2)
);

// Write each post to its own JSON file
sortedPosts.forEach(post => {
  fs.writeFileSync(
    path.join(outputDirectory, `${post.slug}.json`),
    JSON.stringify(post, null, 2)
  );
});

// Get all unique tags
const tags = [...new Set(sortedPosts.flatMap(post => post.tags))];

// Write tags to a JSON file
fs.writeFileSync(
  path.join(outputDirectory, 'tags.json'),
  JSON.stringify(tags, null, 2)
);

// Write posts by tag to JSON files
tags.forEach(tag => {
  const postsWithTag = sortedPosts.filter(post => post.tags.includes(tag));
  fs.writeFileSync(
    path.join(outputDirectory, `tag-${tag}.json`),
    JSON.stringify(postsWithTag, null, 2)
  );
});

console.log(`Generated ${sortedPosts.length} post files and ${tags.length} tag files in ${outputDirectory}`);
