import { PageTransition } from '@/components/PageTransition';
import HomeFooter from '@/components/HomeFooter';
import HomeHero from '@/components/HomeHero';
import HomeMonologue from '@/components/HomeMonologue';
import HomeTeaching from '@/components/HomeTeaching';
import HomeThemeToggle from '@/components/HomeThemeToggle';
import { getCurrentTrack } from '@/lib/spotify';

export default async function HomePage() {
  const spotifyTrack = await getCurrentTrack();

  return (
    <PageTransition className="home-shell">
      <HomeThemeToggle />
      <HomeHero />
      <HomeMonologue />
      <HomeTeaching spotifyTrack={spotifyTrack} />
      <HomeFooter />
    </PageTransition>
  );
}
