import { SectionHeading } from '../layout/SectionHeading';
import { SkillGroup } from './SkillGroup';
import { skillGroups } from '../../data/skills';
import styles from './StackSection.module.css';

export function StackSection() {
  return (
    <section id="stack" className="section">
      <div className="wrap">
        <SectionHeading
          eyebrow="§ Stack"
          title="Every listed skill has a project attached to it."
          description="Not a keyword wall - each row is something I've actually shipped, with the case file that proves it."
        />

        <div className={styles.groups}>
          {skillGroups.map((group) => (
            <SkillGroup key={group.title} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
