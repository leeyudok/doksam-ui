import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import SaasDashboardPage from "@/app/templates/saas/dashboard/page"
import { DASHBOARD_SUMMARY } from "@/app/templates/saas/_lib/data"

describe("SaasDashboardPage", () => {
  it("renders the dashboard heading", () => {
    render(<SaasDashboardPage />)
    expect(screen.getByRole("heading", { level: 1, name: "워크스페이스 현황" })).toBeInTheDocument()
  })

  it("renders every summary stat", () => {
    render(<SaasDashboardPage />)
    for (const stat of DASHBOARD_SUMMARY) {
      expect(screen.getByText(stat.label)).toBeInTheDocument()
      expect(screen.getByText(stat.value)).toBeInTheDocument()
    }
  })

  it("renders the content feed view toggle", () => {
    render(<SaasDashboardPage />)
    expect(screen.getByRole("group", { name: "보기 방식" })).toBeInTheDocument()
  })

  it("renders the list-controls search form", () => {
    render(<SaasDashboardPage />)
    expect(screen.getByRole("search")).toBeInTheDocument()
  })
})
