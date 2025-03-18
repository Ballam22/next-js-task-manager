import type { Sql } from 'postgres';
import { z } from 'zod';

export type User = {
  id: number;
  username: string;
  email: string;
  hashed_password: string;
  created_at: Date;
  Updated_at: Date;
};

export const registerSchema = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8).max(255, { message: 'Password is too long' }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8).max(255, { message: 'Password is too long' }),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      hashed_password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
