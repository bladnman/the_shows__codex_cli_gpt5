import Link from "next/link";
import type { TmdbWatchProvidersResponse } from "@/lib/tmdb";

export default function Providers({ providers }: { providers: TmdbWatchProvidersResponse }) {
  const country = providers.results["US"] || providers.results["GB"] || Object.values(providers.results)[0];
  if (!country) return null;
  const list = country.flatrate || country.rent || country.buy || [];
  if (!list.length) return null;
  return (
    <section className="space-y-[var(--space-3)]">
      <h2 className="text-lg font-medium">Where to Watch</h2>
      <div className="flex flex-wrap gap-[var(--space-2)] items-center">
        {list.map((p) => (
          <Link
            key={p.provider_id}
            href={country.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-[var(--space-2)] py-[var(--space-1)] rounded-[var(--radius-full)] border border-[color:var(--color-border)] hover:border-[color:var(--color-accent)]"
          >
            {p.provider_name}
          </Link>
        ))}
      </div>
    </section>
  );
}
