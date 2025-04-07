'use client';

import { Button } from '@/components/ui/button';
import Footer from '@/components/ui/footer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Home,
  Info,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import LogoutButton from './LogoutButton';

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

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isPublicPage = ['/login', '/register'].includes(pathname);

  return (
    <div className="flex min-h-screen">
      {!isPublicPage && (
        <aside className="hidden md:flex md:flex-col w-64 bg-background border-r border-border">
          <div className="p-4 text-xl font-bold text-primary">Task Manager</div>
          <nav className="flex flex-col gap-1 p-2">
            {navItems.map((item) => (
              <Link
                key={`navitem-${item.name}`}
                href={{ pathname: item.href }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
                ${
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-4">
            <LogoutButton />
          </div>
        </aside>
      )}

      {!isPublicPage && (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden m-4">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-background">
            <div className="flex items-center justify-between p-4">
              <span className="text-xl font-bold text-primary">
                Task Manager
              </span>
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
                  key={`navitem-${item.name}`}
                  href={{ pathname: item.href }}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium
                    ${
                      pathname === item.href
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="p-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={async () => {
                  await fetch('/api/logout', { method: 'POST' });
                  window.location.href = '/login';
                }}
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
      <div className="flex-1 flex flex-col min-h-screen bg-background text-foreground">
        <main className="flex-grow p-4 md:p-8 w-full">{children}</main>
        {!isPublicPage && <Footer />}
      </div>
    </div>
  );
}
