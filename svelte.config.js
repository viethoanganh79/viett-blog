import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Use static adapter for Firebase hosting
		adapter: adapter({
			// Static adapter options
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			strict: true,
			precompress: false
		}),

		// Enable prerendering for all pages
		prerender: {
			entries: ['*'],
			handleHttpError: ({ path, message }) => {
				// Ignore 404 errors for tag pages
				if (path.startsWith('/blog/tag/')) {
					return;
				}

				// Otherwise, throw an error
				throw new Error(message);
			},
			// Force crawling to ensure all pages are prerendered
			crawl: true
		}
	}
};

export default config;
