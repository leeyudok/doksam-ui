import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ContributionBars, type ContributionFactor } from "@/components/contribution-bars"

const factors: ContributionFactor[] = [
  { label: "매출 감소", value: 42, kind: "financial" },
  { label: "연체 이력", value: 61, kind: "signal" },
  { label: "단기 등급 하락 모멘텀", value: 18, kind: "momentum" },
]

describe("ContributionBars", () => {
  it("sort가 false(기본)면 입력 순서를 유지한다", () => {
    render(<ContributionBars factors={factors} />)
    const labels = screen.getAllByText(/매출 감소|연체 이력|단기 등급 하락 모멘텀/).map((el) => el.textContent)
    expect(labels).toEqual(["매출 감소", "연체 이력", "단기 등급 하락 모멘텀"])
  })

  it("sort가 true면 value 내림차순으로 정렬한다", () => {
    render(<ContributionBars factors={factors} sort />)
    const labels = screen.getAllByText(/매출 감소|연체 이력|단기 등급 하락 모멘텀/).map((el) => el.textContent)
    expect(labels).toEqual(["연체 이력", "매출 감소", "단기 등급 하락 모멘텀"])
  })

  it("value를 반올림한 퍼센트로 표기한다", () => {
    render(<ContributionBars factors={[{ label: "요인 A", value: 61.6 }]} />)
    expect(screen.getByText("62%")).toBeInTheDocument()
  })

  it("kind별로 chart-1~5 토큰 클래스를 등장 순서대로 순환 배정한다", () => {
    const { container } = render(<ContributionBars factors={factors} />)
    const bars = container.querySelectorAll("li span > span")
    expect(bars[0]).toHaveClass("bg-chart-1")
    expect(bars[1]).toHaveClass("bg-chart-2")
    expect(bars[2]).toHaveClass("bg-chart-3")
  })

  it("kindColors로 특정 kind의 색을 오버라이드할 수 있다", () => {
    const { container } = render(
      <ContributionBars factors={factors} kindColors={{ signal: "bg-destructive" }} />,
    )
    const bars = container.querySelectorAll("li span > span")
    expect(bars[1]).toHaveClass("bg-destructive")
  })
})
