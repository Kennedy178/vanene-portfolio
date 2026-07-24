import { SectionHeading } from '../layout/SectionHeading';
import { CaseCard } from './CaseCard';
import { caseFiles } from '../../data/caseFiles';
import styles from './CaseFilesSection.module.css';

export function CaseFilesSection() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <SectionHeading
          eyebrow="§ Case files"
          title="Every project here made a decision, not just a prediction."
          description="The engineering that mattered wasn't the model. It was choosing what to do when the model was uncertain, expensive to be wrong about, or contradicted the obvious answer."
        />

        <div className={styles.cases}>
          {caseFiles.map((caseFile) => (
            <CaseCard key={caseFile.slug} caseFile={caseFile} />
          ))}
        </div>
      </div>
    </section>
  );
}
