import { describe, expect, it, vi } from "vitest";

import { normalizeColor, observeColorScheme, readClassColor, readCssVar } from "@/lib/finance/normalize-color";

describe("normalizeColor", () => {
  it("returns falsy input unchanged", () => {
    expect(normalizeColor("")).toBe("");
  });

  // jsdom은 'canvas' npm 패키지 없이는 getContext("2d")가 null을 반환한다 —
  // 실제 브라우저의 fillStyle→getImageData 픽셀 변환 경로는 검증할 수 없으므로,
  // 여기서는 ctx 미지원 시 입력값을 그대로 돌려주는 폴백 로직만 검증한다.
  it("falls back to the original value when canvas 2d context is unavailable (jsdom constraint)", () => {
    expect(normalizeColor("oklch(0.58 0.22 27)")).toBe("oklch(0.58 0.22 27)");
  });

  it("does not throw for an invalid color string", () => {
    expect(() => normalizeColor("not-a-color")).not.toThrow();
  });

  // #25 adversarial follow-up: jsdom's getContext("2d") returns null so the
  // fillStyle→getImageData→hex assembly line never actually executes above.
  // Real OKLCH→sRGB colorimetry is a browser concern we can't reproduce in
  // jsdom, but the hex-assembly logic itself (reading r/g/b out of the
  // ImageData Uint8ClampedArray and zero-padding each byte to two hex digits)
  // is pure and deterministic — stub getContext to return a fake 2d context
  // with a known RGBA payload and verify normalizeColor assembles the exact
  // hex string from it.
  it("assembles the correct hex string from the canvas pixel data (stubbed 2d context)", () => {
    const fakeCtx = {
      fillStyle: "",
      fillRect: vi.fn(),
      getImageData: vi.fn(() => ({
        data: new Uint8ClampedArray([18, 52, 86, 255]), // 0x12, 0x34, 0x56
      })),
    };
    const getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(fakeCtx as unknown as CanvasRenderingContext2D);

    expect(normalizeColor("oklch(0.58 0.22 27)")).toBe("#123456");
    expect(fakeCtx.fillRect).toHaveBeenCalledWith(0, 0, 1, 1);
    expect(fakeCtx.getImageData).toHaveBeenCalledWith(0, 0, 1, 1);

    getContextSpy.mockRestore();
  });

  // Zero-padding regression: a byte < 16 (e.g. 0x05) must render as "05", not "5",
  // or the assembled hex string would be the wrong length/color entirely.
  it("zero-pads single-digit hex bytes", () => {
    const fakeCtx = {
      fillStyle: "",
      fillRect: vi.fn(),
      getImageData: vi.fn(() => ({
        data: new Uint8ClampedArray([5, 0, 255, 255]),
      })),
    };
    const getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(fakeCtx as unknown as CanvasRenderingContext2D);

    expect(normalizeColor("rgb(5, 0, 255)")).toBe("#0500ff");

    getContextSpy.mockRestore();
  });
});

describe("readCssVar", () => {
  it("reads a css custom property from the document root without throwing", () => {
    document.documentElement.style.setProperty("--test-finance-token", "oklch(0.55 0.2 258)");
    expect(() => readCssVar("--test-finance-token")).not.toThrow();
    document.documentElement.style.removeProperty("--test-finance-token");
  });

  it("returns an empty string for an unset variable", () => {
    expect(readCssVar("--does-not-exist-anywhere")).toBe("");
  });
});

describe("readClassColor", () => {
  it("resolves a utility class color without leaving the probe element in the DOM", () => {
    const before = document.body.childElementCount;
    readClassColor("text-gain");
    expect(document.body.childElementCount).toBe(before);
  });
});

describe("observeColorScheme", () => {
  it("invokes the callback immediately on subscribe", () => {
    const onChange = vi.fn();
    const cleanup = observeColorScheme(onChange);
    expect(onChange).toHaveBeenCalledTimes(1);
    cleanup();
  });

  it("re-invokes the callback when the theme-relevant attributes change", async () => {
    const onChange = vi.fn();
    const cleanup = observeColorScheme(onChange);
    document.documentElement.dataset.theme = "rose";
    // MutationObserver callbacks are microtask-scheduled.
    await Promise.resolve();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(onChange.mock.calls.length).toBeGreaterThan(1);
    cleanup();
    delete document.documentElement.dataset.theme;
  });

  it("stops observing after cleanup is called", async () => {
    const onChange = vi.fn();
    const cleanup = observeColorScheme(onChange);
    cleanup();
    const callsAfterCleanup = onChange.mock.calls.length;
    document.documentElement.classList.add("dark");
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(onChange.mock.calls.length).toBe(callsAfterCleanup);
    document.documentElement.classList.remove("dark");
  });
});
