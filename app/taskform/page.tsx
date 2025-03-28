'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TaskFormPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priorityId, setPriorityId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [priorities, setPriorities] = useState<{ id: string; name: string }[]>(
    [],
  );

  useEffect(() => {
    const fetchPriorities = async () => {
      const res = await fetch('/api/taskpriorities');
      const data = await res.json();
      setPriorities(data);
    };
    fetchPriorities().catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/tasks/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priorityId }),
      });

      if (!response.ok) {
        const { error: errorMessage } = await response.json();
        throw new Error(errorMessage || 'Failed to create task');
      }

      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Add New Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="priority" className="block mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={priorityId}
            onChange={(e) => setPriorityId(e.target.value)}
            className="w-full border px-3 py-2"
            required
          >
            <option value="">Select priority</option>
            {priorities.map((p) => (
              <option key={`priority-${p.id}`} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}

/* 'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function TaskForm({ projectId }: { projectId: string }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          projectId,
        }),
      });
      router.refresh();
    } catch (error) {
      console.error('Task creation failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="input input-bordered w-full"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="textarea textarea-bordered w-full"
      />
      <button className="btn btn-primary">Create Task</button>
    </form>
  );
}
 */
