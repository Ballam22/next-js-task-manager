'use client';
import type { Project } from '@prisma/client';
import { useEffect, useState } from 'react';

export default function ProjectSummary({ userId }: { userId: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`/api/projects/user?userId=${userId}`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Error fetching projects',
        );
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProjects().catch((err) => {
        setError(
          err instanceof Error ? err.message : 'Error fetching projects',
        );
        setLoading(false);
      });
    }
  }, [userId]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <ul>
          {projects.map((project) => (
            <li key={`project-${project.id}`}>{project.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
