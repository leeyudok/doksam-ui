import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/color-picker.demo"

describe("color-picker demo", () => {
  it("shows the current hex value on the trigger", () => {
    render(demo)
    expect(screen.getByRole("button", { name: "색상 선택" })).toHaveTextContent("#3b82f6")
  })

  it("opens the popover and selects a preset swatch", () => {
    render(demo)
    fireEvent.click(screen.getByRole("button", { name: "색상 선택" }))
    fireEvent.click(screen.getByRole("button", { name: "#ef4444" }))
    expect(screen.getByText("선택한 색: #ef4444")).toBeInTheDocument()
  })

  it("commits a valid hex typed into the text input", () => {
    render(demo)
    fireEvent.click(screen.getByRole("button", { name: "색상 선택" }))
    const hexInput = screen.getByLabelText("Hex 코드")
    fireEvent.change(hexInput, { target: { value: "#00ff00" } })
    expect(screen.getByText("선택한 색: #00ff00")).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("ColorPicker")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
