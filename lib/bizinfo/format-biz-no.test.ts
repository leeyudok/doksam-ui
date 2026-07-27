import { describe, expect, it } from "vitest";

import { formatBizNo } from "@/lib/bizinfo/format-biz-no";

describe("formatBizNo", () => {
  it("formats a clean 10-digit number as 000-00-00000", () => {
    expect(formatBizNo("1248100998")).toBe("124-81-00998");
  });

  it("strips non-digit characters before formatting a 10-digit value", () => {
    expect(formatBizNo("124-81 00998")).toBe("124-81-00998");
  });

  it("returns an already-formatted value unchanged (idempotent)", () => {
    expect(formatBizNo("124-81-00998")).toBe("124-81-00998");
  });

  it("returns the original string for short input (not 10 digits)", () => {
    expect(formatBizNo("12481")).toBe("12481");
  });

  it("returns the original string for input with more than 10 digits", () => {
    expect(formatBizNo("123456789012")).toBe("123456789012");
  });

  it("returns an empty string for null", () => {
    expect(formatBizNo(null)).toBe("");
  });

  it("returns an empty string for undefined", () => {
    expect(formatBizNo(undefined)).toBe("");
  });

  it("returns an empty string for an empty string", () => {
    expect(formatBizNo("")).toBe("");
  });
});
