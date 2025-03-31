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
import { getTask, getTasks } from '@/database/tasks';
import { getUser } from '@/database/users';
import type { Task } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  task: Task;
};

export default function EditTaskForm({ task }: Props) {
  const [title, setTitle] = useState(task.title);
  const [date, setDate] = useState(task.date.toISOString());
  const [status, setStatus] = useState(task.status);

  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        date,
        status,
      }),
    });

    setErrorMessage('');

    if (!response.ok) {
      const responseBody: TaskResponseBodyPut = await response.json();

      if ('error' in responseBody) {
        setErrorMessage(responseBody.error);
        return;
      }
    }
    router.push('/tasks');
  }

  async function handleDeleteButtonClicked() {
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: 'DELETE',
    });

    setErrorMessage('');

    if (!response.ok) {
      let newErrorMessage = 'Error deleting task';

      const responseBody: TaskResponseBodyDelete = await response.json();

      if ('error' in responseBody) {
        newErrorMessage = responseBody.error;
      }

      setErrorMessage(newErrorMessage);
      return;
    }

    router.push('/tasks');
  }

  return (
    <div>
      <form className="max-w-[500px]" onSubmit={handleFormSubmit}>
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
        <Label>Status</Label>
        <Select
          defaultValue={status}
          onValueChange={(value: 'upcoming' | 'ongoing' | 'completed') => {
            setStatus(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Button className="cursor-pointer">Update</Button>
        <Button
          className="cursor-pointer"
          variant="destructive"
          type="button"
          onClick={handleDeleteButtonClicked}
        >
          Delete
        </Button>
        <div className="font-bold text-red-500">{errorMessage}</div>
      </form>
    </div>
  );
}
