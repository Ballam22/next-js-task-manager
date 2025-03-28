import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../database/connect';

export async function PUT(
  req: NextRequest,
  context: { params: { taskId: string } },
): Promise<NextResponse<any>> {
  const body = await req.json();
  const { title, description, priorityId, statusId } = body;

  if (!title || !description || !priorityId || !statusId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id: context.params.taskId },
      data: {
        title,
        description,
        priority_id: priorityId,
        status_id: statusId,
      },
    });

    return NextResponse.json(updatedTask);
  } catch (err) {
    console.error('Task update failed:', err);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
