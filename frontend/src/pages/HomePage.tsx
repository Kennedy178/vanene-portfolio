// src/pages/HomePage.tsx
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { BackToTop } from '../components/layout/BackToTop';
import { Hero } from '../components/hero/Hero';
import { CaseFilesSection } from '../components/work/CaseFilesSection';
import { EvidenceSection } from '../components/evidence/EvidenceSection';
import { ProcessSection } from '../components/process/ProcessSection';
import { PullQuote } from '../components/process/PullQuote';
import { StackSection } from '../components/stack/StackSection';
import { RatingsSection } from '../components/ratings/RatingsSection';
import { ContactSection } from '../components/contact/ContactSection';
import type { Theme } from '../hooks/useTheme';

interface HomePageProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function HomePage({ theme, onToggleTheme }: HomePageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <Hero />
        <CaseFilesSection />
        <EvidenceSection theme={theme} />
        <ProcessSection />
        <PullQuote />
        <StackSection />
        <RatingsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}