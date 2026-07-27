import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/message.demo"

describe("message demo", () => {
  it("renders both sides of the conversation", () => {
    render(demo)
    expect(screen.getByText("안녕하세요, 무엇을 도와드릴까요?")).toBeInTheDocument()
    expect(screen.getByText("주문 취소는 어디서 하나요?")).toBeInTheDocument()
    expect(screen.getByText("고객지원 · 오전 10:02")).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("<MessageGroup>")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
