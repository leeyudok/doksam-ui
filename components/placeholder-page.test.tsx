import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PlaceholderPage } from "@/components/placeholder-page";

describe("PlaceholderPage", () => {
  it("renders the given title, description, and a 준비 중 badge", () => {
    render(<PlaceholderPage title="Tokens" description="디자인 토큰 레퍼런스" />);
    expect(screen.getByRole("heading", { level: 1, name: "Tokens" })).toBeInTheDocument();
    expect(screen.getByText("디자인 토큰 레퍼런스")).toBeInTheDocument();
    expect(screen.getByText("준비 중")).toBeInTheDocument();
  });
});
