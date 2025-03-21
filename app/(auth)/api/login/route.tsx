import { createSession } from '@/database/models/session';
import { findUserByEmail } from '@/database/models/users';
import { secureCookieOptions } from '@/util/cookies';
import { formatZodError, isPrismaError } from '@/util/error-utils';
import { comparePassword } from '@/util/hashedpassword';
import { generateToken } from '@/util/jwt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z, ZodError } from 'zod';
import { loginSchema } from '../../../validation/auth';

const loginRequestSchema = loginSchema.extend({
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = loginRequestSchema.safeParse(body);

    if (!result.success) {
      throw new ZodError(result.error.issues);
    }

    const user = await findUserByEmail(result.data.email);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const validPassword = await comparePassword(
      result.data.password,
      user.hashed_password,
    );

    if (!validPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const token = generateToken(user.id);
    const session = await createSession({
      token,
      expiry_timestamp: new Date(Date.now() + 86400000),
      user_id: user.id,
    });

    const cookieStore = await cookies();
    cookieStore.set({
      name: 'sessionToken',
      value: session.token,
      ...secureCookieOptions,
    });

    return NextResponse.json({ user: { username: user.username } });
  } catch (error) {
    console.error('Login error:', error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: formatZodError(error) },
        { status: 400 },
      );
    }

    if (isPrismaError(error)) {
      return NextResponse.json(
        { error: 'Authentication service unavailable' },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 },
    );
  }
}
