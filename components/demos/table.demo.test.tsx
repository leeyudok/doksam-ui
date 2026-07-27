import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/table.demo"

describe("table demo", () => {
  it("renders order rows and the total footer", () => {
    render(demo)
    expect(screen.getByText("ORD-2026-0114")).toBeInTheDocument()
    expect(screen.getByText("김서연")).toBeInTheDocument()
    expect(screen.getByText("합계")).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("<Table>")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
