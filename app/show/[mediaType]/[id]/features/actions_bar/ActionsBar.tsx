import { markWatched, setRating } from "@/app/actions/user_state";
import type { ShowEntry } from "@prisma/client";

export default async function ActionsBar({ tmdbId, mediaType, entry }: { tmdbId: number; mediaType: "movie"|"tv"; entry: ShowEntry | null }) {
  const currentRating = entry?.rating ?? 0;
  const watched = !!entry?.watchedAt;

  return (
    <section className="flex flex-wrap items-center gap-[var(--space-3)]">
      <form action={async () => { "use server"; await markWatched(tmdbId, mediaType); }} className="contents">
        <button
          className={`px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius-md)] border ${watched ? "bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] border-transparent" : "border-[color:var(--color-border)]"}`}
        >
          {watched ? "Watched ✓" : "Mark Watched"}
        </button>
      </form>

      <form action={async (formData) => { "use server"; const r = Number(formData.get("rating") || 0); await setRating(tmdbId, mediaType, r); }} className="flex items-center gap-[var(--space-2)]">
        <label className="text-sm text-[color:var(--color-muted-foreground)]" htmlFor="rating">Your Rating</label>
        <select
          id="rating"
          name="rating"
          defaultValue={currentRating}
          className="bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-[var(--radius-md)] px-[var(--space-2)] py-[var(--space-1)]"
        >
          <option value={0}>—</option>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <button className="px-[var(--space-3)] py-[var(--space-1)] rounded-[var(--radius-md)] border border-[color:var(--color-border)]">Save</button>
      </form>
    </section>
  );
}
