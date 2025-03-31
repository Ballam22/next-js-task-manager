import { findSessionByToken } from '@/database/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginForm } from './LoginForm';

export default async function LoginPage() {
  const sessionToken = (await cookies()).get('sessionToken')?.value;

  const session = await findSessionByToken(sessionToken || '');
  if (session) redirect('/dashboard');
  return (
    <main className="min-h-screen flex itmes-center justify-center p-4">
      {' '}
      <LoginForm />
    </main>
  );
}
