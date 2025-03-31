'use server';
import { deleteSession } from '@/database/session';
import { cookies } from 'next/headers';

export async function LogOut() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;
  if (sessionToken) {
    await deleteSession(sessionToken);
    cookieStore.set({
      name: 'sessionToken',
      value: '',
      maxAge: 0,
    });
  }
}
