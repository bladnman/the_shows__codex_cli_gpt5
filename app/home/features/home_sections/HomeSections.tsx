import { getTrending, getPopular, getNew, type TmdbShow } from "@/lib/tmdb";
import { ShowCard } from "@/components/ShowCard";

async function Section({ title, items, mediaType }: { title: string; items: TmdbShow[]; mediaType: "movie"|"tv" }) {
  return (
    <section className="space-y-[var(--space-3)]">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[var(--space-4)]">
        {items.map((it) => (
          <ShowCard key={`${mediaType}-${it.id}`} item={it} mediaType={mediaType} withActions />
        ))}
      </div>
    </section>
  );
}

export default async function HomeSections() {
  const [trend, popMovies, popTv, newMovies, newTv] = await Promise.all([
    getTrending(),
    getPopular("movie"),
    getPopular("tv"),
    getNew("movie"),
    getNew("tv"),
  ]);

  const trendingMovies = trend.results.filter((r) => (r.media_type ?? "movie") === "movie").slice(0, 12);
  const trendingTv = trend.results.filter((r) => (r.media_type ?? "tv") === "tv").slice(0, 12);

  return (
    <div className="space-y-[var(--space-8)]">
      <Section title="Trending Movies" items={trendingMovies} mediaType="movie" />
      <Section title="Trending TV" items={trendingTv} mediaType="tv" />
      <Section title="Popular Movies" items={popMovies.results.slice(0, 12)} mediaType="movie" />
      <Section title="Popular TV" items={popTv.results.slice(0, 12)} mediaType="tv" />
      <Section title="New Movies" items={newMovies.results.slice(0, 12)} mediaType="movie" />
      <Section title="Airing Today" items={newTv.results.slice(0, 12)} mediaType="tv" />
    </div>
  );
}
