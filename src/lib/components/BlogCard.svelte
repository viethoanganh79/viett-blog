<script lang="ts">
  import type { Post } from '$lib/utils/markdown';
  
  export let post: Post;
</script>

<article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
  {#if post.image}
    <div class="relative h-48 overflow-hidden">
      <img src={post.image} alt={post.title} class="w-full h-full object-cover" />
    </div>
  {/if}
  <div class="p-6">
    <div class="flex flex-wrap gap-2 mb-2">
      {#each post.tags as tag}
        <a href={`/blog/tag/${tag}`} class="bg-slate-200 hover:bg-slate-300 text-slate-800 px-2 py-0.5 rounded-full text-xs">
          #{tag}
        </a>
      {/each}
    </div>
    <p class="text-gray-500 text-sm mb-2">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    <h3 class="text-xl font-bold mb-2">
      <a href="/blog/{post.slug}" class="text-slate-800 hover:text-slate-600">{post.title}</a>
    </h3>
    <p class="text-gray-600 mb-4">{post.excerpt}</p>
    <div class="flex justify-between items-center">
      <a
        href="/blog/{post.slug}"
        class="inline-block bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
      >
        Read More
      </a>
      <span class="text-gray-500 text-sm">By {post.author}</span>
    </div>
  </div>
</article>
