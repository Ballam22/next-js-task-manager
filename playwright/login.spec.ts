import { expect, test } from '@playwright/test';

test('user can log in successfully', async ({ page }) => {
  // Go to the homepage
  await page.goto('/');

  // Click the Login button (assuming it's visible when logged out)
  await page.getByRole('button', { name: 'Login' }).click();

  // Ensure navigation to login page
  await page.waitForURL('/login');

  // Check login page heading
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  // Fill out login form
  await page.getByRole('textbox', { name: 'Email' }).fill('admin@test.at');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');

  // Submit the login form
  await page.getByRole('button', { name: 'Log in' }).click();

  // Wait for redirection to dashboard or home
  await page.waitForURL('/dashboard');

  // Confirm we're on the dashboard
  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
});
