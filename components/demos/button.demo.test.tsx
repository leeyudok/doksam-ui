import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/button.demo"

describe("button demo", () => {
  it("renders the demo buttons", () => {
    render(demo)
    expect(screen.getByRole("button", { name: "저장하기" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "계정 삭제" })).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("<Button")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
