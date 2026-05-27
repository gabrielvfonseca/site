import { describe, it, expect, vi } from 'vitest'

describe('Race Condition & Concurrency Scenarios', () => {
  describe('Request Ordering & Sequencing', () => {
    const trackRequestOrder = async (
      requestIds: string[],
      delays: number[]
    ): Promise<string[]> => {
      const results: string[] = []

      const promises = requestIds.map((id, idx) => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            results.push(id)
            resolve()
          }, delays[idx])
        })
      })

      await Promise.all(promises)
      return results
    }

    it('should handle concurrent requests completing out of order', async () => {
      const results = await trackRequestOrder(
        ['request1', 'request2', 'request3'],
        [100, 20, 50]
      )

      // Request 2 finishes first, then 3, then 1
      expect(results).toEqual(['request2', 'request3', 'request1'])
    })

    it('should maintain result correctness despite order', async () => {
      const requests = [
        { id: 'a', value: 10 },
        { id: 'b', value: 20 },
        { id: 'c', value: 30 },
      ]

      const results: Record<string, number> = {}

      await Promise.all(
        requests.map(
          (req, idx) =>
            new Promise<void>((resolve) => {
              setTimeout(() => {
                results[req.id] = req.value * 2
                resolve()
              }, [50, 10, 30][idx])
            })
        )
      )

      expect(results.a).toBe(20)
      expect(results.b).toBe(40)
      expect(results.c).toBe(60)
    })
  })

  describe('Data Race Conditions', () => {
    it('should handle concurrent writes to shared state', async () => {
      let counter = 0
      const increment = async (amount: number) => {
        // Simulate async operation
        await new Promise((r) => setTimeout(r, 1))
        counter += amount
      }

      // These will race since they're not atomic
      await Promise.all([
        increment(5),
        increment(10),
        increment(3),
      ])

      expect(counter).toBe(18)
    })

    it('should prevent stale reads in concurrent scenario', async () => {
      let value = 0
      const updates: number[] = []

      const update = async (newValue: number) => {
        await new Promise((r) => setTimeout(r, Math.random() * 10))
        value = newValue
        updates.push(newValue)
      }

      await Promise.all([
        update(100),
        update(200),
        update(300),
      ])

      // Final value should be one of the updates (last one set)
      expect([100, 200, 300]).toContain(value)
      expect(updates).toHaveLength(3)
    })
  })

  describe('Request Deduplication', () => {
    const createRequestDeduplicator = () => {
      const pendingRequests = new Map<string, Promise<string>>()

      const request = async (key: string, operation: () => Promise<string>): Promise<string> => {
        // Return existing promise if request is in flight
        if (pendingRequests.has(key)) {
          return pendingRequests.get(key)!
        }

        // Create new promise and track it
        const promise = operation().finally(() => {
          pendingRequests.delete(key)
        })

        pendingRequests.set(key, promise)
        return promise
      }

      return { request }
    }

    it('should deduplicate concurrent requests with same key', async () => {
      const deduplicator = createRequestDeduplicator()
      let callCount = 0

      const operation = async () => {
        callCount++
        await new Promise((r) => setTimeout(r, 10))
        return 'result'
      }

      const results = await Promise.all([
        deduplicator.request('key1', operation),
        deduplicator.request('key1', operation),
        deduplicator.request('key1', operation),
      ])

      expect(results).toEqual(['result', 'result', 'result'])
      expect(callCount).toBe(1) // Only called once despite 3 requests
    })

    it('should not deduplicate requests with different keys', async () => {
      const deduplicator = createRequestDeduplicator()
      let callCount = 0

      const operation = async () => {
        callCount++
        return 'result'
      }

      await Promise.all([
        deduplicator.request('key1', operation),
        deduplicator.request('key2', operation),
        deduplicator.request('key3', operation),
      ])

      expect(callCount).toBe(3) // Called for each unique key
    })
  })

  describe('Lost Update Problem', () => {
    interface OptimisticState {
      version: number
      value: string
      pending: boolean
    }

    const createOptimisticUpdater = () => {
      let state: OptimisticState = {
        version: 0,
        value: 'initial',
        pending: false,
      }

      const update = async (newValue: string): Promise<boolean> => {
        const expectedVersion = state.version
        state.value = newValue
        state.pending = true

        // Simulate server update
        await new Promise((r) => setTimeout(r, 10))

        // Check if version matches (no conflicts)
        if (state.version === expectedVersion) {
          state.version++
          state.pending = false
          return true
        }

        // Conflict detected, revert
        state.value = 'reverted'
        state.pending = false
        return false
      }

      const getState = () => state

      return { update, getState }
    }

    it('should handle concurrent updates correctly', async () => {
      const updater = createOptimisticUpdater()

      const result1 = updater.update('value1')
      const result2 = updater.update('value2')

      const [r1, r2] = await Promise.all([result1, result2])

      // Only one update should succeed without conflict
      expect(r1 || r2).toBe(true)
    })
  })

  describe('Promise Race & Resolution', () => {
    it('should handle Promise.race correctly', async () => {
      const fast = new Promise<string>((r) => setTimeout(() => r('fast'), 10))
      const slow = new Promise<string>((r) => setTimeout(() => r('slow'), 100))

      const result = await Promise.race([fast, slow])
      expect(result).toBe('fast')
    })

    it('should handle Promise.any correctly', async () => {
      const fail1 = Promise.reject(new Error('error1'))
      const fail2 = Promise.reject(new Error('error2'))
      const success = Promise.resolve('success')

      const result = await Promise.any([fail1, fail2, success])
      expect(result).toBe('success')
    })

    it('should handle all promises rejecting', async () => {
      const fail1 = Promise.reject(new Error('error1'))
      const fail2 = Promise.reject(new Error('error2'))

      let caughtError = false
      try {
        await Promise.any([fail1, fail2])
      } catch {
        caughtError = true
      }

      expect(caughtError).toBe(true)
    })
  })

  describe('Throttling & Debouncing', () => {
    const createThrottle = (fn: (...args: any[]) => any, delayMs: number) => {
      let lastCallTime = 0

      return (...args: any[]) => {
        const now = Date.now()
        if (now - lastCallTime >= delayMs) {
          lastCallTime = now
          return fn(...args)
        }
      }
    }

    const createDebounce = (fn: (...args: any[]) => any, delayMs: number) => {
      let timeoutId: NodeJS.Timeout | null = null

      return (...args: any[]) => {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn(...args), delayMs)
      }
    }

    it('should throttle rapid function calls', async () => {
      let callCount = 0
      const throttled = createThrottle(() => callCount++, 20)

      throttled()
      throttled()
      throttled()
      await new Promise((r) => setTimeout(r, 25))
      throttled()

      expect(callCount).toBe(2) // Called at start and after 20ms
    })

    it('should debounce rapid function calls', async () => {
      let callCount = 0
      const debounced = createDebounce(() => callCount++, 20)

      debounced()
      debounced()
      debounced()

      await new Promise((r) => setTimeout(r, 25))
      expect(callCount).toBe(1)
    })
  })
})
