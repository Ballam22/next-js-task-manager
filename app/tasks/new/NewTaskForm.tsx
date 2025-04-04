'use client';
import type { TasksResponseBodyPost } from '@/app/api/tasks/route';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function NewTaskForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  function handleResetButtonClick() {
    setTitle('');
    setDate('');
    toast.info('Form reset!');
  }

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, date }),
    });

    setErrorMessage('');

    if (!response.ok) {
      const responseBody: TasksResponseBodyPost = await response.json();

      if ('error' in responseBody) {
        setErrorMessage(responseBody.error);
        return;
      }
    }

    toast.success('Task added', {
      description: 'Your new task has been saved.',
    });

    setTimeout(() => {
      router.push('/tasks');
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br from-white via-slate-50 to-slate-100 animate-in fade-in duration-700">
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Create a New Task
        </h1>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
              placeholder="e.g. Finish portfolio, Buy groceries"
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

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button className="w-full sm:w-auto" type="submit">
              Add Task
            </Button>
            <Button
              className="w-full sm:w-auto"
              variant="outline"
              type="button"
              onClick={handleResetButtonClick}
            >
              Reset
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
