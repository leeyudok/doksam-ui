import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/rating.demo"

describe("rating demo", () => {
  it("renders an interactive rating and a read-only rating with values", () => {
    render(demo)
    expect(screen.getByText("3.5")).toBeInTheDocument()
    expect(screen.getByText("4.5")).toBeInTheDocument()
  })

  it("updates the controlled value on star click", () => {
    render(demo)
    fireEvent.click(screen.getByRole("button", { name: "5점" }))
    expect(screen.getByText("5.0")).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("Rating")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
