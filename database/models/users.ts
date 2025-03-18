import { prisma } from '../connect';

export interface CreateUserInput {
  usename: string;
  email: string;
  hashed_password: string;
}

export async function createUser(userData: CreateUserInput) {
  return await prisma.user.create({
    data: {
      username: userData.usename,
      email: userData.email,
      hashed_password: userData.hashed_password,
    },
  });
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}
