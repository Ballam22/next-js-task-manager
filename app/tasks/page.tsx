import { getTasks } from '@/database/tasks';
import { getUser } from '@/database/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import NewTaskButton from './NewTaskButton';
import ViewTasks from './ViewTasks';

export default async function TasksPage() {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));
  if (!user) {
    redirect('/login');
  }
  const tasks = await getTasks(sessionTokenCookie.value);
  // const experiences = await getNewestExperiencesInsecure();
  return (
    <>
      <h1>Welcome, {user.username}</h1>
      <h2>Tasks</h2>
      <NewTaskButton />
      <ViewTasks tasks={tasks} />
    </>
  );
}
