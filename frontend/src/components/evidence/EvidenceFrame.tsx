import type { ReactNode } from 'react';
import type { Theme } from '../../hooks/useTheme';
import styles from './EvidenceFrame.module.css';

interface EvidenceFrameProps {
  theme: Theme;
  tag: string;
  caption: ReactNode;
  lightSrc: string;
  darkSrc: string;
  alt: string;
}

export function EvidenceFrame({ theme, tag, caption, lightSrc, darkSrc, alt }: EvidenceFrameProps) {
  const src = theme === 'dark' ? darkSrc : lightSrc;

  return (
    <div className={styles.item}>
      <div className={styles.head}>
        <div className={styles.tag}>{tag}</div>
      </div>
      <p className={styles.cap}>{caption}</p>
      <div className={styles.frame}>
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}
