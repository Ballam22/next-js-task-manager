'use client';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';

interface Activity {
  id: string;
  action: string;
  project: string;
  timestamp: Date;
  user: string;
}

export default function ActivityFeed({ userId }: { userId: string }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(`/api/activities?userId=${userId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = (await res.json()) as Activity[];
        const parsedData = data.map((activity) => ({
          ...activity,
          timestamp: new Date(activity.timestamp),
        }));
        setActivities(parsedData);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        console.error('Activity feed error:', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities().catch((err) =>
      console.error('Unhandled error in fetchActivities:', err),
    );
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600">
        <p>Error loading activities: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

      {activities.length === 0 ? (
        <p className="text-gray-500">No recent activity found</p>
      ) : (
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li
              key={`activity-${activity.id}`}
              className="flex items-start gap-3"
            >
              <div className="bg-gray-100 rounded-full p-2 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{' '}
                  {activity.action}
                  {activity.project && (
                    <span>
                      {' '}
                      in <span className="font-medium">{activity.project}</span>
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(
                    activity.timestamp instanceof Date
                      ? activity.timestamp
                      : new Date(activity.timestamp),
                    {
                      addSuffix: true,
                    },
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {activities.length > 0 && (
        <button
          className="mt-4 text-sm text-blue-600 hover:underline"
          onClick={() => {
            // Implement view all functionality
          }}
        >
          View all activity
        </button>
      )}
    </div>
  );
}
