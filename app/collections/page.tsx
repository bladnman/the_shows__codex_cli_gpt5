import { fetch_entries } from "@/app/collections/utils/fetch_entries";
import { getDetails, type TmdbDetails } from "@/lib/tmdb";
import { ShowCard } from "@/components/ShowCard";
import type { ShowEntry } from "@prisma/client";
import Link from "next/link";

export default async function CollectionsPage() {
  const entries = await fetch_entries();
  const watchlist = entries.filter((e) => e.watchlist);
  const watched = entries.filter((e) => e.watchedAt);
  const rated = entries.filter((e) => e.rating);

  async function section(items: ShowEntry[], title: string) {
    const enriched: { e: ShowEntry; d: TmdbDetails }[] = await Promise.all(
      items.map(async (e) => ({ e, d: await getDetails(e.mediaType as "movie" | "tv", e.tmdbId) }))
    );
    return (
      <section className="space-y-[var(--space-3)]">
        <h2 className="text-xl font-bold">{title}</h2>
        {enriched.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[var(--space-4)]">
            {enriched.map(({ e, d }) => (
              <ShowCard key={e.id} item={d} mediaType={e.mediaType as "movie" | "tv"} withActions />
            ))}
          </div>
        ) : (
          <p className="text-[color:var(--color-muted-foreground)]">No items</p>
        )}
      </section>
    );
  }

  return (
    <div className="min-h-screen px-[var(--space-5)] py-[var(--space-6)] sm:px-[var(--space-8)] space-y-[var(--space-8)]">
      <header className="flex items-center justify-between mb-[var(--space-2)]">
        <h1 className="text-2xl font-bold">Your Collections</h1>
        <nav className="text-sm">
          <Link className="hover:underline" href="/">Home</Link>
        </nav>
      </header>
      {await section(watchlist, "Watchlist")}
      {await section(watched, "Watched")}
      {await section(rated, "Rated")}
    </div>
  );
}
