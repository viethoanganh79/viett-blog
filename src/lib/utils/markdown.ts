// Import necessary modules
// We're using pre-generated JSON files instead of filesystem operations
import { posts as importedPosts, tags as importedTags } from './content-loader';

// Define the Post type
export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author: string;
  image: string;
  content: string;
  html: string;
}

// Cache for posts to avoid fetching multiple times
let postsCache: Post[] | null = null;

/**
 * Get all blog posts with their metadata and content
 */
export function getAllPosts(): Post[] {
  // If we have cached posts, return them
  if (postsCache) {
    return postsCache;
  }

  try {
    // In a browser environment, we need to use the pre-generated JSON files
    // This is a static import that will be bundled with the app
    // The JSON file is generated during the build process
    const posts = getHardcodedPosts();

    // Sort posts by date (newest first)
    postsCache = posts.sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return postsCache;
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return getFallbackPosts();
  }
}

/**
 * Get posts from the pre-generated JSON files
 */
function getHardcodedPosts(): Post[] {
  // Use the imported posts from the pre-generated JSON file
  return importedPosts;
}

/**
 * Fallback to hardcoded posts if JSON import fails
 */
function getFallbackPosts(): Post[] {
  return [
    {
      slug: 'bai-viet-ve-bo-1',
      title: 'Thành công không hẳn là kiếm nhiều tiền, giữ tiền trong túi cũng là thành công rồi',
      date: '2025-04-18',
      excerpt: 'Tin nhắn trong group chung cư lại nhấp nháy: "Bồn rửa tắc, nhờ kỹ thuật giúp với!". Những suy nghĩ vẫn vơ kéo tôi ...',
      tags: ['Bố', 'tập viết', 'memories'],
      author: 'Viett',
      image: '/images/posts/dad-how-do-i.jpeg',
      content: '## Thành công không hẳn là kiếm nhiều tiền, giữ tiền trong túi cũng là thành công rồi!\n\nTin nhắn trong group chung cư lại nhấp nháy: "Bồn rửa tắc, nhờ kỹ thuật giúp với!". Những suy nghĩ vẫn vơ kéo tôi về những ngày hè cùng bố chăm sóc ao tôm. Bố, một người nông dân chính hiệu, học báo chí rồi chuyển sang học thuốc nam, khởi nghiệp với ao tôm tự đào cùng mẹ. Máy móc hư, bố tự mày mò. Kỹ thuật nuôi tôm mới, thuốc mới, bố hỏi bạn, đọc sách. Cái tò mò tháo tung mọi thứ để hiểu đã ngấm vào tôi. Mọi người hay gọi vui bố là "Giáo sư", cái gì cũng biết.',
      html: '<h2>Thành công không hẳn là kiếm nhiều tiền, giữ tiền trong túi cũng là thành công rồi!</h2>\n<p>Tin nhắn trong group chung cư lại nhấp nháy: "Bồn rửa tắc, nhờ kỹ thuật giúp với!". Những suy nghĩ vẫn vơ kéo tôi về những ngày hè cùng bố chăm sóc ao tôm. Bố, một người nông dân chính hiệu, học báo chí rồi chuyển sang học thuốc nam, khởi nghiệp với ao tôm tự đào cùng mẹ. Máy móc hư, bố tự mày mò. Kỹ thuật nuôi tôm mới, thuốc mới, bố hỏi bạn, đọc sách. Cái tò mò tháo tung mọi thứ để hiểu đã ngấm vào tôi. Mọi người hay gọi vui bố là "Giáo sư", cái gì cũng biết.</p>'
    },
    {
      slug: 'hello-world',
      title: 'Hello World',
      date: '2025-04-16',
      excerpt: 'Welcome to my new blog built with SvelteKit!',
      tags: ['welcome', 'introduction'],
      author: 'Viett',
      image: '/images/posts/hello-world.png',
      content: '## Welcome to My Blog!\n\nHello and welcome to my new blog!',
      html: '<h2>Welcome to My Blog!</h2>\n<p>Hello and welcome to my new blog!</p>'
    },
    {
      slug: 'getting-started-with-sveltekit',
      title: 'Getting Started with SvelteKit',
      date: '2025-04-16',
      excerpt: 'Learn how to build a blog with SvelteKit and Markdown.',
      tags: ['sveltekit', 'tutorial', 'web development'],
      author: 'Viett',
      image: '/images/posts/sveltekit-learn.png',
      content: '## Introduction to SvelteKit\n\nSvelteKit is a framework for building web applications.',
      html: '<h2>Introduction to SvelteKit</h2>\n<p>SvelteKit is a framework for building web applications.</p>'
    },
    {
      slug: 'seo-for-developers',
      title: 'SEO for Developers',
      date: '2025-04-15',
      excerpt: 'Learn essential SEO techniques that every developer should know.',
      tags: ['seo', 'web development', 'tutorial'],
      author: 'Viett',
      image: '/images/posts/seo.jpg',
      content: '## SEO for Developers\n\nSearch Engine Optimization (SEO) is a crucial aspect of web development.',
      html: '<h2>SEO for Developers</h2>\n<p>Search Engine Optimization (SEO) is a crucial aspect of web development.</p>'
    }
  ];
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find(post => post.slug === slug);
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(post => post.tags.includes(tag));
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(): string[] {
  // Use the imported tags from the pre-generated JSON file
  return importedTags;
}

/**
 * Get featured posts (most recent posts)
 */
export function getFeaturedPosts(count = 2): Post[] {
  return getAllPosts().slice(0, count);
}
