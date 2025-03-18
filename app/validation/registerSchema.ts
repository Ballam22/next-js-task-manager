import postgres from 'postgres';
import { registerSchema } from '../../migrations/00000-createTableUsers';

const sql = postgres(process.env.DATABASE_URL!);

async function registerUser(userData: unknown) {
  // Validate the input
  const validatedData = registerSchema.parse(userData);

  // Insert the user into the database
  const user = await sql`
    INSERT INTO users (
      username, email, hashed_password
    ) VALUES (
      ${validatedData.username},
      ${validatedData.email},
      await hashPassword(validatedData.password) // Hash the password
    ) RETURNING *
  `;

  return user;
}
