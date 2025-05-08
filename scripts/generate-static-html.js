// This script generates static HTML files with the content embedded
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
const outputDirectory = path.join(__dirname, '../static/prerendered');

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

// Common header and footer HTML
const headerHTML = `
<header class="bg-slate-800 text-white p-4"><div class="container mx-auto flex justify-between items-center"><a href="/" class="text-2xl font-bold">Viett Blog</a> <nav><ul class="flex space-x-4"><li><a href="/" class="hover:text-slate-300">Home</a></li> <li><a href="/blog" class="hover:text-slate-300">Blog</a></li> <li><a href="/about" class="hover:text-slate-300">About</a></li></ul></nav></div></header>
`;

const footerHTML = `
<footer class="bg-slate-800 text-white p-4 mt-8">
  <div class="container mx-auto text-center">
    <p>&copy; ${new Date().getFullYear()} Viett. All rights reserved.</p>
  </div>
</footer>
`;

// Inline CSS for static pages
const inlineCSS = `
/* Basic styling for the static content */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #1e293b;
  background-color: #f8fafc;
  margin: 0;
  padding: 0;
}
*, ::after, ::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0 solid;
}
a {
  color: inherit;
  text-decoration: inherit;
}
ul {
  list-style: none;
}
.min-h-screen {
  min-height: 100vh;
}
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.flex-grow {
  flex-grow: 1;
}
.flex-wrap {
  flex-wrap: wrap;
}
.items-center {
  align-items: center;
}
.justify-between {
  justify-content: space-between;
}
.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.grid {
  display: grid;
}
.gap-2 {
  gap: 0.5rem;
}
.gap-8 {
  gap: 2rem;
}
.space-x-4 > * + * {
  margin-left: 1rem;
}
.p-4 {
  padding: 1rem;
}
.p-6 {
  padding: 1.5rem;
}
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-0\\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.mt-8 {
  margin-top: 2rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.mb-8 {
  margin-bottom: 2rem;
}
.mr-4 {
  margin-right: 1rem;
}
.text-center {
  text-align: center;
}
.text-xs {
  font-size: 0.75rem;
}
.text-sm {
  font-size: 0.875rem;
}
.text-xl {
  font-size: 1.25rem;
}
.text-2xl {
  font-size: 1.5rem;
}
.text-4xl {
  font-size: 2.25rem;
}
.font-bold {
  font-weight: 700;
}
.font-semibold {
  font-weight: 600;
}
.bg-white {
  background-color: #ffffff;
}
.bg-slate-200 {
  background-color: #e2e8f0;
}
.bg-slate-800 {
  background-color: #1e293b;
}
.text-white {
  color: #ffffff;
}
.text-slate-800 {
  color: #1e293b;
}
.text-gray-500 {
  color: #6b7280;
}
.text-gray-600 {
  color: #4b5563;
}
.rounded {
  border-radius: 0.25rem;
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.overflow-hidden {
  overflow: hidden;
}
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.hover\\:bg-slate-300:hover {
  background-color: #cbd5e1;
}
.hover\\:bg-slate-700:hover {
  background-color: #334155;
}
.hover\\:text-slate-300:hover {
  color: #cbd5e1;
}
.hover\\:text-slate-600:hover {
  color: #475569;
}
.hover\\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.w-full {
  width: 100%;
}
.h-48 {
  height: 12rem;
}
.h-auto {
  height: auto;
}
.object-cover {
  object-fit: cover;
}
.prose {
  max-width: 65ch;
  margin-left: auto;
  margin-right: auto;
}
.prose h1 {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}
.prose h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.prose p {
  margin-bottom: 1.5rem;
}
.prose img {
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 1.5rem;
}
.blog-content {
  font-size: 1.125rem;
}
.blog-content pre {
  background-color: #1e293b;
  color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
}
@media (min-width: 768px) {
  .md\\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .lg\\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .lg\\:prose-xl {
    font-size: 1.25rem;
    line-height: 1.8;
  }
  .lg\\:prose-xl h1 {
    font-size: 2.8125rem;
    margin-bottom: 2rem;
  }
  .lg\\:prose-xl h2 {
    font-size: 1.875rem;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }
}
`;

// Generate HTML for each post
sortedPosts.forEach(post => {
  const postHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} | Viett Blog</title>
  <meta name="description" content="${post.excerpt}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://viett-blog.web.app/blog/${post.slug}">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.excerpt}">
  <meta property="og:image" content="https://viett-blog.web.app${post.image}">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@viett">
  <meta name="twitter:title" content="${post.title}">
  <meta name="twitter:description" content="${post.excerpt}">
  <meta name="twitter:image" content="https://viett-blog.web.app${post.image}">
  
  <!-- JSON-LD structured data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${post.title}",
    "description": "${post.excerpt}",
    "image": "https://viett-blog.web.app${post.image}",
    "datePublished": "${post.date}",
    "author": {
      "@type": "Person",
      "name": "${post.author}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Viett Blog",
      "logo": {
        "@type": "ImageObject",
        "url": "https://viett-blog.web.app/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://viett-blog.web.app/blog/${post.slug}"
    }
  }
  </script>
  
  <!-- Inline CSS -->
  <style>
    ${inlineCSS}
  </style>
</head>
<body>
  <div class="min-h-screen flex flex-col">
    ${headerHTML}
    
    <main class="container mx-auto flex-grow p-4">
      <article class="prose prose-slate lg:prose-xl mx-auto">
        <header class="mb-8">
          <h1 class="text-4xl font-bold mb-2">${post.title}</h1>
          <div class="flex flex-wrap items-center text-gray-500 text-sm mb-4">
            <time datetime="${post.date}" class="mr-4">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <span class="mr-4">By ${post.author}</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-6">
            ${post.tags.map(tag => `
              <a href="/blog/tag/${tag}" class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1 rounded-full text-sm">
                #${tag}
              </a>
            `).join('')}
          </div>
          ${post.image ? `<img src="${post.image}" alt="${post.title}" class="w-full h-auto rounded-lg shadow-md mb-6" />` : ''}
        </header>
        
        <div class="blog-content">
          ${post.html}
        </div>
      </article>
    </main>
    
    ${footerHTML}
  </div>
</body>
</html>`;

  // Write the HTML file
  fs.writeFileSync(
    path.join(outputDirectory, `${post.slug}.html`),
    postHtml
  );
});

// Generate HTML for the blog index page
const blogIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog | Viett Blog</title>
  <meta name="description" content="Read the latest articles from Viett Blog">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://viett-blog.web.app/blog">
  <meta property="og:title" content="Blog | Viett Blog">
  <meta property="og:description" content="Read the latest articles from Viett Blog">
  <meta property="og:image" content="https://viett-blog.web.app/images/og-image.jpg">
  
  <!-- Inline CSS -->
  <style>
    ${inlineCSS}
  </style>
</head>
<body>
  <div class="min-h-screen flex flex-col">
    ${headerHTML}
    
    <main class="container mx-auto flex-grow p-4">
      <section>
        <h1 class="text-4xl font-bold mb-8">Blog Posts</h1>
        
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">Filter by Tag</h2>
          <div class="flex flex-wrap gap-2">
            ${[...new Set(sortedPosts.flatMap(post => post.tags))].map(tag => `
              <a href="/blog/tag/${tag}" class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1 rounded-full text-sm">
                #${tag}
              </a>
            `).join('')}
          </div>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${sortedPosts.map(post => `
            <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              ${post.image ? `
                <div class="relative h-48 overflow-hidden">
                  <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover" />
                </div>
              ` : ''}
              <div class="p-6">
                <div class="flex flex-wrap gap-2 mb-2">
                  ${post.tags.map(tag => `
                    <a href="/blog/tag/${tag}" class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-2 py-0.5 rounded-full text-xs">
                      #${tag}
                    </a>
                  `).join('')}
                </div>
                <p class="text-gray-500 text-sm mb-2">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h3 class="text-xl font-bold mb-2">
                  <a href="/blog/${post.slug}" class="text-slate-800 hover:text-slate-600">${post.title}</a>
                </h3>
                <p class="text-gray-600 mb-4">${post.excerpt}</p>
                <div class="flex justify-between items-center">
                  <a
                    href="/blog/${post.slug}"
                    class="inline-block bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
                  >
                    Read More
                  </a>
                  <span class="text-gray-500 text-sm">By ${post.author}</span>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    </main>
    
    ${footerHTML}
  </div>
</body>
</html>`;

// Write the blog index HTML file
fs.writeFileSync(
  path.join(outputDirectory, 'index.html'),
  blogIndexHtml
);

// Get all unique tags
const tags = [...new Set(sortedPosts.flatMap(post => post.tags))];

// Create the tag directory if it doesn't exist
const tagDirectory = path.join(outputDirectory, 'tag');
if (!fs.existsSync(tagDirectory)) {
  fs.mkdirSync(tagDirectory, { recursive: true });
}

// Generate HTML for each tag page
tags.forEach(tag => {
  const postsWithTag = sortedPosts.filter(post => post.tags.includes(tag));
  
  const tagHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Posts tagged with #${tag} | Viett Blog</title>
  <meta name="description" content="Browse all posts tagged with #${tag}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://viett-blog.web.app/blog/tag/${tag}">
  <meta property="og:title" content="Posts tagged with #${tag} | Viett Blog">
  <meta property="og:description" content="Browse all posts tagged with #${tag}">
  <meta property="og:image" content="https://viett-blog.web.app/images/og-image.jpg">
  
  <!-- Inline CSS -->
  <style>
    ${inlineCSS}
  </style>
</head>
<body>
  <div class="min-h-screen flex flex-col">
    ${headerHTML}
    
    <main class="container mx-auto flex-grow p-4">
      <section>
        <h1 class="text-4xl font-bold mb-8">Posts tagged with #${tag}</h1>
        
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">Filter by Tag</h2>
          <div class="flex flex-wrap gap-2">
            ${tags.map(t => `
              <a href="/blog/tag/${t}" class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1 rounded-full text-sm ${t === tag ? 'bg-slate-800 text-white hover:bg-slate-700' : ''}">
                #${t}
              </a>
            `).join('')}
          </div>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${postsWithTag.map(post => `
            <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              ${post.image ? `
                <div class="relative h-48 overflow-hidden">
                  <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover" />
                </div>
              ` : ''}
              <div class="p-6">
                <div class="flex flex-wrap gap-2 mb-2">
                  ${post.tags.map(t => `
                    <a href="/blog/tag/${t}" class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-2 py-0.5 rounded-full text-xs ${t === tag ? 'bg-slate-800 text-white hover:bg-slate-700' : ''}">
                      #${t}
                    </a>
                  `).join('')}
                </div>
                <p class="text-gray-500 text-sm mb-2">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h3 class="text-xl font-bold mb-2">
                  <a href="/blog/${post.slug}" class="text-slate-800 hover:text-slate-600">${post.title}</a>
                </h3>
                <p class="text-gray-600 mb-4">${post.excerpt}</p>
                <div class="flex justify-between items-center">
                  <a
                    href="/blog/${post.slug}"
                    class="inline-block bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
                  >
                    Read More
                  </a>
                  <span class="text-gray-500 text-sm">By ${post.author}</span>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    </main>
    
    ${footerHTML}
  </div>
</body>
</html>`;

  // Write the tag HTML file
  fs.writeFileSync(
    path.join(tagDirectory, `${tag}.html`),
    tagHtml
  );
});

console.log(`Generated ${sortedPosts.length} post files, 1 index file, and ${tags.length} tag files in ${outputDirectory}`);
