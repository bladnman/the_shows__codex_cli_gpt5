import Link from "next/link";
import type { TmdbWatchProvidersResponse } from "@/lib/tmdb";

export default function Providers({ providers }: { providers: TmdbWatchProvidersResponse }) {
  const country = providers.results["US"] || providers.results["GB"] || Object.values(providers.results)[0];
  if (!country) return null;
  const groups: { label: string; key: "flatrate" | "rent" | "buy" }[] = [
    { label: "Stream", key: "flatrate" },
    { label: "Rent", key: "rent" },
    { label: "Buy", key: "buy" },
  ];
  const any = (country.flatrate?.length || country.rent?.length || country.buy?.length);
  if (!any) return null;
  return (
    <section className="space-y-[var(--space-3)]">
      <h2 className="text-lg font-medium pl-[var(--space-3)] border-l-4 border-[color:var(--color-accent)]">Where to Watch</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-4)]">
        {groups.map((g) => {
          const list = (country as any)[g.key] as { provider_id: number; provider_name: string }[] | undefined;
          if (!list?.length) return (
            <div key={g.key} className="text-sm text-[color:var(--color-muted-foreground)]">No {g.label}</div>
          );
          return (
            <div key={g.key} className="space-y-[var(--space-2)]">
              <div className="text-sm font-medium">{g.label}</div>
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
