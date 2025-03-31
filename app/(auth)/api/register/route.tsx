import crypto from 'node:crypto';
import { registerSchema } from '@/app/validation/schemas';
import { createSessionInsecure } from '@/database/session';
import { createUserInsecure, getUserInsecure } from '@/database/users';
import { secureCookieOptions } from '@/util/cookies';
import { formatZodError, isPrismaError } from '@/util/error-utils';
import { hashPassword } from '@/util/hashedpassword';
import type { User } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

export type RegisterResponseBody =
  | {
      user: Pick<User, 'id' | 'username'>;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<NextResponse<RegisterResponseBody>> {
  const body = await request.json();
  const result = registerSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.issues }, { status: 400 });
  }

  // 3. Check if user already exist in the database
  const foundUser = await getUserInsecure(result.data.username);

  if (foundUser) {
    return NextResponse.json(
      {
        errors: [{ message: 'Username already taken' }],
      },
      {
        status: 400,
      },
    );
  }

  const hashedPassword = await hashPassword(result.data.password);
  let newUser;

  try {
    newUser = await createUserInsecure({
      username: result.data.username,
      hashedPassword: hashedPassword,
    });
  } catch {
    return NextResponse.json(
      { errors: [{ message: 'Failed to create user' }] },
      { status: 500 },
    );
  }

  const token = crypto.randomBytes(100).toString('base64');
  try {
    const session = await createSessionInsecure({
      token,
      userId: newUser.id,
    });
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'sessionToken',
      value: session.token,
      ...secureCookieOptions,
    });

    return NextResponse.json({ user: newUser });
  } catch {
    return NextResponse.json(
      { errors: [{ message: 'Failed to create session' }] },
      { status: 500 },
    );
  }
}
