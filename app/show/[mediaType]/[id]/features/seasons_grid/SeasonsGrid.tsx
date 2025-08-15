import Image from "next/image";
import { imageUrl, TmdbDetails } from "@/lib/tmdb";

export default function SeasonsGrid({ details }: { details: TmdbDetails }) {
  if (!details.seasons?.length) return null;
  return (
    <section className="space-y-[var(--space-3)]">
      <h2 className="text-lg font-medium">Seasons</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[var(--space-4)]">
        {details.seasons.map((s) => {
          const poster = imageUrl(s.poster_path, "w342");
          const meta = s.episode_count ? `${s.episode_count} eps` : (s.air_date ? new Date(s.air_date).getFullYear() : "");
          return (
            <div key={s.id} className="rounded-[var(--radius-md)] overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-background)]">
              <div className="block">
                {poster ? (
                  <Image src={poster} alt={s.name} width={342} height={513} className="w-full h-auto object-cover" />
                ) : (
                  <div className="w-full aspect-[2/3] bg-[color:var(--color-muted)]" />
                )}
              </div>
              <div className="p-[var(--space-3)]">
                <div className="text-sm font-medium line-clamp-1">{s.name}</div>
                <div className="text-xs text-[color:var(--color-muted-foreground)]">{meta}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
