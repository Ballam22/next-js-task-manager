import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>Agile Project Tracker</h1>
        <div className={styles.navLinks}>
          <a href="/dashboard" className={styles.navLink}>
            Dashboard
          </a>
          <a href="/projects" className={styles.navLink}>
            Projects
          </a>
          <a href="/tasks" className={styles.navLink}>
            Tasks
          </a>
          <a href="/profile" className={styles.navLink}>
            Profile
          </a>
          <a href="/login" className={styles.navLink}>
            Login
          </a>
          <a href="/register" className={styles.navLink}>
            Register
          </a>
        </div>
      </nav>

      <div className={styles.mainLayout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Quick Links</h2>
          <ul className={styles.sidebarLinks}>
            <li>
              <a href="/create-project" className={styles.sidebarLink}>
                Create Project
              </a>
            </li>
            <li>
              <a href="/view-tasks" className={styles.sidebarLink}>
                View Tasks
              </a>
            </li>
            <li>
              <a href="/reports" className={styles.sidebarLink}>
                Reports
              </a>
            </li>
            <li>
              <a href="/settings" className={styles.sidebarLink}>
                Settings
              </a>
            </li>
          </ul>
        </aside>

        <main className={styles.mainContent}>
          <h2 className={styles.mainTitle}>Welcome to Agile Project Tracker</h2>
          <p className={styles.mainDescription}>
            Manage your projects, tasks, and team members efficiently with our
            agile project management tool.
          </p>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <h3>5</h3>
              <p>Active Projects</p>
            </div>
            <div className={styles.statCard}>
              <h3>12</h3>
              <p>Tasks Completed</p>
            </div>
            <div className={styles.statCard}>
              <h3>3</h3>
              <p>Team Members</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
