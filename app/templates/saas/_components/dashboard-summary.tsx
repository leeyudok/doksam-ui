import { Card, CardContent } from "@/components/ui/card"
import { DASHBOARD_SUMMARY } from "@/app/templates/saas/_lib/data"

/** SummaryCard 레시피(components/patterns/cards-samples.tsx) 조합 — 대시보드 상단 핵심 지표. */
export function DashboardSummary() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {DASHBOARD_SUMMARY.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label}>
            <CardContent className="flex flex-col gap-1.5 px-4 py-3.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                <Icon size={16} weight="duotone" className={stat.tone} />
              </div>
              <p>
                <span className="text-xl font-bold tabular-nums text-foreground">{stat.value}</span>
                <span className="ml-1 text-xs text-muted-foreground">{stat.unit}</span>
              </p>
              <p className={`text-[11px] font-medium ${stat.tone}`}>{stat.delta}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
