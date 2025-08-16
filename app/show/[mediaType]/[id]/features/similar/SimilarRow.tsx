import { TmdbShow } from "@/lib/tmdb";
import { ShowCard } from "@/components/ShowCard";

export default function SimilarRow({ mediaType, items }: { mediaType: "movie"|"tv"; items: TmdbShow[] }) {
  if (!items.length) return null;
  return (
    <section className="space-y-[var(--space-3)]">
      <h2 className="text-lg font-medium">Similar</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[var(--space-4)]">
        {items.map((item) => (
          <ShowCard key={item.id} item={item as TmdbShow} mediaType={mediaType} withActions={false} />
        ))}
      </div>
    </section>
  );
}
