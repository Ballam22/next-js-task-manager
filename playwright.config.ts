import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: '**/playwright/**',
  globalSetup: './playwright/global-setup.ts',
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? 'github'
    : [['html', { outputFolder: 'playwright/report/' }]],
  outputDir: 'playwright/test-results/',
  use: {
    baseURL: 'http://localhost:3000', // 👈 Add this so tests work with your dev server
    testIdAttribute: 'data-test-id',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
};

export default config;
