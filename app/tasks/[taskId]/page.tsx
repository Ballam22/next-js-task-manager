import { getTask } from '@/database/tasks';
import { getUser } from '@/database/users';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';
import EditTaskForm from './EditTaskForm';

export const metadata: Metadata = {
  title: {
    default: 'Edit Task',
    template: '%s | Task MAnager',
  },
  description:
    'Organize your work and life with TaskFlow. Create, track, and manage tasks with ease. Stay productive and never miss a deadline.',
};

type Props = {
  params: Promise<{ taskId: string }>;
};

export default async function NewTaskPage(props: Props) {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));
  if (!user) {
    redirect('/login');
  }
  const taskId = (await props.params).taskId;
  const task = await getTask(taskId, sessionTokenCookie.value);
  if (!task) {
    return (
      <div className="text-center">
        <h1 className="font-bold text-2xl">Error loading task</h1>
        <div>The task does not exist</div>
        <Link href="/tasks" className="text-[#0000FF] underline">
          Back to tasks overview
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1>Edit task</h1>
      <EditTaskForm task={task} />
    </>
  );
}
