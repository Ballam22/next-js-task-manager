'use client';

import { LogOut as LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { LogOut } from './actions';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await LogOut();
        router.push('/auth/login');
      } catch (error) {
        console.error(
          'Logout error:',
          error instanceof Error ? error.message : 'An error occurred',
        );
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded text-red-600 transition-colors"
      aria-label="Logout"
    >
      <LogOutIcon className="w-4 h-4" />
      {isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
}
