import { ContactForm } from './ContactForm';
import styles from './ContactSection.module.css';

const CHANNELS = [
  { label: 'Email', value: 'kennedydsml@gmail.com', href: 'mailto:kennedydsml@gmail.com' },
  { label: 'LinkedIn', value: 'kennedy-munene-dsml', href: 'https://www.linkedin.com/in/kennedy-munene-dsml/' },
  { label: 'GitHub', value: 'Kennedy178', href: 'https://github.com/Kennedy178' },
  { label: 'Medium', value: '@kennedydsml', href: 'https://medium.com/@kennedydsml' },
  { label: 'X', value: '@Kennedy_bse', href: 'https://x.com/Kennedy_bse' },
];

export function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className={`wrap ${styles.grid}`}>
        <div>
          <h2 className={styles.heading}>Have a problem worth a calibrated answer?</h2>
          <p className={styles.lede}>
            Based in Nairobi, Kenya - open to relocation. Open to Data Science, ML Engineering,
            Backend, and full-stack roles. I reply within 24 to 48 hours.
          </p>

          <a
            href="/resume/kennedy-vanene-resume.pdf"
            download
            className={styles.resumeLink}
          >
            Download resume {'\u2193'}
          </a>

          <div className={styles.channels}>
            {CHANNELS.map((channel) => (
              <a key={channel.label} href={channel.href} target="_blank" rel="noreferrer" className={styles.channel}>
                <span className={styles.channelLabel}>{channel.label}</span>
                <span className={styles.channelVal}>{channel.value}</span>
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}