import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import type { Theme } from '../../hooks/useTheme';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '#work', label: 'Case files' },
  { href: '#evidence', label: 'Evidence' },
  { href: '#process', label: 'Process' },
  { href: '#stack', label: 'Stack' },
  { href: '#ratings', label: 'Ratings' },
];

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [activeId, setActiveId] = useState<string>('work');

  useEffect(() => {
    const sections = NAV_LINKS
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    function onScroll() {
      const pos = window.scrollY + 120;
      let current = sections[0];
      for (const sec of sections) {
        if (sec.offsetTop <= pos) current = sec;
      }
      if (current) setActiveId(current.id);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.nav}`}>
        <a href="#hero" className={styles.brand}>
          Kennedy <em>Vanene</em>
        </a>

        <nav className={styles.navlinks}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeId === link.href.slice(1) ? styles.active : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a href="#contact" className={styles.navCta}>
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
