'use client';

import type { JSX } from 'react';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-container">
      <h2>Something went wrong</h2>
      <p>Our team has been notified and will fix it shortly.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
