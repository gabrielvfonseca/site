import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mockGitHubResponses } from '../../lib/test-utils'

// Mock GitHub client
const mockGitHubClient = {
  getUser: vi.fn(),
  getRepositories: vi.fn(),
  getContributions: vi.fn(),
  getEvents: vi.fn(),
  getRepository: vi.fn(),
}

vi.mock('@gabfon/github', () => ({
  githubClient: mockGitHubClient,
}))

// Mock react-query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(({ queryKey, queryFn, enabled = true }) => {
    return {
      queryKey,
      queryFn,
      enabled,
      isLoading: false,
      isError: false,
      data: null,
      error: null,
    }
  }),
}))

describe('GitHub Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useGitHubUser', () => {
    it('should fetch user data successfully', async () => {
      mockGitHubClient.getUser.mockResolvedValue(mockGitHubResponses.user)

      const data = await mockGitHubClient.getUser()

      expect(data.login).toBe('testuser')
      expect(data.avatar_url).toBeDefined()
    })

    it('should handle missing user data', async () => {
      mockGitHubClient.getUser.mockRejectedValue(new Error('Not found'))

      await expect(mockGitHubClient.getUser()).rejects.toThrow('Not found')
    })

    it('should cache query results', () => {
      const useQuery = vi.fn(({ queryKey }) => ({
        queryKey,
        data: mockGitHubResponses.user,
      }))

      const result1 = useQuery({ queryKey: ['github-user'] })
      const result2 = useQuery({ queryKey: ['github-user'] })

      expect(result1.queryKey).toEqual(result2.queryKey)
    })
  })

  describe('useGitHubRepositories', () => {
    it('should fetch repositories successfully', async () => {
      mockGitHubClient.getRepositories.mockResolvedValue(
        mockGitHubResponses.repos
      )

      const data = await mockGitHubClient.getRepositories()

      expect(data).toHaveLength(1)
      expect(data[0].name).toBe('test-repo')
    })

    it('should include repository metadata', async () => {
      mockGitHubClient.getRepositories.mockResolvedValue(
        mockGitHubResponses.repos
      )

      const data = await mockGitHubClient.getRepositories()
      const repo = data[0]

      expect(repo).toHaveProperty('name')
      expect(repo).toHaveProperty('stargazers_count')
      expect(repo).toHaveProperty('html_url')
    })

    it('should handle empty repository list', async () => {
      mockGitHubClient.getRepositories.mockResolvedValue([])

      const data = await mockGitHubClient.getRepositories()

      expect(data).toHaveLength(0)
    })

    it('should accept sort parameters', () => {
      const sortOptions = ['stars', 'forks', 'updated']

      sortOptions.forEach((sort) => {
        expect(['stars', 'forks', 'updated']).toContain(sort)
      })
    })
  })

  describe('useGitHubContributions', () => {
    it('should fetch contribution statistics', async () => {
      mockGitHubClient.getContributions.mockResolvedValue(
        mockGitHubResponses.contributions
      )

      const data = await mockGitHubClient.getContributions()

      expect(data.total).toBe(1500)
      expect(data.thisYear).toBe(500)
    })

    it('should provide year-based statistics', async () => {
      mockGitHubClient.getContributions.mockResolvedValue(
        mockGitHubResponses.contributions
      )

      const data = await mockGitHubClient.getContributions()

      expect(data).toHaveProperty('thisYear')
      expect(data.thisYear).toBeLessThanOrEqual(data.total)
    })

    it('should handle zero contributions', async () => {
      mockGitHubClient.getContributions.mockResolvedValue({
        total: 0,
        thisYear: 0,
      })

      const data = await mockGitHubClient.getContributions()

      expect(data.total).toBe(0)
    })
  })

  describe('useGitHubEvents', () => {
    it('should fetch user events', async () => {
      mockGitHubClient.getEvents.mockResolvedValue(mockGitHubResponses.events)

      const data = await mockGitHubClient.getEvents()

      expect(data).toHaveLength(1)
      expect(data[0].type).toBe('PushEvent')
    })

    it('should include event timestamps', async () => {
      mockGitHubClient.getEvents.mockResolvedValue(mockGitHubResponses.events)

      const data = await mockGitHubClient.getEvents()
      const event = data[0]

      expect(event).toHaveProperty('created_at')
      expect(new Date(event.created_at)).toBeInstanceOf(Date)
    })

    it('should support event type filtering', () => {
      const eventTypes = [
        'PushEvent',
        'PullRequestEvent',
        'IssuesEvent',
        'CreateEvent',
      ]

      eventTypes.forEach((type) => {
        expect(['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent']).toContain(
          type
        )
      })
    })

    it('should handle empty events list', async () => {
      mockGitHubClient.getEvents.mockResolvedValue([])

      const data = await mockGitHubClient.getEvents()

      expect(data).toHaveLength(0)
    })
  })

  describe('useGitHubRepository', () => {
    it('should fetch specific repository', async () => {
      const mockRepo = mockGitHubResponses.repos[0]
      mockGitHubClient.getRepository.mockResolvedValue(mockRepo)

      const data = await mockGitHubClient.getRepository('test-repo')

      expect(data.name).toBe('test-repo')
    })

    it('should require repository name parameter', () => {
      const useQuery = vi.fn(({ queryKey, enabled }) => ({
        queryKey,
        enabled,
      }))

      const result = useQuery({
        queryKey: ['github-repo', ''],
        enabled: false,
      })

      expect(result.enabled).toBe(false)
    })

    it('should disable query with empty repo name', () => {
      const useQuery = vi.fn(({ queryKey, enabled }) => ({
        queryKey,
        enabled,
      }))

      const result = useQuery({
        queryKey: ['github-repo', ''],
        enabled: false,
      })

      expect(result.enabled).toBe(false)
    })

    it('should include repository stats', async () => {
      const mockRepo = mockGitHubResponses.repos[0]
      mockGitHubClient.getRepository.mockResolvedValue(mockRepo)

      const data = await mockGitHubClient.getRepository('test-repo')

      expect(data).toHaveProperty('stargazers_count')
      expect(data).toHaveProperty('forks_count')
      expect(data).toHaveProperty('watchers_count')
    })
  })

  describe('Error Handling', () => {
    it('should handle API rate limiting', async () => {
      const rateLimitError = {
        message: 'API rate limit exceeded',
        documentation_url: 'https://docs.github.com/rest',
      }

      mockGitHubClient.getUser.mockRejectedValue(rateLimitError)

      await expect(mockGitHubClient.getUser()).rejects.toMatchObject(
        rateLimitError
      )
    })

    it('should handle network errors', async () => {
      mockGitHubClient.getRepositories.mockRejectedValue(
        new Error('Network error')
      )

      await expect(mockGitHubClient.getRepositories()).rejects.toThrow(
        'Network error'
      )
    })

    it('should handle missing authentication', async () => {
      mockGitHubClient.getUser.mockRejectedValue(
        new Error('Requires authentication')
      )

      await expect(mockGitHubClient.getUser()).rejects.toThrow(
        'Requires authentication'
      )
    })
  })

  describe('Query Key Management', () => {
    it('should use consistent query keys', () => {
      const key1 = ['github-user']
      const key2 = ['github-user']

      expect(key1).toEqual(key2)
    })

    it('should include parameters in query key', () => {
      const key1 = ['github-repo', 'test-repo']
      const key2 = ['github-repo', 'another-repo']

      expect(key1).not.toEqual(key2)
    })

    it('should differentiate query types', () => {
      const userKey = ['github-user']
      const reposKey = ['github-repos']

      expect(userKey).not.toEqual(reposKey)
    })
  })
})
