import { defineConfig } from 'prisma/config';
import { config } from 'dotenv-safe';

// dotenv-safe strictly requires every var in .env.example to be present,
// which is meant to catch a missing local .env, not to gate deploys where
// env vars come from the platform (Vercel, CI) instead of a checked-in file.
if (!process.env.CI && !process.env.VERCEL && process.env.NODE_ENV !== 'production') {
  config();
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL,
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  },
});
