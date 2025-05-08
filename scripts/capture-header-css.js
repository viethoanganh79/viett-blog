// This script captures the exact CSS used for the header in the SvelteKit app
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
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

// URL to capture
const url = 'http://localhost:5174/';

// Capture the HTML from the URL
async function captureHeaderCSS() {
  try {
    console.log(`Capturing ${url}...`);
    const response = await fetch(url);
    const html = await response.text();
    
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
    let linkHrefs = [];
    links.forEach(link => {
      linkHrefs.push(link.href);
    });
    
    // Extract the header
    const header = document.querySelector('header');
    let headerHTML = '';
    if (header) {
      headerHTML = header.outerHTML;
    }
    
    // Write the header HTML to a file
    fs.writeFileSync(path.join(outputDirectory, 'header.html'), headerHTML);
    console.log(`Captured header HTML to header.html`);
    
    // Write the combined styles to a file
    fs.writeFileSync(path.join(outputDirectory, 'styles.css'), combinedStyles);
    console.log(`Captured styles to styles.css`);
    
    // Write the link hrefs to a file
    fs.writeFileSync(path.join(outputDirectory, 'links.txt'), linkHrefs.join('\n'));
    console.log(`Captured link hrefs to links.txt`);
    
    // Fetch and save each stylesheet
    for (let i = 0; i < linkHrefs.length; i++) {
      const href = linkHrefs[i];
      if (href.startsWith('http')) {
        const stylesheetResponse = await fetch(href);
        const stylesheetContent = await stylesheetResponse.text();
        fs.writeFileSync(path.join(outputDirectory, `stylesheet-${i}.css`), stylesheetContent);
        console.log(`Captured stylesheet ${href} to stylesheet-${i}.css`);
      }
    }
    
    console.log('Capture complete!');
  } catch (error) {
    console.error(`Error capturing ${url}:`, error);
  }
}

// Run the capture function
captureHeaderCSS();
