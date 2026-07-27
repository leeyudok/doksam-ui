import { describe, expect, it } from "vitest"

import { estimateOrderAmount } from "./stock-order-data"

describe("estimateOrderAmount", () => {
  it("multiplies price by quantity", () => {
    expect(estimateOrderAmount(72400, 10)).toBe(724_000)
  })

  it("clamps negative price/quantity to zero", () => {
    expect(estimateOrderAmount(-100, 10)).toBe(0)
    expect(estimateOrderAmount(100, -10)).toBe(0)
  })

  it("returns 0 for non-finite input", () => {
    expect(estimateOrderAmount(Number.NaN, 10)).toBe(0)
    expect(estimateOrderAmount(100, Number.POSITIVE_INFINITY)).toBe(0)
  })
})
