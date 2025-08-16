import { getDetails } from "@/lib/tmdb";
import HeaderHero from "../header_hero/HeaderHero";
import InfoPanel from "../info_panel/InfoPanel";
import SeasonsGrid from "../seasons_grid/SeasonsGrid";
import CastRow from "../cast_row/CastRow";
import Providers from "../providers/Providers";
import RecommendationsRow from "../recommendations/RecommendationsRow";
import SimilarRow from "../similar/SimilarRow";
import ActionsBar from "../actions_bar/ActionsBar";

export default async function ShowDetails({ mediaType, id }: { mediaType: "movie"|"tv"; id: string }) {
  const details = await getDetails(mediaType, id);
  return (
    <div className="space-y-[var(--space-8)]">
      <HeaderHero details={details} mediaType={mediaType} />
      <ActionsBar tmdbId={details.id} mediaType={mediaType} />
      <InfoPanel details={details} mediaType={mediaType} />
      {mediaType === "tv" ? <SeasonsGrid details={details} /> : null}
      <CastRow mediaType={mediaType} id={details.id} />
      <Providers mediaType={mediaType} id={details.id} />
      <RecommendationsRow mediaType={mediaType} id={details.id} />
      <SimilarRow mediaType={mediaType} id={details.id} />
    </div>
  );
}
