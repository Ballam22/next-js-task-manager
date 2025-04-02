'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { logout } from '../(auth)/logout/actions';

export default function LogoutButton() {
  const router = useRouter();

  return (
    <form>
      <Button
        variant="destructive"
        className="cursor-pointer mt-4"
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
