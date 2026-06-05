import { PageTransition } from '@/components/PageTransition';
import HomeHero from '@/components/HomeHero';
import HomeMonologue from '@/components/HomeMonologue';

export default function HomePage() {
  return (
    <PageTransition className="home-shell">
      <HomeHero />
      <HomeMonologue />
    </PageTransition>
  );
}
