import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/card.demo"

describe("card demo", () => {
  it("renders the plan card with title, price, and primary action", () => {
    render(demo)
    expect(screen.getByText("프로 플랜")).toBeInTheDocument()
    expect(screen.getByText(/29,000원/)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /구독 시작하기/ })).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("<Card>")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
