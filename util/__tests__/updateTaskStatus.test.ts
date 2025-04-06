import { expect, test } from '@jest/globals';
import type { Task } from '@prisma/client';
import { updateTaskStatus } from '../updateTaskStatus';

test('updates the status of a specific task', () => {
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Write blog post',
      status: 'upcoming',
      userId: 'u1',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Fix bug',
      status: 'ongoing',
      userId: 'u1',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const updatedTasks = updateTaskStatus(tasks, '1', 'completed');

  expect(updatedTasks.find((t) => t.id === '1')?.status).toBe('completed');
  expect(updatedTasks.find((t) => t.id === '2')?.status).toBe('ongoing'); // unchanged
});
