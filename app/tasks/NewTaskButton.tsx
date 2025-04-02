'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NewTaskButton() {
  const router = useRouter();
  return (
    <Button
      className="bg-green-800 cursor-pointer"
      onClick={() => router.push('/tasks/new')}
      size="sm"
    >
      Add Task
    </Button>
  );
}
