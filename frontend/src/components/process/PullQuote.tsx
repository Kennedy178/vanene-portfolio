import styles from './PullQuote.module.css';

export function PullQuote() {
  return (
    <section id="pullquote" className={`section ${styles.pullquote}`}>
      <div className={`wrap ${styles.inner}`}>
        <span className={styles.mark}>{'\u201C'}</span>
        <blockquote>
          The F1-optimal threshold was mathematically correct and{' '}
          <em>still the wrong call</em> - optimizing the metric pointed in exactly the wrong
          direction for the business.
        </blockquote>
        <div className={styles.cite}>
          - from the FraudGuard engineering notes, on why the F1-maximizing cutoff was rejected
        </div>
      </div>
    </section>
  );
}