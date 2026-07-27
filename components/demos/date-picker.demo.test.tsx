import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/date-picker.demo"

describe("date-picker demo", () => {
  it("shows the initial date on the trigger and lets you pick another day", () => {
    render(demo)
    const trigger = screen.getByRole("button", { name: /2026년 7월 14일/ })
    fireEvent.click(trigger)

    const day15 = screen.getByText("15").closest("button")
    expect(day15).not.toBeNull()
    fireEvent.click(day15 as HTMLButtonElement)

    expect(screen.getByRole("button", { name: /2026년 7월 15일/ })).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("DatePicker")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
