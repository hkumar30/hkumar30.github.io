import { PageTransition } from '@/components/PageTransition';
import HomeHero from '@/components/HomeHero';

export default function HomePage() {
  return (
    <PageTransition className="home-shell">
      <HomeHero />
    </PageTransition>
  );
}
