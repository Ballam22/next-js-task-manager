import type { Session } from '@prisma/client';
import { prisma } from '../util/lib/connect';

export interface CreateSessionInput {
  token: string;
  expiry_timestamp: Date;
  user_id: string;
}

export async function createSession(
  sessionData: CreateSessionInput,
): Promise<Session> {
  try {
    return await prisma.session.create({
      data: {
        token: sessionData.token,
        expiry_timestamp: sessionData.expiry_timestamp,
        user_id: sessionData.user_id,
      },
    });
  } catch (error) {
    console.error('Error creating session:', error);
    throw new Error('Failed to create session');
  }
}

export async function findSessionByToken(
  token: string,
): Promise<Session | null> {
  try {
    return await prisma.session.findUnique({
      where: { token },
    });
  } catch (error) {
    console.error('Error finding session by token:', error);
    throw new Error('Failed to fetch session');
  }
}

export async function deleteSession(token: string): Promise<Session> {
  try {
    return await prisma.session.delete({
      where: { token },
    });
  } catch (error) {
    console.error('Error deleting session:', error);
    throw new Error('Failed to delete session');
  }
}
export function isSessionExpired(session: Session): boolean {
  return new Date(session.expiry_timestamp) < new Date();
}

export async function getSessionWithUser(token: string) {
  return await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });
}

export async function getUserWithSessions(userID: string) {
  return await prisma.user.findUnique({
    where: { id: userID },
    include: { sessions: true },
  });
}
