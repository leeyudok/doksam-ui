import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TokensPage from "@/app/tokens/page";
import { FONT_LICENSE_NOTE } from "@/fonts";
import { THEME_PRESETS } from "@/themes";

describe("TokensPage", () => {
  it("renders the page heading", () => {
    render(<TokensPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Tokens" })).toBeInTheDocument();
  });

  it("filters color token swatches by name (#66)", () => {
    render(<TokensPage />);
    const input = screen.getByPlaceholderText(/토큰 검색/);
    fireEvent.change(input, { target: { value: "primary" } });
    expect(screen.getByText("--primary")).toBeInTheDocument();
    expect(screen.queryByText("--border")).not.toBeInTheDocument();
  });

  it("documents the density token layer (#66)", () => {
    render(<TokensPage />);
    expect(screen.getByRole("heading", { name: "밀도 토큰" })).toBeInTheDocument();
    expect(screen.getAllByText("--control-h").length).toBeGreaterThan(0);
  });

  it("documents sidebar and brand-extension tokens (#66)", () => {
    render(<TokensPage />);
    expect(screen.getByRole("heading", { name: "Sidebar 토큰" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "브랜드 확장 토큰" })).toBeInTheDocument();
    expect(screen.getAllByText("--bulb").length).toBeGreaterThan(0);
  });

  it("renders the preset comparison matrix with all presets (#66)", () => {
    render(<TokensPage />);
    expect(screen.getByRole("heading", { name: "프리셋 비교" })).toBeInTheDocument();
    for (const preset of THEME_PRESETS) {
      expect(screen.getAllByText(preset.label).length).toBeGreaterThan(0);
    }
  });

  it("lists every semantic token variable", () => {
    render(<TokensPage />);
    expect(screen.getByText("--primary")).toBeInTheDocument();
    expect(screen.getByText("--background")).toBeInTheDocument();
    expect(screen.getByText("--chart-5")).toBeInTheDocument();
  });

  it("renders a CSS copy button for every registered preset", () => {
    render(<TokensPage />);
    for (const preset of THEME_PRESETS) {
      expect(
        screen.getByRole("button", { name: `${preset.label} CSS 복사` }),
      ).toBeInTheDocument();
    }
  });

  it("shows the radius and spacing demo sections", () => {
    render(<TokensPage />);
    expect(screen.getByRole("heading", { name: "Radius" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "간격" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "타이포그래피" })).toBeInTheDocument();
  });

  it("discloses the free-font license note in the typography section", () => {
    render(<TokensPage />);
    expect(screen.getByText(FONT_LICENSE_NOTE)).toBeInTheDocument();
  });
});
