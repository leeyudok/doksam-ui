import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { code, demo, donts, dos } from "@/components/demos/kebab-menu.demo";

describe("kebab-menu demo", () => {
  it("renders the trigger button with an accessible label", () => {
    render(demo);
    expect(screen.getByRole("button", { name: "파일 옵션" })).toBeInTheDocument();
  });

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("KebabMenu");
    expect(dos.length).toBeGreaterThanOrEqual(2);
    expect(donts.length).toBeGreaterThanOrEqual(2);
  });
});
