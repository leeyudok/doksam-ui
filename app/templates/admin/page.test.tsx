import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import AdminDashboardPage from "@/app/templates/admin/page"

describe("AdminDashboardPage", () => {
  it("renders the page heading and eyebrow badge", () => {
    render(<AdminDashboardPage />)
    expect(screen.getByRole("heading", { level: 1, name: "운영 현황" })).toBeInTheDocument()
    expect(screen.getByText("Admin · 대시보드")).toBeInTheDocument()
  })

  it("renders every KPI metric card", () => {
    render(<AdminDashboardPage />)
    for (const label of ["활성 사용자", "신규 주문", "매출", "미해결 티켓"]) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it("renders the service status widget and recent activity table", () => {
    render(<AdminDashboardPage />)
    expect(screen.getByText("서비스 상태")).toBeInTheDocument()
    expect(screen.getByText("최근 활동")).toBeInTheDocument()
    expect(screen.getByText("결제 게이트웨이")).toBeInTheDocument()
  })
})
