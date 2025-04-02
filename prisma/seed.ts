import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  try {
    // Seed Roles
    await prisma.role.createMany({
      data: [
        { id: '550e8400-e29b-41d4-a716-446655440000', name: 'Admin' },
        { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Project Manager' },
        { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Developer' },
      ],
    });

    // Seed Users
    await prisma.user.createMany({
      data: [
        {
          id: '1',
          username: 'alice',
          email: 'alice@example.com',
          hashed_password: 'hashed_password_1',
        },
        {
          id: '2',
          username: 'bob',
          email: 'bob@example.com',
          hashed_password: 'hashed_password_2',
        },
      ],
    });

    console.log('Database seeded successfully');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

await run();
