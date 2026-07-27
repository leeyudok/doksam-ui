import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  code,
  demo,
  donts,
  dos,
} from "@/components/demos/date-range-picker.demo"

describe("date-range-picker demo", () => {
  it("shows the initial range on the trigger and opens two months on click", () => {
    render(demo)
    const trigger = screen.getByRole("button", { name: /7월 14일 - 7월 20일/ })
    fireEvent.click(trigger)

    // numberOfMonths=2 → 두 개의 달력 grid가 함께 렌더링된다.
    expect(screen.getAllByRole("grid")).toHaveLength(2)
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("DateRangePicker")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
