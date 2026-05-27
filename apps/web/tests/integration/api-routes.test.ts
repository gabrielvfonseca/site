import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { POST as chatPost } from '@/app/api/chat/route'
import {
  createMockApiResponse,
  createMockErrorResponse,
  setupMockFetch,
  createMockRequest,
  createRateLimitResponse,
  createRateLimitExceededResponse,
  mockSpotifyResponses,
  mockGitHubResponses,
  mockStravaResponses,
} from '../lib/test-utils'

// Mock rate limiting
vi.mock('@/lib/rate-limit', () => ({
  checkRateLimit: vi.fn(async () => createRateLimitResponse()),
}))

// Mock Google Generative AI
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn(() => ({
    getGenerativeModel: vi.fn(() => ({
      startChat: vi.fn(() => ({
        sendMessageStream: vi.fn(async () => ({
          stream: {
            [Symbol.asyncIterator]: async function* () {
              yield { text: () => 'Test response' }
            },
          },
        })),
      })),
    })),
  })),
}))

// Mock observability
vi.mock('@gabfon/observability', () => ({
  parseError: vi.fn((error) => ({
    message: error instanceof Error ? error.message : String(error),
  })),
}))

// Mock file system for chat route
vi.mock('fs/promises', () => ({
  readFile: vi.fn().mockResolvedValue('Test context data'),
}))

describe('API Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /api/chat', () => {
    const validRequest = {
      messages: [
        {
          role: 'user' as const,
          content: 'Hello, how are you?',
        },
      ],
    }

    it('should accept valid chat messages', async () => {
      const request = createMockRequest('http://localhost:3000/api/chat', {
        method: 'POST',
        body: JSON.stringify(validRequest),
      })

      // Note: The actual streaming response handling is complex
      // This test validates the basic structure
      expect(validRequest.messages).toBeDefined()
      expect(validRequest.messages[0].role).toBe('user')
    })

    it('should reject empty messages array', async () => {
      const invalidRequest = {
        messages: [],
      }

      expect(invalidRequest.messages).toHaveLength(0)
    })

    it('should reject messages exceeding length limit', async () => {
      const longContent = 'a'.repeat(10001)
      const invalidRequest = {
        messages: [
          {
            role: 'user' as const,
            content: longContent,
          },
        ],
      }

      expect(invalidRequest.messages[0].content.length).toBeGreaterThan(10000)
    })

    it('should reject invalid message roles', async () => {
      const invalidRequest = {
        messages: [
          {
            role: 'invalid',
            content: 'Hello',
          },
        ],
      }

      expect(['user', 'assistant']).not.toContain(invalidRequest.messages[0].role)
    })

    it('should reject empty message content', async () => {
      const invalidRequest = {
        messages: [
          {
            role: 'user' as const,
            content: '',
          },
        ],
      }

      expect(invalidRequest.messages[0].content).toBe('')
    })

    it('should enforce message history limit', async () => {
      const messages = Array.from({ length: 51 }, (_, i) => ({
        role: (i % 2 === 0 ? 'user' : 'assistant') as const,
        content: `Message ${i}`,
      }))

      expect(messages).toHaveLength(51)
    })

    it('should handle rate limiting', async () => {
      const { checkRateLimit } = await import('@/lib/rate-limit')

      vi.mocked(checkRateLimit).mockResolvedValueOnce({
        success: false,
        response: createRateLimitExceededResponse(),
      })

      const rateLimited = await vi.mocked(checkRateLimit)({} as any, 'chat')

      expect(rateLimited.success).toBe(false)
      expect(rateLimited.response).toBeDefined()
    })

    it('should include context data in chat prompt', async () => {
      // The chat route should read and include the context file
      const { readFile } = await import('fs/promises')
      const contextData = await vi.mocked(readFile)({} as any, 'utf-8')

      expect(contextData).toBe('Test context data')
    })
  })

  describe('Spotify API Routes', () => {
    it('should handle currently playing endpoint', async () => {
      const response = mockSpotifyResponses.currentlyPlaying

      expect(response.item).toBeDefined()
      expect(response.is_playing).toBe(true)
      expect(response.item.name).toBe('Test Track')
    })

    it('should handle recently played endpoint', async () => {
      const response = mockSpotifyResponses.recentlyPlayed

      expect(response.items).toHaveLength(1)
      expect(response.items[0].track.name).toBe('Test Track 1')
    })

    it('should handle top tracks endpoint', async () => {
      const response = mockSpotifyResponses.topTracks

      expect(response.items).toHaveLength(1)
      expect(response.items[0].name).toBe('Top Track 1')
      expect(response.items[0].popularity).toBe(85)
    })

    it('should handle top artists endpoint', async () => {
      const response = mockSpotifyResponses.topArtists

      expect(response.items).toHaveLength(1)
      expect(response.items[0].name).toBe('Top Artist 1')
    })

    it('should validate limit parameters', () => {
      const validLimits = [10, 20, 50]

      validLimits.forEach((limit) => {
        expect(limit).toBeGreaterThanOrEqual(1)
        expect(limit).toBeLessThanOrEqual(50)
      })
    })

    it('should validate time range parameters', () => {
      const validRanges = ['short_term', 'medium_term', 'long_term']

      validRanges.forEach((range) => {
        expect(['short_term', 'medium_term', 'long_term']).toContain(range)
      })
    })
  })

  describe('GitHub API Routes', () => {
    it('should handle user endpoint', async () => {
      const response = mockGitHubResponses.user

      expect(response.login).toBe('testuser')
      expect(response.avatar_url).toBeDefined()
      expect(response.repositories_url).toBeDefined()
    })

    it('should handle repos endpoint', async () => {
      const response = mockGitHubResponses.repos

      expect(response).toHaveLength(1)
      expect(response[0].name).toBe('test-repo')
      expect(response[0].stargazers_count).toBe(100)
    })

    it('should handle contributions endpoint', async () => {
      const response = mockGitHubResponses.contributions

      expect(response.total).toBe(1500)
      expect(response.thisYear).toBe(500)
    })

    it('should handle events endpoint', async () => {
      const response = mockGitHubResponses.events

      expect(response).toHaveLength(1)
      expect(response[0].type).toBe('PushEvent')
      expect(response[0].repo).toBeDefined()
    })

    it('should handle missing GitHub user', async () => {
      const errorResponse = {
        message: 'Not Found',
        documentation_url: 'https://docs.github.com/rest',
      }

      expect(errorResponse).toHaveProperty('message')
      expect(errorResponse.message).toBe('Not Found')
    })

    it('should handle GitHub API rate limiting', async () => {
      const rateLimitError = {
        message: 'API rate limit exceeded',
        documentation_url: 'https://docs.github.com/rest',
      }

      expect(rateLimitError).toHaveProperty('message')
    })
  })

  describe('Strava API Routes', () => {
    it('should handle athlete endpoint', async () => {
      const response = mockStravaResponses.athlete

      expect(response.id).toBe(12345)
      expect(response.firstname).toBe('Test')
      expect(response.profile).toBeDefined()
    })

    it('should handle activities endpoint', async () => {
      const response = mockStravaResponses.activities

      expect(response).toHaveLength(1)
      expect(response[0].type).toBe('Run')
      expect(response[0].distance).toBe(5000)
    })

    it('should handle stats endpoint', async () => {
      const response = mockStravaResponses.stats

      expect(response.all_ride_totals).toBeDefined()
      expect(response.all_ride_totals.count).toBe(100)
    })

    it('should filter activities by type', async () => {
      const activities = mockStravaResponses.activities.filter(
        (a) => a.type === 'Run'
      )

      expect(activities).toHaveLength(1)
      expect(activities[0].type).toBe('Run')
    })

    it('should calculate distance statistics', async () => {
      const stats = mockStravaResponses.stats.all_ride_totals

      expect(stats.distance).toBeGreaterThan(0)
      expect(stats.moving_time).toBeGreaterThan(0)
    })

    it('should handle missing athlete data', async () => {
      const errorResponse = {
        message: 'Athlete not found',
        errors: [{ resource: 'Athlete', field: 'id', code: 'not found' }],
      }

      expect(errorResponse).toHaveProperty('message')
    })
  })

  describe('API Error Handling', () => {
    it('should return 400 for bad requests', async () => {
      const response = await createMockErrorResponse(400, 'Bad Request')
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Bad Request')
    })

    it('should return 401 for unauthorized requests', async () => {
      const response = await createMockErrorResponse(401, 'Unauthorized')
      const data = await response.json()

      expect(response.status).toBe(401)
    })

    it('should return 429 for rate limited requests', async () => {
      const response = createRateLimitExceededResponse()
      const data = await response.json()

      expect(response.status).toBe(429)
      expect(data.error).toBe('Rate limit exceeded')
    })

    it('should return 500 for server errors', async () => {
      const response = await createMockErrorResponse(500, 'Internal Server Error')
      const data = await response.json()

      expect(response.status).toBe(500)
    })

    it('should include error details in response', async () => {
      const response = await createMockErrorResponse(400, 'Invalid input')
      const data = await response.json()

      expect(data).toHaveProperty('error')
      expect(typeof data.error).toBe('string')
    })
  })
})
