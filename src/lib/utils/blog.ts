import { getAllPosts, getPostBySlug as getMarkdownPostBySlug, getFeaturedPosts as getMarkdownFeaturedPosts, getPostsByTag as getMarkdownPostsByTag, getAllTags as getMarkdownAllTags } from './markdown';

// Re-export the Post interface and functions from markdown.ts
export type { Post } from './markdown';

/**
 * Get all blog posts
 */
export function getPosts() {
  return getAllPosts();
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string) {
  return getMarkdownPostBySlug(slug);
}

/**
 * Get featured posts for the homepage
 */
export function getFeaturedPosts(count = 2) {
  return getMarkdownFeaturedPosts(count);
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string) {
  return getMarkdownPostsByTag(tag);
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags() {
  return getMarkdownAllTags();
}
