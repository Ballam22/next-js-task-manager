import { prisma } from '../connect';

export async function getSessionWithUser(token: string) {
  return await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });
}
