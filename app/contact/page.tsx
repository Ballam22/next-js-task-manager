import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Belal Allam.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Contact</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        I'd love to connect — whether it's about potential opportunities,
        collaborations, or just a friendly chat.
      </p>

      <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-lg">
        <li>
          <strong>Email:</strong>{' '}
          <a
            href="mailto:your.email@example.com"
            className="text-blue-600 hover:underline"
          >
            ballam93@gmail.com
          </a>
        </li>
        <li>
          <strong>Phone:</strong>{' '}
          <a href="tel:+43123456789" className="text-blue-600 hover:underline">
            +43 677 614 64939
          </a>
        </li>
        <li>
          <strong>LinkedIn:</strong>{' '}
          <a
            href="https://www.linkedin.com/in/belal-allam-60a743142/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            linkedin.com/in/yourprofile
          </a>
        </li>
      </ul>
    </div>
  );
}
