import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/banner.demo"

describe("banner demo", () => {
  it("renders all four semantic banners", () => {
    render(demo)
    expect(screen.getByText(/새 버전이 배포되었습니다/)).toBeInTheDocument()
    expect(screen.getByText(/결제가 정상적으로 완료되었습니다/)).toBeInTheDocument()
    expect(screen.getByText(/저장 공간이 90%를 초과했습니다/)).toBeInTheDocument()
    expect(screen.getByText(/서버 연결에 실패했습니다/)).toBeInTheDocument()
  })

  it("dismisses a banner on close button click", () => {
    render(demo)
    const dismissButtons = screen.getAllByRole("button", { name: "배너 닫기" })
    fireEvent.click(dismissButtons[0])
    expect(screen.queryByText(/새 버전이 배포되었습니다/)).not.toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("Banner")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
