import { TmdbDetails } from "@/lib/tmdb";

export default function InfoPanel({ details, mediaType }: { details: TmdbDetails; mediaType: "movie"|"tv" }) {
  const release = mediaType === "movie" ? details.release_date : details.first_air_date;
  const genres = details.genres?.map((g) => g.name).join(", ");
  const createdBy = details.created_by?.map((p) => p.name).join(", ");
  const network = details.networks?.map((n) => n.name).join(", ");
  const companies = details.production_companies?.map((c) => c.name).join(", ");
  const budget = typeof details.budget === "number" && details.budget > 0 ? `$${(details.budget / 1_000_000).toFixed(1)}m` : undefined;
  const revenue = typeof details.revenue === "number" && details.revenue > 0 ? new Intl.NumberFormat().format(details.revenue) : undefined;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-6)]">
      <div className="space-y-[var(--space-3)]">
        <h2 className="text-lg font-medium pl-[var(--space-3)] border-l-4 border-[color:var(--color-accent)]">Details</h2>
        <dl className="grid grid-cols-2 gap-x-[var(--space-4)] gap-y-[var(--space-3)] text-sm">
          {release ? (
            <div>
              <dt className="text-[color:var(--color-muted-foreground)]">{mediaType === "movie" ? "Release Date" : "First Air Date"}</dt>
              <dd>{release}</dd>
            </div>
          ) : null}
          {genres ? (
            <div>
              <dt className="text-[color:var(--color-muted-foreground)]">Genres</dt>
              <dd>{genres}</dd>
            </div>
          ) : null}
          {createdBy && mediaType === "tv" ? (
            <div>
              <dt className="text-[color:var(--color-muted-foreground)]">Created By</dt>
              <dd>{createdBy}</dd>
            </div>
          ) : null}
          {network && mediaType === "tv" ? (
            <div>
              <dt className="text-[color:var(--color-muted-foreground)]">Network</dt>
              <dd>{network}</dd>
            </div>
          ) : null}
        </dl>
      </div>
      <div className="space-y-[var(--space-3)]">
        <h2 className="text-lg font-medium pl-[var(--space-3)] border-l-4 border-[color:var(--color-accent)]">Production</h2>
        <dl className="grid grid-cols-2 gap-x-[var(--space-4)] gap-y-[var(--space-3)] text-sm">
          {details.status ? (
            <div>
              <dt className="text-[color:var(--color-muted-foreground)]">Status</dt>
              <dd>{details.status}</dd>
            </div>
          ) : null}
          {budget && mediaType === "movie" ? (
            <div>
              <dt className="text-[color:var(--color-muted-foreground)]">Budget</dt>
              <dd>{budget}</dd>
            </div>
          ) : null}
          {revenue && mediaType === "movie" ? (
            <div>
              <dt className="text-[color:var(--color-muted-foreground)]">Revenue</dt>
              <dd>${revenue}</dd>
            </div>
          ) : null}
          {companies ? (
            <div className="md:col-span-2">
              <dt className="text-[color:var(--color-muted-foreground)]">Production Companies</dt>
              <dd>{companies}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </section>
  );
}
