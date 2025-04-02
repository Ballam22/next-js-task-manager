import type { Session } from '@prisma/client';
import { prisma } from '../util/lib/connect';

export async function getValidSessionToken(sessionToken: Session['token']) {
  const session = await prisma.session.findUnique({
    where: {
      token: sessionToken,
      expiryTimestamp: { gt: new Date() },
    },
    select: {
      id: true,
      token: true,
      userId: true,
    },
  });
  return session;
}
export async function createSessionInsecure(
  sessionData: Omit<Session, 'expiryTimestamp' | 'id'>,
) {
  const session = await prisma.session.create({
    data: {
      token: sessionData.token,
      userId: sessionData.userId,
    },
    select: {
      id: true,
      userId: true,
      token: true,
    },
  });

  await prisma.session.deleteMany({
    where: {
      expiryTimestamp: { lt: new Date() },
    },
  });

  return session;
}

export async function deleteSession(token: Session['token']) {
  {
    return await prisma.session.delete({
      where: { token },
    });
  }
}
