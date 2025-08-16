import { getTrending, getPopular, type TmdbShow } from "@/lib/tmdb";
import ScreenshotTile from "./ScreenshotTile";
import { ShowCard } from "@/components/ShowCard";
import { fetch_entries } from "@/app/collections/utils/fetch_entries";
import { getDetails } from "@/lib/tmdb";

export default async function ExcitementSections() {
  const [trendingAll, popularMovies, popularTv, entries] = await Promise.all([
    getTrending(),
    getPopular("movie"),
    getPopular("tv"),
    fetch_entries(),
  ]);

  const trending = trendingAll.results.slice(0, 10);
  const popular = [...popularMovies.results.slice(0, 10), ...popularTv.results.slice(0, 10)].slice(0, 12);
  const onList = entries.filter((e) => e.watchlist).slice(0, 12);
  const history = entries.filter((e) => e.watchedAt || e.rating).slice(0, 12);

  return (
    <div className="space-y-[var(--space-8)]">
      <section className="space-y-[var(--space-3)]">
        <h2 className="text-xl font-bold">Highly Excited</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--space-4)]">
          {trending.map((it) => (
            <ScreenshotTile key={`${it.media_type ?? 'movie'}-${it.id}`} item={it as TmdbShow} mediaType={(it.media_type ?? 'movie') as 'movie'|'tv'} size="lg" />
          ))}
        </div>
      </section>
      <section className="space-y-[var(--space-3)]">
        <h2 className="text-xl font-bold">Excited</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[var(--space-4)]">
          {popular.map((it) => (
            <ScreenshotTile key={`${(it as any).media_type ?? 'movie'}-${it.id}`} item={it as TmdbShow} mediaType={((it as any).media_type ?? 'movie') as 'movie'|'tv'} size="md" />
          ))}
        </div>
      </section>
      <section className="space-y-[var(--space-3)]">
        <h2 className="text-xl font-bold">On List</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[var(--space-4)]">
          {await Promise.all(onList.map(async (e) => {
            const d = await getDetails(e.mediaType as 'movie'|'tv', e.tmdbId);
            return <ShowCard key={`wl-${e.id}`} item={d} mediaType={e.mediaType as 'movie'|'tv'} withActions />;
          }))}
        </div>
      </section>
      <section className="space-y-[var(--space-3)]">
        <h2 className="text-xl font-bold">History</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[var(--space-4)]">
          {await Promise.all(history.map(async (e) => {
            const d = await getDetails(e.mediaType as 'movie'|'tv', e.tmdbId);
            return <ShowCard key={`hist-${e.id}`} item={d} mediaType={e.mediaType as 'movie'|'tv'} withActions={false} />;
          }))}
        </div>
      </section>
    </div>
  );
}

