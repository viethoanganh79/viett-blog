// This script copies the static HTML files to the build directory
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to our static HTML directory
const staticDirectory = path.join(__dirname, '../static/prerendered');
const buildDirectory = path.join(__dirname, '../build');

// Create the build directory if it doesn't exist
if (!fs.existsSync(buildDirectory)) {
  fs.mkdirSync(buildDirectory, { recursive: true });
}

// Create the blog directory in the build directory
const blogDirectory = path.join(buildDirectory, 'blog');
if (!fs.existsSync(blogDirectory)) {
  fs.mkdirSync(blogDirectory, { recursive: true });
}

// Copy the blog index HTML file
fs.copyFileSync(
  path.join(staticDirectory, 'index.html'),
  path.join(blogDirectory, 'index.html')
);

// Copy all post HTML files
const files = fs.readdirSync(staticDirectory);
files.forEach(file => {
  if (file.endsWith('.html') && file !== 'index.html') {
    const slug = file.replace('.html', '');

    // Create the post directory
    const postDirectory = path.join(blogDirectory, slug);
    if (!fs.existsSync(postDirectory)) {
      fs.mkdirSync(postDirectory, { recursive: true });
    }

    // Copy the HTML file
    fs.copyFileSync(
      path.join(staticDirectory, file),
      path.join(postDirectory, 'index.html')
    );
  }
});

// Create the tag directory in the blog directory
const tagDirectory = path.join(blogDirectory, 'tag');
if (!fs.existsSync(tagDirectory)) {
  fs.mkdirSync(tagDirectory, { recursive: true });
}

// Copy all tag HTML files
const tagFiles = fs.readdirSync(path.join(staticDirectory, 'tag'));
tagFiles.forEach(file => {
  if (file.endsWith('.html')) {
    const tag = file.replace('.html', '');

    // Create the tag directory
    const tagSubDirectory = path.join(tagDirectory, tag);
    if (!fs.existsSync(tagSubDirectory)) {
      fs.mkdirSync(tagSubDirectory, { recursive: true });
    }

    // Copy the HTML file
    fs.copyFileSync(
      path.join(staticDirectory, 'tag', file),
      path.join(tagSubDirectory, 'index.html')
    );
  }
});

// Also copy the static HTML files directly to the build directory
// This ensures they are accessible via direct URLs
console.log('Copying static HTML files directly to build directory...');

// Copy blog post files to the root of the build directory
files.forEach(file => {
  if (file.endsWith('.html') && file !== 'index.html') {
    const slug = file.replace('.html', '');
    const directoryPath = path.join(buildDirectory, 'blog', slug);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Copy the HTML file
    fs.copyFileSync(
      path.join(staticDirectory, file),
      path.join(directoryPath, 'index.html')
    );

    console.log(`Copied ${file} to ${path.join('blog', slug, 'index.html')}`);
  }
});

// Copy tag files to the tag directory
tagFiles.forEach(file => {
  if (file.endsWith('.html')) {
    const tag = file.replace('.html', '');
    const directoryPath = path.join(buildDirectory, 'blog', 'tag', tag);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Copy the HTML file
    fs.copyFileSync(
      path.join(staticDirectory, 'tag', file),
      path.join(directoryPath, 'index.html')
    );

    console.log(`Copied tag/${file} to ${path.join('blog', 'tag', tag, 'index.html')}`);
  }
});

// Create a CSS directory in the build directory to store a fallback CSS file
const cssDirectory = path.join(buildDirectory, 'css');
if (!fs.existsSync(cssDirectory)) {
  fs.mkdirSync(cssDirectory, { recursive: true });
}

// Create a fallback CSS file with basic styles
const fallbackCss = `
/* Fallback CSS for blog content */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #1e293b;
  background-color: #f8fafc;
  margin: 0;
  padding: 0;
}
.prose {
  max-width: 65ch;
  margin: 0 auto;
  padding: 2rem 1rem;
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
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 1.5rem;
}
.prose pre {
  background-color: #1e293b;
  color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
}
.blog-content {
  font-size: 1.125rem;
}
`;

fs.writeFileSync(path.join(cssDirectory, 'fallback.css'), fallbackCss);

// Create a .nojekyll file to prevent GitHub Pages from ignoring files that start with an underscore
fs.writeFileSync(path.join(buildDirectory, '.nojekyll'), '');

console.log(`Copied static HTML files to ${buildDirectory}`);

