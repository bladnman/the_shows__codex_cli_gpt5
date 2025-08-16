import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";

// Mock next-specific components used by children just in case
vi.mock("next/image", () => ({ default: (props: any) => React.createElement("img", { alt: props.alt || "", src: props.src || "", width: props.width, height: props.height }) }));
vi.mock("next/link", () => ({ default: (props: any) => React.createElement("a", { href: props.href }, props.children) }));

// Mock all child feature components of ShowDetails to simple markers
vi.mock("../header_hero/HeaderHero", () => ({ default: () => React.createElement("div", { "data-part": "header-hero" }) }));
vi.mock("../info_panel/InfoPanel", () => ({ default: () => React.createElement("div", { "data-part": "info-panel" }) }));
vi.mock("../seasons_grid/SeasonsGrid", () => ({ default: () => React.createElement("div", { "data-part": "seasons-grid" }) }));
vi.mock("../cast_row/CastRow", () => ({ default: () => React.createElement("div", { "data-part": "cast-row" }) }));
vi.mock("../providers/Providers", () => ({ default: () => React.createElement("div", { "data-part": "providers" }) }));
vi.mock("../recommendations/RecommendationsRow", () => ({ default: () => React.createElement("div", { "data-part": "recs" }) }));
vi.mock("../similar/SimilarRow", () => ({ default: () => React.createElement("div", { "data-part": "similar" }) }));

// Mock the data fetcher
vi.mock("@/app/show/[mediaType]/[id]/utils/fetch_show_data", () => {
  return {
    fetch_show_data: vi.fn(async (mediaType: "movie"|"tv") => ({
      details: { id: 42, title: mediaType === "movie" ? "Movie X" : undefined, name: mediaType === "tv" ? "Show Y" : undefined, overview: "o", poster_path: null, backdrop_path: null, vote_average: 7, vote_count: 10,
        seasons: mediaType === "tv" ? [{ id: 1, name: "S1", season_number: 1, poster_path: null }] : undefined,
      },
      videos: [],
      credits: { id: 42, cast: [] },
      providers: { id: 42, results: {} },
      recommendations: [],
      similar: [],
      entry: null,
    })),
  };
});

import ShowDetails from "./ShowDetails";
import { fetch_show_data } from "@/app/show/[mediaType]/[id]/utils/fetch_show_data";

describe("ShowDetails", () => {
  beforeEach(() => vi.clearAllMocks());

  async function renderAsync(el: React.ReactElement) {
    return await new Promise<string>((resolve, reject) => {
      let html = "";
      const writable = new Writable({
        write(chunk, _enc, cb) {
          html += chunk.toString();
          cb();
        },
      });
      const stream = renderToPipeableStream(el, {
        onAllReady() {
          stream.pipe(writable);
        },
        onError(err) { reject(err); },
      });
      writable.on("finish", () => resolve(html));
    });
  }

  it("renders all sections for a movie (except seasons)", async () => {
    const element = (await ShowDetails({ mediaType: "movie", id: "42" })) as any;
    const html = await renderAsync(element);
    expect(fetch_show_data).toHaveBeenCalledWith("movie", "42");
    expect(html).toContain("data-part=\"header-hero\"");
    expect(html).toContain("data-part=\"info-panel\"");
    expect(html).toContain("data-part=\"cast-row\"");
    expect(html).toContain("data-part=\"providers\"");
    expect(html).toContain("data-part=\"recs\"");
    expect(html).toContain("data-part=\"similar\"");
    // seasons should not render for movies
    expect(html).not.toContain("data-part=\"seasons-grid\"");
  });

  it("renders seasons for tv", async () => {
    const element = (await ShowDetails({ mediaType: "tv", id: "777" })) as any;
    const html = await renderAsync(element);
    expect(fetch_show_data).toHaveBeenCalledWith("tv", "777");
    expect(html).toContain("data-part=\"seasons-grid\"");
  });
});
