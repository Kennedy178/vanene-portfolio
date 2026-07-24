// src/components/admin/AdminLayout.tsx
import type { ReactNode } from 'react';
import styles from './AdminLayout.module.css';

interface AdminLayoutProps {
  children: ReactNode;
  pendingCount: number;
}

export function AdminLayout({ children, pendingCount }: AdminLayoutProps) {
  return (
    <div className={styles.wrap}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          Kennedy <em>Vanene</em>
        </div>

        <nav className={styles.nav}>
          <span className={styles.navItemActive}>Dashboard</span>
          {pendingCount > 0 && (
            <span className={styles.badge}>{pendingCount} pending</span>
          )}
        </nav>

        <a href="/" className={styles.backLink}>
          {'\u2190'} Back to site
        </a>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}