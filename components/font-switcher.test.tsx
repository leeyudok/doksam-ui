import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { FontSwitcher } from "@/components/font-switcher";
import { FONT_LICENSE_NOTE, FONT_PRESETS } from "@/fonts";
import { FONT_STORAGE_KEY } from "@/lib/theme-storage";

describe("FontSwitcher", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.dataset.font = "geist";
  });

  it("renders one option per registered font preset", () => {
    render(<FontSwitcher />);
    const select = screen.getByRole("combobox", { name: "폰트 프리셋" });
    for (const preset of FONT_PRESETS) {
      expect(screen.getByRole("option", { name: preset.label })).toBeInTheDocument();
    }
    expect(select).toHaveValue("geist");
  });

  it("switches font on selection and persists to localStorage", () => {
    render(<FontSwitcher />);
    fireEvent.change(screen.getByRole("combobox", { name: "폰트 프리셋" }), {
      target: { value: "noto-sans-kr" },
    });
    expect(document.documentElement.dataset.font).toBe("noto-sans-kr");
    expect(window.localStorage.getItem(FONT_STORAGE_KEY)).toBe("noto-sans-kr");
  });

  it("exposes the free-font license note as a tooltip title", () => {
    render(<FontSwitcher />);
    expect(screen.getByRole("combobox", { name: "폰트 프리셋" })).toHaveAttribute(
      "title",
      FONT_LICENSE_NOTE,
    );
  });
});
