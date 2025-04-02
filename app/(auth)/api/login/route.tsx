import crypto from 'node:crypto';
import { createSessionInsecure } from '@/database/session';
import { getUserWithPasswordHashInsecure } from '@/database/users';
import { secureCookieOptions } from '@/util/cookies';
import { comparePassword } from '@/util/hashedpassword';
import type { User } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { loginSchema } from '../../../validation/schemas';

export type LoginResponseBody =
  | {
      user: { username: User['username'] };
    }
  | {
      errors: { message: string }[];
    };

const loginRequestSchema = loginSchema.extend({
  password: z.string().min(1, 'Password is required'),
});

export async function POST(
  request: Request,
): Promise<NextResponse<LoginResponseBody>> {
  const body = await request.json();
  const result = loginRequestSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    result.data.username,
  );
  console.log('findUserByUsername:', userWithPasswordHash);

  if (!userWithPasswordHash) {
    return NextResponse.json(
      { errors: [{ message: 'Invalid credentials' }] },
      { status: 401 },
    );
  }

  const validPassword = await comparePassword(
    result.data.password,
    userWithPasswordHash.hashedPassword,
  );

  if (!validPassword) {
    return NextResponse.json(
      { errors: [{ message: 'Invalid credentials' }] },
      { status: 401 },
    );
  }
  const token = crypto.randomBytes(100).toString('base64');

  try {
    const session = await createSessionInsecure({
      token,
      userId: userWithPasswordHash.id,
    });

    const cookieStore = await cookies();
    cookieStore.set({
      name: 'sessionToken',
      value: session.token,
      ...secureCookieOptions,
    });

    return NextResponse.json({
      user: { username: userWithPasswordHash.username },
    });
  } catch (error) {
    console.error('Login error:', error);

    return NextResponse.json(
      { errors: [{ message: 'Failed to create session' }] },
      { status: 500 },
    );
  }
}
