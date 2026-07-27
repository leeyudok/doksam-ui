import { describe, expect, it } from "vitest";

import {
  DEFAULT_FONT_PRESET,
  FONT_LICENSE_NOTE,
  FONT_PRESETS,
  getFontPreset,
} from "@/fonts";

describe("font registry", () => {
  it("has exactly the five starter presets", () => {
    const names = FONT_PRESETS.map((preset) => preset.name).sort();
    expect(names).toEqual(["geist", "ibm-plex-kr", "nanum-gothic", "noto-sans-kr", "space-grotesk"]);
  });

  it("registers the default preset in the registry", () => {
    expect(FONT_PRESETS.some((preset) => preset.name === DEFAULT_FONT_PRESET)).toBe(true);
  });

  it("resolves a preset by name via getFontPreset", () => {
    expect(getFontPreset("geist")?.label).toBe("Geist");
    expect(getFontPreset("unknown")).toBeUndefined();
  });

  it("labels the latin-only space-grotesk preset with a Korean-fallback warning", () => {
    const preset = getFontPreset("space-grotesk");
    expect(preset?.label).toContain("라틴 전용");
    expect(preset?.label).toContain("한글");
  });

  it.each(FONT_PRESETS)("$name preset has a name, label and cssVariable", (preset) => {
    expect(preset.name).toBeTruthy();
    expect(preset.label).toBeTruthy();
    expect(preset.cssVariable).toMatch(/^--font-/);
  });

  it("exposes a non-empty free-font license note", () => {
    expect(FONT_LICENSE_NOTE.length).toBeGreaterThan(0);
    expect(FONT_LICENSE_NOTE).toMatch(/OFL/);
  });
});
