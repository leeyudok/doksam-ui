import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CopyButton } from "@/components/showcase/copy-button";

describe("showcase CopyButton", () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it("renders the idle 복사 label", () => {
    render(<CopyButton value="const x = 1" />);
    expect(screen.getByRole("button", { name: /복사/ })).toBeInTheDocument();
  });

  it("copies the value and shows 복사됨 feedback, then resets", async () => {
    vi.useFakeTimers();
    render(<CopyButton value="snippet" />);

    fireEvent.click(screen.getByRole("button"));
    await vi.waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("snippet");
    });

    await vi.waitFor(() => {
      expect(screen.getByRole("button", { name: /복사됨/ })).toBeInTheDocument();
    });

    vi.advanceTimersByTime(1500);
    await vi.waitFor(() => {
      expect(screen.getByRole("button", { name: /^복사$/ })).toBeInTheDocument();
    });

    vi.useRealTimers();
  });

  it("silently ignores a clipboard failure", async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    render(<CopyButton value="snippet" />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
    // 실패해도 버튼은 여전히 idle 상태를 유지한다.
    expect(screen.getByRole("button", { name: /^복사$/ })).toBeInTheDocument();
  });
});
