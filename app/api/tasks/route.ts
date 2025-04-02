import { taskSchema } from '@/app/validation/schemas';
import { createTask } from '@/database/tasks';
import type { Task } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export type TasksResponseBodyPost =
  | {
      task: Task;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<TasksResponseBodyPost>> {
  const requestBody = await request.json();

  const result = taskSchema.omit({ status: true }).safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain task object',
      },
      { status: 400 },
    );
  }
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const newTask =
    sessionTokenCookie &&
    (await createTask(sessionTokenCookie.value, {
      title: result.data.title,
      date: result.data.date,
    }));

  if (!newTask) {
    return NextResponse.json(
      {
        error: 'Task not created or access denied creating tasks',
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({ task: newTask });
}
