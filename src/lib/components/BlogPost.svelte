<script lang="ts">
  import type { Post } from '$lib/utils/markdown';
  import SEO from './SEO.svelte';
  
  export let post: Post;
  
  // Create JSON-LD structured data for the blog post
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'image': post.image,
    'datePublished': post.date,
    'author': {
      '@type': 'Person',
      'name': post.author
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'My Personal Blog',
      'logo': {
        '@type': 'ImageObject',
        'url': '/images/logo.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://yourblog.com/blog/${post.slug}`
    }
  };
</script>

<SEO
  title="{post.title} | My Personal Blog"
  description={post.excerpt}
  canonical={`/blog/${post.slug}`}
  openGraph={{
    title: post.title,
    description: post.excerpt,
    url: `/blog/${post.slug}`,
    type: 'article',
    image: post.image
  }}
  twitter={{
    card: 'summary_large_image',
    site: '@yourusername',
    title: post.title,
    description: post.excerpt,
    image: post.image
  }}
  {jsonLd}
/>

<article class="prose prose-slate lg:prose-xl mx-auto">
  <header class="mb-8">
    <h1 class="text-4xl font-bold mb-2">{post.title}</h1>
    <div class="flex flex-wrap items-center text-gray-500 text-sm mb-4">
      <time datetime={post.date} class="mr-4">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
      <span class="mr-4">By {post.author}</span>
    </div>
    <div class="flex flex-wrap gap-2 mb-6">
      {#each post.tags as tag}
        <a href={`/blog/tag/${tag}`} class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1 rounded-full text-sm">
          #{tag}
        </a>
      {/each}
    </div>
    {#if post.image}
      <img src={post.image} alt={post.title} class="w-full h-auto rounded-lg shadow-md mb-6" />
    {/if}
  </header>
  
  <div class="blog-content">
    {@html post.html}
  </div>
</article>

<style>
  /* Add any custom styles for the blog content here */
  :global(.blog-content pre) {
    background-color: #1e293b;
    color: white;
    padding: 1rem;
    border-radius: 0.375rem;
    overflow-x: auto;
  }
</style>
