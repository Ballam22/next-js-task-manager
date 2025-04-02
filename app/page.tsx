import Link from 'next/link';
import type { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: {
    default: 'Home Page | Task Manager',
    template: '%s | Task MAnager',
  },
  description:
    'Organize your work and life with TaskFlow. Create, track, and manage tasks with ease. Stay productive and never miss a deadline.',
};

export default function Home() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center">
        Welcome to our task manager site
      </h1>
      <Link
        href="/login"
        className="text-blue-600 font-semibold hover:underline"
      >
        Login
      </Link>
    </div>
  );
}
