import { CaseFileCard } from './CaseFileCard';
import { ByTheNumbers } from './ByTheNumbers';
import styles from './Hero.module.css';

const TECH = [
  'Python', 'FastAPI', 'React', 'TypeScript',
  'PostgreSQL', 'Docker', 'XGBoost', 'SHAP',
];

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.eyebrow}>
              <span className={styles.dot} />
              Data scientist, backend engineer &amp; full-stack developer
            </div>

            <h1 className={styles.statement}>
              Every model makes predictions. Few change <em>decisions.</em>
            </h1>

            <p className={styles.sub}>
              I'm <strong>Kennedy</strong> - I build the full path from a trained model to a
              system a business actually trusts: calibrated decisions, audited endpoints, and
              interfaces a non-technical reviewer can operate without a training manual.
            </p>

            <div className={styles.meta}>
              <span>Nairobi, Kenya</span>
              <span className={styles.sep}>-</span>
              <span>Open to relocation</span>
              <span className={styles.sep}>-</span>
              <span>Open to full-stack, data science &amp; backend roles</span>
            </div>

            <div className={styles.cta}>
              <a href="#work" className={`${styles.btn} ${styles.btnPrimary}`}>
                Read the case files {'\u2192'}
              </a>
              <a
                href="https://github.com/Kennedy178"
                target="_blank"
                rel="noreferrer"
                className={`${styles.btn} ${styles.btnGhost}`}
              >
                View GitHub
              </a>
            </div>

            <CaseFileCard
              fileNumber="Case file 2026-01"
              badge="Insurance fraud"
              title="The default threshold was mathematically correct. It still cost more."
              oldValue="$798,800 lost"
              newValue="$294,000 saved"
              caption="Same model. A recalibrated decision."
              linkHref="#work"
              linkLabel={`Read the full file ${'\u2193'}`}
            />
          </div>

          <ByTheNumbers />
        </div>

        <div className={styles.techStrip}>
          <div className={styles.techLabel}>Tech I work with</div>
          <div className={styles.techIcons}>
            {TECH.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}