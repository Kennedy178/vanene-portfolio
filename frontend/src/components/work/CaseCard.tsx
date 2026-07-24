import type { CaseFile } from '../../data/caseFiles';
import { DecisionBlock } from './DecisionBlock';
import { ThresholdChart } from './ThresholdChart';
import styles from './CaseCard.module.css';

interface CaseCardProps {
  caseFile: CaseFile;
}

export function CaseCard({ caseFile }: CaseCardProps) {
  return (
    <article className={styles.case}>
      <div className={styles.top}>
        <div>
          <div className={styles.title}>{caseFile.title}</div>
          <div className={styles.tag}>{caseFile.tag}</div>
        </div>
        <div className={styles.links}>
          <a href={caseFile.liveUrl} target="_blank" rel="noreferrer" className={styles.link}>
            View live demo {'\u2197'}
          </a>
          {caseFile.githubUrl ? (
            <a href={caseFile.githubUrl} target="_blank" rel="noreferrer" className={styles.linkGhost}>
              GitHub {'\u2197'}
            </a>
          ) : (
            <span className={styles.linkPrivate}>Private repo</span>
          )}
        </div>
      </div>

      <p className={styles.desc}>{caseFile.description}</p>

      <DecisionBlock decision={caseFile.decision} />

      {caseFile.slug === 'fraudguard-ai' && <ThresholdChart />}

      <div className={styles.stats}>
        {caseFile.stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <div className={styles.statVal}>{stat.value}</div>
            <div className={styles.statLbl}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.stack}>
        {caseFile.stack.map((item) => (
          <span key={item} className={styles.chip}>{item}</span>
        ))}
      </div>
    </article>
  );
}