import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/rate-color.demo"

describe("rate-color demo", () => {
  it("shows the formatted rate for the default positive input", () => {
    render(demo)
    expect(screen.getByText("+1.23")).toBeInTheDocument()
  })

  it("updates the preview live when the input turns negative", () => {
    render(demo)
    const input = screen.getByLabelText("등락률 (%)")
    fireEvent.change(input, { target: { value: "-2.5" } })
    expect(screen.getByText("-2.50")).toBeInTheDocument()
  })

  it("shows a dash placeholder for non-numeric input", () => {
    render(demo)
    const input = screen.getByLabelText("등락률 (%)")
    fireEvent.change(input, { target: { value: "abc" } })
    expect(screen.getByText("—")).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("rateColor")
    expect(code).toContain("rateText")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
