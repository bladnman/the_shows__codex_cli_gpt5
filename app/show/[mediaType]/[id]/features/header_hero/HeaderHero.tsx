import Image from "next/image";
import WatchlistButton from "@/components/actions/WatchlistButton";
import { imageUrl, TmdbDetails, TmdbVideo } from "@/lib/tmdb";
import TrailerButton from "./TrailerButton";
import type { ShowEntry } from "@prisma/client";

import AddToListDropdown from "./AddToListDropdown";

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
    <section className="relative -mx-[var(--space-5)] sm:-mx-[var(--space-8)] overflow-hidden">
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
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--color-hero-overlay) 0%, var(--color-hero-overlay-soft) 40%, transparent 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 p-[var(--space-6)] sm:p-[var(--space-8)]">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-end gap-[var(--space-6)]">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-[var(--space-2)]">{title}</h1>
              <p className="max-w-3xl text-sm sm:text-base text-white/80 line-clamp-3">{details.overview}</p>
              <div className="mt-[var(--space-4)] flex flex-wrap items-center gap-[var(--space-3)]">
                <AddToListDropdown />
                <TrailerButton youtubeKey={trailer?.key} disabled={!trailer} />
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-[var(--space-4)]">
              <div aria-label="User score" className="badge-circle" style={{ width: 44, height: 44, fontSize: 14 }}>
                {entry?.rating ?? "—"}
              </div>
              <div aria-label="Critics score" className="badge-circle" style={{ width: 44, height: 44, fontSize: 14 }}>
                {critics}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
