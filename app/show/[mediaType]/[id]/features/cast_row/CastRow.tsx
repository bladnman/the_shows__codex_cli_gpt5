import Image from "next/image";
import Link from "next/link";
import { getCredits } from "@/lib/tmdb";

export default async function CastRow({ mediaType, id, limit = 10 }: { mediaType: "movie"|"tv"; id: number; limit?: number }) {
  const credits = await getCredits(mediaType, id);
  const cast = credits.cast
    .slice()
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, limit);
  if (!cast.length) return null;
  return (
    <section className="space-y-[var(--space-3)]">
      <h2 className="text-lg font-medium">Top Billed Cast</h2>
      <div className="flex gap-[var(--space-4)] overflow-x-auto pb-[var(--space-2)]">
        {cast.map((p) => {
          const role = p.character || p.roles?.[0]?.character || "";
          const avatar = p.profile_path ? `https://image.tmdb.org/t/p/w185${p.profile_path}` : null;
          return (
            <Link key={p.id} href="#" className="shrink-0 w-28">
              <div className="w-28 h-28 rounded-[var(--radius-full)] overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-muted)]">
                {avatar ? (
                  <Image src={avatar} alt={p.name} width={112} height={112} className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="mt-[var(--space-2)] text-sm font-medium line-clamp-1">{p.name}</div>
              <div className="text-xs text-[color:var(--color-muted-foreground)] line-clamp-1">{role}</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

