import { getUser } from '@/database/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';
import NewTaskForm from './NewTaskForm';

export const metadata: Metadata = {
  title: {
    default: 'Add Task',
    template: '%s | Task MAnager',
  },
  description:
    'Organize your work and life with TaskFlow. Create, track, and manage tasks with ease. Stay productive and never miss a deadline.',
};

export default async function NewTaskPage() {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));
  if (!user) {
    redirect('/login');
  }
  return (
    <>
      <h1>Add task</h1>
      <NewTaskForm />
    </>
  );
}
