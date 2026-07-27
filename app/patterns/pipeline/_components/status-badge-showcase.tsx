import { SpinnerGapIcon, CheckCircleIcon, XCircleIcon, StopIcon } from "@phosphor-icons/react/dist/ssr"
import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"

interface StatusItem {
  status: string
  className: string
  icon: ReactNode
}

const STATUSES: StatusItem[] = [
  {
    status: "Running",
    className: "border-chart-1/30 bg-chart-1/10 text-chart-1",
    icon: <SpinnerGapIcon size={12} className="mr-0.5 animate-spin" />,
  },
  {
    status: "Success",
    className: "border-success/30 bg-success/10 text-success",
    icon: <CheckCircleIcon size={12} className="mr-0.5" />,
  },
  {
    status: "Failed",
    className: "border-destructive/30 bg-destructive/10 text-destructive",
    icon: <XCircleIcon size={12} className="mr-0.5" />,
  },
  {
    status: "Stopped",
    className: "border-warning/30 bg-warning/10 text-warning",
    icon: <StopIcon size={12} className="mr-0.5" />,
  },
]

/** #34 실행 상태 배지 4종 — 시맨틱 토큰만으로 라이트/다크 대응 (srope StatusBadge 이식). */
export function StatusBadgeShowcase() {
  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((item) => (
        <Badge key={item.status} variant="outline" className={`text-[10px] ${item.className}`}>
          {item.icon}
          {item.status}
        </Badge>
      ))}
    </div>
  )
}
