// This script captures the rendered HTML and CSS from the dev server
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to our output directory
const outputDirectory = path.join(__dirname, '../static/captured');

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

// URLs to capture
const urls = [
  'http://localhost:5173/blog',
  'http://localhost:5173/blog/thanh-cong-khong-han-la-kiem-nhieu-tien-giu-tien-trong-tui-cung-la-thanh-cong-roi',
  'http://localhost:5173/blog/hello-world',
  'http://localhost:5173/blog/getting-started-with-sveltekit',
  'http://localhost:5173/blog/tag/sveltekit',
  'http://localhost:5173/blog/tag/javascript',
  'http://localhost:5173/blog/tag/web-development',
  'http://localhost:5173/blog/tag/tutorial',
  'http://localhost:5173/blog/tag/blog',
  'http://localhost:5173/blog/tag/motivation',
  'http://localhost:5173/blog/tag/success',
  'http://localhost:5173/blog/tag/money',
  'http://localhost:5173/blog/tag/life',
  'http://localhost:5173/blog/tag/vietnamese',
];

// Capture the HTML from each URL
async function captureUrls() {
  for (const url of urls) {
    try {
      console.log(`Capturing ${url}...`);
      const response = await fetch(url);
      const html = await response.text();
      
      // Extract the path from the URL
      const urlObj = new URL(url);
      let filePath = urlObj.pathname;
      
      // Remove leading slash
      if (filePath.startsWith('/')) {
        filePath = filePath.substring(1);
      }
      
      // Replace slashes with hyphens
      filePath = filePath.replace(/\//g, '-');
      
      // If the path is empty, use 'index'
      if (!filePath) {
        filePath = 'index';
      }
      
      // Add .html extension
      filePath = `${filePath}.html`;
      
      // Write the HTML to a file
      fs.writeFileSync(path.join(outputDirectory, filePath), html);
      console.log(`Captured ${url} to ${filePath}`);
    } catch (error) {
      console.error(`Error capturing ${url}:`, error);
    }
  }
}

// Run the capture function
captureUrls().then(() => {
  console.log('Capture complete!');
}).catch((error) => {
  console.error('Error capturing URLs:', error);
});
