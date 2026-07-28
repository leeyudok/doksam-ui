import { fireEvent, render, screen, within } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"

import RagSearchPage from "@/app/templates/rag-search/page"

// Radix Select(질의 선택)가 쓰는 포인터 캡처 API 는 jsdom 에 없어 폴리필한다
// (app/templates/chat/page.test.tsx 의 기존 관례와 동일).
beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(Element.prototype as any).hasPointerCapture ??= () => false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(Element.prototype as any).setPointerCapture ??= () => {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(Element.prototype as any).releasePointerCapture ??= () => {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(Element.prototype as any).scrollIntoView ??= () => {}
})

describe("RagSearchPage", () => {
  it("헤딩과 eyebrow 배지를 렌더한다", () => {
    render(<RagSearchPage />)
    expect(screen.getByRole("heading", { level: 2, name: "검색 · 답변 · 색인 콘솔" })).toBeInTheDocument()
    expect(screen.getByText("RAG Search · OpenSearch 검색 콘솔")).toBeInTheDocument()
  })

  it("검색 탭 트리거를 렌더한다", () => {
    render(<RagSearchPage />)
    expect(screen.getByRole("tab", { name: "검색" })).toBeInTheDocument()
  })

  it("기본 질의의 히트 목록과 최상위 히트의 점수 분해를 보여준다", () => {
    render(<RagSearchPage />)
    // 기본 질의 q-1 의 1위 히트는 doc-001#c2 (여신 심사 내규 3번 청크 중 2번)
    // breakdown: { bm25: 0.72, vector: 0.88, rerank: 0.94, rankBefore: 2, rankAfter: 1 }
    expect(screen.getByRole("list", { name: "검색 히트" })).toBeInTheDocument()
    expect(screen.getAllByRole("listitem").length).toBeGreaterThanOrEqual(5)
    expect(screen.getByText("BM25")).toBeInTheDocument()
    expect(screen.getByText("벡터")).toBeInTheDocument()
    expect(screen.getByText("rerank")).toBeInTheDocument()
    // 0..1 정규화 값이 0~100 스케일 퍼센트로 변환되어야 한다(그대로 넘기면 1%/0%로 찌그러진다).
    expect(screen.getByText("72%")).toBeInTheDocument()
    expect(screen.getByText("88%")).toBeInTheDocument()
    expect(screen.getByText("94%")).toBeInTheDocument()
    expect(screen.getByText("rerank 전 2위 → 후 1위")).toBeInTheDocument()
  })

  it("히트를 선택하면 그 히트가 선택 상태로 표시된다", () => {
    render(<RagSearchPage />)
    const hits = screen.getAllByRole("button", { name: /여신 심사 내규/ })
    fireEvent.click(hits[0])
    expect(hits[0]).toHaveAttribute("aria-pressed", "true")
  })

  it("질의를 바꾸면 히트 목록·DSL 이 바뀌고 이전 선택 청크가 리셋된다", () => {
    render(<RagSearchPage />)

    // 기본 질의(q-1)에서 첫 히트를 선택해둔다.
    const q1HitButtons = screen.getAllByRole("button", { name: /여신 심사 내규/ })
    fireEvent.click(q1HitButtons[0])
    expect(q1HitButtons[0]).toHaveAttribute("aria-pressed", "true")

    // 질의 선택 콤보박스를 열고 두 번째 질의(q-2, 신용평가)로 바꾼다.
    fireEvent.click(screen.getByRole("combobox", { name: "질의 선택" }))
    fireEvent.click(screen.getByRole("option", { name: "신용평가 모형이 쓰는 변수는?" }))

    // DSL 이 q-2 것(신용평가 변수 매치)으로 바뀐다 — q-1 DSL 은 "연체 산출 기준" 을 매치한다.
    expect(screen.getByText(/신용평가 변수/)).toBeInTheDocument()

    // 히트 목록이 q-2 것(3건)으로 바뀌고, 리셋됐어야 할 선택 청크가 남아있지 않다
    // (그대로 남으면 이전 질의의 청크가 새 질의 인용 패널에 계속 뜬다 — 지적 3).
    const hitList = screen.getByRole("list", { name: "검색 히트" })
    expect(within(hitList).getAllByRole("listitem").length).toBe(3)
    const pressedHits = within(hitList)
      .getAllByRole("button")
      .filter((button) => button.getAttribute("aria-pressed") === "true")
    expect(pressedHits.length).toBe(0)
  })

  it("답변 탭 트리거를 렌더한다", () => {
    render(<RagSearchPage />)
    expect(screen.getByRole("tab", { name: "답변" })).toBeInTheDocument()
  })

  it("검색 탭에서 고른 히트가 답변 탭 인용 패널에 열려 있다", () => {
    render(<RagSearchPage />)

    // 검색 탭에서 3번째 히트(doc-001#c3 — 90일 초과 조항)를 고른다.
    const hitButtons = screen.getAllByRole("button", { name: /여신 심사 내규/ })
    const target = hitButtons.find((b) => b.textContent?.includes("90일을 초과"))!
    fireEvent.click(target)

    // 답변 탭으로 전환하면 그 청크의 원문이 인용 패널에 보인다.
    // Radix TabsTrigger 는 pointerdown/mousedown 으로 활성화된다(#65 ontology 사례와 동일) —
    // jsdom 에서 fireEvent.click 만으로는 탭이 전환되지 않는다.
    fireEvent.mouseDown(screen.getByRole("tab", { name: "답변" }))
    expect(screen.getByLabelText("인용 원문")).toHaveTextContent("연체일수가 90일을 초과하면")
  })

  it("답변 탭의 인용 배지를 누르면 인용 패널이 그 청크로 바뀐다", () => {
    render(<RagSearchPage />)
    fireEvent.mouseDown(screen.getByRole("tab", { name: "답변" }))

    fireEvent.click(screen.getByRole("button", { name: "근거 doc-002#c1" }))
    expect(screen.getByLabelText("인용 원문")).toHaveTextContent("5영업일 이내에 1차 안내")
  })

  it("색인 탭 트리거를 렌더한다", () => {
    render(<RagSearchPage />)
    expect(screen.getByRole("tab", { name: "색인" })).toBeInTheDocument()
  })

  it("색인 탭에 파이프라인 단계·인덱스 통계·실패 로그가 있다", () => {
    render(<RagSearchPage />)
    fireEvent.mouseDown(screen.getByRole("tab", { name: "색인" }))

    expect(screen.getByText("청킹")).toBeInTheDocument()
    expect(screen.getByText("임베딩")).toBeInTheDocument()
    expect(screen.getByText("색인 문서")).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "최근 색인 실패" })).toBeInTheDocument()
  })
})
