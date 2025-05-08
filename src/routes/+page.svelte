<script lang="ts">
	import type { PageData } from './$types';
	import SEO from '$lib/components/SEO.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';

	export let data: PageData;
	const { featuredPosts } = data;
</script>

<SEO
	title="Home | Viett Blog"
	description="A personal blog about technology, programming, and life"
	openGraph={{
		title: 'Viett Blog',
		description: 'A personal blog about technology, programming, and life',
		url: 'https://viett.net',
		type: 'website',
		image: '/images/profile/avatar.png'
	}}
/>

<section class="py-12">
	<div class="text-center mb-12">
		<h1 class="text-4xl font-bold mb-4">Welcome to Viett Blog</h1>
		<p class="text-xl text-gray-600 max-w-2xl mx-auto">
			A place where I share my thoughts, experiences, and knowledge about technology, programming, and
			life.
		</p>
	</div>
</section>

<section class="mb-12">
	<h2 class="text-3xl font-bold mb-6">Featured Posts</h2>
	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each featuredPosts as post}
			<BlogCard {post} />
		{/each}
	</div>
</section>

<section>
	<div class="text-center">
		<a
			href="/blog"
			class="inline-block bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors text-lg"
			>View All Posts</a
		>
	</div>
</section>
