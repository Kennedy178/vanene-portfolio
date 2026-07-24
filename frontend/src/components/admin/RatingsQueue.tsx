// src/components/admin/RatingsQueue.tsx
import { useEffect, useState } from 'react';
import { getAdminRatings, updateRatingStatus, type AdminRating } from '../../api/admin';
import styles from './RatingsQueue.module.css';

export function RatingsQueue() {
  const [ratings, setRatings] = useState<AdminRating[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    getAdminRatings()
      .then(setRatings)
      .catch((error) => console.error('Failed to load admin ratings:', error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAction(id: string, status: 'approved' | 'rejected') {
    // Optimistic update - remove from the pending list immediately,
    // reconcile with the server in the background.
    setRatings((prev) => prev.filter((r) => r.id !== id));
    try {
      await updateRatingStatus(id, status);
    } catch (error) {
      console.error('Failed to update rating status:', error);
      load(); // fall back to a real refetch if the update failed
    }
  }

  const pending = ratings.filter((r) => r.status === 'pending');

  if (loading) {
    return <div className={styles.loading}>Loading ratings...</div>;
  }

  if (pending.length === 0) {
    return <div className={styles.empty}>No ratings waiting for review.</div>;
  }

  return (
    <div className={styles.queue}>
      {pending.map((rating) => (
        <div key={rating.id} className={styles.item}>
          <div className={styles.itemTop}>
            <div>
              <div className={styles.name}>{rating.name}</div>
              <div className={styles.role}>{rating.role_company}</div>
            </div>
            <div className={styles.stars}>
              {'\u2605'.repeat(rating.rating)}{'\u2606'.repeat(5 - rating.rating)}
            </div>
          </div>

          <p className={styles.quote}>{rating.quote}</p>

          {rating.email && (
            <div className={styles.email}>
              Contact: <a href={`mailto:${rating.email}`}>{rating.email}</a>
            </div>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.approve}
              onClick={() => handleAction(rating.id, 'approved')}
            >
              Approve
            </button>
            <button
              type="button"
              className={styles.reject}
              onClick={() => handleAction(rating.id, 'rejected')}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}