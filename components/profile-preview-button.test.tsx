import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { ProfilePreviewButton } from "@/components/profile-preview-button";
import {
  DENSITY_STORAGE_KEY,
  FONT_STORAGE_KEY,
  RADIUS_STORAGE_KEY,
  THEME_MODE_STORAGE_KEY,
  THEME_PRESET_STORAGE_KEY,
} from "@/lib/theme-storage";
import { getBrandProfile } from "@/profiles";

const dataProfile = getBrandProfile("data")!;

describe("ProfilePreviewButton", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.dataset.theme = "ocean";
    document.documentElement.dataset.font = "geist";
    document.documentElement.classList.remove("dark");
    delete document.documentElement.dataset.density;
    document.documentElement.style.removeProperty("--radius");
  });

  it("applies the profile's density and radius to <html> on click (#65)", () => {
    render(<ProfilePreviewButton profile={dataProfile} />);

    fireEvent.click(screen.getByRole("button", { name: "이 프로필 미리보기" }));

    expect(document.documentElement.dataset.density).toBe(dataProfile.density);
    expect(document.documentElement.style.getPropertyValue("--radius")).toBe(dataProfile.radius);
    expect(window.localStorage.getItem(DENSITY_STORAGE_KEY)).toBe(dataProfile.density);
    expect(window.localStorage.getItem(RADIUS_STORAGE_KEY)).toBe(dataProfile.radius);
  });

  it("applies the profile's theme, font and mode to <html> on click", () => {
    render(<ProfilePreviewButton profile={dataProfile} />);

    fireEvent.click(screen.getByRole("button", { name: "이 프로필 미리보기" }));

    expect(document.documentElement.dataset.theme).toBe("violet");
    expect(document.documentElement.dataset.font).toBe("space-grotesk");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    expect(window.localStorage.getItem(THEME_PRESET_STORAGE_KEY)).toBe("violet");
    expect(window.localStorage.getItem(FONT_STORAGE_KEY)).toBe("space-grotesk");
    expect(window.localStorage.getItem(THEME_MODE_STORAGE_KEY)).toBe("dark");
  });

  it("shows an applied state once the site already matches the profile", () => {
    document.documentElement.dataset.theme = "violet";
    document.documentElement.dataset.font = "space-grotesk";
    document.documentElement.classList.add("dark");

    render(<ProfilePreviewButton profile={dataProfile} />);

    expect(screen.getByRole("button", { name: "적용됨" })).toBeInTheDocument();
  });
});
