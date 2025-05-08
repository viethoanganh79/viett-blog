// This file loads the pre-generated JSON content
import type { Post } from './markdown';

// Import the JSON files directly
// These will be bundled with the app during the build process
import postsData from '../../../static/content/posts.json';
import tagsData from '../../../static/content/tags.json';

// Type assertion to help TypeScript understand the imported JSON
const posts = postsData as Post[];
const tags = tagsData as string[];

// Export the data
export { posts, tags };
