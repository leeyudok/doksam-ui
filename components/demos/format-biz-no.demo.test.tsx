import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/format-biz-no.demo"

describe("format-biz-no demo", () => {
  it("shows the formatted value for the default 10-digit input", () => {
    render(demo)
    expect(screen.getByText("124-81-00998")).toBeInTheDocument()
  })

  it("updates the formatted preview live as the input changes", () => {
    render(demo)
    const input = screen.getByLabelText("사업자등록번호 (원본)")
    fireEvent.change(input, { target: { value: "2148111114" } })
    expect(screen.getByText("214-81-11114")).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("formatBizNo")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
