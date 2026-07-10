import { expect, test } from '@playwright/test';

// MDX + Shiki highlighting can be slow to compile on first hit in dev.
test.describe.configure({ timeout: 60_000 });

/** Matches either the custom global 404 or Next's default not-found copy. */
const NOT_FOUND = /this page could not be found|could not find requested resource/i;

test.describe('Content detail pages', () => {
  test('a post detail renders MDX, a formatted date and highlighted code', async ({
    page,
  }) => {
    await page.goto('/posts/cost-of-bad-code');

    await expect(page.locator('article h1')).toBeVisible({ timeout: 20_000 });
    await expect(page.locator('article .prose')).toBeVisible();
    await expect(page.locator('article time')).toBeVisible();
    // Real MDX content, not the old placeholder.
    await expect(
      page.getByText('Post content will be loaded here')
    ).toHaveCount(0);
    // Shiki syntax highlighting is applied to code blocks.
    await expect(page.locator('.shiki').first()).toBeVisible();
  });

  test('a project detail renders its MDX content', async ({ page }) => {
    await page.goto('/projects/fluent');
    await expect(page.locator('article h1')).toBeVisible({ timeout: 20_000 });
    await expect(page.locator('article .prose')).toBeVisible();
  });

  test('unknown post and project slugs show the not-found page', async ({
    page,
  }) => {
    for (const path of [
      '/posts/does-not-exist',
      '/projects/does-not-exist',
      '/projects',
      '/posts',
    ]) {
      await page.goto(path);
      await expect(page.getByText(NOT_FOUND)).toBeVisible({ timeout: 15_000 });
    }
  });
});
