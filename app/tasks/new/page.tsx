import { getUser } from '@/database/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';
import NewTaskForm from './NewTaskForm';

export const metadata: Metadata = {
  title: {
    default: 'Add Task',
    template: '%s | Task Manager',
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
    <main className="p-6 md:p-10 animate-in fade-in duration-700">
      <div className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Add a New Task
        </h1>
        <NewTaskForm />
      </div>
    </main>
  );
}
