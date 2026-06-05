import { PageTransition } from '@/components/PageTransition';
import HomeHero from '@/components/HomeHero';
import HomeIndex from '@/components/HomeIndex';

export default function HomePage() {
  return (
    <PageTransition className="home-shell">
      <HomeHero />
      <HomeIndex />
    </PageTransition>
  );
}
