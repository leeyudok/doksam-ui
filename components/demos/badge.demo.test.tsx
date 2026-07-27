import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/badge.demo"

describe("badge demo", () => {
  it("renders status badges", () => {
    render(demo)
    expect(screen.getByText("신규")).toBeInTheDocument()
    expect(screen.getByText("결제 실패")).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("<Badge")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
