// Enable server-side rendering and prerendering
// This ensures content is included in the HTML
export const prerender = true;
export const ssr = true;
export const trailingSlash = 'never';

// This ensures all pages are crawled during prerendering
// But we still want client-side hydration for interactivity
export const csr = true;
