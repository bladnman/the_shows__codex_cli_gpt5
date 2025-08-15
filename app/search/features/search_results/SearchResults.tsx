import { searchMulti, type TmdbShow } from "@/lib/tmdb";
import { ShowCard } from "@/components/ShowCard";

export default async function SearchResults({ q, media, genre }: { q: string; media: "all"|"movie"|"tv"; genre?: number }) {
  const data = await searchMulti(q);
  let filtered: TmdbShow[] = data.results.filter((r): r is TmdbShow => r.media_type === "movie" || r.media_type === "tv");
  if (media !== "all") {
    filtered = filtered.filter((r) => (r.media_type ?? "all") === media);
  }
  if (genre && genre > 0) {
    filtered = filtered.filter((r) => (r.genre_ids || []).includes(genre));
  }
  return (
    <div className="space-y-[var(--space-3)]">
      <p className="text-sm text-[color:var(--color-muted-foreground)]">{filtered.length} results</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[var(--space-4)]">
        {filtered.map((it) => (
          <ShowCard key={`${it.media_type}-${it.id}`} item={it} mediaType={it.media_type as "movie" | "tv"} withActions />
        ))}
      </div>
    </div>
  );
}
