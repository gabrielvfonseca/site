const SECONDS_IN_MINUTE = 60;

// Cache duration constants in minutes
const PUBLISHED_CACHE_MINUTES = 15;
const DRAFT_CACHE_MINUTES = 5;
const ARCHIVED_CACHE_MINUTES = 30;
const PROJECTS_CACHE_MINUTES = 10;
const FEATURED_CACHE_MINUTES = 20;
const PRIORITIZED_CACHE_MINUTES = 8;
const ALL_PROJECTS_CACHE_MINUTES = 12;

export const CACHE_DURATIONS = {
  // Posts
  PUBLISHED: SECONDS_IN_MINUTE * PUBLISHED_CACHE_MINUTES, // 15 minutes for published posts
  DRAFT: SECONDS_IN_MINUTE * DRAFT_CACHE_MINUTES, // 5 minutes for drafts
  ARCHIVED: SECONDS_IN_MINUTE * ARCHIVED_CACHE_MINUTES, // 30 minutes for archived posts

  // Projects
  PROJECTS: SECONDS_IN_MINUTE * PROJECTS_CACHE_MINUTES, // 10 minutes for general projects
  FEATURED: SECONDS_IN_MINUTE * FEATURED_CACHE_MINUTES, // 20 minutes for featured projects
  PRIORITIZED: SECONDS_IN_MINUTE * PRIORITIZED_CACHE_MINUTES, // 8 minutes for prioritized projects
  ALL_PROJECTS: SECONDS_IN_MINUTE * ALL_PROJECTS_CACHE_MINUTES, // 12 minutes for all projects
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
