'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Home,
  Info,
  LayoutDashboard,
  ListTodo,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LogoutButton from './ui/LogoutButton';

const navItems = [
  { name: 'Home', href: '/', icon: <Home size={18} /> },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard size={18} />,
  },
  { name: 'Tasks', href: '/tasks', icon: <ListTodo size={18} /> },
  { name: 'About', href: '/about', icon: <Info size={18} /> },
  { name: 'Contact', href: '/contact', icon: <Mail size={18} /> },
];
console.log(navItems);

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-background border-r border-border">
        <div className="p-4 text-xl font-bold text-primary">Task Manager</div>
        <nav className="flex flex-col gap-1 p-2">
          {navItems.map((item) => (
            <Link
              key={`nav-${item.name}`}
              href={{ pathname: item.href }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground text-sm font-medium ${
                pathname === item.href
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden m-4">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-background">
          <div className="flex items-center justify-between p-4">
            <span className="text-xl font-bold text-primary">Task Manager</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </Button>
          </div>
          <nav className="flex flex-col gap-1 p-2">
            {navItems.map((item) => (
              <Link
                key={`nav-mobile-${item.name}`}
                href={{ pathname: item.href }}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4">
            <LogoutButton />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 bg-background text-foreground w-full">
        {children}
      </main>
    </div>
  );
}
