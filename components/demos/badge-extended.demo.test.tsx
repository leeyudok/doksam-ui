import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/badge-extended.demo"

describe("badge-extended demo", () => {
  it("renders all three semantic status badges", () => {
    render(demo)
    expect(screen.getByText("승인 완료")).toBeInTheDocument()
    expect(screen.getByText("확인 필요")).toBeInTheDocument()
    expect(screen.getByText("처리 실패")).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("BadgeExtended")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
