<script lang="ts">
	import '../app.css';
	import GoogleAnalytics from '$lib/components/GoogleAnalytics.svelte';
	import { isShopEnabled } from '$lib/config/features';
	import { formatDate } from '$lib/utils/date';

	let { children } = $props();

	// Check if the shop is enabled
	const shopEnabled = isShopEnabled();

	// Get current date
	const currentDate = new Date();
</script>

<GoogleAnalytics />

<div class="min-h-screen flex flex-col">
	<header class="bg-slate-800 text-white p-4">
		<div class="container mx-auto flex justify-between items-center">
			<a href="/" class="text-2xl font-bold">Viett Blog</a>
			<nav>
				<ul class="flex space-x-4">
					<li><a href="/" class="hover:text-slate-300">Home</a></li>
					<li><a href="/blog" class="hover:text-slate-300">Blog</a></li>
					{#if shopEnabled}
						<li><a href="/shop" class="hover:text-slate-300">Shop</a></li>
					{/if}
					<li><a href="/about" class="hover:text-slate-300">About</a></li>
				</ul>
			</nav>
		</div>
	</header>

	<main class="container mx-auto flex-grow p-4">
		{@render children()}
	</main>

	<footer class="bg-slate-800 text-white p-4 mt-8">
		<div class="container mx-auto text-center">
			<p>&copy; {currentDate.getFullYear()} Viett. All rights reserved.</p>
			<p class="text-sm mt-2 text-slate-400">Today's date: {formatDate(currentDate)}</p>
		</div>
	</footer>
</div>
