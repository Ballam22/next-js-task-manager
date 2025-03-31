import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const sessionToken = (await cookies()).get('sessionToken')?.value;
  if (!sessionToken) redirect('/auth/login');
  return <div>page</div>;
}
