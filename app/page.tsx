import { PageTransition } from '@/components/PageTransition';
import HomeFooter from '@/components/HomeFooter';
import HomeHero from '@/components/HomeHero';
import HomeMonologue from '@/components/HomeMonologue';
import HomeTeaching from '@/components/HomeTeaching';
import HomeThemeToggle from '@/components/HomeThemeToggle';

export default function HomePage() {
  return (
    <PageTransition className="home-shell">
      <HomeThemeToggle />
      <HomeHero />
      <HomeMonologue />
      <HomeTeaching />
      <HomeFooter />
    </PageTransition>
  );
}
