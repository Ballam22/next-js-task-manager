import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createTask(taskData: {
  title: string;
  description: string;
  projectId: string;
  assignedUserId: string;
  userStoryId: string;
  priorityId: string;
  dueDate: Date;
}) {
  return await prisma.task.create({
    data: {
      title: taskData.title,
      description: taskData.description,
      status: {
        connect: {
          name: 'todo',
        },
      },
      priority: {
        connect: {
          id: taskData.priorityId,
        },
      },
      project: {
        connect: {
          id: taskData.projectId,
        },
      },
      assigned_user: {
        connect: {
          id: taskData.assignedUserId,
        },
      },
      user_story: {
        connect: {
          id: taskData.userStoryId,
        },
      },
      due_date: taskData.dueDate,
    },
  });
}
