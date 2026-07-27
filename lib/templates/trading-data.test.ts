import { describe, expect, it } from "vitest"

import {
  getPortfolioSummary,
  getSymbolDetail,
  HOLDINGS,
  listSymbols,
  rangePosition,
  WATCHLIST,
} from "@/lib/templates/trading-data"

describe("getPortfolioSummary", () => {
  it("computes total value, cost, and gain from holdings", () => {
    const summary = getPortfolioSummary(HOLDINGS)
    const expectedValue = HOLDINGS.reduce((sum, h) => sum + h.currentPrice * h.shares, 0)
    const expectedCost = HOLDINGS.reduce((sum, h) => sum + h.avgPrice * h.shares, 0)
    expect(summary.totalValue).toBe(expectedValue)
    expect(summary.totalCost).toBe(expectedCost)
    expect(summary.totalGain).toBe(expectedValue - expectedCost)
  })

  it("returns 0 percent gain for an empty holdings list", () => {
    const summary = getPortfolioSummary([])
    expect(summary.totalGainPercent).toBe(0)
  })
})

describe("getSymbolDetail / listSymbols", () => {
  it("resolves a detail record for every watchlist and holding symbol", () => {
    const symbols = new Set([...HOLDINGS.map((h) => h.symbol), ...WATCHLIST.map((w) => w.symbol)])
    for (const symbol of symbols) {
      expect(getSymbolDetail(symbol)).toBeDefined()
    }
  })

  it("returns undefined for an unknown symbol", () => {
    expect(getSymbolDetail("000000")).toBeUndefined()
  })

  it("listSymbols returns every registered symbol key", () => {
    expect(listSymbols().length).toBeGreaterThan(0)
    for (const symbol of listSymbols()) {
      expect(getSymbolDetail(symbol)).toBeDefined()
    }
  })
})

describe("rangePosition", () => {
  it("clamps to 0 and 100 at the range boundaries", () => {
    expect(rangePosition(50, { low: 50, high: 100 })).toBe(0)
    expect(rangePosition(100, { low: 50, high: 100 })).toBe(100)
    expect(rangePosition(75, { low: 50, high: 100 })).toBe(50)
  })

  it("returns 0 when the range is degenerate (high <= low)", () => {
    expect(rangePosition(80, { low: 100, high: 100 })).toBe(0)
  })
})
