'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { LoginResponseBody } from '../../(auth)/api/auth-login/route';
import styles from '../../auth.module.css';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${window.location.origin}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // <== THIS IS KEY
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: LoginResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className={styles.authContainer}>
      <h1 className="font-semibold text-center text-xl mb-2">Login</h1>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className="font-semibold">
            Username:
          </label>
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className="font-semibold">
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
        <button className={styles.authButton}>Login</button>

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
      <div className={styles.authFooter}>
        Don't have an account?{' '}
        <Link href="/register" as="/register" className={styles.authLink}>
          Register here
        </Link>
      </div>
    </div>
  );
}
