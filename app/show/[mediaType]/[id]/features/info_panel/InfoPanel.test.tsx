import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";

vi.mock("next/link", () => ({ default: (props: any) => React.createElement("a", { href: props.href }, props.children) }));

import InfoPanel from "./InfoPanel";

const baseDetails = {
  id: 1,
  title: "T",
  overview: "o",
  poster_path: null,
  backdrop_path: null,
  vote_average: 7,
  vote_count: 10,
};

describe("InfoPanel", () => {
  it("renders movie fields (release, genres, status, budget, revenue, companies)", () => {
    const html = renderToString(
      React.createElement(InfoPanel, {
        mediaType: "movie",
        details: {
          ...baseDetails,
          release_date: "2000-01-01",
          genres: [{ id: 1, name: "Sci-Fi" }],
          status: "Released",
          budget: 100000000,
          revenue: 500000000,
          production_companies: [{ id: 1, name: "ACME" }],
        },
      })
    );
    expect(html).toContain("Release Date");
    expect(html).toContain("Sci-Fi");
    expect(html).toContain("Status");
    expect(html).toContain("Budget");
    expect(html).toContain("Revenue");
    expect(html).toContain("Production Companies");
  });

  it("renders tv fields (first air date, created by, network)", () => {
    const html = renderToString(
      React.createElement(InfoPanel, {
        mediaType: "tv",
        details: {
          ...baseDetails,
          name: "Show",
          first_air_date: "2011-01-01",
          created_by: [{ id: 1, name: "Creator" }],
          networks: [{ id: 1, name: "HBO", logo_path: null }],
          genres: [{ id: 1, name: "Drama" }],
        },
      })
    );
    expect(html).toContain("First Air Date");
    expect(html).toContain("Created By");
    expect(html).toContain("Network");
    expect(html).toContain("Drama");
  });
});

