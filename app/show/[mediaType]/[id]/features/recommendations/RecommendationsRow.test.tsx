import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";

vi.mock("@/components/ShowCard", () => ({ ShowCard: (props: any) => React.createElement("div", { "data-card": props.item.id }) }));

import RecommendationsRow from "./RecommendationsRow";

describe("RecommendationsRow", () => {
  it("renders grid of cards when items present", () => {
    const html = renderToString(React.createElement(RecommendationsRow, { mediaType: "movie", items: [{ id: 1, name: "A", overview: "", poster_path: null, backdrop_path: null, vote_average: 1, vote_count: 1 }] as any }));
    expect(html).toContain("Recommended");
    expect(html).toContain("data-card=\"1\"");
  });
  it("returns null when empty", () => {
    const html = renderToString(React.createElement(RecommendationsRow, { mediaType: "tv", items: [] as any }));
    expect(html).toBe("");
  });
});

