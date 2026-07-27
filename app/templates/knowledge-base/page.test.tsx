import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import KnowledgeBaseConsolePage from "@/app/templates/knowledge-base/page"

describe("KnowledgeBaseConsolePage", () => {
  it("renders the page heading and eyebrow badge", () => {
    render(<KnowledgeBaseConsolePage />)
    expect(screen.getByRole("heading", { level: 2, name: "위키 · 보드 · 로그 콘솔" })).toBeInTheDocument()
    expect(screen.getByText("Knowledge Base · 지식관리 콘솔")).toBeInTheDocument()
  })

  it("renders the three tab triggers", () => {
    render(<KnowledgeBaseConsolePage />)
    expect(screen.getByRole("tab", { name: "위키" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "보드" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "로그" })).toBeInTheDocument()
  })

  it("shows the wiki document tree and default document body by default", () => {
    render(<KnowledgeBaseConsolePage />)
    expect(screen.getByRole("tree", { name: "위키 문서 트리" })).toBeInTheDocument()
    // 기본 선택 문서의 본문 제목(h3)이 보인다.
    expect(screen.getByRole("heading", { level: 3, name: "지식베이스 시작하기" })).toBeInTheDocument()
  })

  it("selects another wiki document when its tree item is clicked", () => {
    render(<KnowledgeBaseConsolePage />)
    fireEvent.click(screen.getByText("용어 사전"))
    expect(screen.getByRole("heading", { level: 3, name: "용어 사전" })).toBeInTheDocument()
  })

  it("switches to the board tab and renders category columns with cards", () => {
    render(<KnowledgeBaseConsolePage />)
    fireEvent.mouseDown(screen.getByRole("tab", { name: "보드" }))
    expect(screen.getByRole("heading", { level: 4, name: "문서 검색 개선 조사" })).toBeInTheDocument()
    expect(screen.getByText("아이디어")).toBeInTheDocument()
  })

  it("switches to the logs tab and renders a dated session timeline", () => {
    render(<KnowledgeBaseConsolePage />)
    fireEvent.mouseDown(screen.getByRole("tab", { name: "로그" }))
    expect(screen.getByRole("heading", { level: 4, name: "문서 작성 규칙 개정" })).toBeInTheDocument()
    expect(screen.getByText("2026-07-14")).toBeInTheDocument()
  })
})
