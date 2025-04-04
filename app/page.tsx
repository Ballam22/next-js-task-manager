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
    <div className="flex min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 shadow-md animate-fade-right animate-duration-500">
        <div className="text-2xl font-extrabold text-blue-600 mb-8 tracking-tight">
          Task Manager
        </div>
        <nav className="flex flex-col gap-4">
          <Link
            href={'/' as const}
            className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href={'/dashboard' as const}
            className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link
            href={'/tasks' as const}
            className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
          >
            Tasks
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm animate-fade-down animate-duration-500">
          <div className="text-lg font-semibold text-gray-800">Welcome</div>
          <div className="flex items-center gap-4">
            <Link
              href={'/login' as const}
              className="text-white bg-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        </header>
        <main className="p-10 flex-1 bg-gray-50 animate-fade-up animate-duration-700">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Welcome to our <span className="text-blue-600">Task Manager</span>{' '}
            site
          </h1>
          <p className="text-center text-gray-600 max-w-xl mx-auto">
            Manage your projects, organize your day, and stay on top of your
            goals — all in one place.
          </p>
        </main>
      </div>
    </div>
  );
}
