import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr"

import { Card, CardContent } from "@/components/ui/card"

interface StepResult {
  order: number
  label: string
  count: number
  elapsed: number
}

const RESULTS: StepResult[] = [
  { order: 1, label: "시세수집", count: 1282, elapsed: 2.3 },
  { order: 2, label: "뉴스수집", count: 156, elapsed: 5.7 },
  { order: 3, label: "NLP분석", count: 156, elapsed: 12.1 },
  { order: 4, label: "시그널생성", count: 62, elapsed: 1.8 },
  { order: 5, label: "리포트생성", count: 1, elapsed: 3.4 },
]

const TOTAL_ELAPSED = RESULTS.reduce((sum, item) => sum + item.elapsed, 0)

/** #38 스텝 결과 리스트 — 순번 + 건수 + 소요시간 + 자동 합산 (srope StepResultList 이식). */
export function StepResultList() {
  return (
    <Card>
      <CardContent className="space-y-2 p-3">
        {RESULTS.map((item) => (
          <div key={item.order} className="flex items-center gap-2 text-xs">
            <span className="w-4 text-[10px] text-muted-foreground tabular-nums">{item.order}</span>
            <CheckCircleIcon size={14} weight="fill" className="text-success" />
            <span className="flex-1 font-medium">{item.label}</span>
            <span className="text-muted-foreground tabular-nums">{item.count.toLocaleString()}건</span>
            <span className="w-14 text-right text-muted-foreground tabular-nums">{item.elapsed.toFixed(1)}s</span>
          </div>
        ))}
        <div className="flex items-center justify-end gap-2 border-t border-border pt-2 text-xs font-semibold">
          <span>총 소요시간</span>
          <span className="tabular-nums">{TOTAL_ELAPSED.toFixed(1)}s</span>
        </div>
      </CardContent>
    </Card>
  )
}
