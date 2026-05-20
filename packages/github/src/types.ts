import { z } from 'zod';

/**
 * GitHub user information
 */
export const GitHubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  avatar_url: z.string(),
  html_url: z.string(),
  followers: z.number(),
  following: z.number(),
  public_repos: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

/**
 * GitHub repository information
 */
export const GitHubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  language: z.string().nullable(),
  updated_at: z.string(),
  created_at: z.string(),
  pushed_at: z.string(),
  topics: z.array(z.string()),
  license: z
    .object({
      key: z.string(),
      name: z.string(),
    })
    .nullable(),
});

/**
 * GitHub event information
 */
export const GitHubEventSchema = z.object({
  id: z.string(),
  type: z.string(),
  actor: z.object({
    login: z.string(),
    avatar_url: z.string(),
  }),
  repo: z.object({
    name: z.string(),
    url: z.string(),
  }),
  payload: z.record(z.string(), z.unknown()),
  created_at: z.string(),
  public: z.boolean(),
});

/**
 * GitHub contribution day
 */
export const GitHubContributionDaySchema = z.object({
  date: z.string(),
  contributionCount: z.number(),
  color: z.string(),
});

/**
 * GitHub contribution week
 */
export const GitHubContributionWeekSchema = z.object({
  firstDay: z.string(),
  days: z.array(GitHubContributionDaySchema),
});

/**
 * GitHub contribution calendar
 */
export const GitHubContributionCalendarSchema = z.object({
  totalContributions: z.number(),
  weeks: z.array(GitHubContributionWeekSchema),
});

/**
 * API response wrapper
 */
export const GitHubApiResponseSchema = z.object({
  data: z.unknown(),
  status: z.number(),
  headers: z.record(z.string(), z.string()),
});

/**
 * Export types
 */
export type GitHubUser = z.infer<typeof GitHubUserSchema>;
export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;
export type GitHubEvent = z.infer<typeof GitHubEventSchema>;
export type GitHubContributionDay = z.infer<typeof GitHubContributionDaySchema>;
export type GitHubContributionWeek = z.infer<
  typeof GitHubContributionWeekSchema
>;
export type GitHubContributionCalendar = z.infer<
  typeof GitHubContributionCalendarSchema
>;
export type GitHubApiResponse = z.infer<typeof GitHubApiResponseSchema>;
