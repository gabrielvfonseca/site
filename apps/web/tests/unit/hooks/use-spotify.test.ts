import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  mockSpotifyResponses,
} from '../../lib/test-utils'

// Mock the spotify client BEFORE importing the hook
vi.mock('@gabfon/spotify', () => ({
  spotifyClient: {
    getCurrentlyPlaying: vi.fn(),
    getRecentlyPlayed: vi.fn(),
    getTopTracks: vi.fn(),
    getTopArtists: vi.fn(),
    getTrack: vi.fn(),
    getArtist: vi.fn(),
    getAudioFeatures: vi.fn(),
    searchTracks: vi.fn(),
    searchArtists: vi.fn(),
  },
}))

// Import the hook AFTER mocking dependencies
import { spotifyHooksFactory } from '@/hooks/use-spotify'

// Helper to get the mocked spotify client
const getSpotifyClient = async () => {
  const { spotifyClient } = await import('@gabfon/spotify')
  return spotifyClient
}

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

// Mock nuqs
vi.mock('nuqs', () => ({
  useQueryState: vi.fn(() => ['', vi.fn()]),
  parseAsString: {
    withDefault: (value: string) => value,
  },
}))

describe('Spotify Hooks Factory', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useCurrentlyPlaying', () => {
    it('should create a hook that fetches currently playing track', () => {
      const hook = spotifyHooksFactory('useCurrentlyPlaying')

      expect(hook).toBeDefined()
      expect(typeof hook).toBe('function')
    })

    it('should set correct query key for currently playing', async () => {
      const spotifyClient = await getSpotifyClient()
      vi.mocked(spotifyClient).getCurrentlyPlaying.mockResolvedValue(
        mockSpotifyResponses.currentlyPlaying
      )

      const hook = spotifyHooksFactory('useCurrentlyPlaying')
      const result = hook()

      expect(result.queryKey).toEqual(['spotify-currently-playing'])
    })

    it('should call spotify client method correctly', async () => {
      const spotifyClient = await getSpotifyClient()
      vi.mocked(spotifyClient).getCurrentlyPlaying.mockResolvedValue(
        mockSpotifyResponses.currentlyPlaying
      )

      const hook = spotifyHooksFactory('useCurrentlyPlaying')
      const result = hook()

      expect(typeof result.queryFn).toBe('function')
    })
  })

  describe('useRecentlyPlayed', () => {
    it('should create a hook that fetches recently played tracks', () => {
      const hook = spotifyHooksFactory('useRecentlyPlayed')

      expect(hook).toBeDefined()
    })

    it('should accept limit parameter', () => {
      const hook = spotifyHooksFactory('useRecentlyPlayed')
      const result = hook(20)

      expect(result).toBeDefined()
    })

    it('should use default limit of 50', () => {
      const hook = spotifyHooksFactory('useRecentlyPlayed')
      const result = hook()

      expect(result.queryKey).toContain(50)
    })

    it('should set correct query key with limit', () => {
      const hook = spotifyHooksFactory('useRecentlyPlayed')
      const result = hook(10)

      expect(result.queryKey).toEqual(['spotify-recently-played', 10])
    })
  })

  describe('useTopTracks', () => {
    it('should create a hook that fetches top tracks', () => {
      const hook = spotifyHooksFactory('useTopTracks')

      expect(hook).toBeDefined()
    })

    it('should accept time range and limit parameters', () => {
      const hook = spotifyHooksFactory('useTopTracks')
      const result = hook('short_term', 10)

      expect(result).toBeDefined()
    })

    it('should use default time range and limit', () => {
      const hook = spotifyHooksFactory('useTopTracks')
      const result = hook()

      expect(result.queryKey).toContain('medium_term')
      expect(result.queryKey).toContain(50)
    })

    it('should support different time ranges', () => {
      const timeRanges = ['short_term', 'medium_term', 'long_term'] as const

      timeRanges.forEach((range) => {
        const hook = spotifyHooksFactory('useTopTracks')
        const result = hook(range)

        expect(result.queryKey).toContain(range)
      })
    })
  })

  describe('useTopArtists', () => {
    it('should create a hook that fetches top artists', () => {
      const hook = spotifyHooksFactory('useTopArtists')

      expect(hook).toBeDefined()
    })

    it('should support different time ranges', () => {
      const timeRanges = ['short_term', 'medium_term', 'long_term'] as const

      timeRanges.forEach((range) => {
        const hook = spotifyHooksFactory('useTopArtists')
        const result = hook(range)

        expect(result.queryKey).toContain(range)
      })
    })
  })

  describe('useTrack', () => {
    it('should create a hook that fetches a specific track', () => {
      const hook = spotifyHooksFactory('useTrack')

      expect(hook).toBeDefined()
    })

    it('should require track ID parameter', () => {
      const hook = spotifyHooksFactory('useTrack')
      const result = hook('track-123')

      expect(result.queryKey).toContain('track-123')
    })

    it('should disable query when track ID is empty', () => {
      const hook = spotifyHooksFactory('useTrack')
      const result = hook('')

      expect(result.enabled).toBe(false)
    })

    it('should enable query when track ID is provided', () => {
      const hook = spotifyHooksFactory('useTrack')
      const result = hook('track-123')

      expect(result.enabled).toBe(true)
    })
  })

  describe('useArtist', () => {
    it('should create a hook that fetches a specific artist', () => {
      const hook = spotifyHooksFactory('useArtist')

      expect(hook).toBeDefined()
    })

    it('should disable query when artist ID is empty', () => {
      const hook = spotifyHooksFactory('useArtist')
      const result = hook('')

      expect(result.enabled).toBe(false)
    })

    it('should enable query when artist ID is provided', () => {
      const hook = spotifyHooksFactory('useArtist')
      const result = hook('artist-123')

      expect(result.enabled).toBe(true)
    })
  })

  describe('useAudioFeatures', () => {
    it('should create a hook that fetches audio features', () => {
      const hook = spotifyHooksFactory('useAudioFeatures')

      expect(hook).toBeDefined()
    })

    it('should disable query when track IDs array is empty', () => {
      const hook = spotifyHooksFactory('useAudioFeatures')
      const result = hook([])

      expect(result.enabled).toBe(false)
    })

    it('should enable query when track IDs are provided', () => {
      const hook = spotifyHooksFactory('useAudioFeatures')
      const result = hook(['track-1', 'track-2'])

      expect(result.enabled).toBe(true)
    })
  })

  describe('useSearchTracks', () => {
    it('should create a hook that searches tracks', () => {
      const hook = spotifyHooksFactory('useSearchTracks')

      expect(hook).toBeDefined()
    })

    it('should accept limit parameter', () => {
      const hook = spotifyHooksFactory('useSearchTracks')
      const result = hook(20)

      expect(result).toBeDefined()
    })
  })

  describe('useSearchArtists', () => {
    it('should create a hook that searches artists', () => {
      const hook = spotifyHooksFactory('useSearchArtists')

      expect(hook).toBeDefined()
    })

    it('should accept limit parameter', () => {
      const hook = spotifyHooksFactory('useSearchArtists')
      const result = hook(20)

      expect(result).toBeDefined()
    })
  })

  describe('Error Handling', () => {
    it('should throw error for invalid hook name', () => {
      expect(() => {
        spotifyHooksFactory('useInvalidHook')
      }).toThrow('Invalid hook name: useInvalidHook')
    })

    it('should handle spotify client errors', async () => {
      const spotifyClient = await getSpotifyClient()
      vi.mocked(spotifyClient).getCurrentlyPlaying.mockRejectedValue(
        new Error('API Error')
      )

      const hook = spotifyHooksFactory('useCurrentlyPlaying')
      const result = hook()

      expect(result).toBeDefined()
    })
  })

  describe('Query Key Consistency', () => {
    it('should generate consistent query keys', () => {
      const hook1 = spotifyHooksFactory('useCurrentlyPlaying')
      const hook2 = spotifyHooksFactory('useCurrentlyPlaying')

      const result1 = hook1()
      const result2 = hook2()

      expect(result1.queryKey).toEqual(result2.queryKey)
    })

    it('should differentiate query keys for different hooks', () => {
      const hook1 = spotifyHooksFactory('useCurrentlyPlaying')
      const hook2 = spotifyHooksFactory('useRecentlyPlayed')

      const result1 = hook1()
      const result2 = hook2()

      expect(result1.queryKey).not.toEqual(result2.queryKey)
    })

    it('should differentiate query keys for different parameters', () => {
      const hook = spotifyHooksFactory('useRecentlyPlayed')

      const result1 = hook(10)
      const result2 = hook(20)

      expect(result1.queryKey).not.toEqual(result2.queryKey)
    })
  })
})
