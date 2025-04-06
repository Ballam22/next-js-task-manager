import { Card, CardContent } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '@prisma/client';
import Link from 'next/link';
import FormattedDate from './FormatDate';

export function SortableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const statusStyles = {
    upcoming: 'border-yellow-500 dark:border-yellow-300',
    ongoing: 'border-orange-500 dark:border-orange-300',
    completed: 'border-green-500 dark:border-green-300',
  };

  const tagStyles = {
    upcoming:
      'bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    ongoing:
      'bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
    completed:
      'bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200',
  };

  return (
    <Link href={`/tasks/${task.id}`} passHref>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Card
          className={`border-l-4 cursor-grab hover:shadow-md transition ${statusStyles[task.status as keyof typeof statusStyles]}`}
        >
          <CardContent className="p-4 space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">
                {task.title}
              </h3>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${tagStyles[task.status as keyof typeof tagStyles]}`}
              >
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              <FormattedDate date={task.date} />
            </p>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
