import { TmdbCast, TmdbShow, TmdbWatchProvidersResponse, TmdbVideo } from "@/lib/tmdb";
import type { ShowEntry } from "@prisma/client";
import { fetch_show_data } from "@/app/show/[mediaType]/[id]/utils/fetch_show_data";
import HeaderHero from "../header_hero/HeaderHero";
import InfoPanel from "../info_panel/InfoPanel";
import SeasonsGrid from "../seasons_grid/SeasonsGrid";
import CastRow from "../cast_row/CastRow";
import Providers from "../providers/Providers";
import RecommendationsRow from "../recommendations/RecommendationsRow";
import SimilarRow from "../similar/SimilarRow";
import ActionsBar from "../actions_bar/ActionsBar";

export default async function ShowDetails({ mediaType, id }: { mediaType: "movie"|"tv"; id: string }) {
  const data = await fetch_show_data(mediaType, id);
  return (
    <div className="space-y-[var(--space-8)]">
      <HeaderHero details={data.details} mediaType={mediaType} videos={data.videos} entry={data.entry as ShowEntry | null} />
      <ActionsBar tmdbId={data.details.id} mediaType={mediaType} entry={data.entry as ShowEntry | null} />
      <InfoPanel details={data.details} mediaType={mediaType} />
      {mediaType === "tv" ? <SeasonsGrid details={data.details} /> : null}
      <CastRow cast={data.credits.cast as TmdbCast[]} />
      <Providers providers={data.providers as TmdbWatchProvidersResponse} />
      <RecommendationsRow mediaType={mediaType} items={data.recommendations as TmdbShow[]} />
      <SimilarRow mediaType={mediaType} items={data.similar as TmdbShow[]} />
    </div>
  );
}
