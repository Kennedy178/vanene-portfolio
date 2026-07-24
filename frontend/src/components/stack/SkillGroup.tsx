import type { SkillGroup as SkillGroupData } from '../../data/skills';
import styles from './SkillGroup.module.css';

interface SkillGroupProps {
  group: SkillGroupData;
}

export function SkillGroup({ group }: SkillGroupProps) {
  return (
    <div className={styles.group}>
      <h4>{group.title}</h4>
      <div className={styles.sub}>{group.subtitle}</div>

      {group.rows.map((row) => (
        <div key={row.name} className={styles.row}>
          <div className={styles.rowTop}>
            <span className={styles.name}>{row.name}</span>
            <span className={styles.proof}>{row.proof}</span>
          </div>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${row.level}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
