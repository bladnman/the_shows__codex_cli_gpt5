import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";

import TrailerButton from "./TrailerButton";

describe("TrailerButton (SSR)", () => {
  it("renders enabled button when youtubeKey provided", () => {
    const html = renderToString(React.createElement(TrailerButton, { youtubeKey: "abc" }));
    expect(html).toContain("Watch Trailer");
    expect(html).not.toContain("aria-disabled=\"true\"");
  });
  it("renders disabled button when flagged", () => {
    const html = renderToString(React.createElement(TrailerButton, { disabled: true } as any));
    expect(html).toContain("aria-disabled=\"true\"");
  });
});
