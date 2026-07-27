import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useFontPreset } from "@/hooks/use-font-preset";
import { FONT_STORAGE_KEY } from "@/lib/theme-storage";

describe("useFontPreset", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.dataset.font = "geist";
  });

  it("syncs to the <html> state set by the FOUC inline script after mount", () => {
    document.documentElement.dataset.font = "noto-sans-kr";

    const { result } = renderHook(() => useFontPreset());

    expect(result.current.font).toBe("noto-sans-kr");
  });

  it("setFont updates <html> data-font and persists to localStorage", () => {
    const { result } = renderHook(() => useFontPreset());

    act(() => {
      result.current.setFont("ibm-plex-kr");
    });

    expect(result.current.font).toBe("ibm-plex-kr");
    expect(document.documentElement.dataset.font).toBe("ibm-plex-kr");
    expect(window.localStorage.getItem(FONT_STORAGE_KEY)).toBe("ibm-plex-kr");
  });

  it("setFont ignores an unknown font preset name", () => {
    const { result } = renderHook(() => useFontPreset());

    act(() => {
      result.current.setFont("not-a-real-font");
    });

    expect(result.current.font).toBe("geist");
    expect(window.localStorage.getItem(FONT_STORAGE_KEY)).toBeNull();
  });
});
