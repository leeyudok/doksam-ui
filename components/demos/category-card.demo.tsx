import { BuildingsIcon, ChartPieIcon } from "@phosphor-icons/react/dist/ssr"

import { CategoryCard } from "@/components/category-card"

export const demo = (
  <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
    <CategoryCard
      icon={<BuildingsIcon aria-hidden />}
      label="섹터별 보유"
      total={12}
      items={[
        { label: "반도체", value: 5 },
        { label: "조선", value: 4 },
        { label: "바이오", value: 3 },
      ]}
    />
    <CategoryCard
      icon={<ChartPieIcon aria-hidden />}
      label="유형별 알림"
      total={38}
      color="text-chart-2"
      items={[
        { label: "익절 시그널", value: 16 },
        { label: "손절 경고", value: 9 },
        { label: "뉴스 재료", value: 13 },
      ]}
    />
  </div>
)

export const code = `<CategoryCard
  icon={<BuildingsIcon />} label="섹터별 보유" total={12}
  items={[
    { label: "반도체", value: 5 },
    { label: "조선", value: 4 },
    { label: "바이오", value: 3 },
  ]} />`

export const dos = [
  "분류별 집계(부서별 인원, 유형별 건수)를 합계 + 내역으로 한 카드에 담는다.",
  "total 은 items 합과 일치시킨다 — 어긋나면 데이터 신뢰를 깎는다.",
  "항목이 5개를 넘으면 상위 N + '기타' 로 접는다.",
]

export const donts = [
  "하위 항목에 개별 링크·버튼을 붙이지 않는다 — 상세 진입은 카드 단위로.",
  "비율·추이까지 넣지 않는다 — 그건 dataviz 패턴(파이·바) 몫이다.",
]
