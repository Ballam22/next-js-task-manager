import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      status_id INTEGER NOT NULL,
      priority_id INTEGER NOT NULL,
      due_date TIMESTAMP NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      project_id INTEGER NOT NULL REFERENCES projects(id),
      user_story_id INTEGER NOT NULL REFERENCES user_stories(id),
      assigned_user_id INTEGER NOT NULL REFERENCES users(id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE tasks`;
}
