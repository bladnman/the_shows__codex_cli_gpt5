import Image from "next/image";
import { getTrending, getPopular, imageUrl, type TmdbShow } from "@/lib/tmdb";
import HeroCarouselClient from "./HeroCarouselClient";

type Item = {
  id: number;
  title: string;
  overview: string;
  backdrop: string | null;
  mediaType: "movie"|"tv";
};

function mapItems(items: TmdbShow[]): Item[] {
  return items.slice(0, 10).map((it) => ({
    id: it.id,
    title: it.title ?? it.name ?? "Untitled",
    overview: it.overview,
    backdrop: imageUrl(it.backdrop_path, "w780"),
    mediaType: (it.media_type ?? "movie") as "movie" | "tv",
  }));
}

export default async function HeroCarousel() {
  const [trendingAll, popularMovies, popularTv] = await Promise.all([
    getTrending(),
    getPopular("movie"),
    getPopular("tv"),
  ]);
  const trending = mapItems(trendingAll.results);
  const popular = mapItems([...(popularMovies.results || []), ...(popularTv.results || [])]);

  return (
    <section className="relative -mx-[var(--space-5)] sm:-mx-[var(--space-8)]">
      <HeroCarouselClient trending={trending} popular={popular} />
    </section>
  );
}

