'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../auth.module.css';
import type { RegisterResponseBody } from '../api/register/route';

export default function RegisterSchema() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: RegisterResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    router.push('/dashboard');

    router.refresh();
  };

  return (
    <div className={styles.authContainer}>
      <h1 className="font-semibold text-center text-xl mb-2">Register</h1>

      <form onSubmit={handleSubmit} className={styles.authForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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

        <button className={styles.authButton}>Register</button>
        <div className="font-bold text-red-500">
          {errors?.map((error) => {
            return (
              <div key={`error-${error.message}-${Math.random()}`}>
                <div>{error.message}</div>
              </div>
            );
          })}
        </div>
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
