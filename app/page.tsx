import HomeSections from "@/app/home/features/home_sections/HomeSections";
export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <div className="min-h-screen px-[var(--space-5)] py-[var(--space-6)] sm:px-[var(--space-8)]">
      <HomeSections />
    </div>
  );
}
