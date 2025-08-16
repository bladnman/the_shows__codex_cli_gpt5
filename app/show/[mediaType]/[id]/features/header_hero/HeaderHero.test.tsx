import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";

vi.mock("@/components/actions/WatchlistButton", () => ({ default: () => React.createElement("button", null, "Add to Watchlist") }));

import HeaderHero from "./HeaderHero";

const baseDetails = {
  id: 1,
  title: "Movie X",
  overview: "A great movie",
  poster_path: null,
  backdrop_path: "/path.jpg",
  vote_average: 8.3,
  vote_count: 1000,
};

describe("HeaderHero", () => {
  async function renderAsync(el: React.ReactElement) {
    return await new Promise<string>((resolve, reject) => {
      let html = "";
      const writable = new Writable({
        write(chunk, _enc, cb) { html += chunk.toString(); cb(); },
      });
      const stream = renderToPipeableStream(el, {
        onAllReady() { stream.pipe(writable); },
        onError(err) { reject(err); },
      });
      writable.on("finish", () => resolve(html));
    });
  }

  it("renders title, overview, scores, and enabled trailer button when trailer exists", async () => {
    const html = await renderAsync(
      React.createElement(HeaderHero, {
        details: baseDetails as any,
        mediaType: "movie",
        videos: [
          { id: "1", key: "abc", name: "Teaser", site: "YouTube", type: "Teaser", official: true },
        ] as any,
        entry: { rating: 7 } as any,
      })
    );
    expect(html).toContain("Movie X");
    expect(html).toContain("A great movie");
    expect(html).toContain("aria-label=\"User score\"");
    expect(html).toContain("/10");
    expect(html).toContain("aria-label=\"Critics score\"");
    expect(html).toContain("Watch Trailer");
    expect(html).not.toContain("aria-disabled=\"true\"");
  });

  it("falls back to Untitled and disables trailer when none", async () => {
    const html = await renderAsync(
      React.createElement(HeaderHero, {
        details: { ...baseDetails, title: undefined, name: undefined } as any,
        mediaType: "tv",
        videos: [],
        entry: null,
      })
    );
    expect(html).toContain("Untitled");
    expect(html).toContain("Watch Trailer");
    expect(html).toContain("aria-disabled=\"true\"");
  });
});
