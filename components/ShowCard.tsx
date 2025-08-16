import Image from "next/image";
import Link from "next/link";
import { imageUrl, TmdbShow } from "@/lib/tmdb";
import { Stars } from "@/components/Stars";
import WatchlistButton from "@/components/actions/WatchlistButton";

export function ShowCard({ item, mediaType, withActions = true }: { item: TmdbShow; mediaType: "movie"|"tv"; withActions?: boolean }) {
  const title = item.title ?? item.name ?? "Untitled";
  const poster = imageUrl(item.poster_path, "w342");
  return (
    <div className="group rounded-[var(--radius-md)] overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-background)] hover:border-[color:var(--color-accent)] transition-colors">
      <Link href={`/show/${mediaType}/${item.id}`} className="block relative">
        {poster ? (
          <Image
            src={poster}
            alt="Poster"
            width={342}
            height={513}
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-[color:var(--color-muted)]" />
        )}
        {/* Rating badge (top-right) */}
        <div className="absolute top-[var(--space-2)] right-[var(--space-2)] badge-circle shadow">
          {Math.round(item.vote_average)}
        </div>
        {/* Media type marker (bottom-left) */}
        <div className="absolute bottom-[var(--space-2)] left-[var(--space-2)] px-[var(--space-2)] py-[var(--space-1)] rounded-[var(--radius-full)] bg-[color:var(--color-foreground)]/90 text-[color:var(--color-background)] text-xs font-medium">
          {mediaType === 'tv' ? 'TV' : 'Movie'}
        </div>
        <div className="p-[var(--space-3)]">
          <h3 className="text-base font-medium text-[color:var(--color-foreground)] line-clamp-2">{title}</h3>
          <div className="mt-[var(--space-2)] flex items-center justify-between">
            <Stars value={item.vote_average} />
            <span className="text-xs text-[color:var(--color-muted-foreground)]">{Math.round(item.vote_average * 10) / 10}</span>
          </div>
        </div>
      </Link>
      {withActions ? (
        <div className="px-[var(--space-3)] pb-[var(--space-3)]">
          <WatchlistButton tmdbId={item.id} mediaType={mediaType} />
        </div>
      ) : null}
    </div>
  );
}
