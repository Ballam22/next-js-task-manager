'use client';

import { Github, Linkedin } from 'lucide-react';
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
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          <Github size={20} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          <Linkedin size={20} />
        </Link>
      </div>
    </footer>
  );
}
