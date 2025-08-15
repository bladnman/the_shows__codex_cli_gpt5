import { MediaType } from "@/theme/tokens";
import { tmdbCache } from "@/lib/cache";

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export type TmdbShow = {
  id: number;
  media_type?: MediaType;
  title?: string; // movies
  name?: string; // tv
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
};

export type TmdbPaged<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

type AuthMode = { mode: 'v4' | 'v3'; token: string };
function getAuth(): AuthMode {
  const bearer = process.env.TMDB_BEARER || process.env.TMDB_V4_TOKEN || process.env.TMDB_API_BEARER;
  const legacy = process.env.TMDB_API_KEY; // can be v3 or v4 depending on user
  const token = bearer || legacy || '';
  if (!token) throw new Error("Missing TMDB API credentials. Provide TMDB_BEARER (v4) or TMDB_API_KEY (v3).");
  // Heuristic: v4 tokens are JWT (start with 'ey' and contain '.') and are long; v3 is 32-char hex-like
  const isV4 = !!bearer || (legacy ? (legacy.startsWith('ey') && legacy.includes('.')) : false);
  return { mode: isV4 ? 'v4' : 'v3', token };
}

async function tmdb<T>(path: string, init?: RequestInit & { revalidate?: number; ttlMs?: number }) {
  const auth = getAuth();
  const url = new URL(`${TMDB_BASE}${path}`);
  if (auth.mode === 'v3') {
    url.searchParams.set('api_key', auth.token);
  }

  // Simple TTL cache layer with logging
  const cacheKey = url.toString();
  const cached = tmdbCache.get(cacheKey) as T | undefined;
  if (cached) {
    console.info(`[TMDB cache] HIT ${url.pathname}`);
    return cached;
  }
  console.info(`[TMDB cache] MISS ${url.pathname}`);

  const res = await fetch(url.toString(), {
    ...init,
    headers: auth.mode === 'v4' ? {
      Authorization: `Bearer ${auth.token}`,
      Accept: "application/json",
      ...(init?.headers || {}),
    } : {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
    next: { revalidate: init?.revalidate ?? 3600 },
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("TMDB error", res.status, text);
    throw new Error(`TMDB ${res.status}`);
  }
  const data = (await res.json()) as T;
  tmdbCache.set(cacheKey, data, init?.ttlMs);
  return data;
}

export function imageUrl(path: string | null, size: "w92"|"w154"|"w185"|"w342"|"w500"|"w780"|"original" = "w342") {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export async function getTrending(media: MediaType | "all" = "all") {
  return tmdb<TmdbPaged<TmdbShow>>(`/trending/${media}/week`, { revalidate: 3600, ttlMs: 3600_000 });
}

export async function getPopular(media: MediaType) {
  return tmdb<TmdbPaged<TmdbShow>>(`/${media}/popular`, { revalidate: 3600, ttlMs: 3600_000 });
}

export async function getNew(media: MediaType) {
  // Movies: now_playing, TV: airing_today
  const endpoint = media === "movie" ? "/movie/now_playing" : "/tv/airing_today";
  return tmdb<TmdbPaged<TmdbShow>>(endpoint, { revalidate: 3600, ttlMs: 3600_000 });
}

export type TmdbDetails = TmdbShow & {
  genres?: { id: number; name: string }[];
  runtime?: number; // movie
  episode_run_time?: number[]; // tv
  number_of_seasons?: number;
  number_of_episodes?: number;
  homepage?: string | null;
  status?: string | null;
  budget?: number | null; // movie
  revenue?: number | null; // movie
  created_by?: { id: number; name: string }[]; // tv
  networks?: { id: number; name: string; logo_path: string | null }[]; // tv
  production_companies?: { id: number; name: string }[];
  seasons?: {
    id: number;
    name: string;
    season_number: number;
    episode_count?: number;
    air_date?: string | null;
    poster_path: string | null;
  }[]; // tv
};

export async function getDetails(media: MediaType, id: string | number) {
  return tmdb<TmdbDetails>(`/${media}/${id}`, { revalidate: 3600, ttlMs: 3600_000 });
}

// Credits (cast/crew)
export type TmdbPerson = {
  id: number;
  name: string;
  profile_path: string | null;
};

export type TmdbCast = TmdbPerson & {
  character?: string;
  roles?: { character: string }[]; // tv aggregate sometimes
  order?: number;
};

export type TmdbCreditsResponse = {
  id: number;
  cast: TmdbCast[];
};

export async function getCredits(media: MediaType, id: string | number) {
  return tmdb<TmdbCreditsResponse>(`/${media}/${id}/credits`, { revalidate: 3600, ttlMs: 3600_000 });
}

// Videos (trailers)
export type TmdbVideo = {
  id: string;
  key: string; // YouTube key
  name: string;
  site: string; // YouTube, etc
  type: string; // Trailer, Teaser
  official: boolean;
};

export type TmdbVideosResponse = {
  id: number;
  results: TmdbVideo[];
};

export async function getVideos(media: MediaType, id: string | number) {
  return tmdb<TmdbVideosResponse>(`/${media}/${id}/videos`, { revalidate: 3600, ttlMs: 3600_000 });
}

// Watch providers
export type TmdbWatchProvidersResponse = {
  id: number;
  results: {
    [country: string]: {
      link: string;
      flatrate?: { provider_id: number; provider_name: string; logo_path: string | null }[];
      rent?: { provider_id: number; provider_name: string; logo_path: string | null }[];
      buy?: { provider_id: number; provider_name: string; logo_path: string | null }[];
    };
  };
};

export async function getWatchProviders(media: MediaType, id: string | number) {
  return tmdb<TmdbWatchProvidersResponse>(`/${media}/${id}/watch/providers`, { revalidate: 3600, ttlMs: 3600_000 });
}

// Recommendations and Similar
export async function getRecommendations(media: MediaType, id: string | number) {
  return tmdb<TmdbPaged<TmdbShow>>(`/${media}/${id}/recommendations`, { revalidate: 3600, ttlMs: 3600_000 });
}

export async function getSimilar(media: MediaType, id: string | number) {
  return tmdb<TmdbPaged<TmdbShow>>(`/${media}/${id}/similar`, { revalidate: 3600, ttlMs: 3600_000 });
}

export async function searchMulti(query: string) {
  const url = new URL(`${TMDB_BASE}/search/multi`);
  url.searchParams.set("query", query);
  return tmdb<TmdbPaged<TmdbShow>>(url.pathname + "?" + url.searchParams.toString(), { revalidate: 60, ttlMs: 60_000 });
}

export type Genre = { id: number; name: string };
export type GenresResponse = { genres: Genre[] };

export async function getGenres(media: MediaType) {
  return tmdb<GenresResponse>(`/genre/${media}/list`, { revalidate: 86_400, ttlMs: 86_400_000 });
}
