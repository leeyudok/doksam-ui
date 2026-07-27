import { Card, CardContent } from "@/components/ui/card"

import { KPIS } from "../_data/company"

/**
 * KPI 요약 카드 그리드(#53) — 임직원·설립·매출 등 핵심 지표 6개를 아이콘 타일로
 * 보여준다. 모바일 1열 → 태블릿 2열 → 데스크톱 3열로 리플로우한다. 값은 전부 가상.
 */
export function KpiGrid() {
  return (
    <section aria-label="핵심 지표 요약" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {KPIS.map((kpi) => {
        const Icon = kpi.icon
        return (
          <Card key={kpi.key} size="sm">
            <CardContent className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="truncate text-lg font-semibold tracking-tight">{kpi.value}</p>
                <p className="truncate text-xs text-muted-foreground">{kpi.hint}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}
