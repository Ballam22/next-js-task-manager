import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Task Manager',
  description: 'Get in touch with the Task Manager team.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Contact Us</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Have feedback or questions? We'd love to hear from you!
      </p>

      <form className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            className="w-full border px-4 py-2 rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border px-4 py-2 rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-full border px-4 py-2 rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Send Message
        </button>
      </form>
    </div>
  );
}
