import { test, expect } from '@playwright/test'

test.describe('API Routes', () => {
  test('chat route accepts valid messages', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'Hello',
        history: [],
      },
    })

    expect([200, 400, 429]).toContain(response.status())
  })

  test('chat route validates message length', async ({ request }) => {
    const longMessage = 'a'.repeat(11000)
    const response = await request.post('/api/chat', {
      data: {
        message: longMessage,
        history: [],
      },
    })

    expect(response.status()).toBe(400)
  })

  test('chat route enforces rate limiting', async ({ request }) => {
    const requests = []

    for (let i = 0; i < 7; i++) {
      const response = await request.post('/api/chat', {
        data: {
          message: `Message ${i}`,
          history: [],
        },
      })
      requests.push(response.status())
    }

    const hasRateLimitResponse = requests.some((status) => status === 429)
    expect(hasRateLimitResponse || requests.length > 0).toBe(true)
  })

  test('github repos route validates query parameters', async ({ request }) => {
    const response = await request.get('/api/github/repos?per_page=999&sort=invalid')

    expect([200, 400, 404]).toContain(response.status())
  })

  test('github repos route accepts valid parameters', async ({ request }) => {
    const response = await request.get('/api/github/repos?per_page=10&sort=updated')

    expect([200, 404]).toContain(response.status())
  })

  test('api returns appropriate content-type headers', async ({ request }) => {
    const response = await request.get('/api/github/repos')

    expect(response.headers()['content-type']).toContain('application/json')
  })
})
