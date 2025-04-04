'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { logout } from '../../app/(auth)/logout/actions';

export default function LogoutButton() {
  const router = useRouter();

  return (
    <form>
      <Button
        variant="destructive"
        className="mt-4 sm:mt-0 px-6 py-2 text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
        formAction={async () => {
          await logout();
          router.push('/');
        }}
      >
        Logout
      </Button>
    </form>
  );
}
