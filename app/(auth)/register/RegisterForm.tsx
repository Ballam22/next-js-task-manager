'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../../../components/auth.module.css';
import { registerSchema } from '../../validation/auth';

export default function RegisterSchema() {
  const [username, setUsername] = useState('');
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
      const result = registerSchema.safeParse({ email, password });

      if (!result.success) {
        const errorMessages = result.error.issues
          .map((issue) => issue.message)
          .join(', ');
        throw new Error(errorMessages);
      }
    } catch (validationError) {
      setError(
        validationError instanceof Error
          ? validationError.message
          : 'Validation error',
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData: { error?: string } = await response.json();
        throw new Error(errorData.error || 'Failed to register');
      }

      window.location.href = '/login';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authTitle}>Register</h1>

      <form onSubmit={handleSubmit} className={styles.authForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">UserName=</label>
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
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
          {isLoading ? 'Registering...' : 'Create Account'}
        </button>
      </form>
      <div className={styles.authSwitch}>
        Already have an account?{' '}
        <Link href="/login" className={styles.authLink}>
          Login here
        </Link>
      </div>
    </div>
  );
}
