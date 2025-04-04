'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Task } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const tabs = [
  { name: 'Upcoming', value: 'upcoming' },
  { name: 'Ongoing', value: 'ongoing' },
  { name: 'Completed', value: 'completed' },
];

type Props = {
  tasks: Task[];
};

export default function ViewTasks({ tasks }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('desc');

  const groupedTasks = useMemo(
    () => ({
      upcoming: tasks.filter((t) => t.status === 'upcoming'),
      ongoing: tasks.filter((t) => t.status === 'ongoing'),
      completed: tasks.filter((t) => t.status === 'completed'),
    }),
    [tasks],
  );

  const filteredAndSorted = useMemo(() => {
    const lowerSearch = search.toLowerCase();

    return Object.fromEntries(
      Object.entries(groupedTasks).map(([status, list]) => [
        status,
        list
          .filter((task) => task.title.toLowerCase().includes(lowerSearch))
          .sort((a, b) =>
            sortBy === 'asc'
              ? new Date(a.date).getTime() - new Date(b.date).getTime()
              : new Date(b.date).getTime() - new Date(a.date).getTime(),
          ),
      ]),
    );
  }, [search, sortBy, groupedTasks]);

  const getStatusTag = (status: string) => {
    const styles = {
      upcoming:
        'bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      ongoing:
        'bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
      completed:
        'bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200',
    };

    return (
      <span
        className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[status as keyof typeof styles]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 px-4">
      <Tabs defaultValue="upcoming" className="w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2"
          />

          <div className="flex gap-2 items-center">
            <Label className="text-sm font-medium text-muted-foreground">
              Sort by:
            </Label>
            <Select
              value={sortBy}
              onValueChange={(val) => setSortBy(val as 'asc' | 'desc')}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest</SelectItem>
                <SelectItem value="asc">Oldest</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => router.push('/tasks/new')}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              + Add Task
            </Button>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <TabsList className="p-2 rounded-lg bg-card shadow-md gap-2">
            {tabs.map((tab) => (
              <TabsTrigger
                key={`tab-${tab.value}`}
                value={tab.value}
                className="px-4 py-1 rounded-md text-sm font-semibold transition-all data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {tab.name}{' '}
                <span className="ml-1 text-xs text-muted-foreground">
                  ({filteredAndSorted[tab.value]?.length ?? 0})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {Object.entries(filteredAndSorted).map(([status, list]) => (
          <TabsContent
            key={`tab-${status}`}
            value={status}
            className="animate-in fade-in slide-in-from-top-4 duration-500"
          >
            {list.length > 0 ? (
              <div className="space-y-4">
                {list.map((task) => (
                  <Link key={`task-${task.id}`} href={`/tasks/${task.id}`}>
                    <Card
                      className={`border-l-4 transition-all hover:shadow-md ${
                        status === 'upcoming'
                          ? 'border-yellow-500 dark:border-yellow-300'
                          : status === 'ongoing'
                            ? 'border-orange-500 dark:border-orange-300'
                            : 'border-green-500 dark:border-green-300'
                      }`}
                    >
                      <CardContent className="p-4 space-y-1">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-foreground">
                            {task.title}
                          </h3>
                          {getStatusTag(task.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(task.date).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-center text-muted-foreground italic">
                No {status} tasks match your filters.
              </p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
