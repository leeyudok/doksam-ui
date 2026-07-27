import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import TradingWatchlistPage from "@/app/templates/trading/watchlist/page"
import { WATCHLIST } from "@/lib/templates/trading-data"

describe("TradingWatchlistPage", () => {
  it("renders every watchlist item with a link to its detail page", () => {
    render(<TradingWatchlistPage />)
    for (const item of WATCHLIST) {
      const link = screen.getByRole("link", { name: new RegExp(item.name) })
      expect(link).toHaveAttribute("href", `/templates/trading/${item.symbol}`)
    }
  })

  it("renders the activity heatmap section", () => {
    render(<TradingWatchlistPage />)
    expect(screen.getByRole("img", { name: "최근 20주 일별 활동 건수 히트맵" })).toBeInTheDocument()
  })
})
