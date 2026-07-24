import styles from './Footer.module.css';

const SOCIALS = [
  { label: 'Email', href: 'mailto:kennedydsml@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kennedy-munene-dsml/' },
  { label: 'GitHub', href: 'https://github.com/Kennedy178' },
  { label: 'Medium', href: 'https://medium.com/@kennedydsml' },
  { label: 'X', href: 'https://x.com/Kennedy_bse' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.left}>
          <span>
            {/*
              Admin entry point - fully clickable, keyboard-reachable, no
              aria-hidden and no negative tabIndex (those would make it
              unreachable, not just unassuming). It's styled to match the
              surrounding text exactly - no color shift, no underline, no
              cursor change - so it doesn't visually announce itself, but
              it is a real, working link. See ARCHITECTURE.md section 7.
            */}
            <a href="/admin" className={styles.adminLink}>
              ©
            </a>{' '}
            2026 Kennedy
          </span>
        </div>

        <div className={styles.socials}>
          {SOCIALS.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>

        <div className={styles.status}>
          <span className={styles.dot} />
          Open to opportunities - full-stack, data science, backend
        </div>
      </div>
    </footer>
  );
}