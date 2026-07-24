// src/pages/admin/AdminDashboard.tsx
import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { RatingsQueue } from '../../components/admin/RatingsQueue';
import { VisitorStats } from '../../components/admin/VisitorStats';
import { getAdminRatings } from '../../api/admin';
import styles from './AdminDashboard.module.css';

export function AdminDashboard() {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    getAdminRatings()
      .then((ratings) => {
        setPendingCount(ratings.filter((r) => r.status === 'pending').length);
      })
      .catch(() => {
        // Sidebar badge just stays at 0 if this fails - RatingsQueue
        // below will show its own error state.
      });
  }, []);

  return (
    <AdminLayout pendingCount={pendingCount}>
      <h1 className={styles.heading}>Dashboard</h1>
      <p className={styles.sub}>Visitor traffic and ratings awaiting review</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Ratings queue</h2>
        <RatingsQueue />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Visitor analytics</h2>
        <VisitorStats />
      </section>
    </AdminLayout>
  );
}