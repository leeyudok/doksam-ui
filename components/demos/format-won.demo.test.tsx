import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/format-won.demo"

describe("format-won demo", () => {
  it("shows the 1.0조 boundary conversion for the default input", () => {
    render(demo)
    expect(screen.getByText("1.0조")).toBeInTheDocument()
  })

  it("updates the preview live as the input changes", () => {
    render(demo)
    const input = screen.getByLabelText("금액 (원)")
    fireEvent.change(input, { target: { value: "500000000" } })
    expect(screen.getByText("5억")).toBeInTheDocument()
  })

  it("shows a dash placeholder for non-numeric input", () => {
    render(demo)
    const input = screen.getByLabelText("금액 (원)")
    fireEvent.change(input, { target: { value: "abc" } })
    expect(screen.getByText("—")).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("formatWon")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
