import { expect, test } from '@playwright/test';

test.describe('Now page', () => {
  test('renders the live widget section headings', async ({ page }) => {
    await page.goto('/now');

    await expect(page.getByRole('heading', { name: 'Now' })).toBeVisible();
    for (const title of [
      'By the numbers',
      'Listening',
      'Running',
      'Code',
      'Latest post',
    ]) {
      await expect(page.getByRole('heading', { name: title })).toBeVisible();
    }
  });

  test('shows the manually curated stat tiles', async ({ page }) => {
    await page.goto('/now');

    const numbers = page.locator('section', {
      has: page.getByRole('heading', { name: 'By the numbers' }),
    });
    await expect(numbers.getByText('Coffees')).toBeVisible();
    await expect(numbers.getByText('Books')).toBeVisible();
  });

  test('has no console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/now');
    await page.waitForLoadState('networkidle');

    expect(errors).toEqual([]);
  });
});
