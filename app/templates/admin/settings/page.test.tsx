import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import AdminSettingsPage from "@/app/templates/admin/settings/page"

describe("AdminSettingsPage", () => {
  it("renders the page heading", () => {
    render(<AdminSettingsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "워크스페이스 설정" })).toBeInTheDocument()
  })

  it("renders every form section", () => {
    render(<AdminSettingsPage />)
    for (const title of ["일반", "알림", "보안", "API"]) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
    expect(screen.getByLabelText("조직 이름")).toHaveValue("doksam 백오피스")
    expect(screen.getByLabelText("API 키")).toHaveValue("sk_live_admin_9f21ac8d4e")
  })

  it("saves and shows a confirmation timestamp", () => {
    render(<AdminSettingsPage />)
    fireEvent.click(screen.getByRole("button", { name: "변경사항 저장" }))
    expect(screen.getByText(/저장됨/)).toBeInTheDocument()
  })
})
