import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Get to know Belal Allam and his journey into tech and project management.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">About Me</h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        Hi, I’m Belal Allam — a lifelong learner with a passion for technology,
        my background is in Sports & Nutrition Science, Physiotherapy, and over
        15 years of experience in personal training and leadership roles. Over
        the years, I’ve developed a deep interest in how people, projects, and
        technology come together.
      </p>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        I recently completed a full-stack web development bootcamp, where I
        worked with technologies like HTML, CSS, JavaScript, React, Next.js,
        Node.js, and PostgreSQL. I also hold a certification in Project
        Management and have a strong interest in roles such as Scrum Master,
        Product Owner, or Key Account Manager — where I can combine tech insight
        with strategic thinking.
      </p>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        I’m solution-oriented, resilient, and a team player who brings both
        focus and a sense of humor to every project. I'm fluent in English,
        German, and Arabic, and in my free time, you’ll find me kitesurfing,
        working out, or enjoying nature.
      </p>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        This project is a reflection of my journey — blending technical skills,
        project management mindset, and a passion for building meaningful tools.
        Thanks for stopping by!
      </p>
    </div>
  );
}
