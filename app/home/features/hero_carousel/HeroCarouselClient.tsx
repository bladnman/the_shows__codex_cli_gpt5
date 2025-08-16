"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

type Item = {
  id: number;
  title: string;
  overview: string;
  backdrop: string | null;
  mediaType: "movie"|"tv";
};

export default function HeroCarouselClient({ trending, popular }: { trending: Item[]; popular: Item[] }) {
  const [tab, setTab] = useState<"trending"|"popular">("trending");
  const items = useMemo(() => (tab === "trending" ? trending : popular), [tab, trending, popular]);
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1|1) => {
    const el = scroller.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="absolute top-[var(--space-3)] right-[var(--space-3)] z-10 flex items-center gap-[var(--space-2)]">
        <button
          onClick={() => setTab("trending")}
          className={`px-[var(--space-3)] py-[var(--space-1)] rounded-[var(--radius-full)] text-sm border ${tab === 'trending' ? 'bg-[color:var(--color-accent)] text-[color:var(--color-accent-foreground)] border-transparent' : 'border-[color:var(--color-border)] bg-[color:var(--color-background)]/80'}`}
        >Trending</button>
        <button
          onClick={() => setTab("popular")}
          className={`px-[var(--space-3)] py-[var(--space-1)] rounded-[var(--radius-full)] text-sm border ${tab === 'popular' ? 'bg-[color:var(--color-accent)] text-[color:var(--color-accent-foreground)] border-transparent' : 'border-[color:var(--color-border)] bg-[color:var(--color-background)]/80'}`}
        >Popular</button>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={scroller}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((it) => (
            <div key={it.id} className="relative min-w-full snap-start">
              {it.backdrop ? (
                <Image src={it.backdrop} alt="Backdrop" width={1280} height={720} className="w-full h-auto object-cover" />
              ) : (
                <div className="w-full aspect-video bg-[color:var(--color-muted)]" />
              )}
              {/* Dark overlay for readability */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--color-hero-overlay) 0%, var(--color-hero-overlay-soft) 40%, transparent 100%)" }} />
              <div className="absolute inset-x-0 bottom-0 p-[var(--space-6)] sm:p-[var(--space-8)]">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-[var(--space-2)]">{it.title}</h2>
                <p className="max-w-3xl text-sm sm:text-base text-white/80 line-clamp-3">{it.overview}</p>
                <div className="mt-[var(--space-4)] flex items-center gap-[var(--space-3)]">
                  <Link href={`/show/${it.mediaType}/${it.id}`} className="px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius-md)] bg-[color:var(--color-accent)] text-[color:var(--color-accent-foreground)] font-medium">
                    More Info
                  </Link>
                  <div className="relative">
                    <button className="px-[var(--space-4)] py-[var(--space-2)] rounded-[var(--radius-md)] border border-white/30 text-white/90">
                      Add to List ▾
                    </button>
                    {/* Purely visual stub dropdown (no backend change) */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button aria-label="Previous" onClick={() => scroll(-1)} className="absolute left-[var(--space-3)] top-1/2 -translate-y-1/2 px-[var(--space-3)] py-[var(--space-2)] rounded-[var(--radius-full)] bg-black/40 text-white">‹</button>
        <button aria-label="Next" onClick={() => scroll(1)} className="absolute right-[var(--space-3)] top-1/2 -translate-y-1/2 px-[var(--space-3)] py-[var(--space-2)] rounded-[var(--radius-full)] bg-black/40 text-white">›</button>
      </div>
    </div>
  );
}
