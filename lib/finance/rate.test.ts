import { describe, expect, it } from "vitest";

import { rateColor, rateText } from "@/lib/finance/rate";

describe("rateColor", () => {
  it("returns the gain color class for a positive value", () => {
    expect(rateColor(1.5)).toBe("text-gain");
  });

  it("returns the loss color class for a negative value", () => {
    expect(rateColor(-1.5)).toBe("text-loss");
  });

  it("returns the neutral color class for zero", () => {
    expect(rateColor(0)).toBe("text-muted-foreground");
  });
});

describe("rateText", () => {
  it("prefixes a positive value with +", () => {
    expect(rateText(1.234)).toBe("+1.23");
  });

  it("keeps the native minus sign for a negative value", () => {
    expect(rateText(-1.234)).toBe("-1.23");
  });

  it("shows zero without a sign", () => {
    expect(rateText(0)).toBe("0.00");
  });

  it("respects a custom digits count", () => {
    expect(rateText(1.5, 3)).toBe("+1.500");
    expect(rateText(-1.2345, 0)).toBe("-1");
  });

  it("defaults to 2 digits", () => {
    expect(rateText(3)).toBe("+3.00");
  });
});
