<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'name': 'Hoàng Việt - Hoang Viet',
		'url': 'https://yourblog.com/about',
		'jobTitle': 'Front-end Developer',
		'image': 'https://yourblog.com/images/profile/avatar23.png',
		'sameAs': [
			'https://www.facebook.com/viet.photograph/',
			'https://github.com/viethoanganh79',
			'https://www.linkedin.com/in/viethoanganh79/'
		]
	};
</script>

<SEO
	title="About | Viett Blog"
	description="Learn more about the author of Viett Blog"
	canonical="/about"
	openGraph={{
		title: 'About | Viett Blog',
		description: 'Learn more about the author of Viett',
		url: '/about',
		type: 'profile',
		image: '/images/profile/avatar23.png'
	}}
	{jsonLd}
/>

<section class="prose prose-slate lg:prose-xl mx-auto">
	<div class="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
		<div class="w-48 h-48 flex-shrink-0 shadow-lg">
			<img
				src="/images/profile/avatar23.png"
				alt="Hoàng Việt"
				class="w-full h-full object-cover"
			/>
		</div>
		<div>
			<h1 class="mt-0">About Me</h1>
			<p>
				Hello! I'm the author of this blog. I'm passionate about technology, programming, and sharing knowledge
				with others. And currently, I'm a Front-end Developer.
			</p>
		</div>
	</div>

	<p>
		This blog is built with SvelteKit, a powerful framework for building web applications. I use it to share
		my thoughts, experiences, and knowledge about various topics.
	</p>

	<h2>My Background</h2>

	<p>
		I have experience in web development, with a focus on modern JavaScript frameworks like Svelte, Angular,
		and Vue. I enjoy learning new technologies and sharing what I learn with others.
	</p>

	<h2>Contact Me</h2>

	<p>
		Feel free to reach out to me via email at <a href="mailto:viethoanganh79@gmail.com">viethoanganh79@gmail.com</a>
		or connect with me on social media.
	</p>

	<div class="flex space-x-4 mt-6">
		<a href="https://www.facebook.com/viet.photograph/" class="text-blue-500 hover:text-blue-700">Facebook</a>
		<a href="https://github.com/viethoanganh79" class="text-gray-800 hover:text-gray-600">GitHub</a>
		<a href="https://www.linkedin.com/in/viethoanganh79/" class="text-blue-700 hover:text-blue-900">LinkedIn</a>
	</div>
</section>
