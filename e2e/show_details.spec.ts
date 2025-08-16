import { test, expect } from '@playwright/test';

test.describe('Show Details - movie', () => {
  test('renders sections and trailer interaction (movie)', async ({ page }) => {
    await page.goto('/show/movie/550'); // Fight Club
    await expect(page.getByRole('heading', { name: /movie/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();

    // Sections
    await expect(page.getByRole('heading', { name: /details/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /production/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /top billed cast/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /recommended/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /similar/i })).toBeVisible();

    // Seasons should not appear for movies
    await expect(page.getByRole('heading', { name: /seasons/i })).toHaveCount(0);

    // Actions bar items (label always present)
    await expect(page.getByLabel('Your Rating')).toBeVisible();

    // Try trailer if available (button is always present; may be disabled)
    const trailer = page.getByRole('button', { name: /watch trailer/i });
    await expect(trailer).toBeVisible();
    const ariaDisabled = await trailer.getAttribute('aria-disabled');
    if (ariaDisabled !== 'true') {
      await trailer.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      // Dismiss by clicking backdrop
      await page.mouse.click(10, 10);
      await expect(page.getByRole('dialog')).toHaveCount(0);
    }
  });
});

test.describe('Show Details - tv', () => {
  test('renders tv-specific sections', async ({ page }) => {
    await page.goto('/show/tv/1399'); // Game of Thrones
    await expect(page.getByRole('heading', { name: /tv/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /seasons/i })).toBeVisible();
    await expect(page.getByLabel('Your Rating')).toBeVisible();
  });
});

