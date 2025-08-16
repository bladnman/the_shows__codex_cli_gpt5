import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/tmdb", () => {
  return {
    getDetails: vi.fn(async (_media: any, id: any) => ({ id: Number(id), title: "Demo", overview: "o", poster_path: null, backdrop_path: null, vote_average: 7.2, vote_count: 100 })),
    getVideos: vi.fn(async () => ({ id: 1, results: [{ id: "v1", key: "k", name: "Trailer", site: "YouTube", type: "Trailer", official: true }] })),
    getCredits: vi.fn(async () => ({ id: 1, cast: [{ id: 1, name: "Actor 1", profile_path: null, order: 0 }] })),
    getWatchProviders: vi.fn(async () => ({ id: 1, results: { US: { link: "https://example.com", flatrate: [{ provider_id: 1, provider_name: "Foo", logo_path: null }] } } })),
    getRecommendations: vi.fn(async () => ({ page: 1, results: [{ id: 11, name: "Rec", overview: "", poster_path: null, backdrop_path: null, vote_average: 6.1, vote_count: 1 }], total_pages: 1, total_results: 1 })),
    getSimilar: vi.fn(async () => ({ page: 1, results: [{ id: 21, name: "Sim", overview: "", poster_path: null, backdrop_path: null, vote_average: 6.1, vote_count: 1 }], total_pages: 1, total_results: 1 })),
  };
});

vi.mock("@/lib/user_state", () => {
  return {
    get_current_user_id_optional: vi.fn(async () => "user-1"),
    get_entry: vi.fn(async () => ({ userId: "user-1", tmdbId: 1, mediaType: "movie", watchlist: false, rating: 8 })),
  };
});

import { fetch_show_data } from "./fetch_show_data";
import * as tmdb from "@/lib/tmdb";
import * as userState from "@/lib/user_state";

describe("fetch_show_data", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and assembles details, videos, credits, providers, recs, similar, and entry", async () => {
    const result = await fetch_show_data("movie", "123");

    expect(tmdb.getDetails).toHaveBeenCalledWith("movie", "123");
    // After details, other calls use numeric id
    expect(tmdb.getVideos).toHaveBeenCalledWith("movie", 123);
    expect(tmdb.getCredits).toHaveBeenCalledWith("movie", 123);
    expect(tmdb.getWatchProviders).toHaveBeenCalledWith("movie", 123);
    expect(tmdb.getRecommendations).toHaveBeenCalledWith("movie", 123);
    expect(tmdb.getSimilar).toHaveBeenCalledWith("movie", 123);
    expect(userState.get_current_user_id_optional).toHaveBeenCalled();
    expect(userState.get_entry).toHaveBeenCalledWith("user-1", 123, "movie");

    expect(result.details.id).toBe(123);
    expect(result.videos.length).toBe(1);
    expect(result.credits.cast.length).toBe(1);
    expect(result.providers.results.US.link).toContain("https");
    expect(result.recommendations.length).toBe(1);
    expect(result.similar.length).toBe(1);
    expect(result.entry).toBeTruthy();
  });
});

