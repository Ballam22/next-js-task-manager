import { findUserById } from '@/database/models/users';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const cookiesData = await cookies();
  const token = cookiesData.get('sessionToken')?.value;
  if (!token) {
    redirect('/auth/login');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    redirect('/auth/login');
  }

  const { userId } = decoded as { userId: string };

  const user: { username: string } | null = await findUserById(userId);
  if (!user) {
    redirect('/auth/login');
  }

  return (
    <main>
      <h1>Welcome, {user.username}!</h1>
      <p>
        This is your dashboard. You can view your projects, tasks, and more.
      </p>
    </main>
  );
}
