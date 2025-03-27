import { PrismaClient } from '@prisma/client';
import { type NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface ProjectResponse {
  id: string;
  name: string;
  description: string;
  status: string;
  totalTasks: number;
  completedTasks: number;
  createdAt: Date;
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ProjectResponse[] | { error: string }>> {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const projects = await prisma.project.findMany({
      where: { user_id: userId },
      include: {
        status: true,
        tasks: {
          select: {
            id: true,
            status_id: true,
          },
        },
      },
    });

    const formattedProjects: ProjectResponse[] = projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status.name,
      totalTasks: project.tasks.length,
      completedTasks: project.tasks.filter((task) => task.status_id === 'done')
        .length,
      createdAt: project.created_at,
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 },
    );
  }
}
