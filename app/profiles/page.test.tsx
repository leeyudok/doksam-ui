import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProfilesPage from "@/app/profiles/page";
import { BRAND_PROFILES } from "@/profiles";

describe("ProfilesPage", () => {
  it("renders the page heading", () => {
    render(<ProfilesPage />);
    expect(screen.getByRole("heading", { level: 1, name: "브랜드 프로필" })).toBeInTheDocument();
  });

  it("renders one card per registered profile with its label and description", () => {
    render(<ProfilesPage />);
    for (const profile of BRAND_PROFILES) {
      // 프로필 label 은 카드 타이틀과 미니 프리뷰 안에 두 번 나온다.
      expect(screen.getAllByText(profile.label).length).toBeGreaterThanOrEqual(2);
      expect(screen.getByText(profile.description)).toBeInTheDocument();
    }
  });

  it("renders a preview button and a copy-code button for every profile", () => {
    render(<ProfilesPage />);
    expect(screen.getAllByRole("button", { name: "이 프로필 미리보기" })).toHaveLength(
      BRAND_PROFILES.length,
    );
    expect(screen.getAllByRole("button", { name: "적용 코드 복사" })).toHaveLength(
      BRAND_PROFILES.length,
    );
  });

  it("renders a local light/dark toggle inside every preview miniature", () => {
    render(<ProfilesPage />);
    expect(screen.getAllByRole("button", { name: /모드 미리보기/ })).toHaveLength(
      BRAND_PROFILES.length,
    );
  });

  it("shows a shadcn install command for every profile (#65)", () => {
    render(<ProfilesPage />);
    for (const profile of BRAND_PROFILES) {
      expect(
        screen.getByText(`npx shadcn@latest add https://ui.doksam.com/r/profile-${profile.name}.json`),
      ).toBeInTheDocument();
    }
  });

  it("lists radius and density metadata for every profile (#65)", () => {
    render(<ProfilesPage />);
    expect(screen.getAllByText("Radius")).toHaveLength(BRAND_PROFILES.length);
    expect(screen.getAllByText("밀도")).toHaveLength(BRAND_PROFILES.length);
  });

  it("lists the applied theme/font/example metadata for every profile", () => {
    render(<ProfilesPage />);
    for (const profile of BRAND_PROFILES) {
      expect(screen.getAllByText(profile.examples.join(" · ")).length).toBeGreaterThan(0);
    }
  });
});
