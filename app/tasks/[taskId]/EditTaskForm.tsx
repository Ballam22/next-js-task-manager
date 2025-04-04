'use client';

import type {
  TaskResponseBodyDelete,
  TaskResponseBodyPut,
} from '@/app/api/tasks/[taskId]/route';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Task } from '@prisma/client';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
  task: Task;
};

export default function EditTaskForm({ task }: Props) {
  const [title, setTitle] = useState(task.title);
  const [date, setDate] = useState(dayjs(task.date).format('YYYY-MM-DD'));
  const [status, setStatus] = useState(task.status);

  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, date, status }),
    });

    setErrorMessage('');

    if (!response.ok) {
      const responseBody: TaskResponseBodyPut = await response.json();

      if ('error' in responseBody) {
        setErrorMessage(responseBody.error);
        return;
      }
    }

    toast.success('Task updated', {
      description: 'Your changes were saved.',
    });

    setTimeout(() => {
      router.push('/tasks');
    }, 1000);
  }

  async function handleDeleteButtonClicked() {
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: 'DELETE',
    });

    setErrorMessage('');

    if (!response.ok) {
      const responseBody: TaskResponseBodyDelete = await response.json();

      const newErrorMessage =
        'error' in responseBody ? responseBody.error : 'Error deleting task';

      setErrorMessage(newErrorMessage);
      return;
    }

    toast.success('Task deleted', {
      description: 'The task has been removed.',
    });

    setTimeout(() => {
      router.push('/tasks');
    }, 1000);
  }

  return (
    <div className="min-h-screen flex justify-center px-4 py-10 bg-background text-foreground">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card text-foreground p-8 shadow-sm mt-10">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          Edit Task
        </h1>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
            />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.currentTarget.value)}
            />
          </div>

          <div>
            <Label>Status</Label>
            <Select
              defaultValue={status}
              onValueChange={(value: 'upcoming' | 'ongoing' | 'completed') => {
                setStatus(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming" className="text-yellow-600">
                  Upcoming
                </SelectItem>
                <SelectItem value="ongoing" className="text-orange-600">
                  Ongoing
                </SelectItem>
                <SelectItem value="completed" className="text-green-600">
                  Completed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button className="w-full sm:w-auto">Update</Button>
            <Button
              className="w-full sm:w-auto"
              variant="destructive"
              type="button"
              onClick={handleDeleteButtonClicked}
            >
              Delete
            </Button>
          </div>

          {errorMessage && (
            <div className="text-center font-semibold text-red-500">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
