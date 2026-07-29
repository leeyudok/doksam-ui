import { describe, expect, it } from "vitest";

import { GET } from "@/app/rules.md/route";
import { RULES_MARKDOWN } from "@/lib/rules-markdown";

describe("GET /rules.md", () => {
  it("serves the rules markdown verbatim", async () => {
    const response = GET();
    expect(response.status).toBe(200);
    expect(await response.text()).toBe(RULES_MARKDOWN);
  });

  it("declares a markdown content type", () => {
    expect(GET().headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
  });
});
