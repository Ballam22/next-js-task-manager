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
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 px-4 py-16 flex flex-col items-center justify-start animate-in fade-in duration-700">
      <div className="w-full max-w-xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Add a New Task
        </h1>
        <NewTaskForm />
      </div>
    </main>
  );
}

/* import { getUser } from '@/database/users';
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
 */
