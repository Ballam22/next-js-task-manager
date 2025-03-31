import crypto from 'node:crypto';
import { registerSchema } from '@/app/validation/auth';
import { createSession } from '@/database/session';
import { createUser } from '@/database/users';
import { secureCookieOptions } from '@/util/cookies';
import { formatZodError, isPrismaError } from '@/util/error-utils';
import { hashPassword } from '@/util/hashedpassword';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

export const baseRegisterSchema = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email('invalid email'),
});

const registerRequestSchema = registerSchema.extend({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password cannot exceed 32 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registerRequestSchema.safeParse(body);

    if (!result.success) {
      throw new ZodError(result.error.issues);
    }

    const hashedPassword = await hashPassword(result.data.password);
    const user = await createUser({
      username: result.data.username,
      email: result.data.email,
      hashed_password: hashedPassword,
    });

    const token = crypto.randomBytes(100).toString('base64');
    const session = await createSession({
      token,
      expiry_timestamp: new Date(Date.now() + 86400000),
      user_id: user.id,
    });

    if (!session.token) {
      throw new Error('Session creation failed');
    }
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'sessionToken',
      value: session.token,
      ...secureCookieOptions,
    });

    return NextResponse.json({ user: { username: user.username } });
  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: formatZodError(error) },
        { status: 400 },
      );
    }

    if (isPrismaError(error)) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Email or username already registered' },
          { status: 409 },
        );
      }
      return NextResponse.json(
        { error: 'Database operation failed' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 },
    );
  }
}
