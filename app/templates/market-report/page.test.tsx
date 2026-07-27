import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import MarketReportDailyPage from "@/app/templates/market-report/page"
import MarketReportWeeklyPage from "@/app/templates/market-report/weekly/page"

describe("MarketReportDailyPage", () => {
  it("renders the eyebrow and daily heading", () => {
    render(<MarketReportDailyPage />)
    expect(screen.getByRole("heading", { level: 1, name: "오늘의 증시 테마 리포트" })).toBeInTheDocument()
    expect(screen.getByText("Market Intelligence")).toBeInTheDocument()
  })

  it("renders the ticker strip, event feed and matrix section labels", () => {
    render(<MarketReportDailyPage />)
    expect(screen.getByLabelText("시세 티커")).toBeInTheDocument()
    expect(screen.getByText("오늘의 이벤트")).toBeInTheDocument()
    expect(screen.getByText("리스크 · 기회 매트릭스")).toBeInTheDocument()
  })

  it("renders watchlist stocks and the virtual-data footer caption", () => {
    render(<MarketReportDailyPage />)
    expect(screen.getByText("가온반도체")).toBeInTheDocument()
    expect(screen.getByText("가상 데이터 · 데모")).toBeInTheDocument()
  })
})

describe("MarketReportWeeklyPage", () => {
  it("renders the weekly heading and theme ranking", () => {
    render(<MarketReportWeeklyPage />)
    expect(screen.getByRole("heading", { level: 1, name: "주간 증시 테마 분석" })).toBeInTheDocument()
    expect(screen.getByText("반도체 메가클러스터")).toBeInTheDocument()
  })

  it("renders the timeline, calendar and disclosure sections", () => {
    render(<MarketReportWeeklyPage />)
    expect(screen.getByText("주간 흐름 타임라인")).toBeInTheDocument()
    expect(screen.getByText("이벤트 캘린더")).toBeInTheDocument()
    expect(screen.getByText("주요 공시")).toBeInTheDocument()
  })

  it("renders a virtual disclosure entry", () => {
    render(<MarketReportWeeklyPage />)
    expect(screen.getByText("자기주식 취득 신탁계약 체결 — 주주환원 확대")).toBeInTheDocument()
  })
})
