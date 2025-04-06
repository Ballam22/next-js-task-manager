import type { Task } from '@prisma/client';

export function updateTaskStatus(
  tasks: Task[],
  taskId: string,
  newStatus: 'upcoming' | 'ongoing' | 'completed',
): Task[] {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, status: newStatus } : task,
  );
}
