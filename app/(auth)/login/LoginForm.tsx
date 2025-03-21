'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../../../components/auth.module.css';
import { loginSchema } from '../../validation/auth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Add client-side validation
      const result = loginSchema.safeParse({ email, password });

      if (!result.success) {
        const errorMessages = result.error.issues
          .map((issue) => issue.message)
          .join(', ');
        throw new Error(errorMessages);
      }

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData: { error?: string } = await response.json();
        throw new Error(errorData.error || 'Failed to log in');
      }

      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.authTitle}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <button className={styles.authButton} disabled={isLoading}>
          {isLoading ? 'Loading in...' : 'Login'}
        </button>
      </form>
      <div className={styles.authFooter}>
        Don't have an account?{' '}
        <Link href="/register" as="/register" className={styles.authLink}>
          Register here
        </Link>
      </div>
    </div>
  );
}
