import { CurrencyKrwIcon, TrendUpIcon, UsersIcon } from "@phosphor-icons/react/dist/ssr"

import { SummaryCard } from "@/components/summary-card"

export const demo = (
  <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
    <SummaryCard label="총 평가금액" value={12_480_000} unit="원" icon={<CurrencyKrwIcon aria-hidden />} />
    <SummaryCard label="오늘 수익률" value="+2.4%" icon={<TrendUpIcon aria-hidden />} color="text-gain" />
    <SummaryCard label="가입자" value={1_204} unit="명" icon={<UsersIcon aria-hidden />} color="text-chart-2" />
  </div>
)

export const code = `<SummaryCard label="총 평가금액" value={12_480_000} unit="원" icon={<CurrencyKrwIcon />} />
<SummaryCard label="오늘 수익률" value="+2.4%" icon={<TrendUpIcon />} color="text-gain" />
<SummaryCard label="가입자" value={1204} unit="명" color="text-chart-2" />`

export const dos = [
  "대시보드 상단 KPI 그리드에 2~4장 나열한다 — 숫자는 자동 toLocaleString 포맷.",
  "color 는 시맨틱 토큰 클래스만(text-primary/text-gain/text-chart-*) — 값과 아이콘이 같은 색을 공유한다.",
  "포맷이 필요한 값(%·억 등)은 문자열로 미리 만들어 넘긴다.",
]

export const donts = [
  "카드 하나에 값 두 개를 욱여넣지 않는다 — 값이 여러 개면 category-card 나 stats 패턴으로.",
  "등락 의미 없는 값에 gain/loss 색을 쓰지 않는다.",
]
