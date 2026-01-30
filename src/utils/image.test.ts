import { describe, it, expect } from "vitest";
import { getImageUrl } from "./image";

describe("getImageUrl", () => {
  it("returns the full image URL when path is provided", () => {
    const path = "/example.jpg";
    const result = getImageUrl(path);
    expect(result).toBe("https://image.tmdb.org/t/p/w500/example.jpg");
  });

  it("returns the full image URL with custom size", () => {
    const path = "/example.jpg";
    const size = "original";
    const result = getImageUrl(path, size);
    expect(result).toBe("https://image.tmdb.org/t/p/original/example.jpg");
  });

  it("returns placeholder when path is null", () => {
    const result = getImageUrl(null);
    expect(result).toBe("https://via.placeholder.com/500x750?text=No+Image");
  });

  it("returns placeholder when path is empty string", () => {
    const result = getImageUrl("");
    expect(result).toBe("https://via.placeholder.com/500x750?text=No+Image");
  });
});
