import { expect, test } from '@playwright/test';

test('user can log in successfully', async ({ page }) => {
  // Go to login page
  await page.goto('/login');

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
