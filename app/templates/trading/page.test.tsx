import { render, screen } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"

import TradingDashboardPage from "@/app/templates/trading/page"
import { formatWon } from "@/lib/finance/format-won"
import { getPortfolioSummary, HOLDINGS } from "@/lib/templates/trading-data"

// jsdom 은 ResizeObserver 를 구현하지 않는다 — return-curve-demo 가 feature-detect
// 하므로 없어도 정적 렌더로 폴백하지만, table-sortable(dnd-kit)이 기대하는
// PointerEvent API 는 명시적으로 폴리필해야 렌더 중 에러가 나지 않는다.
beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(Element.prototype as any).hasPointerCapture ??= () => false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(Element.prototype as any).setPointerCapture ??= () => {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(Element.prototype as any).releasePointerCapture ??= () => {}
})

describe("TradingDashboardPage", () => {
  it("renders the page heading and portfolio summary", () => {
    render(<TradingDashboardPage />)
    // "평가금액" 은 요약 카드 제목과 테이블 컬럼 헤더 둘 다에 나타난다.
    expect(screen.getAllByText("평가금액").length).toBeGreaterThanOrEqual(2)
    const summary = getPortfolioSummary(HOLDINGS)
    expect(screen.getAllByText(formatWon(summary.totalValue)).length).toBeGreaterThan(0)
  })

  it("renders every holding in the holdings table", () => {
    render(<TradingDashboardPage />)
    for (const holding of HOLDINGS) {
      expect(screen.getByText(holding.name)).toBeInTheDocument()
    }
  })

  it("renders the return curve section", () => {
    render(<TradingDashboardPage />)
    expect(screen.getByText("수익률 곡선")).toBeInTheDocument()
  })
})
