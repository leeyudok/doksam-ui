import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RouteLoading } from "@/components/route-loading";

describe("RouteLoading", () => {
  it("renders a labeled status region with skeleton placeholders", () => {
    render(<RouteLoading />);
    const status = screen.getByLabelText("로딩 중");
    expect(status.tagName).toBe("OUTPUT");
    // 제목 줄 + 본문 두 줄, 총 3개의 스켈레톤 placeholder.
    expect(status.children).toHaveLength(3);
  });
});
