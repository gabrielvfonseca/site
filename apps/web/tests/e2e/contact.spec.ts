import { expect, test } from '@playwright/test';

test.describe('Contact page', () => {
  test('renders heading, form fields and fallback links', async ({ page }) => {
    await page.goto('/contact');
    await expect(
      page.getByRole('heading', { name: 'Get in touch' })
    ).toBeVisible();
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Send message' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Email me directly' })
    ).toBeVisible();
  });

  test('server-action validation surfaces field errors', async ({ page }) => {
    await page.goto('/contact');
    // Values that pass HTML checks but fail the zod schema.
    await page.getByLabel('Name').fill('a');
    await page.getByLabel('Email').fill('valid@example.com');
    await page.getByLabel('Message').fill('hi');
    await page.getByRole('button', { name: 'Send message' }).click();

    await expect(
      page.getByText('Name must be at least 2 characters')
    ).toBeVisible();
    await expect(
      page.getByText('Message must be at least 10 characters')
    ).toBeVisible();
    await expect(page.getByLabel('Name')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });
});
