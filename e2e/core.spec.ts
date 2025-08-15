import { test, expect } from '@playwright/test';

test('home loads and shows sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /trending/i })).toBeVisible();
});

test('search works and filters render', async ({ page }) => {
  await page.goto('/search?q=dune');
  await expect(page.getByLabel('Media')).toBeVisible();
  await expect(page.getByLabel('Genre')).toBeVisible();
});

test('navigate to details and see actions', async ({ page }) => {
  await page.goto('/');
  // Click first card
  const firstCard = page.locator('a[href^="/show/"]').first();
  await firstCard.click();
  await expect(page.getByRole('button', { name: /watchlist/i })).toBeVisible();
  await expect(page.getByText('TMDB Rating')).toBeVisible();
});

