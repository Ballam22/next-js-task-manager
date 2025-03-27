import { PrismaClient } from '@prisma/client';
import { type NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface ActivityResponse {
  id: string;
  action: string;
  project: string;
  timestamp: Date;
  user: string;
}

interface ErrorResponse {
  error: string;
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ActivityResponse[] | ErrorResponse>> {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Get recent tasks updates
    const taskActivities = await prisma.task.findMany({
      where: { assigned_user_id: userId },
      orderBy: { updated_at: 'desc' },
      take: 5,
      include: {
        project: {
          select: { name: true },
        },
        assigned_user: {
          select: { username: true },
        },
      },
    });

    // Get recent comments
    const commentActivities = await prisma.comment.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      take: 5,
      include: {
        task: {
          include: {
            project: {
              select: { name: true },
            },
          },
        },
        user: {
          select: { username: true },
        },
      },
    });

    // Format activities
    const activities: ActivityResponse[] = [
      ...taskActivities.map((task) => ({
        id: task.id,
        action: `updated task "${task.title}"`,
        project: task.project.name,
        timestamp: task.updated_at,
        user: task.assigned_user.username,
      })),
      ...commentActivities.map((comment) => ({
        id: comment.id,
        action: `commented on task "${comment.task.title}"`,
        project: comment.task.project.name,
        timestamp: comment.created_at,
        user: comment.user.username,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
      .slice(0, 5);

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 },
    );
  }
}
