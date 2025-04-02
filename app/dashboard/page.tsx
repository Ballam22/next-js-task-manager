import { getTasks } from '@/database/tasks';
import { getUser } from '@/database/users';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';
import LogoutButton from './LogoutButton';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard Page',
    template: '%s | Task MAnager',
  },
  description:
    'Organize your work and life with TaskFlow. Create, track, and manage tasks with ease. Stay productive and never miss a deadline.',
};

export default async function DashboardPage() {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));
  if (!user) {
    redirect('/login');
  }
  const allTasks = await getTasks(sessionTokenCookie.value);
  const upcomingTasks = allTasks.filter((task) => task.status === 'upcoming');
  const ongoingTasks = allTasks.filter((task) => task.status === 'ongoing');
  const completedTasks = allTasks.filter((task) => task.status === 'completed');

  return (
    <>
      <h1>Welcome, {user.username}</h1>
      <div className="my-2">
        <h2>Tasks</h2>
        <p>Upcoming: {upcomingTasks.length}</p>
        <p>Ongoing: {ongoingTasks.length}</p>
        <p>Completed: {completedTasks.length}</p>
      </div>
      <Link href="/tasks" className="text-blue-500 hover:underline">
        Task Details
      </Link>
      <LogoutButton />
    </>
  );
}
