import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/circular-progress.demo"

describe("circular-progress demo", () => {
  it("renders percentage labels and a custom label", () => {
    render(demo)
    expect(screen.getByText("32%")).toBeInTheDocument()
    expect(screen.getByText("68%")).toBeInTheDocument()
    expect(screen.getByText("100%")).toBeInTheDocument()
    expect(screen.getByText("45/100")).toBeInTheDocument()
  })

  it("exposes progressbar roles with correct aria values", () => {
    render(demo)
    const bars = screen.getAllByRole("progressbar")
    expect(bars).toHaveLength(4)
    expect(bars[0]).toHaveAttribute("aria-valuenow", "32")
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("CircularProgress")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
