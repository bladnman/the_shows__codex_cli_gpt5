import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";

import Providers from "./Providers";

describe("Providers", () => {
  it("returns null when no results", () => {
    const html = renderToString(React.createElement(Providers, { providers: { id: 1, results: {} } as any }));
    expect(html).toBe("");
  });

  it("renders flatrate providers with link", () => {
    const data = {
      id: 1,
      results: {
        US: {
          link: "https://watch.example",
          flatrate: [
            { provider_id: 1, provider_name: "Netflux", logo_path: null },
            { provider_id: 2, provider_name: "Hululu", logo_path: null },
          ],
        },
      },
    } as any;
    const html = renderToString(React.createElement(Providers, { providers: data }));
    expect(html).toContain("Where to Watch");
    expect(html).toContain("Netflux");
    expect(html).toContain("Hululu");
    expect(html).toContain("https://watch.example");
  });
});

