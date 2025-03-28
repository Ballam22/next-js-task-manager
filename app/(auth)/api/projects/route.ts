import { getProjectsByUserId } from '@/database/models/projects';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse<any>> {
  const token = request.cookies.get('sessionToken')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const userId = (decoded as { userId: string }).userId;

  try {
    const projects = await getProjectsByUserId(userId);
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 },
    );
  }
}
