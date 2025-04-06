import { expect, test } from '@playwright/test';

test('add a new task', async ({ page }) => {
  // Go to homepage
  await page.goto('/');

  // Log in
  await page.getByRole('button', { name: /login/i }).click();
  await page.getByLabel(/username/i).fill('admin');
  await page.getByLabel(/password/i).fill('Password22');
  await page.getByRole('button', { name: /login/i }).click();

  // Wait for dashboard page
  await page.waitForURL('/dashboard');

  // Go to tasks manually
  await page.goto('/tasks');

  // Click "+ Add Task" button
  await page.getByRole('button', { name: /\+ add task/i }).click();

  // Wait for navigation to /tasks/new
  await page.waitForURL('/tasks/new');

  // Fill out the form
  await page.getByLabel(/title/i).fill('Test Task from Playwright');
  const today = new Date().toISOString().split('T')[0] ?? '';
  await page.getByLabel(/date/i).fill(today);

  // Submit the form
  await page.getByRole('button', { name: /add task/i }).click();

  // Wait for redirect to /tasks
  await page.waitForURL('/tasks');

  // Verify task shows up
  await expect(page.getByText('Test Task from Playwright')).toBeVisible();
});
