import { describe, it, expect } from 'vitest'

describe('Performance Benchmarks', () => {
  describe('Operation Timing', () => {
    const measurePerformance = async (
      operation: () => Promise<void>,
      label: string
    ): Promise<number> => {
      const start = performance.now()
      await operation()
      const end = performance.now()
      const duration = end - start

      console.log(`${label}: ${duration.toFixed(2)}ms`)
      return duration
    }

    it('should complete simple operation within threshold', async () => {
      const duration = await measurePerformance(async () => {
        await new Promise((r) => setTimeout(r, 10))
      }, 'Simple operation')

      expect(duration).toBeGreaterThanOrEqual(10)
      expect(duration).toBeLessThan(100)
    })

    it('should track operation duration growth', async () => {
      const durations: number[] = []

      for (let i = 1; i <= 3; i++) {
        const d = await measurePerformance(async () => {
          await new Promise((r) => setTimeout(r, i * 10))
        }, `Operation ${i}`)
        durations.push(d)
      }

      // Each should be roughly linear
      expect(durations[1]).toBeGreaterThan(durations[0])
      expect(durations[2]).toBeGreaterThan(durations[1])
    })
  })

  describe('Array Operations', () => {
    const benchmark = (name: string, fn: () => void): number => {
      const start = performance.now()
      fn()
      const end = performance.now()
      const duration = end - start
      console.log(`${name}: ${duration.toFixed(4)}ms`)
      return duration
    }

    it('should measure array creation', () => {
      const duration = benchmark('Create array with 10000 items', () => {
        Array(10000)
          .fill(null)
          .map((_, i) => i)
      })

      expect(duration).toBeLessThan(50)
    })

    it('should measure array filtering', () => {
      const arr = Array(10000)
        .fill(null)
        .map((_, i) => i)

      const duration = benchmark('Filter 10000 items', () => {
        arr.filter((x) => x % 2 === 0)
      })

      expect(duration).toBeLessThan(50)
    })

    it('should measure nested loop performance', () => {
      const duration = benchmark('Nested loop 100x100', () => {
        let sum = 0
        for (let i = 0; i < 100; i++) {
          for (let j = 0; j < 100; j++) {
            sum += i + j
          }
        }
      })

      expect(duration).toBeLessThan(10)
    })

    it('should measure object lookups', () => {
      const obj: Record<string, number> = {}
      for (let i = 0; i < 10000; i++) {
        obj[`key${i}`] = i
      }

      const duration = benchmark('Lookup 10000 object keys', () => {
        for (let i = 0; i < 10000; i++) {
          const _ = obj[`key${i}`]
        }
      })

      expect(duration).toBeLessThan(10)
    })
  })

  describe('String Operations', () => {
    const benchmark = (name: string, fn: () => void): number => {
      const start = performance.now()
      fn()
      const end = performance.now()
      const duration = end - start
      console.log(`${name}: ${duration.toFixed(4)}ms`)
      return duration
    }

    it('should measure string concatenation', () => {
      const duration = benchmark('Concatenate 1000 strings', () => {
        let result = ''
        for (let i = 0; i < 1000; i++) {
          result += `string${i}`
        }
      })

      expect(duration).toBeLessThan(10)
    })

    it('should measure string replace', () => {
      const str = 'hello world hello world hello world'.repeat(100)

      const duration = benchmark('Replace in long string', () => {
        str.replace(/hello/g, 'goodbye')
      })

      expect(duration).toBeLessThan(10)
    })

    it('should measure string split', () => {
      const str = 'a,b,c,d,e,f,g,h,i,j'.repeat(100)

      const duration = benchmark('Split long string', () => {
        str.split(',')
      })

      expect(duration).toBeLessThan(10)
    })
  })

  describe('Memory Efficiency', () => {
    const getMemoryUsage = (): number => {
      if (typeof process !== 'undefined' && process.memoryUsage) {
        return process.memoryUsage().heapUsed
      }
      return 0
    }

    it('should not leak memory in loops', () => {
      const initialMemory = getMemoryUsage()

      // Run operation multiple times
      for (let i = 0; i < 100; i++) {
        const arr = Array(1000)
          .fill(null)
          .map((_, j) => j * 2)
        const _ = arr.reduce((a, b) => a + b, 0)
      }

      const finalMemory = getMemoryUsage()
      const memoryGrowth = finalMemory - initialMemory

      // Memory growth should be reasonable (allows for some heap allocation variance)
      expect(memoryGrowth).toBeLessThan(5 * 1024 * 1024) // Less than 5MB growth
    })
  })

  describe('Async Performance', () => {
    const measureAsyncPerformance = async (
      operations: (() => Promise<void>)[],
      label: string
    ): Promise<number> => {
      const start = performance.now()
      await Promise.all(operations.map((op) => op()))
      const end = performance.now()
      const duration = end - start

      console.log(`${label}: ${duration.toFixed(2)}ms`)
      return duration
    }

    it('should measure concurrent operations', async () => {
      const duration = await measureAsyncPerformance(
        Array(10)
          .fill(null)
          .map(
            () => async () => {
              await new Promise((r) => setTimeout(r, 10))
            }
          ),
        'Concurrent 10x 10ms operations'
      )

      // Should complete in ~10ms (concurrent), not 100ms (sequential)
      expect(duration).toBeGreaterThanOrEqual(10)
      expect(duration).toBeLessThan(50)
    })

    it('should measure sequential operations', async () => {
      let totalTime = 0

      for (let i = 0; i < 5; i++) {
        const start = performance.now()
        await new Promise((r) => setTimeout(r, 10))
        const end = performance.now()
        totalTime += end - start
      }

      // Should be roughly 50ms (sequential)
      expect(totalTime).toBeGreaterThanOrEqual(50)
      expect(totalTime).toBeLessThan(100)
    })
  })

  describe('Throughput Metrics', () => {
    it('should measure requests per second', async () => {
      let successCount = 0
      const start = performance.now()

      // Simulate 100 requests
      await Promise.all(
        Array(100)
          .fill(null)
          .map(async () => {
            await new Promise((r) => setTimeout(r, 1))
            successCount++
          })
      )

      const end = performance.now()
      const durationSeconds = (end - start) / 1000
      const rps = successCount / durationSeconds

      console.log(`Throughput: ${rps.toFixed(2)} requests/second`)
      expect(rps).toBeGreaterThan(100) // At least 100 RPS
    })

    it('should measure latency percentiles', async () => {
      const latencies: number[] = []

      for (let i = 0; i < 100; i++) {
        const start = performance.now()
        await new Promise((r) => setTimeout(r, Math.random() * 10))
        const latency = performance.now() - start
        latencies.push(latency)
      }

      latencies.sort((a, b) => a - b)

      const p50 = latencies[Math.floor(latencies.length * 0.5)]
      const p95 = latencies[Math.floor(latencies.length * 0.95)]
      const p99 = latencies[Math.floor(latencies.length * 0.99)]

      console.log(`P50: ${p50.toFixed(2)}ms, P95: ${p95.toFixed(2)}ms, P99: ${p99.toFixed(2)}ms`)

      expect(p50).toBeGreaterThan(0)
      expect(p95).toBeGreaterThan(p50)
      expect(p99).toBeGreaterThan(p95)
    })
  })

  describe('Caching Impact', () => {
    it('should demonstrate cache benefit', () => {
      // Without caching
      const startNoCached = performance.now()

      for (let i = 0; i < 1000; i++) {
        const result = fibonacci(20)
      }

      const noCachedTime = performance.now() - startNoCached

      // With caching
      const cache: Record<number, number> = {}
      const cachedFibonacci = (n: number): number => {
        if (n in cache) return cache[n]
        if (n <= 1) return n
        cache[n] = cachedFibonacci(n - 1) + cachedFibonacci(n - 2)
        return cache[n]
      }

      const startCached = performance.now()

      for (let i = 0; i < 1000; i++) {
        const result = cachedFibonacci(20)
      }

      const cachedTime = performance.now() - startCached

      console.log(`No cache: ${noCachedTime.toFixed(2)}ms, Cached: ${cachedTime.toFixed(2)}ms`)

      // Cached should be significantly faster
      expect(cachedTime).toBeLessThan(noCachedTime / 10)
    })
  })
})

// Helper function
const fibonacci = (n: number): number => {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}
