'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './createproject.module.css';

export default function CreateProjectForm() {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/createProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName, projectDescription }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || 'Failed to create project');
      }

      setSuccess('✅ Project created successfully!');
      setProjectName('');
      setProjectDescription('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create a New Project</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="projectName" className={styles.label}>
            Project Name
          </label>
          <input
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="projectDescription" className={styles.label}>
            Project Description
          </label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className={styles.textarea}
            required
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <button className={styles.button} disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Project'}
        </button>
      </form>

      {success && (
        <div className={styles.linkWrapper}>
          <Link href="/dashboard" className={styles.link}>
            → Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
