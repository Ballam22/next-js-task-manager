'use client';
import { useEffect, useState } from 'react';
import styles from './project.module.css';

interface Project {
  id: number;
  name: string;
  description: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          const errorData: { error?: string } = await response.json();
          throw new Error(errorData.error || 'Failed to fetch projects');
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err: any) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects().catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Projects</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className={styles.errorMessage}>{error}</div>
      ) : (
        <ul className={styles.projectList}>
          {projects.map((project) => (
            <li key={`project-${project.id}`} className={styles.projectItem}>
              <h2 className={styles.projectName}>{project.name}</h2>
              <p className={styles.projectDescription}>{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
