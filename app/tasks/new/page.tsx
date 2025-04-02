import { getUser } from '@/database/users';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import NewTaskForm from './NewTaskForm';

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
