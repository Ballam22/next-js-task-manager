import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Task Manager',
  description: 'Learn more about our mission and features.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">
        About Task Manager
      </h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        Task Manager is a modern web application built to help you organize your
        day, stay on top of your goals, and manage projects effectively.
      </p>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Whether you're a solo freelancer or part of a team, Task Manager offers
        features like task categorization, filtering, priority settings, dark
        mode, and more — all designed to help you stay productive and focused.
      </p>
    </div>
  );
}
