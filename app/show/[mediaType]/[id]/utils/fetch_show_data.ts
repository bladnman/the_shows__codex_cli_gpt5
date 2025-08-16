import { MediaType } from "@/theme/tokens";
import {
  getDetails,
  getVideos,
  getCredits,
  getWatchProviders,
  getRecommendations,
  getSimilar,
  TmdbDetails,
  TmdbVideo,
  TmdbCreditsResponse,
  TmdbWatchProvidersResponse,
  TmdbShow,
} from "@/lib/tmdb";
import { get_current_user_id_optional, get_entry } from "@/lib/user_state";
import type { ShowEntry } from "@prisma/client";

export type ShowData = {
  details: TmdbDetails;
  videos: TmdbVideo[];
  credits: TmdbCreditsResponse;
  providers: TmdbWatchProvidersResponse;
  recommendations: TmdbShow[];
  similar: TmdbShow[];
  entry: ShowEntry | null;
};

export async function fetch_show_data(mediaType: MediaType, id: string): Promise<ShowData> {
  const [details] = await Promise.all([
    getDetails(mediaType, id),
  ]);

  const [videosRes, credits, providers, recs, sim, userId] = await Promise.all([
    getVideos(mediaType, details.id),
    getCredits(mediaType, details.id),
    getWatchProviders(mediaType, details.id),
    getRecommendations(mediaType, details.id),
    getSimilar(mediaType, details.id),
    get_current_user_id_optional(),
  ]);

  const entry = await get_entry(userId, details.id, mediaType);

  return {
    details,
    videos: videosRes.results,
    credits,
    providers,
    recommendations: recs.results,
    similar: sim.results,
    entry,
  };
}

