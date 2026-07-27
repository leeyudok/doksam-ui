import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { RelationNetwork, type RelationGroup, type RelationNode } from "@/components/relation-network"

const groups: RelationGroup[] = [
  { key: "out", label: "출자한 회사", color: "#22d3ee" },
  { key: "share", label: "주요 주주", color: "#a78bfa" },
]

const nodes: RelationNode[] = [
  { id: "1", label: "에코프로비엠", group: "out", weight: 12, href: "/biz/2" },
  { id: "2", label: "남이현", group: "share", weight: 11.7 },
]

describe("RelationNetwork", () => {
  it("노드 라벨과 가중치를 렌더링한다", () => {
    render(<RelationNetwork nodes={nodes} groups={groups} centerLabel="이 회사" />)
    expect(screen.getByText("에코프로비엠")).toBeInTheDocument()
    expect(screen.getByText("남이현")).toBeInTheDocument()
    expect(screen.getByText("12%")).toBeInTheDocument()
    expect(screen.getByText("이 회사")).toBeInTheDocument()
  })

  it("href가 있는 노드만 링크로 감싼다", () => {
    render(<RelationNetwork nodes={nodes} groups={groups} />)
    const link = screen.getByText("에코프로비엠").closest("a")
    expect(link).toHaveAttribute("href", "/biz/2")
    expect(screen.getByText("남이현").closest("a")).toBeNull()
  })

  it("그룹별 개수를 범례에 보여준다", () => {
    render(<RelationNetwork nodes={nodes} groups={groups} />)
    expect(screen.getByText("출자한 회사")).toBeInTheDocument()
    expect(screen.getByText("주요 주주")).toBeInTheDocument()
  })
})
