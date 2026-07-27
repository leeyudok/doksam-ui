import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import GlossaryExplorerPage from "@/app/templates/glossary/page"
import { CATEGORIES } from "@/app/templates/glossary/_data/terms"

describe("GlossaryExplorerPage", () => {
  it("renders the page heading and eyebrow badge", () => {
    render(<GlossaryExplorerPage />)
    expect(screen.getByRole("heading", { level: 2, name: "용어 네트워크 탐색기" })).toBeInTheDocument()
    expect(screen.getByText("Glossary · 지식 그래프")).toBeInTheDocument()
  })

  it("renders the term search input", () => {
    render(<GlossaryExplorerPage />)
    expect(screen.getByRole("searchbox", { name: "용어 검색" })).toBeInTheDocument()
  })

  it("renders one legend filter chip per category (all enabled by default)", () => {
    render(<GlossaryExplorerPage />)
    // 범례 칩은 aria-pressed=true(활성) 버튼, 노드 g(role=button)는 aria-pressed=false.
    const enabledChips = screen.getAllByRole("button", { pressed: true })
    expect(enabledChips).toHaveLength(CATEGORIES.length)
  })

  it("renders several term node labels in the network", () => {
    render(<GlossaryExplorerPage />)
    for (const label of ["SDLC", "MVP", "RAG", "LLM", "AI QA"]) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it("opens the detail panel with definition and related pills when a node is clicked", () => {
    render(<GlossaryExplorerPage />)
    // 초기엔 안내 문구가 보인다.
    expect(screen.getByText(/상세 설명과 연결된 용어가 표시됩니다/)).toBeInTheDocument()

    fireEvent.click(screen.getByText("MVP"))

    // 상세 패널에 풀네임과 정의 섹션이 나타난다.
    expect(screen.getByText("Minimum Viable Product")).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2, name: "MVP" })).toBeInTheDocument()
    // 관련 용어 pill(KPI 등)이 클릭 가능한 버튼으로 노출된다.
    expect(screen.getByRole("button", { name: "KPI" })).toBeInTheDocument()
  })
})
