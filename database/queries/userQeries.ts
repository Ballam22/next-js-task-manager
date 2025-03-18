import { prisma } from '../connect';

export async function getUserWithSessions(userID: string) {
  return await prisma.user.findUnique({
    where: { id: userID },
    include: { sessions: true },
  });
}
