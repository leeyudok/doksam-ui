import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import CompanyIntelPage from "@/app/templates/company-intel/page"
import { KPIS, NEWS, RELATION_NODES } from "@/app/templates/company-intel/_data/company"

describe("CompanyIntelPage", () => {
  it("renders the page heading and eyebrow badge", () => {
    render(<CompanyIntelPage />)
    expect(screen.getByRole("heading", { level: 2, name: "기업 인텔리전스 대시보드" })).toBeInTheDocument()
    expect(screen.getByText("Company Intel · 기업 인텔리전스")).toBeInTheDocument()
  })

  it("renders the company header with credit grade badge", () => {
    render(<CompanyIntelPage />)
    // 기업명은 헤더 h2 로 노출된다.
    expect(screen.getByRole("heading", { level: 2, name: "한빛정밀(주)" })).toBeInTheDocument()
    expect(screen.getByText("신용 BBB+")).toBeInTheDocument()
  })

  it("renders every KPI summary label", () => {
    render(<CompanyIntelPage />)
    for (const kpi of KPIS) {
      expect(screen.getByText(kpi.label)).toBeInTheDocument()
    }
  })

  it("renders the location placeholder with the virtual address", () => {
    render(<CompanyIntelPage />)
    expect(screen.getByText(/경기도 안산시 단원구 산단로 128/)).toBeInTheDocument()
  })

  it("renders all news feed headlines", () => {
    render(<CompanyIntelPage />)
    for (const item of NEWS) {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    }
  })

  it("reuses the shared RelationNetwork graph for equity relations", () => {
    render(<CompanyIntelPage />)
    expect(screen.getByRole("img", { name: "관계 네트워크 그래프" })).toBeInTheDocument()
    expect(screen.getByText(`${RELATION_NODES.length}개 관계`)).toBeInTheDocument()
    // 주요 관계 노드 라벨이 그래프에 그려진다.
    expect(screen.getByText("한빛테크솔루션(주)")).toBeInTheDocument()
  })

  it("renders the keyword cloud and demo footer", () => {
    render(<CompanyIntelPage />)
    expect(screen.getByText("연관 키워드")).toBeInTheDocument()
    expect(screen.getByText("2차전지 장비")).toBeInTheDocument()
    expect(screen.getByText("가상 데이터 · 데모")).toBeInTheDocument()
  })
})
