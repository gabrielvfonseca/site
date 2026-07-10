import { expect, test } from '@playwright/test';

test.describe('Theme toggle', () => {
  test('switches theme and persists across reload', async ({ page }) => {
    await page.goto('/');

    const light = page.getByRole('button', { name: 'Light' });
    const dark = page.getByRole('button', { name: 'Dark' });
    await expect(light).toBeVisible();

    await light.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await expect(light).toHaveAttribute('aria-pressed', 'true');

    await dark.click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // next-themes persists the choice.
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});
