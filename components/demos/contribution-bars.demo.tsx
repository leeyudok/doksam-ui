import { ContributionBars, type ContributionFactor } from "@/components/contribution-bars"

const factors: ContributionFactor[] = [
  { label: "연체 이력 발생", value: 68, kind: "signal" },
  { label: "매출 감소 (전분기 대비)", value: 54, kind: "signal" },
  { label: "재무비율 악화", value: 41, kind: "financial" },
  { label: "단기 등급 하락 모멘텀", value: 27, kind: "momentum" },
  { label: "업종 평균 대비 부채비율", value: 15, kind: "financial" },
]

export const demo = <ContributionBars factors={factors} sort />

export const code = `import { ContributionBars, type ContributionFactor } from "@/components/contribution-bars"

const factors: ContributionFactor[] = [
  { label: "연체 이력 발생", value: 68, kind: "signal" },
  { label: "매출 감소 (전분기 대비)", value: 54, kind: "signal" },
  { label: "재무비율 악화", value: 41, kind: "financial" },
  { label: "단기 등급 하락 모멘텀", value: 27, kind: "momentum" },
  { label: "업종 평균 대비 부채비율", value: 15, kind: "financial" },
]

<ContributionBars factors={factors} sort />`

export const dos = [
  "sort를 켜서 기여도 내림차순으로 보여준다 — 가장 큰 요인이 위에 오면 원인 파악이 빠르다.",
  "kind로 요인 종류(신호·재무·모멘텀 등)를 구분한다 — 같은 kind는 같은 색으로 자동 순환 배정된다.",
  "value는 0~100 사이 절대 기여도로 넘긴다 — 컴포넌트는 반올림해 그대로 퍼센트로 표기한다.",
]

export const donts = [
  "바 색을 하드코딩 hex로 지정하지 않는다 — kindColors를 쓰더라도 chart-1~5 등 시맨틱 토큰 클래스만 넘긴다.",
  "요인을 너무 많이(10개 이상) 한 번에 넣지 않는다 — 상위 요인만 추려야 SHAP 스타일 분해가 읽힌다.",
  "value에 합계가 100을 넘는 원시 가중치를 그대로 넣지 않는다 — 미리 0~100 스케일로 정규화한 값을 넘긴다.",
]
