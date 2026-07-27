import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { LiveIndicator } from "@/components/live-indicator"

describe("LiveIndicator", () => {
  it("live 상태는 기본 라벨 LIVE와 success 색을 쓴다", () => {
    render(<LiveIndicator status="live" />)
    const el = screen.getByText("LIVE", { exact: false }).closest('[data-slot="live-indicator"]')
    expect(el).toHaveClass("text-success")
  })

  it("stale 상태는 기본 라벨 지연과 warning 색을 쓴다", () => {
    render(<LiveIndicator status="stale" />)
    const el = screen.getByText("지연", { exact: false }).closest('[data-slot="live-indicator"]')
    expect(el).toHaveClass("text-warning")
  })

  it("offline 상태는 기본 라벨 오프라인과 muted-foreground 색을 쓴다", () => {
    render(<LiveIndicator status="offline" />)
    const el = screen.getByText("오프라인", { exact: false }).closest('[data-slot="live-indicator"]')
    expect(el).toHaveClass("text-muted-foreground")
  })

  it("updatedAt을 HH:MM:SS 갱신 고정 포맷으로 표시한다", () => {
    render(<LiveIndicator status="live" updatedAt={new Date(2026, 6, 15, 9, 5, 3)} />)
    expect(screen.getByText("LIVE · 09:05:03 갱신")).toBeInTheDocument()
  })

  it("label을 넘기면 기본 라벨 대신 사용한다", () => {
    render(<LiveIndicator status="paused" label="일시 중지됨" />)
    expect(screen.getByText("일시 중지됨", { exact: false })).toBeInTheDocument()
  })
})
