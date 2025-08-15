import { describe, it, expect } from "vitest";
import { get_query } from "./get_query";

describe("get_query", () => {
  it("returns string when present", () => {
    expect(get_query({ q: "test" }, "q")).toBe("test");
  });
  it("returns first when array", () => {
    expect(get_query({ q: ["a", "b"] }, "q")).toBe("a");
  });
  it("returns undefined when missing", () => {
    expect(get_query({}, "q")).toBeUndefined();
  });
});

