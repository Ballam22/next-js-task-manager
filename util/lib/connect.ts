import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const schema = process.env.DATABASE_URL
  ? (new URL(process.env.DATABASE_URL).searchParams.get('schema') ?? undefined)
  : undefined;

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL }, { schema });
const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma };
