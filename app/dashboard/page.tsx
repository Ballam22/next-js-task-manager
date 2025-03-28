'use server';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import ProjectSummary from '@/components/dashboard/ProjectSummary';
import TaskQueue from '@/components/dashboard/TaskQueue';
import { findSessionByToken } from '@/database/models/session';
import { findUserById } from '@/database/models/users';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import LogoutButton from '../logout/LogoutButton';
import styles from './dashboard.module.css';

export default async function DashboardPage() {
  const sessionToken = (await cookies()).get('sessionToken')?.value;
  if (!sessionToken) redirect('/auth/login');

  try {
    jwt.verify(sessionToken, process.env.JWT_SECRET!);
  } catch {
    redirect('/auth/login');
  }

  const session = await findSessionByToken(sessionToken);
  if (!session) redirect('/auth/login');

  const now = new Date();
  if (new Date(session.expiry_timestamp) < now) {
    redirect('/auth/login');
  }

  const user = await findUserById(session.user_id);
  if (!user) redirect('/auth/login');

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>Momentum Project Tracker</h1>
        <div className={styles.navLinks}>
          <Link href="/dashboard" className={styles.navLink}>
            Dashboard
          </Link>
          <Link href="/projects" className={styles.navLink}>
            Projects
          </Link>
          <Link href="/profile" className={styles.navLink}>
            Profile
          </Link>
        </div>
      </nav>

      <div className={styles.mainLayout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Quick Links</h2>
          <ul className={styles.sidebarLinks}>
            <li>
              <Link href="/createproject" className={styles.sidebarLink}>
                Create Project
              </Link>
            </li>
            <li>
              <Link href="/taskform" className={styles.sidebarLink}>
                View Tasks
              </Link>
            </li>
          </ul>
          <div className={styles.sidebarSection}>
            <ProjectSummary userId={user.id} />
          </div>
        </aside>

        <main className={styles.mainContent}>
          <header className={styles.dashboardHeader}>
            <h1 className={styles.dashboardSection}>
              Welcome, {user.username}!
            </h1>
            <LogoutButton />
          </header>
          <section className={styles.dashboardSection}>
            <TaskQueue userId={user.id} />
          </section>
          <section className={styles.dashboardSection}>
            <ActivityFeed userId={user.id} />
          </section>
        </main>
      </div>
    </div>
  );
}
