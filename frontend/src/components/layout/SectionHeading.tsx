import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className={styles.head}>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.desc}>{description}</p>}
    </div>
  );
}
