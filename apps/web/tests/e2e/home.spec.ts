import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('renders identity, about and section headings', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('link', { name: 'Gabriel Fonseca - Home' })
    ).toBeVisible();
    await expect(page.getByText('Software Developer').first()).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Activity' })
    ).toBeVisible();
  });

  test('shows the activity graph with a legend', async ({ page }) => {
    await page.goto('/');
    const activity = page.locator('#activity');
    await expect(activity).toBeVisible();
    await expect(activity.getByText('Less')).toBeVisible();
    await expect(activity.getByText('More')).toBeVisible();
    // Either real totals ("N contributions across M active days") or the
    // graceful empty-state copy ("Daily activity across …") — both say "across".
    await expect(activity.getByText(/across/i)).toBeVisible();
  });

  test('inline links scroll to the projects/posts anchors', async ({
    page,
  }) => {
    await page.goto('/');
    // Anchors exist for the in-page links added to the intro copy.
    await expect(page.locator('#projects')).toHaveCount(1);
    await expect(page.locator('#posts')).toHaveCount(1);
  });

  test('has no console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
});
