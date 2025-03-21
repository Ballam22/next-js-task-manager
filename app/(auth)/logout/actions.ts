'use server';

import { cookies } from 'next/headers';
import { deleteSession } from '../../../database/models/session';

export async function logout() {
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
