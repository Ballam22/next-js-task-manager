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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 shadow-sm">
        <div className="text-xl font-bold mb-6">Task Manager</div>
        <nav className="flex flex-col gap-4">
          <Link
            href={'/' as const}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </Link>
          <Link
            href={'/dashboard' as const}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Dashboard
          </Link>
          <Link
            href={'/tasks' as const}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Tasks
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm">
          <div className="text-lg font-semibold text-gray-800">Welcome</div>
          <div className="flex items-center gap-4">
            <Link
              href={'/login' as const}
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1 bg-gray-50">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome to our task manager site
          </h1>
        </main>
      </div>
    </div>
  );
}
