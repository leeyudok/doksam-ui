import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ServiceStatus, StatusWidgetItem } from "../_data/dashboard-data"

const STATUS_DOT: Record<ServiceStatus, string> = {
  operational: "bg-success",
  degraded: "bg-warning",
  outage: "bg-destructive",
}

const STATUS_LABEL: Record<ServiceStatus, string> = {
  operational: "정상",
  degraded: "지연",
  outage: "장애",
}

const STATUS_TONE: Record<ServiceStatus, string> = {
  operational: "text-success",
  degraded: "text-warning",
  outage: "text-destructive",
}

/** 서비스별 상태 점 + 지연시간 + 가동률을 보여주는 상태 위젯. */
export function StatusWidget({ items }: Readonly<{ items: StatusWidgetItem[] }>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">서비스 상태</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col divide-y divide-border">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={cn("h-2 w-2 shrink-0 rounded-full", STATUS_DOT[item.status])}
                />
                <span className="text-sm text-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="tabular-nums">{item.uptime}</span>
                <span className={cn("w-10 text-right font-medium", STATUS_TONE[item.status])}>
                  {STATUS_LABEL[item.status]}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
