import { describe, it, expect, vi } from "vitest";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";

// Replace ShowDetails to a marker to isolate page rendering
vi.mock("@/app/show/[mediaType]/[id]/features/details/ShowDetails", () => ({ default: () => React.createElement("div", { id: "show-details-marker" }, "DETAILS") }));

import ShowPage from "./page";

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

describe("Show page route", () => {
  it("renders header and ShowDetails for movie", async () => {
    const el = await ShowPage({ params: Promise.resolve({ mediaType: "movie", id: "123" }) as any });
    const html = await renderAsync(el as any);
    expect(html).toContain("movie");
    expect(html).toContain("Home");
    expect(html).toContain("show-details-marker");
  });
});

