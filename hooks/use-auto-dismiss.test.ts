import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useAutoDismiss } from "@/hooks/use-auto-dismiss";

describe("useAutoDismiss", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns true immediately when active", () => {
    const { result } = renderHook(() => useAutoDismiss(true, 1));
    expect(result.current).toBe(true);
  });

  it("returns false while inactive", () => {
    const { result } = renderHook(() => useAutoDismiss(false, 1));
    expect(result.current).toBe(false);
  });

  it("auto-dismisses after the default delay", () => {
    const { result } = renderHook(() => useAutoDismiss(true, 1));
    expect(result.current).toBe(true);

    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(result.current).toBe(false);
  });

  it("respects a custom delay", () => {
    const { result } = renderHook(() => useAutoDismiss(true, 1, 1000));

    act(() => {
      vi.advanceTimersByTime(999);
    });
    expect(result.current).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe(false);
  });

  it("restarts the timer when key changes", () => {
    const { result, rerender } = renderHook(({ key }) => useAutoDismiss(true, key), {
      initialProps: { key: 1 },
    });

    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(result.current).toBe(false);

    rerender({ key: 2 });
    expect(result.current).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3999);
    });
    expect(result.current).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe(false);
  });
});
