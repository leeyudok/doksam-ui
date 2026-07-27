import { fireEvent, render, screen } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/multi-select.demo"

// cmdk(Command 내부)는 브라우저에서 옵션 리스트 높이 측정에 ResizeObserver를,
// 하이라이트된 항목 포커스 시 scrollIntoView를 사용한다 — 둘 다 jsdom에는
// 없어 스텁이 필요하다.
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === "undefined") {
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver
  }
  if (typeof Element.prototype.scrollIntoView !== "function") {
    Element.prototype.scrollIntoView = function scrollIntoView() {}
  }
})

describe("multi-select demo", () => {
  it("shows selected chips and removes one on its remove-button click", () => {
    render(demo)
    expect(screen.getByText("Next.js")).toBeInTheDocument()
    expect(screen.getByText("Astro")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Next.js 제거" }))
    expect(screen.queryByText("Next.js")).not.toBeInTheDocument()
    expect(screen.getByText("Astro")).toBeInTheDocument()
  })

  it("opens the popover and adds a new selection from the list", () => {
    render(demo)
    fireEvent.click(screen.getByRole("combobox"))
    fireEvent.click(screen.getByText("Remix"))

    expect(screen.getAllByText("Remix").length).toBeGreaterThan(0)
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("MultiSelect")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
