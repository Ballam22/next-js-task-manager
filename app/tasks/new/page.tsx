import { getTasks } from '@/database/tasks';
import { getUser } from '@/database/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ViewTasks from '../ViewTasks';
import NewTaskForm from './NewTaskForm';

export default async function NewTaskPage() {
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie.value));
  if (!user) {
    redirect('/login');
  }
  const tasks = await getTasks(sessionTokenCookie.value);
  return (
    <>
      <h1>Add task</h1>
      <NewTaskForm />
    </>
  );
}
