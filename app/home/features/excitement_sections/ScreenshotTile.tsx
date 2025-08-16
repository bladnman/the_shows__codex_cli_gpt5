import Image from "next/image";
import Link from "next/link";
import { imageUrl, type TmdbShow } from "@/lib/tmdb";

export default function ScreenshotTile({ item, mediaType, size }: { item: TmdbShow; mediaType: "movie"|"tv"; size: "lg"|"md" }) {
  const title = item.title ?? item.name ?? "Untitled";
  const backdrop = imageUrl(item.backdrop_path, "w780");
  const aspect = size === "lg" ? "aspect-[16/9]" : "aspect-[4/3]";
  return (
    <Link href={`/show/${mediaType}/${item.id}`} className={`group relative rounded-[var(--radius-md)] overflow-hidden border border-[color:var(--color-border)] hover:border-[color:var(--color-accent)] ${aspect}`}>
      {backdrop ? (
        <Image src={backdrop} alt="Backdrop" width={780} height={438} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-[color:var(--color-muted)]" />
      )}
      {/* Rating badge */}
      <div className="absolute top-[var(--space-2)] right-[var(--space-2)] badge-circle shadow">{Math.round(item.vote_average)}</div>
      {/* Title overlay */}
      <div className="absolute inset-x-0 bottom-0 p-[var(--space-3)] bg-gradient-to-t from-[color:var(--color-hero-overlay)] to-transparent">
        <div className="text-white text-sm sm:text-base font-medium line-clamp-2">{title}</div>
      </div>
    </Link>
  );
}

