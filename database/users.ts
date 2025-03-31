import type { Session, User } from '@prisma/client';
import { prisma } from '../util/lib/connect';

/* export async function getUserByIdInsecure(id: User['id']) {
  return await prisma.user.findUnique({
    where: { id },
  });
} */

export async function getUser(sessionToken: Session['token']) {
  const user = await prisma.session.findUnique({
    where: {
      token: sessionToken,
      expiryTimestamp: {
        gt: new Date(),
      },
    },
    select: {
      user: true,
    },
  });
  return user?.user;
}

export async function createUserInsecure(
  userData: Pick<User, 'username' | 'hashedPassword'>,
) {
  return await prisma.user.create({
    data: {
      username: userData.username.toLowerCase(),
      hashedPassword: userData.hashedPassword,
    },
    select: {
      id: true,
      username: true,
    },
  });
}

export async function getUserWithPasswordHashInsecure(
  username: User['username'],
) {
  const user = await prisma.user.findUnique({
    where: {
      username: username.toLowerCase(),
    },
  });
  return user;
}

export async function getUserInsecure(username: User['username']) {
  return await prisma.user.findUnique({
    where: { username: username },
  });
}
