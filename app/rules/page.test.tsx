import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import RulesPage from "@/app/rules/page";
import { RULES_SECTIONS } from "@/lib/rules-markdown";

describe("RulesPage", () => {
  it("renders the page heading", () => {
    render(<RulesPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Rules" })).toBeInTheDocument();
  });

  it("renders every rule section as a heading", () => {
    render(<RulesPage />);
    for (const section of RULES_SECTIONS) {
      expect(screen.getByRole("heading", { name: section.title })).toBeInTheDocument();
    }
  });

  it("provides a full markdown copy button", () => {
    render(<RulesPage />);
    expect(screen.getByRole("button", { name: "전체 markdown 복사" })).toBeInTheDocument();
  });

  it("mentions the semantic-token-only rule", () => {
    render(<RulesPage />);
    expect(screen.getByText(/시맨틱 토큰/)).toBeInTheDocument();
  });
});
