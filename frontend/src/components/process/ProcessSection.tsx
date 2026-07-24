import { SectionHeading } from '../layout/SectionHeading';
import styles from './ProcessSection.module.css';

const STEPS = [
  {
    num: '01',
    question: 'What does being wrong cost?',
    answer: 'Before touching a model, I price both ways it can fail in real currency, not a metric.',
    tag: 'sets the decision threshold',
  },
  {
    num: '02',
    question: 'What breaks in production?',
    answer: 'Auth, audit trails, offline states, migrations - where trust is actually won or lost.',
    tag: 'sets the architecture',
  },
  {
    num: '03',
    question: 'Can someone else run it?',
    answer: 'A system only I can operate isn\'t finished. The interface is part of the deliverable.',
    tag: 'sets what ships',
  },
];

export function ProcessSection() {
  return (
    <section id="process" className={`section ${styles.process}`}>
      <div className="wrap">
        <SectionHeading
          eyebrow="§ How I work"
          title="The same three questions, every project."
          description="Not a checklist - an order of operations. Each answer constrains the next one."
        />

        <div className={styles.path}>
          {STEPS.map((step) => (
            <div key={step.num} className={styles.step}>
              <div className={styles.left}>
                <span className={styles.num}>{step.num}</span>
                <span className={styles.question}>{step.question}</span>
              </div>
              <div className={styles.right}>
                <p>{step.answer}</p>
                <div className={styles.tag}>{'\u2192'} {step.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}