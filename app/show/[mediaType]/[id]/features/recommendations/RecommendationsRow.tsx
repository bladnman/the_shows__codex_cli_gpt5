import { getRecommendations, TmdbShow } from "@/lib/tmdb";
import { ShowCard } from "@/components/ShowCard";

export default async function RecommendationsRow({ mediaType, id }: { mediaType: "movie"|"tv"; id: number }) {
  const recs = await getRecommendations(mediaType, id);
  if (!recs.results.length) return null;
  return (
    <section className="space-y-[var(--space-3)]">
      <h2 className="text-lg font-medium">Recommended</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[var(--space-4)]">
        {recs.results.map((item) => (
          <ShowCard key={item.id} item={item as TmdbShow} mediaType={mediaType} withActions={false} />
        ))}
      </div>
    </section>
  );
}
