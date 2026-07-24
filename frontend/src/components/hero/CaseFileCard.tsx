import styles from './CaseFileCard.module.css';

interface CaseFileCardProps {
  fileNumber: string;
  badge: string;
  title: string;
  oldValue: string;
  newValue: string;
  caption: string;
  linkHref: string;
  linkLabel: string;
}

export function CaseFileCard({
  fileNumber,
  badge,
  title,
  oldValue,
  newValue,
  caption,
  linkHref,
  linkLabel,
}: CaseFileCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span>{fileNumber}</span>
        <span className={styles.badge}>{badge}</span>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.stat}>
        <span className={styles.old}>{oldValue}</span>
        <span className={styles.arrow}>{'\u2192'}</span>
        <span className={styles.new}>{newValue}</span>
      </div>
      <div className={styles.cap}>
        {caption} <a href={linkHref}>{linkLabel}</a>
      </div>
    </div>
  );
}