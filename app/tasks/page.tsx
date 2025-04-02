import { getTasks } from '@/database/tasks';
import { getUser } from '@/database/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';
import NewTaskButton from './NewTaskButton';
import ViewTasks from './ViewTasks';

export const metadata: Metadata = {
  title: {
    default: 'Tasks Page',
    template: '%s | Task MAnager',
  },
  description:
    'Organize your work and life with TaskFlow. Create, track, and manage tasks with ease. Stay productive and never miss a deadline.',
};

export default async function TasksPage() {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));
  if (!user) {
    redirect('/login');
  }
  const tasks = await getTasks(sessionTokenCookie.value);
  return (
    <>
      <h1>Tasks</h1>
      <NewTaskButton />
      <ViewTasks tasks={tasks} />
    </>
  );
}
