import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useThemePreset } from "@/hooks/use-theme-preset";
import { THEME_MODE_STORAGE_KEY, THEME_PRESET_STORAGE_KEY } from "@/lib/theme-storage";

describe("useThemePreset", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.dataset.theme = "ocean";
    document.documentElement.classList.remove("dark");
  });

  it("syncs to the <html> state set by the FOUC inline script after mount", () => {
    document.documentElement.dataset.theme = "forest";
    document.documentElement.classList.add("dark");

    const { result } = renderHook(() => useThemePreset());

    expect(result.current.preset).toBe("forest");
    expect(result.current.mode).toBe("dark");
  });

  it("setPreset updates <html> data-theme and persists to localStorage", () => {
    const { result } = renderHook(() => useThemePreset());

    act(() => {
      result.current.setPreset("violet");
    });

    expect(result.current.preset).toBe("violet");
    expect(document.documentElement.dataset.theme).toBe("violet");
    expect(window.localStorage.getItem(THEME_PRESET_STORAGE_KEY)).toBe("violet");
  });

  it("setPreset ignores an unknown preset name", () => {
    const { result } = renderHook(() => useThemePreset());

    act(() => {
      result.current.setPreset("not-a-real-preset");
    });

    expect(result.current.preset).toBe("ocean");
    expect(window.localStorage.getItem(THEME_PRESET_STORAGE_KEY)).toBeNull();
  });

  it("setMode updates the dark class and persists to localStorage", () => {
    const { result } = renderHook(() => useThemePreset());

    act(() => {
      result.current.setMode("dark");
    });

    expect(result.current.mode).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem(THEME_MODE_STORAGE_KEY)).toBe("dark");

    act(() => {
      result.current.setMode("light");
    });

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(window.localStorage.getItem(THEME_MODE_STORAGE_KEY)).toBe("light");
  });

  it("toggleMode flips between light and dark", () => {
    const { result } = renderHook(() => useThemePreset());
    expect(result.current.mode).toBe("light");

    act(() => {
      result.current.toggleMode();
    });
    expect(result.current.mode).toBe("dark");
    expect(window.localStorage.getItem(THEME_MODE_STORAGE_KEY)).toBe("dark");

    act(() => {
      result.current.toggleMode();
    });
    expect(result.current.mode).toBe("light");
    expect(window.localStorage.getItem(THEME_MODE_STORAGE_KEY)).toBe("light");
  });
});
