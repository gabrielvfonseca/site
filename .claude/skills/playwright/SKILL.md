---
name: playwright
description: Browser automation with Playwright. Use when the user asks to test a website, take screenshots, check responsive design, test login flows, fill forms, check broken links, or automate any browser task.
license: Complete terms in LICENSE.txt
---

This skill provides comprehensive browser automation and testing capabilities using Playwright.

The user requests browser automation: website testing, screenshot capture, responsive design verification, or end-to-end testing.

## Playwright Expertise

### Core Capabilities

**Browser Testing**
- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile and tablet emulation
- Headless and headed execution
- Screenshot and video capture
- Network interception and mocking

**User Interaction**
- Form filling and submission
- Click, type, hover interactions
- Keyboard shortcuts and navigation
- File uploads and downloads
- Drag and drop operations

**Content Verification**
- Text and element presence
- Accessibility attributes
- Performance metrics
- Console error monitoring
- Visual regression testing

### Testing Patterns

**Basic Page Testing**:
```typescript
import { test, expect } from '@playwright/test'

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/')
  
  // Check title
  await expect(page).toHaveTitle(/Frontal Labs/)
  
  // Check key elements
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('nav')).toBeVisible()
  
  // Check no console errors
  page.on('console', message => {
    if (message.type() === 'error') {
      throw new Error(`Console error: ${message.text()}`)
    }
  })
})
```

**Responsive Design Testing**:
```typescript
const devices = ['Desktop Chrome', 'iPad', 'iPhone 13']

devices.forEach(device => {
  test(`responsive design on ${device}`, async ({ page }) => {
    await page.goto('/')
    await page.setViewportSize({ width: 1280, height: 720 })
    
    // Test navigation visibility
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
    
    // Test content layout
    const main = page.locator('main')
    await expect(main).toBeVisible()
    
    // Take screenshot for visual comparison
    await page.screenshot({ 
      path: `screenshots/${device.toLowerCase().replace(' ', '-')}.png`,
      fullPage: true 
    })
  })
})
```

**Form Testing**:
```typescript
test('contact form submission', async ({ page }) => {
  await page.goto('/contact')
  
  // Fill form fields
  await page.fill('[name="name"]', 'Test User')
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="message"]', 'This is a test message')
  
  // Submit form
  await page.click('button[type="submit"]')
  
  // Verify success
  await expect(page.locator('.success-message')).toBeVisible()
  await expect(page.locator('.success-message')).toContainText('Thank you')
})
```

**Authentication Testing**:
```typescript
test('user login flow', async ({ page }) => {
  await page.goto('/login')
  
  // Fill login form
  await page.fill('[name="email"]', 'user@example.com')
  await page.fill('[name="password"]', 'password123')
  await page.click('button[type="submit"]')
  
  // Verify redirect to dashboard
  await expect(page).toHaveURL('/dashboard')
  await expect(page.locator('h1')).toContainText('Dashboard')
  
  // Verify user menu appears
  await expect(page.locator('[data-testid="user-menu"]')).toBeVisible()
})
```

### Advanced Features

**API Mocking**:
```typescript
test('with API mocking', async ({ page }) => {
  // Mock API response
  await page.route('/api/posts', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, title: 'Mock Post 1' },
        { id: 2, title: 'Mock Post 2' }
      ])
    })
  })
  
  await page.goto('/blog')
  
  // Verify mocked content
  await expect(page.locator('text=Mock Post 1')).toBeVisible()
  await expect(page.locator('text=Mock Post 2')).toBeVisible()
})
```

**Performance Testing**:
```typescript
test('performance metrics', async ({ page }) => {
  const startTime = Date.now()
  
  await page.goto('/')
  
  // Wait for network idle
  await page.waitForLoadState('networkidle')
  
  const loadTime = Date.now() - startTime
  
  // Get performance metrics
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0
    }
  })
  
  console.log('Load time:', loadTime, 'ms')
  console.log('Performance metrics:', metrics)
  
  // Performance assertions
  expect(loadTime).toBeLessThan(3000) // 3 seconds max
  expect(metrics.firstContentfulPaint).toBeLessThan(1500) // 1.5 seconds max
})
```

**Accessibility Testing**:
```typescript
test('accessibility compliance', async ({ page }) => {
  await page.goto('/')
  
  // Check for proper heading structure
  const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
  expect(headings.length).toBeGreaterThan(0)
  
  // Check for alt text on images
  const imagesWithoutAlt = await page.locator('img:not([alt])').count()
  expect(imagesWithoutAlt).toBe(0)
  
  // Check for form labels
  const inputsWithoutLabels = await page.locator('input:not([aria-label]):not([aria-labelledby])').all()
  for (const input of inputsWithoutLabels) {
    const hasLabel = await page.locator(`label[for="${await input.getAttribute('id')}"]`).count() > 0
    expect(hasLabel).toBe(true)
  }
  
  // Check for ARIA attributes
  await expect(page.locator('[role="navigation"]')).toBeVisible()
  await expect(page.locator('[role="main"]')).toBeVisible()
})
```

### Configuration Files

**playwright.config.ts**:
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    }
  ],
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  }
})
```

### Best Practices

**Test Organization**:
- Group related tests with `describe`
- Use meaningful test names
- Implement proper setup/teardown
- Use data-testid for stable selectors

**Error Handling**:
- Implement retry logic for flaky tests
- Add proper assertions with helpful messages
- Use waitFor for dynamic content
- Monitor console errors

**Performance**:
- Use parallel execution
- Optimize test data setup
- Implement smart waiting strategies
- Avoid unnecessary sleeps

### Integration with Project

This skill integrates with Frontal Labs' testing workflow:
- Uses project's Playwright configuration
- Follows established test patterns
- Integrates with CI/CD pipeline
- Provides comprehensive coverage

Remember: Playwright tests should be reliable, maintainable, and provide confidence that the application works correctly across all browsers and devices. Focus on user-critical paths and edge cases that matter most.
