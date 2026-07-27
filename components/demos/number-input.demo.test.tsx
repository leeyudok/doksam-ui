import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/number-input.demo"

describe("number-input demo", () => {
  it("increments and decrements within min/max bounds", () => {
    render(demo)
    const input = screen.getByRole("spinbutton") as HTMLInputElement
    expect(input.value).toBe("3")

    fireEvent.click(screen.getByRole("button", { name: "증가" }))
    expect(input.value).toBe("4")

    fireEvent.click(screen.getByRole("button", { name: "감소" }))
    fireEvent.click(screen.getByRole("button", { name: "감소" }))
    fireEvent.click(screen.getByRole("button", { name: "감소" }))
    fireEvent.click(screen.getByRole("button", { name: "감소" }))
    expect(input.value).toBe("0")
    expect(screen.getByRole("button", { name: "감소" })).toBeDisabled()
  })

  it("clamps direct input on blur to the min/max range", () => {
    render(demo)
    const input = screen.getByRole("spinbutton") as HTMLInputElement
    fireEvent.change(input, { target: { value: "42" } })
    fireEvent.blur(input)
    expect(input.value).toBe("10")
    expect(screen.getByRole("button", { name: "증가" })).toBeDisabled()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("NumberInput")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
