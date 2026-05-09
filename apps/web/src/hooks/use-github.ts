import { githubClient } from '@gabfon/github';
import { useQuery } from '@tanstack/react-query';
import { parseAsString, useQueryState } from 'nuqs';

/**
 * Factory for creating GitHub-related hooks.
 *
 * @param hookName - The name of the hook to create.
 * @returns The created hook.
 */
export const githubHooksFactory = (hookName: string) => {
  switch (hookName) {
    case 'useUser':
      return () =>
        useQuery({
          queryKey: ['github-user'],
          queryFn: () => githubClient.getUser(),
        });
    case 'useUserEvents':
      return (perPage = 30) =>
        useQuery({
          queryKey: ['github-user-events', perPage],
          queryFn: () => githubClient.getUserEvents(perPage),
        });
    case 'useUserRepos':
      return (perPage = 10, sort = 'updated') =>
        useQuery({
          queryKey: ['github-user-repos', perPage, sort],
          queryFn: () => githubClient.getUserRepos(perPage, sort),
        });
    case 'useRepo':
      return (owner: string, repo: string) =>
        useQuery({
          queryKey: ['github-repo', owner, repo],
          queryFn: () => githubClient.getRepo(owner, repo),
          enabled: !!owner && !!repo,
        });
    case 'useContributionCalendar':
      return () =>
        useQuery({
          queryKey: ['github-contribution-calendar'],
          queryFn: () => githubClient.getContributionCalendar(),
        });
    case 'useSearchRepos':
      return (perPage = 10) => {
        const [query] = useQueryState(
          'q',
          parseAsString.withDefault('gabriel-fonseca')
        );
        return useQuery({
          queryKey: ['github-search-repos', query, perPage],
          queryFn: () => githubClient.searchRepos(query, perPage),
          enabled: !!query,
        });
      };
    default:
      throw new Error(`Invalid hook name: ${hookName}`);
  }
};
