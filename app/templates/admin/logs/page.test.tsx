import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import AdminLogsPage from "@/app/templates/admin/logs/page"

describe("AdminLogsPage", () => {
  it("renders the page heading", () => {
    render(<AdminLogsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "로그 & 요청 인스펙터" })).toBeInTheDocument()
  })

  it("renders the log viewer, request inspector, and json tree sections", () => {
    render(<AdminLogsPage />)
    expect(screen.getByText("애플리케이션 로그")).toBeInTheDocument()
    expect(screen.getByText("결제 게이트웨이 타임아웃(5000ms)")).toBeInTheDocument()

    expect(screen.getByText("요청 인스펙터")).toBeInTheDocument()
    expect(screen.getByText("/api/payments")).toBeInTheDocument()

    expect(screen.getByText("원시 응답 페이로드")).toBeInTheDocument()
    expect(screen.getByText("response")).toBeInTheDocument()
  })
})
