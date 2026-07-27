import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("Home", () => {
  it("renders the site intro heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: /doksam 프로젝트 공통 UI 표준 사이트/ }),
    ).toBeInTheDocument();
  });

  it("links to every section page", () => {
    render(<Home />);
    for (const href of ["/profiles", "/tokens", "/icons", "/components", "/rules"]) {
      const links = screen
        .getAllByRole("link")
        .filter((link) => link.getAttribute("href") === href);
      expect(links.length, `link to ${href}`).toBeGreaterThan(0);
    }
  });

  it("mentions how to reference the site from an AI agent", () => {
    render(<Home />);
    expect(screen.getByText(/ui\.doksam\.com 참고해/)).toBeInTheDocument();
  });

  it("guides projects to pick a profile first", () => {
    render(<Home />);
    expect(screen.getByText(/프로젝트는 먼저 프로필을 정한다/)).toBeInTheDocument();
  });
});
