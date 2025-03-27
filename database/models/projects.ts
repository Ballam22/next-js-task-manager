import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateProjectInput {
  name: string;
  description: string;
  status?: string;
  userId: string;
}

export async function createProject(data: CreateProjectInput) {
  return await prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      status: {
        connect: {
          name: data.status || 'active',
        },
      },
      user: {
        connect: {
          id: data.userId,
        },
      },
    },
    include: {
      status: true,
      user: true,
    },
  });
}

export async function getProjectById(id: string) {
  return await prisma.project.findUnique({
    where: { id },
    include: {
      status: true,
      user: true,
      tasks: true,
      userStories: true,
    },
  });
}

export async function getProjectsByUserId(userId: string) {
  return await prisma.project.findMany({
    where: { user_id: userId },
    include: {
      status: true,
      tasks: true,
    },
  });
}

export async function updateProject(
  id: string,
  data: {
    name?: string;
    description?: string;
    status?: string;
  },
) {
  return await prisma.project.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.description && { description: data.description }),
      ...(data.status && {
        status: {
          connect: {
            name: data.status,
          },
        },
      }),
    },
  });
}

export async function deleteProject(id: string) {
  return await prisma.project.delete({
    where: { id },
  });
}
