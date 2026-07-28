import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/table-toggle.demo"

// jsdom은 Pointer Events의 capture API를 구현하지 않는다 — Radix Switch가 내부적으로
// hasPointerCapture 등을 호출하므로 테스트 환경에서만 no-op으로 채운다.
beforeAll(() => {
  Element.prototype.hasPointerCapture ??= () => false
  Element.prototype.setPointerCapture ??= () => {}
  Element.prototype.releasePointerCapture ??= () => {}
})

describe("table-toggle demo", () => {
  it("renders source rows with their switches", () => {
    render(demo)
    expect(screen.getByText("네이버 뉴스")).toBeInTheDocument()
    expect(screen.getByText("news.naver.com")).toBeInTheDocument()
    expect(screen.getByRole("switch", { name: "네이버 뉴스 사용 여부" })).toBeChecked()
    expect(screen.getByRole("switch", { name: "네이트 뉴스 사용 여부" })).not.toBeChecked()
  })

  it("rolls back and shows a failure reason for the row wired to reject", async () => {
    render(demo)
    const toggle = screen.getByRole("switch", { name: "구글 RSS 사용 여부" })
    expect(toggle).toBeChecked()

    fireEvent.click(toggle)
    expect(toggle).not.toBeChecked() // 낙관적으로 꺼진 상태가 즉시 반영된다

    // 실패 후 이전 상태(켜짐)로 롤백된다.
    await waitFor(() => expect(toggle).toBeChecked(), { timeout: 2000 })
    expect(screen.getByText("네트워크 오류로 저장하지 못했습니다.")).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("TableToggle")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
