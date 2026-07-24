// src/components/work/ThresholdChart.tsx
import styles from './ThresholdChart.module.css';

export function ThresholdChart() {
  return (
    <div className={styles.chartBlock}>
      <div className={styles.label}>Business cost by threshold strategy</div>
      <svg
        viewBox="0 0 560 220"
        width="100%"
        className={styles.svg}
        style={{ display: 'block', overflow: 'visible' }}
        role="img"
        aria-labelledby="chartTitle chartDesc"
      >
        <title id="chartTitle">Business cost comparison across three threshold strategies</title>
        <desc id="chartDesc">
          Default threshold at 0.50 costs $798,800. F1-optimized threshold at 0.5586 costs
          $943,200, worse than default. The deployed cost-calibrated threshold at 0.3517 costs
          $504,800, the lowest of the three.
        </desc>

        {/* baseline */}
        <line x1="50" y1="150" x2="540" y2="150" stroke="var(--line)" strokeWidth="1" />

        {/* bars */}
        <rect x="95" y="52" width="46" height="98" fill="var(--pine)" opacity="0.85" />
        <rect x="267" y="72" width="46" height="78" fill="var(--muted)" opacity="0.55" />
        <rect x="439" y="61" width="46" height="89" fill="var(--rust)" opacity="0.85" />

        {/* dollar values, above each bar */}
        <text x="118" y="42" className={styles.dollarVal} fill="var(--pine)" textAnchor="middle">$504.8K</text>
        <text x="290" y="62" className={styles.dollarVal} fill="var(--ink-soft)" textAnchor="middle">$798.8K</text>
        <text x="462" y="51" className={styles.dollarVal} fill="var(--rust)" textAnchor="middle">$943.2K</text>

        {/* strategy names, directly under each bar - single row, no other text at this y */}
        <text x="118" y="168" className={styles.strategyLabel} fill="var(--ink-soft)" textAnchor="middle">deployed</text>
        <text x="290" y="168" className={styles.strategyLabel} fill="var(--ink-soft)" textAnchor="middle">default</text>
        <text x="462" y="168" className={styles.strategyLabel} fill="var(--ink-soft)" textAnchor="middle">F1-optimal</text>

        {/* threshold axis values, its own row below the strategy names */}
        <text x="118" y="190" className={styles.axisVal} fill="var(--muted)" textAnchor="middle">0.35</text>
        <text x="290" y="190" className={styles.axisVal} fill="var(--muted)" textAnchor="middle">0.50</text>
        <text x="462" y="190" className={styles.axisVal} fill="var(--muted)" textAnchor="middle">0.56</text>

        {/* axis caption, its own row below that */}
        <text x="50" y="212" className={styles.axisCaption} fill="var(--muted)">threshold {'\u2192'}</text>
      </svg>
      <div className={styles.legend}>
        <span><i style={{ background: 'var(--pine)' }} />lowest cost - shipped</span>
        <span><i style={{ background: 'var(--muted)' }} />naive default</span>
        <span><i style={{ background: 'var(--rust)' }} />metric-optimal, still worse</span>
      </div>
    </div>
  );
}