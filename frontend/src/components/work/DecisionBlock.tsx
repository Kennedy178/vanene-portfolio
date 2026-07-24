import type { DecisionPair } from '../../data/caseFiles';
import styles from './DecisionBlock.module.css';

interface DecisionBlockProps {
  decision: DecisionPair;
}

export function DecisionBlock({ decision }: DecisionBlockProps) {
  return (
    <div className={styles.decision}>
      <div className={`${styles.col} ${styles.rejected}`}>
        <div className={styles.label}>{decision.rejectedLabel}</div>
        <div className={styles.text}>{decision.rejectedText}</div>
      </div>
      <div className={`${styles.col} ${styles.chosen}`}>
        <div className={styles.label}>{decision.chosenLabel}</div>
        <div className={styles.text}>{decision.chosenText}</div>
      </div>
    </div>
  );
}
