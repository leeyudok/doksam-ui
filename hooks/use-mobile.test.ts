import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useIsMobile } from "@/hooks/use-mobile";

function mockMatchMedia(matches: boolean) {
  const listeners = new Set<() => void>();
  const mql = {
    matches,
    addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_event: string, listener: () => void) => listeners.delete(listener),
  };
  const matchMediaMock = vi.fn().mockReturnValue(mql);
  vi.stubGlobal("matchMedia", matchMediaMock);
  return { matchMediaMock, emitChange: () => listeners.forEach((listener) => listener()) };
}

function setInnerWidth(width: number) {
  vi.stubGlobal("innerWidth", width);
}

describe("useIsMobile", () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    mockMatchMedia(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    setInnerWidth(originalInnerWidth);
  });

  it("reports false when the viewport is wider than the breakpoint", () => {
    setInnerWidth(1024);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("reports true when the viewport is narrower than the breakpoint", () => {
    setInnerWidth(375);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("updates when the media query change event fires", () => {
    setInnerWidth(1024);
    const { emitChange } = mockMatchMedia(false);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    setInnerWidth(375);
    act(() => {
      emitChange();
    });
    expect(result.current).toBe(true);
  });

  it("removes the change listener on unmount", () => {
    setInnerWidth(1024);
    const mql = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockReturnValue(mql),
    );

    const { unmount } = renderHook(() => useIsMobile());
    expect(mql.addEventListener).toHaveBeenCalledWith("change", expect.any(Function));

    unmount();
    expect(mql.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });
});
