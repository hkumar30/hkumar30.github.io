import { PageTransition } from '@/components/PageTransition';
import HomeHero from '@/components/HomeHero';
import HomeMonologue from '@/components/HomeMonologue';
import HomeRetrievalConstellation from '@/components/HomeRetrievalConstellation';
import SpinningRings3D from '@/components/SpinningRings3D';

export default function HomePage() {
  return (
    <PageTransition className="home-shell">
      <HomeHero />
      <SpinningRings3D />
      <HomeMonologue />
      <HomeRetrievalConstellation />
    </PageTransition>
  );
}
