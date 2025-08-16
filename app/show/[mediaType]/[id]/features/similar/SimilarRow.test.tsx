import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";

vi.mock("@/components/ShowCard", () => ({ ShowCard: (props: any) => React.createElement("div", { "data-card": props.item.id }) }));

import SimilarRow from "./SimilarRow";

describe("SimilarRow", () => {
  it("renders grid of cards when items present", () => {
    const html = renderToString(React.createElement(SimilarRow, { mediaType: "movie", items: [{ id: 2, name: "B", overview: "", poster_path: null, backdrop_path: null, vote_average: 1, vote_count: 1 }] as any }));
    expect(html).toContain("Similar");
    expect(html).toContain("data-card=\"2\"");
  });
  it("returns null when empty", () => {
    const html = renderToString(React.createElement(SimilarRow, { mediaType: "tv", items: [] as any }));
    expect(html).toBe("");
  });
});

