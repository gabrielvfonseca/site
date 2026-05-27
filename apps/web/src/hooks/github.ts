import { githubHooksFactory } from './use-github';

export const useUser = githubHooksFactory('useUser');
export const useUserEvents = githubHooksFactory('useUserEvents');
export const useUserRepos = githubHooksFactory('useUserRepos');
export const useRepo = githubHooksFactory('useRepo');
export const useContributionCalendar = githubHooksFactory(
  'useContributionCalendar'
);
export const useSearchRepos = githubHooksFactory('useSearchRepos');
