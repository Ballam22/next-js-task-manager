import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 p-10 animate-fade-up animate-duration-700">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Welcome back, <span className="text-blue-600">{user.username}</span>
        </h1>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-blue-600">
              Your Task Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <p>
              📌 <strong>Upcoming:</strong> {upcomingTasks.length}
            </p>
            <p>
              🔥 <strong>Ongoing:</strong> {ongoingTasks.length}
            </p>
            <p>
              ✅ <strong>Completed:</strong> {completedTasks.length}
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Link href="/tasks">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              View All Tasks
            </Button>
          </Link>
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
