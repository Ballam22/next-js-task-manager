import type { User } from '@prisma/client';
import { prisma } from '../util/lib/connect';

export interface CreateUserInput {
  username: string;
  email: string;
  hashed_password: string;
}

export async function findUserById(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function createUser(userData: CreateUserInput): Promise<User> {
  return await prisma.user.create({
    data: {
      username: userData.username,
      email: userData.email,
      hashed_password: userData.hashed_password,
    },
  });
}

export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw new Error('Failed to fetch user');
  }
}
