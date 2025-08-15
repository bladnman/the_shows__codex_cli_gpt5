import SearchResults from "@/app/search/features/search_results/SearchResults";
import Link from "next/link";
import SearchFilters from "@/app/search/features/search_filters/SearchFilters";
export const dynamic = 'force-dynamic';
import { get_query } from "@/app/search/utils/get_query";

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const q = get_query(sp, "q")?.trim();
  const media = (get_query(sp, "media") as "all"|"movie"|"tv"|undefined) ?? "all";
  const genreParam = get_query(sp, "genre");
  const genre = genreParam ? parseInt(genreParam, 10) : undefined;
  return (
    <div className="min-h-screen px-[var(--space-5)] py-[var(--space-6)] sm:px-[var(--space-8)]">
      <header className="flex items-center justify-between mb-[var(--space-6)]">
        <h1 className="text-2xl font-bold">Search</h1>
        <nav className="text-sm flex gap-[var(--space-3)]">
          <Link className="hover:underline" href="/">Home</Link>
          <Link className="hover:underline" href="/collections">Collections</Link>
        </nav>
      </header>
      <form action="/search" className="mb-[var(--space-6)] flex flex-col gap-[var(--space-3)]">
        <input
          aria-label="Search shows"
          name="q"
          defaultValue={q}
          placeholder="Search movies and TV"
          className="flex-1 min-w-0 bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-[var(--radius-md)] px-[var(--space-3)] py-[var(--space-2)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-ring)]"
        />
        <SearchFilters media={media} genre={genre && genre > 0 ? genre : undefined} />
      </form>
      {q ? (
        // Results
        <SearchResults q={q} media={media} genre={genre} />
      ) : (
        <p className="text-[color:var(--color-muted-foreground)]">Try searching for “Dune”, “Breaking Bad”, or “Comedy”.</p>
      )}
    </div>
  );
}
