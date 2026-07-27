import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { FacetedFilterDemo } from "@/components/patterns/faceted-filter/faceted-filter-demo"

export const FACETED_FILTER_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "2-depth 칩 + 카운트 + 그룹컬러",
    description: "1depth 그룹 칩을 고르면 2depth 서브카테고리 칩이 드러나는 다면(faceted) 필터입니다. 칩마다 건수 배지를 붙이고, 활성 칩은 그룹 고유 색으로 강조합니다.",
    demo: <FacetedFilterDemo />,
    code: `function selectGroup(next: string) {
  setGroup(next)
  setSub("") // depth0을 바꾸면 depth1 선택은 더 이상 유효하지 않다.
}

<button
  aria-pressed={group === g.key}
  style={group === g.key ? { backgroundColor: g.color, borderColor: g.color } : undefined}
  onClick={() => selectGroup(g.key)}
>
  {g.label}
  <span className="font-mono text-[10px]">{countBy(g.key)}</span>
</button>`,
    notes: [
      "카운트는 하드코딩하지 않고 실제 아이템 배열에서 파생시켜, 필터 칩과 데이터가 항상 일치하게 한다.",
      "그룹 색은 활성 칩 배경뿐 아니라 depth1 영역의 border-left, 리스트 아이템의 좌측 스트라이프에도 재사용해 그룹 소속을 한눈에 드러낸다.",
      "depth0을 바꾸면 depth1(서브카테고리) 선택은 자동으로 초기화한다 — 이전 그룹의 서브카테고리가 새 그룹에 존재하지 않을 수 있기 때문이다.",
      "칩 button에는 aria-pressed를 달아 토글 상태를 스크린리더에도 전달한다.",
    ],
  },
]
