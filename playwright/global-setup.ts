import type { FullConfig } from '@playwright/test';

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use.baseURL ?? 'http://localhost:3000';

  const response = await fetch(`${baseURL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'Password22' }),
  });

  if (response.ok) {
    return;
  }

  const data: { errors?: { message: string }[] } = await response.json();
  const alreadyExists = data.errors?.some(
    (error) => error.message === 'Username already taken',
  );

  if (!alreadyExists) {
    throw new Error(
      `Playwright global setup: failed to seed admin user: ${JSON.stringify(data)}`,
    );
  }
}
