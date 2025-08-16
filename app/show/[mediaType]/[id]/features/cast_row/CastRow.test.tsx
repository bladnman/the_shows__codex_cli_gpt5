import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";

import CastRow from "./CastRow";

describe("CastRow", () => {
  it("sorts by order and limits results", () => {
    const cast = [
      { id: 2, name: "B", profile_path: null, order: 5, character: "Role B" },
      { id: 1, name: "A", profile_path: null, order: 1, character: "Role A" },
      { id: 3, name: "C", profile_path: null, order: 2, character: "Role C" },
    ] as any[];
    const html = renderToString(React.createElement(CastRow, { cast, limit: 2 }));
    // Should include only A and C (ordered by order, limited to 2)
    expect(html).toContain("Top Billed Cast");
    expect(html).toContain("A");
    expect(html).toContain("C");
    expect(html).not.toContain("Role B");
  });

  it("renders null when empty", () => {
    const html = renderToString(React.createElement(CastRow, { cast: [], limit: 2 }));
    expect(html).toBe("");
  });
});
