import { PrismaClient } from '@prisma/client';
import { type NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface TaskResponse {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  dueDate: Date;
  projectName: string;
}

interface ErrorResponse {
  error: string;
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<TaskResponse[] | ErrorResponse>> {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: { assigned_user_id: userId },
      include: {
        status: true,
        priority: true,
        project: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        due_date: 'asc',
      },
    });

    const formattedTasks: TaskResponse[] = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority.name.toLowerCase() as 'low' | 'medium' | 'high',
      status: task.status.name.toLowerCase() as 'todo' | 'in-progress' | 'done',
      dueDate: task.due_date,
      projectName: task.project.name,
    }));

    return NextResponse.json(formattedTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 },
    );
  }
}
