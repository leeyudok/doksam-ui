import { fireEvent, render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import OntologyConsolePage from "@/app/templates/ontology/page"
import { NODES, NODE_TYPES } from "@/app/templates/ontology/_data/graph"

describe("OntologyConsolePage", () => {
  it("renders the page heading and eyebrow badge", () => {
    render(<OntologyConsolePage />)
    expect(screen.getByRole("heading", { level: 2, name: "온톨로지 지식 콘솔" })).toBeInTheDocument()
    expect(screen.getByText("Ontology · 지식 온톨로지")).toBeInTheDocument()
  })

  it("renders the search input and full document count", () => {
    render(<OntologyConsolePage />)
    expect(screen.getByRole("searchbox", { name: "문서 검색" })).toBeInTheDocument()
    expect(screen.getByText(`${NODES.length} / ${NODES.length} 문서`)).toBeInTheDocument()
  })

  it("renders one type filter chip per node type (all enabled by default)", () => {
    render(<OntologyConsolePage />)
    // 타입 칩은 aria-pressed=true(활성) 버튼, 사전 카드 버튼은 aria-pressed=false.
    const enabledChips = screen.getAllByRole("button", { pressed: true })
    expect(enabledChips).toHaveLength(NODE_TYPES.length)
  })

  it("filters dictionary cards and updates the count when searching", () => {
    render(<OntologyConsolePage />)
    fireEvent.change(screen.getByRole("searchbox", { name: "문서 검색" }), {
      target: { value: "워크트리" },
    })
    // 라벨은 <mark> 하이라이트로 쪼개지므로 카드 버튼의 접근성 이름으로 확인한다.
    expect(screen.getByRole("button", { name: /feedback_worktree-isolation/ })).toBeInTheDocument()
    const shown = NODES.filter((n) =>
      `${n.label} ${n.path} ${n.description} ${n.kind}`.includes("워크트리"),
    ).length
    expect(screen.getByText(`${shown} / ${NODES.length} 문서`)).toBeInTheDocument()
  })

  it("shows the empty state when nothing matches", () => {
    render(<OntologyConsolePage />)
    fireEvent.change(screen.getByRole("searchbox", { name: "문서 검색" }), {
      target: { value: "존재하지않는검색어" },
    })
    expect(screen.getByText("검색 결과가 없습니다.")).toBeInTheDocument()
  })

  it("opens the graph tab and shows node detail with relation pills on click", () => {
    render(<OntologyConsolePage />)
    fireEvent.mouseDown(screen.getByRole("tab", { name: "그래프" }))
    // 초기엔 안내 문구가 보인다.
    expect(screen.getByText(/상세 설명과 연결 문서가 표시됩니다/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "MEMORY" }))

    // 상세 패널에 경로와 참조 목록이 나타난다.
    expect(screen.getByText(".claude/memory/MEMORY.md")).toBeInTheDocument()
    expect(screen.getByText(/^참조 \d+건$/)).toBeInTheDocument()
    // 참조 pill 클릭으로 다른 노드로 항해할 수 있다(그래프 노드와 구분해 패널 안에서 조회).
    const panel = screen.getByRole("complementary", { name: "노드 상세" })
    fireEvent.click(within(panel).getByRole("button", { name: /fb: 워크트리 격리/ }))
    expect(screen.getByText(".claude/memory/feedback_worktree-isolation.md")).toBeInTheDocument()
  })
})
