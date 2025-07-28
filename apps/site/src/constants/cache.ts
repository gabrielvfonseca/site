export const CACHE_DURATIONS = {
  // Posts
  PUBLISHED: 60 * 15, // 15 minutes for published posts
  DRAFT: 60 * 5, // 5 minutes for drafts
  ARCHIVED: 60 * 30, // 30 minutes for archived posts

  // Projects
  PROJECTS: 60 * 10, // 10 minutes for general projects
  FEATURED: 60 * 20, // 20 minutes for featured projects
  PRIORITIZED: 60 * 8, // 8 minutes for prioritized projects
  ALL_PROJECTS: 60 * 12, // 12 minutes for all projects
} as const;

export const CACHE_TAGS = {
  // Posts
  POSTS: 'posts',
  PUBLISHED_POSTS: 'published-posts',
  DRAFT_POSTS: 'draft-posts',
  ARCHIVED_POSTS: 'archived-posts',

  // Projects
  PROJECTS: 'projects',
  FEATURED_PROJECTS: 'featured-projects',
  PRIORITIZED_PROJECTS: 'prioritized-projects',
  ALL_PROJECTS: 'all-projects',
} as const;
