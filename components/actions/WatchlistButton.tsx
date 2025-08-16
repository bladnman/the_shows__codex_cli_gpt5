import { get_current_user_id_optional, get_entry } from "@/lib/user_state";
import { toggleWatchlist } from "@/app/actions/user_state";

export default async function WatchlistButton({ tmdbId, mediaType }: { tmdbId: number; mediaType: "movie"|"tv" }) {
  const userId = await get_current_user_id_optional();
  const entry = await get_entry(userId, tmdbId, mediaType);
  const inList = !!entry?.watchlist;
  return (
    <form action={async () => { "use server"; await toggleWatchlist(tmdbId, mediaType); }}>
      <button
        aria-pressed={inList}
        className={`px-[var(--space-3)] py-[var(--space-1)] rounded-[var(--radius-md)] text-sm border transition-colors ${inList ? "bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] border-transparent" : "border-[color:var(--color-border)]"}`}
      >
        {inList ? "In List" : "Add to List"}
      </button>
    </form>
  );
}
