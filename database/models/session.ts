import { prisma } from '../connect';

export interface CreatSessionsInput {
  token: string;
  expirey_timestamp: Date;
  user_id: string;
}

export async function createSession(sessionData: CreatSessionsInput) {
  return await prisma.session.create({
    data: {
      token: sessionData.token,
      expiry_timestamp: sessionData.expirey_timestamp,
      user_id: sessionData.user_id,
    },
  });
}

export async function findSessionByToken(token: string) {
  return await prisma.session.delete({
    where: { token },
  });
}
