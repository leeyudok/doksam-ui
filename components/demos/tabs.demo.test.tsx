import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/tabs.demo"

describe("tabs demo", () => {
  it("renders the default tab content and other tab triggers", () => {
    render(demo)
    expect(
      screen.getByText("표시 이름·이메일 등 계정 기본 정보를 관리합니다.")
    ).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "비밀번호" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "결제" })).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("<Tabs")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
