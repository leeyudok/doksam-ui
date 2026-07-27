import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import TradingSymbolPage, { generateStaticParams } from "@/app/templates/trading/[symbol]/page"
import { listSymbols } from "@/lib/templates/trading-data"

describe("TradingSymbolPage", () => {
  it("renders the symbol name, PER/PBR, and return curve section for a known symbol", async () => {
    const jsx = await TradingSymbolPage({ params: Promise.resolve({ symbol: "005930" }) })
    render(jsx)
    expect(screen.getByText("삼성전자")).toBeInTheDocument()
    expect(screen.getByText("PER 12.5")).toBeInTheDocument()
    expect(screen.getByText("수익률 곡선")).toBeInTheDocument()
    expect(screen.getByText("수급 동향")).toBeInTheDocument()
  })

  it("throws not-found for an unregistered symbol", async () => {
    await expect(
      TradingSymbolPage({ params: Promise.resolve({ symbol: "999999" }) }),
    ).rejects.toThrow()
  })

  it("generateStaticParams returns a { symbol } entry for every registered symbol", () => {
    const params = generateStaticParams()
    expect(params).toEqual(listSymbols().map((symbol) => ({ symbol })))
  })
})
