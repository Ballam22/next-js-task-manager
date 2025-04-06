import { expect, test } from '@playwright/test';

test('user can log in successfully', async ({ page }) => {
  // Go to homepage
  await page.goto('/');

  // Click the login button (e.g. from nav bar)
  await page.getByRole('button', { name: /login/i }).click();

  // Wait for login page to load
  await page.waitForURL('**/login');

  // Check login heading
  await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();

  // Fill in the login form
  await page.getByLabel(/username/i).fill('admin');
  await page.getByLabel(/password/i).fill('Password22');

  // Submit the login form
  await page.getByRole('button', { name: /login/i }).click();

  // Wait for dashboard
  await page.waitForURL('**/dashboard');

  // Assert dashboard greeting/heading
  await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
});
