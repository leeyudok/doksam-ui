import { describe, expect, it } from "vitest";

import { ICON_CATALOG, ICON_CATEGORIES, searchIcons } from "@/lib/icons/catalog";

describe("ICON_CATALOG", () => {
  it("registers at least 250 icons with no duplicate names", () => {
    expect(ICON_CATALOG.length).toBeGreaterThanOrEqual(250);
    expect(new Set(ICON_CATALOG.map((i) => i.name)).size).toBe(ICON_CATALOG.length);
  });

  it("every icon has a valid category and at least one keyword", () => {
    const keys = new Set(ICON_CATEGORIES.map((c) => c.key));
    for (const icon of ICON_CATALOG) {
      expect(keys.has(icon.category), icon.name).toBe(true);
      expect(icon.keywords.length, icon.name).toBeGreaterThan(0);
      expect(icon.name.endsWith("Icon"), icon.name).toBe(true);
    }
  });

  it("searchIcons matches by name fragment and korean keyword", () => {
    expect(searchIcons("house").some((i) => i.name === "HouseIcon")).toBe(true);
    expect(searchIcons("홈").some((i) => i.name === "HouseIcon")).toBe(true);
    expect(searchIcons("zzzznope")).toHaveLength(0);
  });

  it("searchIcons filters by category", () => {
    const chartIcons = searchIcons("", "chart");
    expect(chartIcons.length).toBeGreaterThan(0);
    for (const icon of chartIcons) {
      expect(icon.category).toBe("chart");
    }
  });
});
