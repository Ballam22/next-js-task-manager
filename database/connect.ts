import { PrismaClient } from '@prisma/client';

declare namespace globalThis {
  let prisma: PrismaClient;
}
function connectOneTimeToDatabase() {
  if (!('prisma' in globalThis)) {
    globalThis.prisma = new PrismaClient();
  }
  return globalThis.prisma;
}

export const prisma = connectOneTimeToDatabase();
