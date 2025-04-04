import { getTasks } from '@/database/tasks';
import { getUser } from '@/database/users';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const sessionToken = (await cookies()).get('sessionToken')?.value;
  const user = sessionToken && (await getUser(sessionToken));
  const tasks = sessionToken ? await getTasks(sessionToken) : [];

  if (!user) {
    redirect('/login');
  }

  const upcoming = tasks.filter((t) => t.status === 'upcoming').length;
  const ongoing = tasks.filter((t) => t.status === 'ongoing').length;
  const completed = tasks.filter((t) => t.status === 'completed').length;

  return (
    <div className="flex flex-col items-center justify-start px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2">
        Welcome to our <span className="text-blue-600">Task Manager</span> site
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Manage your projects, organize your day, and stay on top of your goals —
        all in one place.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full">
        <div className="rounded-xl bg-white dark:bg-muted p-4 shadow text-center">
          <p className="text-2xl font-bold">{tasks.length}</p>
          <p className="text-sm text-muted-foreground">Total Tasks</p>
        </div>
        <div className="rounded-xl bg-yellow-100 dark:bg-yellow-900 p-4 shadow text-center">
          <p className="text-2xl font-bold">{upcoming}</p>
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            📌 Upcoming
          </p>
        </div>
        <div className="rounded-xl bg-orange-100 dark:bg-orange-900 p-4 shadow text-center">
          <p className="text-2xl font-bold">{ongoing}</p>
          <p className="text-sm text-orange-800 dark:text-orange-200">
            🔥 Ongoing
          </p>
        </div>
        <div className="rounded-xl bg-green-100 dark:bg-green-900 p-4 shadow text-center">
          <p className="text-2xl font-bold">{completed}</p>
          <p className="text-sm text-green-800 dark:text-green-200">
            ✅ Completed
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-10">
        <Link
          href="/tasks/new"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          + Add New Task
        </Link>
        <Link
          href="/tasks"
          className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          View All Tasks
        </Link>
      </div>

      {tasks.length > 0 && (
        <div className="w-full mt-4">
          <h2 className="text-xl font-semibold mb-3">Recent Tasks</h2>
          <ul className="space-y-2">
            {tasks.slice(0, 3).map((task) => (
              <li
                key={`task-${task.id}`}
                className="bg-muted p-4 rounded-md shadow-sm flex justify-between items-center"
              >
                <span className="font-medium">{task.title}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(task.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
