import { getGenres, type Genre } from "@/lib/tmdb";

export default async function SearchFilters({ media, genre }: { media: "all"|"movie"|"tv"; genre?: number }) {
  const [movieGenres, tvGenres] = await Promise.all([getGenres("movie"), getGenres("tv")]);
  const allGenres: Genre[] = Array.from(new Map([...movieGenres.genres, ...tvGenres.genres].map(g => [g.id, g])).values());

  return (
    <div className="flex flex-wrap gap-[var(--space-3)] items-end">
      <div className="flex flex-col">
        <label className="text-sm text-[color:var(--color-muted-foreground)]" htmlFor="media">Media</label>
        <select id="media" name="media" defaultValue={media} className="bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-[var(--radius-md)] px-[var(--space-3)] py-[var(--space-2)]">
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="tv">TV</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-[color:var(--color-muted-foreground)]" htmlFor="genre">Genre</label>
        <select id="genre" name="genre" defaultValue={genre ?? 0} className="bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-[var(--radius-md)] px-[var(--space-3)] py-[var(--space-2)]">
          <option value="0">All</option>
          {allGenres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>
      <button className="px-[var(--space-4)] rounded-[var(--radius-md)] border border-[color:var(--color-border)]">Apply</button>
    </div>
  );
}

