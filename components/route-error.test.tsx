import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { RouteError } from "@/components/route-error";

describe("RouteError", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("renders the error message and logs the error on mount", () => {
    const error = Object.assign(new Error("something broke"), { digest: "abc123" });
    render(<RouteError error={error} reset={() => {}} />);

    expect(screen.getByText("문제가 발생했습니다")).toBeInTheDocument();
    expect(screen.getByText("something broke")).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
  });

  it("calls reset when the retry button is clicked", () => {
    const reset = vi.fn();
    render(<RouteError error={new Error("boom")} reset={reset} />);

    fireEvent.click(screen.getByRole("button", { name: /다시 시도/ }));
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("re-logs when the error instance changes", () => {
    const error1 = new Error("first");
    const { rerender } = render(<RouteError error={error1} reset={() => {}} />);
    expect(consoleErrorSpy).toHaveBeenCalledWith(error1);

    const error2 = new Error("second");
    rerender(<RouteError error={error2} reset={() => {}} />);
    expect(consoleErrorSpy).toHaveBeenCalledWith(error2);
    expect(screen.getByText("second")).toBeInTheDocument();
  });
});
