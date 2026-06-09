import { PageTransition } from '@/components/PageTransition';
import HomeHero from '@/components/HomeHero';
import HomeRetrievalConstellation from '@/components/HomeRetrievalConstellation';
import HomeThemeToggle from '@/components/HomeThemeToggle';

export default function HomePage() {
  return (
    <PageTransition className="home-shell">
      <HomeThemeToggle />
      <HomeHero />
      <HomeRetrievalConstellation />
    </PageTransition>
  );
}
