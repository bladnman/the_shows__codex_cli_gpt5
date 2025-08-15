import { getDetails, imageUrl } from "@/lib/tmdb";
import { get_current_user_id_optional, get_entry } from "@/lib/user_state";
import { toggleWatchlist, markWatched, setRating } from "@/app/actions/user_state";

export default async function ShowDetails({ mediaType, id }: { mediaType: "movie"|"tv"; id: string }) {
  const d = await getDetails(mediaType, id);
  const userId = await get_current_user_id_optional();
  const entry = await get_entry(userId, d.id, mediaType);
  const poster = imageUrl(d.poster_path, "w500");
  const title = d.title ?? d.name ?? "Untitled";
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-[var(--space-6)]">
      <div>
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="Poster" className="w-full rounded-[var(--radius-lg)] border border-[color:var(--color-border)]" />
        ) : (
          <div className="w-full aspect-[2/3] rounded-[var(--radius-lg)] bg-[color:var(--color-muted)]" />)
        }
      </div>
      <div className="space-y-[var(--space-4)]">
        <div>
          <h1 className="text-3xl font-bold mb-[var(--space-2)]">{title}</h1>
          <p className="text-sm text-[color:var(--color-muted-foreground)] max-w-prose">{d.overview}</p>
        </div>
        <div className="text-sm grid grid-cols-2 gap-[var(--space-3)] max-w-xl">
          {d.genres?.length ? (
            <div>
              <div className="text-[color:var(--color-muted-foreground)]">Genres</div>
              <div>{d.genres.map((g) => g.name).join(", ")}</div>
            </div>
          ) : null}
          {mediaType === "movie" && d.runtime ? (
            <div>
              <div className="text-[color:var(--color-muted-foreground)]">Runtime</div>
              <div>{d.runtime} min</div>
            </div>
          ) : null}
          {mediaType === "tv" && d.number_of_seasons ? (
            <div>
              <div className="text-[color:var(--color-muted-foreground)]">Seasons</div>
              <div>{d.number_of_seasons}</div>
            </div>
          ) : null}
          <div>
            <div className="text-[color:var(--color-muted-foreground)]">TMDB Rating</div>
            <div>{Math.round(d.vote_average * 10) / 10} / 10</div>
          </div>
          <div>
            <div className="text-[color:var(--color-muted-foreground)]">Your Rating</div>
            <div>{entry?.rating ?? '—'} / 10</div>
          </div>
        </div>
        <form action={async (formData) => { "use server"; const rating = Number(formData.get("rating") || 0); await setRating(d.id, mediaType, rating); }} className="flex items-center gap-[var(--space-2)]">
          <label className="text-sm text-[color:var(--color-muted-foreground)]" htmlFor="rating">Your Rating</label>
          <select
            id="rating"
            name="rating"
            defaultValue={entry?.rating ?? 0}
            className="bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-[var(--radius-md)] px-[var(--space-2)] py-[var(--space-1)]"
            onChange={() => {}}
          >
            <option value={0}>—</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <button className="px-[var(--space-3)] py-[var(--space-1)] rounded-[var(--radius-md)] border border-[color:var(--color-border)]">Save</button>
        </form>
        <div className="flex gap-[var(--space-3)]">
          <form action={async () => { "use server"; await toggleWatchlist(d.id, mediaType); }} className="contents">
            <button className="px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius-md)] bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] font-medium">
              {entry?.watchlist ? "− Remove" : "+ Watchlist"}
            </button>
          </form>
          <form action={async () => { "use server"; await markWatched(d.id, mediaType); }} className="contents">
            <button className="px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius-md)] border border-[color:var(--color-border)]">
              {entry?.watchedAt ? "Watched ✓" : "Mark Watched"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
