import type { Route } from 'next';
import Link from 'next/link';

export default function Homepage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div
        className="absolute inset-0 z-0 animate-gradientShift bg-[length:200%_200%] bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradientShift 12s ease infinite',
        }}
      />

      <div className="relative z-10 flex justify-center py-6">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold text-white">Task Manager</span>
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 flex-1">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Where your tasks stay on track
        </h1>
        <p className="text-lg max-w-2xl mb-8 text-white/80">
          Organize your day, manage projects, and reach your goals with ease.
          Built for simplicity, flexibility, and focus.
        </p>
        <div className="flex gap-4">
          <Link
            href={'/login' as Route}
            className="px-6 py-3 rounded-md bg-white text-blue-600 hover:bg-gray-100 transition font-medium"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-md bg-transparent border border-white text-white hover:bg-white hover:text-blue-600 transition font-medium"
          >
            Learn More
          </Link>
        </div>
      </main>
    </div>
  );
}
