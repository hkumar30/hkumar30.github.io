import { PageTransition } from '@/components/PageTransition';
import HomeHero from '@/components/HomeHero';
import HomeMonologue from '@/components/HomeMonologue';
import MusicWidget from '@/components/MusicWidget';
import SpinningRings3D from '@/components/SpinningRings3D';

export default function HomePage() {
  return (
    <PageTransition className="home-shell">
      <HomeHero />
      <SpinningRings3D />
      <HomeMonologue />
      <MusicWidget />
    </PageTransition>
  );
}
