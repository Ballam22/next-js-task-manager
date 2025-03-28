import { NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

const createProjectSchema = z.object({
  projectName: z.string().min(1, 'Project Name is required'),
  projectDescription: z.string().min(1, 'Project Description is required'),
});

async function createProject(data: {
  projectName: string;
  projectDescription: string;
}) {
  await Promise.resolve();
  return { id: 1, ...data };
}

export async function POST(
  request: Request,
): Promise<NextResponse<{ message: string } | { error: string }>> {
  try {
    const body = await request.json();
    const result = createProjectSchema.safeParse(body);

    if (!result.success) {
      throw new ZodError(result.error.issues);
    }

    const project = await createProject(result.data);

    return NextResponse.json(
      { message: 'Project created successfully', project },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error creating project:', error);
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 },
    );
  }
}
