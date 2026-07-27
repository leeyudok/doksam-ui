import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import BrokerageHomePage from "@/app/templates/brokerage/page"

describe("BrokerageHomePage", () => {
  it("renders nav, market strip, screener and watchlist", () => {
    render(<BrokerageHomePage />)
    expect(screen.getAllByText("누리증권").length).toBeGreaterThan(0)
    expect(screen.getByText("코스피")).toBeInTheDocument()
    expect(screen.getByText("관심")).toBeInTheDocument()
  })
})
