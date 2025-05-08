<script lang="ts">
  import { page } from '$app/stores';
  import { getPostsByTag } from '$lib/utils/blog';
  import SEO from '$lib/components/SEO.svelte';
  import BlogCard from '$lib/components/BlogCard.svelte';
  
  // Get the tag from the URL
  const tag = $page.params.tag;
  
  // Get posts with this tag
  const posts = getPostsByTag(tag);
</script>

<SEO
  title="Posts tagged #{tag} | My Personal Blog"
  description="Browse all blog posts tagged with #{tag}"
  canonical={`/blog/tag/${tag}`}
  openGraph={{
    title: `Posts tagged #${tag} | My Personal Blog`,
    description: `Browse all blog posts tagged with #${tag}`,
    url: `/blog/tag/${tag}`,
    type: 'website',
    image: '/images/og-image.jpg'
  }}
/>

<section>
  <div class="mb-8">
    <a href="/blog" class="text-slate-600 hover:text-slate-800">← Back to all posts</a>
  </div>
  
  <h1 class="text-4xl font-bold mb-8">Posts tagged <span class="text-slate-600">#{tag}</span></h1>
  
  {#if posts.length > 0}
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each posts as post}
        <BlogCard {post} />
      {/each}
    </div>
  {:else}
    <div class="bg-slate-100 p-8 rounded-lg text-center">
      <p class="text-xl text-slate-600">No posts found with this tag.</p>
      <a href="/blog" class="inline-block mt-4 bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors">
        View all posts
      </a>
    </div>
  {/if}
</section>
