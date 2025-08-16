import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";

vi.mock("next/image", () => ({ default: (props: any) => React.createElement("img", { alt: props.alt || "", src: props.src || "", width: props.width, height: props.height }) }));

import SeasonsGrid from "./SeasonsGrid";

const baseDetails = {
  id: 1,
  name: "Show",
  overview: "o",
  poster_path: null,
  backdrop_path: null,
  vote_average: 7,
  vote_count: 10,
};

describe("SeasonsGrid", () => {
  it("returns null when no seasons", () => {
    const html = renderToString(React.createElement(SeasonsGrid, { details: { ...baseDetails, seasons: [] } as any }));
    expect(html).toBe("");
  });

  it("renders seasons with metadata", () => {
    const html = renderToString(
      React.createElement(SeasonsGrid, {
        details: {
          ...baseDetails,
          seasons: [
            { id: 1, name: "S1", season_number: 1, episode_count: 10, poster_path: null, air_date: "2011-01-01" },
          ],
        } as any,
      })
    );
    expect(html).toContain("Seasons");
    expect(html).toContain("S1");
    expect(html).toContain("10 eps");
  });
});

