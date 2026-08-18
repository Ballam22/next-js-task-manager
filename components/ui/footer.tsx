'use client';

import { GithubIcon, LinkedinIcon } from '@/components/ui/brand-icons';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-6 px-6 text-sm text-muted-foreground text-center flex flex-col md:flex-row items-center justify-between gap-4">
      <p>
        © {new Date().getFullYear()} Task Manager. Built with 💻 Next.js &
        shadcn/ui.
      </p>
      <div className="flex gap-4">
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          <GithubIcon size={20} />
        </Link>
        <Link
          href="https://www.linkedin.com/feed/?trk=onboarding-landing"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          <LinkedinIcon size={20} />
        </Link>
      </div>
    </footer>
  );
}
