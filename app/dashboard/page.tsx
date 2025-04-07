import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTasks } from '@/database/tasks';
import { getUser } from '@/database/users';
import { isThisWeek, isToday, isTomorrow } from 'date-fns';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard Page',
    template: '%s | Task Manager',
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

  const todayTasks = allTasks.filter((task) => isToday(new Date(task.date)));
  const tomorrowTasks = allTasks.filter((task) =>
    isTomorrow(new Date(task.date)),
  );
  const weekTasks = allTasks.filter((task) =>
    isThisWeek(new Date(task.date), { weekStartsOn: 1 }),
  );

  return (
    <main className="p-6 md:p-10 animate-fade-up animate-duration-700">
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

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-blue-600">
              Task Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <p>
              📅 <strong>Today:</strong> {todayTasks.length}
            </p>
            <p>
              ⏭️ <strong>Tomorrow:</strong> {tomorrowTasks.length}
            </p>
            <p>
              🗓️ <strong>This Week:</strong> {weekTasks.length}
            </p>
          </CardContent>
        </Card>

        {todayTasks.length > 0 && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-blue-500">
                Today’s Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {todayTasks.map((task) => (
                  <li key={`task-${task.id}`}>
                    {task.title} —{' '}
                    <span className="text-sm text-muted-foreground">
                      {new Date(task.date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center">
          <Link href="/tasks">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              View All Tasks
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
