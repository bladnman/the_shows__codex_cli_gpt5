import HeroCarousel from "@/app/home/features/hero_carousel/HeroCarousel";
import ExcitementSections from "@/app/home/features/excitement_sections/ExcitementSections";
export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div className="min-h-screen px-[var(--space-5)] py-[var(--space-6)] sm:px-[var(--space-8)] space-y-[var(--space-8)]">
      <HeroCarousel />
      <ExcitementSections />
    </div>
  );
}
