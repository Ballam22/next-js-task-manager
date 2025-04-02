import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Task } from '@prisma/client';
import Link from 'next/link';

const tabs = [
  {
    name: 'Upcoming',
    value: 'upcoming',
  },
  {
    name: 'Ongoing',
    value: 'ongoing',
  },
  {
    name: 'Completed',
    value: 'completed',
  },
];

type Props = {
  tasks: Task[];
};

export default function ViewTasks({ tasks }: Props) {
  const upcomingTasks = tasks.filter((task) => task.status === 'upcoming');
  const ongoingTasks = tasks.filter((task) => task.status === 'ongoing');
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  return (
    <Tabs defaultValue="upcoming" className="max-w-xs w-full">
      <TabsList className="p-1 h-auto bg-background gap-1 border">
        {tabs.map((tab) => (
          <TabsTrigger
            key={`tab-${tab.value}`}
            value={tab.value}
            className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <div className="text-[13px] cursor-pointer">{tab.name}</div>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="upcoming">
        <div>
          <div className="">
            {upcomingTasks.length > 0
              ? upcomingTasks.map((task) => {
                  return (
                    <div key={`id-${task.id}`} className="my-2">
                      <Link href={`/tasks/${task.id}`}>
                        <p>{task.title}</p>
                        <p>{task.date.toLocaleDateString()}</p>
                      </Link>
                    </div>
                  );
                })
              : 'No upcoming tasks'}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="ongoing">
        <div>
          <div className="">
            {ongoingTasks.map((task) => {
              return (
                <div key={`id-${task.id}`} className="my-2">
                  <Link href={`/tasks/${task.id}`}>
                    <p>{task.title}</p>
                    <p>{task.date.toLocaleDateString()}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="completed">
        <div>
          <div className="">
            {completedTasks.map((task) => {
              return (
                <div key={`id-${task.id}`} className="my-2">
                  <Link href={`/tasks/${task.id}`}>
                    <p>{task.title}</p>
                    <p>{task.date.toLocaleDateString()}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
