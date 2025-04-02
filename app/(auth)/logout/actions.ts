'use server';

import { deleteSession } from '@/database/session';
import { cookies } from 'next/headers';

export async function logout() {
  const cookieStore = await cookies();

  const token = cookieStore.get('sessionToken');

  if (token) {
    await deleteSession(token.value);

    cookieStore.delete(token.name);
  }

  return;
}
