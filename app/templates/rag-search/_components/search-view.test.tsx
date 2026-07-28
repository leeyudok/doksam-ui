import { fireEvent, render, screen, within } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"

import { QUERIES } from "../_data/queries"
import { SearchView } from "./search-view"

// cmdk(Command 내부, MultiSelect 가 사용)는 브라우저에서 옵션 리스트 높이
// 측정에 ResizeObserver 를, 하이라이트 항목 포커스 시 scrollIntoView 를
// 사용한다 — 둘 다 jsdom 에는 없어 스텁이 필요하다(multi-select.demo.test.tsx 참고).
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

describe("SearchView", () => {
  it("히트가 0건이면 빈 상태와 패싯 초기화 액션을 보여준다", () => {
    const emptyQuery = { ...QUERIES[0], hits: [] }
    render(
      <SearchView
        queries={QUERIES}
        selectedQueryId={emptyQuery.id}
        query={emptyQuery}
        selectedChunkId={null}
        onSelectQuery={() => {}}
        onSelectChunk={() => {}}
      />,
    )

    expect(screen.getByText("조건에 맞는 청크가 없습니다.")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "패싯 초기화" })).toBeInTheDocument()
    expect(screen.getByText("선택된 히트가 없습니다.")).toBeInTheDocument()
  })

  it("'감사' 패싯을 고르면 히트 0건 → EmptyState, 초기화하면 히트가 복귀한다", () => {
    const query = QUERIES[0]
    render(
      <SearchView
        queries={QUERIES}
        selectedQueryId={query.id}
        query={query}
        selectedChunkId={null}
        onSelectQuery={() => {}}
        onSelectChunk={() => {}}
      />,
    )

    // 패싯 적용 전에는 q-1 의 히트 5건이 모두 보인다.
    expect(within(screen.getByRole("list", { name: "검색 히트" })).getAllByRole("listitem").length).toBe(5)

    // 팝오버를 열고 count: 0 인 "감사" 버킷을 선택한다. (질의 선택 Select 도
    // role="combobox" 라 aria-haspopup="listbox" 로 패싯 MultiSelect 트리거만 특정한다.)
    const facetTrigger = screen
      .getAllByRole("combobox")
      .find((el) => el.getAttribute("aria-haspopup") === "listbox")
    if (!facetTrigger) throw new Error("패싯 MultiSelect 트리거를 찾을 수 없습니다")
    fireEvent.click(facetTrigger)
    fireEvent.click(screen.getByText("감사 (0)"))

    expect(screen.getByText("조건에 맞는 청크가 없습니다.")).toBeInTheDocument()
    expect(screen.queryByRole("list", { name: "검색 히트" })).not.toBeInTheDocument()

    // 패싯 초기화를 누르면 다시 전체 히트가 보인다.
    fireEvent.click(screen.getByRole("button", { name: "패싯 초기화" }))
    expect(within(screen.getByRole("list", { name: "검색 히트" })).getAllByRole("listitem").length).toBe(5)
  })
})
