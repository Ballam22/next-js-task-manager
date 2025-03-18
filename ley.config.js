const config = {
  driver: 'pg', // PostgreSQL driver
  database: process.env.DATABASE_NAME || 'agile_project_tracker',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  user: process.env.DATABASE_USER || 'agile_project_tracker',
  password: process.env.DATABASE_PASSWORD || 'agile_project_tracker',
  migrations: {
    directory: './migrations', // Folder where migration files are stored
    table: 'migrations', // Table to track applied migrations
  },
};

export default config;
