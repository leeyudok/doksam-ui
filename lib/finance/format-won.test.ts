import { describe, expect, it } from "vitest";

import { formatWon } from "@/lib/finance/format-won";

describe("formatWon", () => {
  it("formats zero", () => {
    expect(formatWon(0)).toBe("0원");
  });

  it("formats an amount under 1억 in 원 with thousands separators", () => {
    expect(formatWon(50_000_000)).toBe("50,000,000원");
  });

  it("formats a negative amount under 1억", () => {
    expect(formatWon(-1_234_000)).toBe("-1,234,000원");
  });

  it("formats an amount in 억", () => {
    expect(formatWon(500_000_000)).toBe("5억");
  });

  it("formats a negative amount in 억", () => {
    expect(formatWon(-500_000_000)).toBe("-5억");
  });

  it("formats a large 억 amount with thousands separators", () => {
    expect(formatWon(123_400_000_000)).toBe("1,234억");
  });

  it("converts to 조 once 1e12 is reached", () => {
    expect(formatWon(1_000_000_000_000)).toBe("1.0조");
  });

  it("formats a fractional 조 amount", () => {
    expect(formatWon(1_234_000_000_000)).toBe("1.2조");
  });

  // 원본 버그(#56): 9,999.6억을 raw 나눗셈으로 조 전환 여부를 판단하면
  // 9999.6 / 10000 = 0.99996 < 1 이라 억 단위에 남아 "10,000억"으로 반올림되어 새어 나간다.
  // 반올림 후 값(10,000)으로 판단해야 "1.0조"로 정확히 전환된다.
  it("rounds 9,999.6억 up to 1.0조 at the boundary instead of leaking to 10,000억", () => {
    expect(formatWon(999_960_000_000)).toBe("1.0조");
  });

  it("does not convert 9,994억 to 조 (below the boundary)", () => {
    expect(formatWon(999_400_000_000)).toBe("9,994억");
  });

  it("returns a dash for non-finite input", () => {
    expect(formatWon(Number.NaN)).toBe("-");
    expect(formatWon(Number.POSITIVE_INFINITY)).toBe("-");
  });

  // #25 adversarial follow-up: rounding a tiny negative amount to zero must not
  // leak a "-0원" sign artifact.
  it("does not show a negative sign for a tiny negative amount that rounds to zero", () => {
    expect(formatWon(-0.4)).toBe("0원");
  });

  it("formats exactly 1억 (1e8) at the 원→억 boundary", () => {
    expect(formatWon(1e8)).toBe("1억");
  });

  // #25 adversarial follow-up: the 조 branch used toFixed() directly, which has no
  // thousands separators — 2,400조 rendered as "2400.0조" instead of "2,400.0조".
  it("formats a large 조 amount with thousands separators", () => {
    expect(formatWon(2.4e15)).toBe("2,400.0조");
  });

  it("formats a large negative amount", () => {
    expect(formatWon(-123_400_000_000_000)).toBe("-123.4조");
  });
});
