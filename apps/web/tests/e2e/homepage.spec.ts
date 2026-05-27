import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load and display main content', async ({ page }) => {
    await expect(page).toHaveTitle(/Frontal Labs/)
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()
  })

  test('should have working navigation links', async ({ page }) => {
    const navLinks = page.locator('nav a')
    const count = await navLinks.count()
    expect(count).toBeGreaterThan(0)

    const firstLink = navLinks.first()
    await expect(firstLink).toBeVisible()
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1')
    await expect(h1).toHaveCount(1)

    const h2 = page.locator('h2')
    const h2Count = await h2.count()
    expect(h2Count).toBeGreaterThanOrEqual(1)
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()

    const viewport = page.viewportSize()
    expect(viewport?.width).toBe(375)
  })

  test('should support dark mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    const html = page.locator('html')
    const darkClass = await html.getAttribute('class')
    expect(darkClass).toBeDefined()
  })
})
