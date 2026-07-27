import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CopyButton } from "@/components/copy-button";

describe("CopyButton", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it("renders the default label", () => {
    render(<CopyButton value="hello" />);
    expect(screen.getByRole("button", { name: "복사" })).toBeInTheDocument();
  });

  it("renders a custom label", () => {
    render(<CopyButton value="hello" label="CSS 복사" />);
    expect(screen.getByRole("button", { name: "CSS 복사" })).toBeInTheDocument();
  });

  it("copies the value to the clipboard and shows feedback", async () => {
    render(<CopyButton value="copy-me" />);
    fireEvent.click(screen.getByRole("button"));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("copy-me");
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "복사됨" })).toBeInTheDocument();
    });
  });
});
