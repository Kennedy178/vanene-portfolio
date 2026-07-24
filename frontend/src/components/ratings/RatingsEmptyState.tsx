import styles from './RatingsEmptyState.module.css';

export function RatingsEmptyState() {
  return (
    <div className={styles.empty}>
      <div className={styles.mark}>{'\u2605'}</div>
      <div className={styles.title}>No ratings yet</div>
      <p className={styles.text}>
        This section fills in as clients and collaborators leave feedback - each one reviewed
        before it appears here. Be the first.
      </p>
    </div>
  );
}