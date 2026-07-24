import styles from './ByTheNumbers.module.css';

const STATS = [
  { value: '5+', label: 'Years professional experience' },
  { value: '4', label: 'Production systems shipped' },
  { value: '3+', label: 'Years with Python & ML tools' },
  { value: 'BSc', label: 'Software Engineering' },
];

export function ByTheNumbers() {
  return (
    <div className={styles.panel}>
      <div className={styles.label}>By the numbers</div>
      <div className={styles.grid}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <div className={styles.value}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div className={styles.divider} />
      <div className={styles.badge}>
        <span className={styles.badgeIcon}>{'\u25CF'}</span>
        <div>
          <div className={styles.badgeTitle}>DataCamp Certified</div>
          <div className={styles.badgeSub}>Associate Data Scientist</div>
        </div>
      </div>
    </div>
  );
}