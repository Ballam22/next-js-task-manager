import type { Session, Task } from '@prisma/client';
import { prisma } from '../util/lib/connect';
import { getUser } from './users';

export async function createTask(
  sessionToken: Session['token'],
  newTask: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'status'>,
) {
  const user = await getUser(sessionToken);
  if (!user) {
    return null;
  }
  const task = await prisma.task.create({
    data: {
      title: newTask.title,
      date: newTask.date,
      userId: user.id,
    },
  });
  return task;
}

export async function updateTask(
  sessionToken: Session['token'],
  updatedTask: Omit<Task, 'userId' | 'createdAt' | 'updatedAt'>,
) {
  const user = await getUser(sessionToken);
  if (!user) {
    return null;
  }
  const task = await prisma.task.update({
    where: {
      id: updatedTask.id,
    },
    data: {
      title: updatedTask.title,
      date: updatedTask.date,
      status: updatedTask.status,
    },
  });
  return task;
}

export async function deleteTask(
  taskId: string,
  sessionToken: Session['token'],
) {
  const task = await prisma.task.delete({
    where: {
      id: taskId,
      user: {
        sessions: {
          some: {
            token: sessionToken,
            expiryTimestamp: { gt: new Date() },
          },
        },
      },
    },
  });
  return task;
}
