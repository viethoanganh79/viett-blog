import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import compression from 'vite-plugin-compression';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		imagetools(),
		compression(),
	],
	// Ensure Node.js modules are properly handled
	server: {
		fs: {
			// Allow serving files from the project root
			allow: ['.']
		}
	},
	// Optimize dependencies
	optimizeDeps: {
		include: ['marked', 'gray-matter']
	},
	// Ensure proper SSR handling
	ssr: {
		noExternal: ['marked', 'gray-matter']
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['svelte', 'svelte/internal'],
				},
			},
		},
	}
});
