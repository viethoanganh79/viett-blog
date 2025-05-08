// This script processes the captured HTML files to create standalone static HTML files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to our captured HTML directory
const capturedDirectory = path.join(__dirname, '../static/captured');
const outputDirectory = path.join(__dirname, '../static/prerendered');

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

// Create the tag directory if it doesn't exist
const tagDirectory = path.join(outputDirectory, 'tag');
if (!fs.existsSync(tagDirectory)) {
  fs.mkdirSync(tagDirectory, { recursive: true });
}

// Process the captured HTML files
function processHtmlFiles() {
  // Get all HTML files in the captured directory
  const files = fs.readdirSync(capturedDirectory);
  
  for (const file of files) {
    if (file.endsWith('.html')) {
      console.log(`Processing ${file}...`);
      
      // Read the HTML file
      const html = fs.readFileSync(path.join(capturedDirectory, file), 'utf-8');
      
      // Parse the HTML
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      // Extract all styles
      const styles = document.querySelectorAll('style');
      let combinedStyles = '';
      styles.forEach(style => {
        combinedStyles += style.textContent;
      });
      
      // Extract all link tags with rel="stylesheet"
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      let linkTags = '';
      links.forEach(link => {
        linkTags += link.outerHTML;
      });
      
      // Extract the main content
      const main = document.querySelector('main');
      let mainContent = '';
      if (main) {
        mainContent = main.innerHTML;
      }
      
      // Extract the header
      const header = document.querySelector('header');
      let headerContent = '';
      if (header) {
        headerContent = header.outerHTML;
      }
      
      // Extract the footer
      const footer = document.querySelector('footer');
      let footerContent = '';
      if (footer) {
        footerContent = footer.outerHTML;
      }
      
      // Extract the title
      const title = document.querySelector('title');
      let titleContent = 'Viett Blog';
      if (title) {
        titleContent = title.textContent;
      }
      
      // Extract meta tags
      const metas = document.querySelectorAll('meta');
      let metaTags = '';
      metas.forEach(meta => {
        metaTags += meta.outerHTML;
      });
      
      // Create a new HTML document
      const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleContent}</title>
  ${metaTags}
  ${linkTags}
  <style>
    ${combinedStyles}
  </style>
</head>
<body>
  <div class="min-h-screen flex flex-col">
    ${headerContent}
    <main class="container mx-auto flex-grow p-4">
      ${mainContent}
    </main>
    ${footerContent}
  </div>
</body>
</html>`;
      
      // Determine the output file path
      let outputFile = file;
      
      // Handle tag files
      if (file.startsWith('blog-tag-')) {
        const tag = file.replace('blog-tag-', '').replace('.html', '');
        outputFile = path.join('tag', `${tag}.html`);
      }
      // Handle blog post files
      else if (file.startsWith('blog-') && !file.startsWith('blog-tag-')) {
        const slug = file.replace('blog-', '').replace('.html', '');
        outputFile = `${slug}.html`;
      }
      // Handle blog index file
      else if (file === 'blog.html') {
        outputFile = 'index.html';
      }
      
      // Write the new HTML file
      fs.writeFileSync(path.join(outputDirectory, outputFile), newHtml);
      console.log(`Processed ${file} to ${outputFile}`);
    }
  }
}

// Run the process function
processHtmlFiles();
console.log('Processing complete!');
