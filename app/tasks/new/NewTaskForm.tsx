'use client';
import type { TasksResponseBodyPost } from '@/app/api/tasks/route';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function NewTaskForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  function handleResetButtonClick() {
    setTitle('');
    setDate('');
  }

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title,
        date,
      }),
    });

    setErrorMessage('');

    if (!response.ok) {
      const responseBody: TasksResponseBodyPost = await response.json();

      if ('error' in responseBody) {
        setErrorMessage(responseBody.error);
        return;
      }
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
        <Button className="cursor-pointer">Add Task</Button>
        <Button
          className="cursor-pointer"
          type="button"
          onClick={handleResetButtonClick}
        >
          Reset
        </Button>
        <div className="font-bold text-red-500">{errorMessage}</div>
      </form>
    </div>
  );
}
