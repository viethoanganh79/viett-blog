<script lang="ts">
	import type { PageData } from './$types';
	import SEO from '$lib/components/SEO.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';

	export let data: PageData;
	const { posts, tags } = data;
</script>

<SEO
	title="Blog | My Personal Blog"
	description="Read all blog posts from My Personal Blog"
	canonical="/blog"
	openGraph={{
		title: 'Blog | My Personal Blog',
		description: 'Read all blog posts from My Personal Blog',
		url: '/blog',
		type: 'website',
		image: '/images/og-image.jpg'
	}}
/>

<section>
	<h1 class="text-4xl font-bold mb-8">Blog Posts</h1>

	<div class="mb-8">
		<h2 class="text-xl font-semibold mb-4">Filter by Tag</h2>
		<div class="flex flex-wrap gap-2">
			{#each tags as tag}
				<a href="/blog/tag/{tag}" class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1 rounded-full text-sm">
					#{tag}
				</a>
			{/each}
		</div>
	</div>

	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each posts as post}
			<BlogCard {post} />
		{/each}
	</div>
</section>
