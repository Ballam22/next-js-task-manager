import ActivityFeed from '@/components/dashboard/ActivityFeed';
import ProjectSummary from '@/components/dashboard/ProjectSummary';
import TaskQueue from '@/components/dashboard/TaskQueue';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { findUserById } from '../../database/models/users';
import LogoutButton from '../logout/LogoutButton';
import styles from './dashboard.module.css';

export default async function DashboardPage() {
  const cookiesData = await cookies();
  const token = cookiesData.get('sessionToken')?.value;
  if (!token) {
    redirect('/auth/login');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    redirect('/auth/login');
  }

  const { userId } = decoded as { userId: string };
  const user = await findUserById(userId);
  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Welcome, {user.username}!</h1>
        <LogoutButton />
      </header>

      <div className={styles.dashboardLayout}>
        <div className={styles.dashboardSidebar}>
          <ProjectSummary userId={userId} />
        </div>
        <div className={styles.dashboardMainContent}>
          <TaskQueue userId={userId} />
        </div>
      </div>

      <ActivityFeed userId={userId} />
    </div>
  );
}
