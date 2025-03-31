import { taskSchema } from '@/app/validation/schemas';
import { deleteTask, updateTask } from '@/database/tasks';
import type { Task } from '@prisma/client';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export type TaskParams = {
  params: Promise<{
    taskId: string;
  }>;
};

export type TaskResponseBodyDelete =
  | {
      task: Task;
    }
  | { error: string };

export async function DELETE(
  request: NextRequest,
  { params }: TaskParams,
): Promise<NextResponse<TaskResponseBodyDelete>> {
  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const task =
    sessionTokenCookie &&
    (await deleteTask(sessionTokenCookie.value, (await params).taskId));

  if (!task) {
    return NextResponse.json(
      {
        error: 'Task does not exist',
      },
      { status: 404 },
    );
  }
  return NextResponse.json({ task: task });
}

export type TaskResponseBodyPut =
  | {
      task: Task;
    }
  | {
      error: string;
    };

export async function PUT(
  request: Request,
  { params }: TaskParams,
): Promise<NextResponse<TaskResponseBodyPut>> {
  const requestBody = await request.json();

  const result = taskSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain task object',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  console.log('Status', result.data.status);

  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const updatedTask =
    sessionTokenCookie &&
    (await updateTask(sessionTokenCookie.value, {
      id: (await params).taskId,
      title: result.data.title,
      date: result.data.date,
      status: result.data.status,
    }));

  if (!updatedTask) {
    return NextResponse.json(
      {
        error: 'Task not found or access denied updating task',
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({
    task: updatedTask,
  });
}
