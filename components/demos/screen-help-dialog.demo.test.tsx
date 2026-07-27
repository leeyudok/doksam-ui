import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/screen-help-dialog.demo"

describe("screen-help-dialog demo", () => {
  it("opens the dialog and shows its items on trigger click", () => {
    render(demo)
    fireEvent.click(screen.getByRole("button", { name: "화면 매뉴얼" }))
    expect(screen.getByRole("heading", { name: "주문 관리 화면 매뉴얼" })).toBeInTheDocument()
    expect(screen.getByText("상태 배지")).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("ScreenHelpDialog")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
