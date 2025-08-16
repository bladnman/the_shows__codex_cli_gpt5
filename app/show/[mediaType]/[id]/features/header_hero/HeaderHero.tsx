import Image from "next/image";
import WatchlistButton from "@/components/actions/WatchlistButton";
import { imageUrl, TmdbDetails, TmdbVideo } from "@/lib/tmdb";
import TrailerButton from "./TrailerButton";
import type { ShowEntry } from "@prisma/client";

export default async function HeaderHero({
  details,
  mediaType,
  videos,
  entry,
}: {
  details: TmdbDetails;
  mediaType: "movie" | "tv";
  videos: TmdbVideo[];
  entry: ShowEntry | null;
}) {
  const title = details.title ?? details.name ?? "Untitled";
  const backdrop = imageUrl(details.backdrop_path, "w780");
  const trailer = videos.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser") && v.official
  ) || videos.find((v) => v.site === "YouTube");

  const critics = Math.round(details.vote_average * 10);

  return (
    <section className="relative rounded-[var(--radius-lg)] overflow-hidden border border-[color:var(--color-border)]">
      {backdrop ? (
        <Image
          src={backdrop}
          alt="Backdrop"
          width={1280}
          height={720}
          priority
          className="w-full h-auto object-cover"
        />
      ) : (
        <div className="w-full aspect-video bg-[color:var(--color-muted)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-background)]/90 via-[color:var(--color-background)]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-[var(--space-6)] sm:p-[var(--space-8)]">
        <h1 className="text-3xl sm:text-4xl font-bold mb-[var(--space-2)]">{title}</h1>
        <p className="max-w-3xl text-sm sm:text-base text-[color:var(--color-muted-foreground)] line-clamp-3">
          {details.overview}
        </p>
        <div className="mt-[var(--space-4)] flex flex-wrap items-center gap-[var(--space-3)]">
          <WatchlistButton tmdbId={details.id} mediaType={mediaType} />
          <TrailerButton youtubeKey={trailer?.key} disabled={!trailer} />
          <div className="ml-auto flex items-center gap-[var(--space-3)]">
            <span aria-label="User score" className="text-xs font-medium px-[var(--space-2)] py-[var(--space-1)] rounded-[var(--radius-full)] bg-[color:var(--color-accent)] text-[color:var(--color-accent-foreground)]">
              User {entry?.rating ?? "—"}/10
            </span>
            <span aria-label="Critics score" className="text-xs font-medium px-[var(--space-2)] py-[var(--space-1)] rounded-[var(--radius-full)] bg-[color:var(--color-accent)] text-[color:var(--color-accent-foreground)]">
              Critics {critics}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
