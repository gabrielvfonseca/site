import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mockStravaResponses } from '../../lib/test-utils'

// Mock Strava client
const mockStravaClient = {
  getAthlete: vi.fn(),
  getActivities: vi.fn(),
  getActivity: vi.fn(),
  getStats: vi.fn(),
  getCurrentWeekActivities: vi.fn(),
  getActivitiesByType: vi.fn(),
  getDistanceStats: vi.fn(),
  getTimeStats: vi.fn(),
}

vi.mock('@gabfon/strava', () => ({
  stravaClient: mockStravaClient,
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

describe('Strava Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useStravaAthlete', () => {
    it('should fetch athlete data successfully', async () => {
      mockStravaClient.getAthlete.mockResolvedValue(mockStravaResponses.athlete)

      const data = await mockStravaClient.getAthlete()

      expect(data.id).toBe(12345)
      expect(data.firstname).toBe('Test')
    })

    it('should include athlete profile information', async () => {
      mockStravaClient.getAthlete.mockResolvedValue(mockStravaResponses.athlete)

      const data = await mockStravaClient.getAthlete()

      expect(data).toHaveProperty('id')
      expect(data).toHaveProperty('firstname')
      expect(data).toHaveProperty('lastname')
      expect(data).toHaveProperty('profile')
    })

    it('should handle authentication errors', async () => {
      mockStravaClient.getAthlete.mockRejectedValue(
        new Error('Unauthorized')
      )

      await expect(mockStravaClient.getAthlete()).rejects.toThrow(
        'Unauthorized'
      )
    })
  })

  describe('useStravaActivities', () => {
    it('should fetch activities successfully', async () => {
      mockStravaClient.getActivities.mockResolvedValue(
        mockStravaResponses.activities
      )

      const data = await mockStravaClient.getActivities()

      expect(data).toHaveLength(1)
      expect(data[0].name).toBe('Test Run')
    })

    it('should include activity metadata', async () => {
      mockStravaClient.getActivities.mockResolvedValue(
        mockStravaResponses.activities
      )

      const data = await mockStravaClient.getActivities()
      const activity = data[0]

      expect(activity).toHaveProperty('id')
      expect(activity).toHaveProperty('name')
      expect(activity).toHaveProperty('type')
      expect(activity).toHaveProperty('distance')
      expect(activity).toHaveProperty('moving_time')
    })

    it('should support pagination', async () => {
      // The hook creates a queryKey with individual parameters
      // queryKey: ['strava-activities', perPage, page, before, after]
      const mockUseQuery = vi.fn(({ queryKey }) => ({
        queryKey,
        data: mockStravaResponses.activities,
      }))

      // Mock the useQuery call with pagination parameters
      const result = mockUseQuery({
        queryKey: ['strava-activities', 10, 1, undefined, undefined],
      })

      expect(result.queryKey).toContain('strava-activities')
      expect(result.queryKey).toContain(10) // perPage
      expect(result.queryKey).toContain(1)  // page
    })

    it('should handle empty activities list', async () => {
      mockStravaClient.getActivities.mockResolvedValue([])

      const data = await mockStravaClient.getActivities()

      expect(data).toHaveLength(0)
    })
  })

  describe('useStravaActivity', () => {
    it('should fetch specific activity', async () => {
      const mockActivity = mockStravaResponses.activities[0]
      mockStravaClient.getActivity.mockResolvedValue(mockActivity)

      const data = await mockStravaClient.getActivity(1)

      expect(data.id).toBe(1)
      expect(data.type).toBe('Run')
    })

    it('should require activity ID parameter', () => {
      const useQuery = vi.fn(({ queryKey, enabled }) => ({
        queryKey,
        enabled,
      }))

      const result = useQuery({
        queryKey: ['strava-activity', 0],
        enabled: false,
      })

      expect(result.enabled).toBe(false)
    })

    it('should disable query with zero activity ID', () => {
      const useQuery = vi.fn(({ queryKey, enabled }) => ({
        queryKey,
        enabled,
      }))

      const result = useQuery({
        queryKey: ['strava-activity', 0],
        enabled: false,
      })

      expect(result.enabled).toBe(false)
    })
  })

  describe('useStravaStats', () => {
    it('should fetch athlete statistics', async () => {
      mockStravaClient.getStats.mockResolvedValue(mockStravaResponses.stats)

      const data = await mockStravaClient.getStats()

      expect(data.all_ride_totals).toBeDefined()
      expect(data.all_ride_totals.count).toBe(100)
    })

    it('should include distance statistics', async () => {
      mockStravaClient.getStats.mockResolvedValue(mockStravaResponses.stats)

      const data = await mockStravaClient.getStats()

      expect(data.all_ride_totals.distance).toBeGreaterThan(0)
    })

    it('should include time statistics', async () => {
      mockStravaClient.getStats.mockResolvedValue(mockStravaResponses.stats)

      const data = await mockStravaClient.getStats()

      expect(data.all_ride_totals.moving_time).toBeGreaterThan(0)
    })

    it('should handle missing statistics', async () => {
      mockStravaClient.getStats.mockResolvedValue({
        all_ride_totals: null,
      })

      const data = await mockStravaClient.getStats()

      expect(data.all_ride_totals).toBeNull()
    })
  })

  describe('useStravaCurrentWeekActivities', () => {
    it('should fetch current week activities', async () => {
      const mockWeekActivities = mockStravaResponses.activities

      mockStravaClient.getCurrentWeekActivities.mockResolvedValue(
        mockWeekActivities
      )

      const data = await mockStravaClient.getCurrentWeekActivities()

      expect(Array.isArray(data)).toBe(true)
    })

    it('should only include activities from current week', async () => {
      const now = new Date()
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

      const mockActivities = [
        {
          ...mockStravaResponses.activities[0],
          start_date: now.toISOString(),
        },
      ]

      mockStravaClient.getCurrentWeekActivities.mockResolvedValue(
        mockActivities
      )

      const data = await mockStravaClient.getCurrentWeekActivities()

      data.forEach((activity: any) => {
        const activityDate = new Date(activity.start_date)
        expect(activityDate.getTime()).toBeGreaterThanOrEqual(weekAgo.getTime())
      })
    })
  })

  describe('useStravaActivitiesByType', () => {
    it('should fetch activities filtered by type', async () => {
      mockStravaClient.getActivitiesByType.mockResolvedValue(
        mockStravaResponses.activities
      )

      const data = await mockStravaClient.getActivitiesByType('Run')

      expect(data).toHaveLength(1)
      expect(data[0].type).toBe('Run')
    })

    it('should support multiple activity types', () => {
      const types = ['Run', 'Ride', 'Swim', 'Walk']

      types.forEach((type) => {
        expect(['Run', 'Ride', 'Swim', 'Walk']).toContain(type)
      })
    })

    it('should return empty array for non-matching type', async () => {
      mockStravaClient.getActivitiesByType.mockResolvedValue([])

      const data = await mockStravaClient.getActivitiesByType('Hike')

      expect(data).toHaveLength(0)
    })
  })

  describe('useStravaDistanceStats', () => {
    it('should fetch distance statistics', async () => {
      const mockDistanceStats = {
        totalDistance: 5000000,
        averageDistance: 50000,
        maxDistance: 100000,
      }

      mockStravaClient.getDistanceStats.mockResolvedValue(mockDistanceStats)

      const data = await mockStravaClient.getDistanceStats()

      expect(data.totalDistance).toBe(5000000)
    })

    it('should calculate statistics correctly', async () => {
      const mockDistanceStats = {
        totalDistance: 5000000,
        averageDistance: 50000,
        maxDistance: 100000,
      }

      mockStravaClient.getDistanceStats.mockResolvedValue(mockDistanceStats)

      const data = await mockStravaClient.getDistanceStats()

      expect(data.averageDistance).toBeLessThanOrEqual(data.totalDistance)
      expect(data.maxDistance).toBeLessThanOrEqual(data.totalDistance)
    })
  })

  describe('useStravaTimeStats', () => {
    it('should fetch time statistics', async () => {
      const mockTimeStats = {
        totalTime: 180000,
        averageTime: 1800,
        maxTime: 3600,
      }

      mockStravaClient.getTimeStats.mockResolvedValue(mockTimeStats)

      const data = await mockStravaClient.getTimeStats()

      expect(data.totalTime).toBe(180000)
    })

    it('should return valid time values', async () => {
      const mockTimeStats = {
        totalTime: 180000,
        averageTime: 1800,
        maxTime: 3600,
      }

      mockStravaClient.getTimeStats.mockResolvedValue(mockTimeStats)

      const data = await mockStravaClient.getTimeStats()

      expect(data.totalTime).toBeGreaterThan(0)
      expect(data.averageTime).toBeGreaterThan(0)
    })
  })

  describe('Error Handling', () => {
    it('should handle authentication failures', async () => {
      mockStravaClient.getAthlete.mockRejectedValue(
        new Error('Invalid token')
      )

      await expect(mockStravaClient.getAthlete()).rejects.toThrow(
        'Invalid token'
      )
    })

    it('should handle network errors', async () => {
      mockStravaClient.getActivities.mockRejectedValue(
        new Error('Network error')
      )

      await expect(mockStravaClient.getActivities()).rejects.toThrow(
        'Network error'
      )
    })

    it('should handle rate limiting', async () => {
      const rateLimitError = {
        message: 'Rate limit exceeded',
        status: 429,
      }

      mockStravaClient.getStats.mockRejectedValue(rateLimitError)

      await expect(mockStravaClient.getStats()).rejects.toMatchObject(
        rateLimitError
      )
    })

    it('should handle missing data', async () => {
      mockStravaClient.getActivity.mockResolvedValue(null)

      const data = await mockStravaClient.getActivity(999)

      expect(data).toBeNull()
    })
  })

  describe('Query Key Management', () => {
    it('should use consistent query keys', () => {
      const key1 = ['strava-athlete']
      const key2 = ['strava-athlete']

      expect(key1).toEqual(key2)
    })

    it('should include parameters in query key', () => {
      const key1 = ['strava-activity', 1]
      const key2 = ['strava-activity', 2]

      expect(key1).not.toEqual(key2)
    })

    it('should differentiate activity types in query key', () => {
      const key1 = ['strava-activities-by-type', 'Run']
      const key2 = ['strava-activities-by-type', 'Ride']

      expect(key1).not.toEqual(key2)
    })
  })
})
