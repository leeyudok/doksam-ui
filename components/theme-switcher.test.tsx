import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  THEME_MODE_STORAGE_KEY,
  THEME_PRESET_STORAGE_KEY,
} from "@/lib/theme-storage";
import { THEME_PRESETS } from "@/themes";

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.dataset.theme = "ocean";
    document.documentElement.classList.remove("dark");
  });

  it("renders one chip per registered preset", () => {
    render(<ThemeSwitcher />);
    const chips = screen.getAllByRole("radio");
    expect(chips).toHaveLength(THEME_PRESETS.length);
    for (const preset of THEME_PRESETS) {
      expect(screen.getByRole("radio", { name: preset.label })).toBeInTheDocument();
    }
  });

  it("marks the current preset as checked", () => {
    render(<ThemeSwitcher />);
    expect(screen.getByRole("radio", { name: "Ocean" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("switches preset on chip click and persists to localStorage", () => {
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByRole("radio", { name: "Forest" }));
    expect(document.documentElement.dataset.theme).toBe("forest");
    expect(window.localStorage.getItem(THEME_PRESET_STORAGE_KEY)).toBe("forest");
  });

  it("toggles dark mode and persists to localStorage", () => {
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByRole("button", { name: "다크 모드로 전환" }));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem(THEME_MODE_STORAGE_KEY)).toBe("dark");

    fireEvent.click(screen.getByRole("button", { name: "라이트 모드로 전환" }));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(window.localStorage.getItem(THEME_MODE_STORAGE_KEY)).toBe("light");
  });
});
