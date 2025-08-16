import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";

import RateControl from "./RateControl";

describe("RateControl", () => {
  it("renders label and options with initial value", () => {
    const html = renderToString(React.createElement(RateControl, { action: async () => {}, initial: 5 }));
    expect(html).toContain("Your Rating");
    expect(html).toContain("<option value=\"5\" selected=\"\"");
    // has clear option
    expect(html).toContain("<option value=\"0\"");
  });
});
