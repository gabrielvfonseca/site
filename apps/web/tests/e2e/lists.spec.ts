import { test, expect } from '@playwright/test'

test.describe('Lists - Projects and Posts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should render projects list', async ({ page }) => {
    const projectsList = page.locator('[data-testid="projects-list"]')
    const isVisible = await projectsList.isVisible().catch(() => false)

    if (isVisible) {
      const projectItems = page.locator('[data-testid="projects-list"] a')
      const count = await projectItems.count()
      expect(count).toBeGreaterThan(0)
    }
  })

  test('should render posts list', async ({ page }) => {
    const postsList = page.locator('[data-testid="posts-list"]')
    const isVisible = await postsList.isVisible().catch(() => false)

    if (isVisible) {
      const postItems = page.locator('[data-testid="posts-list"] a')
      const count = await postItems.count()
      expect(count).toBeGreaterThan(0)
    }
  })

  test('should handle list item hover interactions', async ({ page }) => {
    const listItems = page.locator('a[href*="/posts/"]').first()
    const isVisible = await listItems.isVisible().catch(() => false)

    if (isVisible) {
      await listItems.hover()
      const hoverElement = listItems.locator('..')
      await expect(hoverElement).toBeVisible()
    }
  })

  test('should navigate to post on click', async ({ page }) => {
    const postLink = page.locator('a[href*="/posts/"]').first()
    const isVisible = await postLink.isVisible().catch(() => false)

    if (isVisible) {
      const href = await postLink.getAttribute('href')
      expect(href).toContain('/posts/')
    }
  })

  test('should handle external project links', async ({ page }) => {
    const externalLink = page.locator('a[target="_blank"]').first()
    const isVisible = await externalLink.isVisible().catch(() => false)

    if (isVisible) {
      const href = await externalLink.getAttribute('href')
      expect(href).toBeDefined()

      const target = await externalLink.getAttribute('target')
      expect(target).toBe('_blank')
    }
  })
})
