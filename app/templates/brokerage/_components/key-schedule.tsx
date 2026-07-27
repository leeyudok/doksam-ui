import { CalendarBlankIcon, ClockIcon } from "@phosphor-icons/react/dist/ssr"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { KEY_SCHEDULE, type ScheduleItem } from "@/app/templates/brokerage/_data/schedule"

const IMPORTANCE_LABEL: Record<ScheduleItem["importance"], string> = {
  high: "중요",
  medium: "보통",
  low: "참고",
}

const IMPORTANCE_VARIANT: Record<ScheduleItem["importance"], "destructive" | "secondary" | "outline"> = {
  high: "destructive",
  medium: "secondary",
  low: "outline",
}

function ScheduleRow({ item }: Readonly<{ item: ScheduleItem }>) {
  return (
    <li className="flex items-center gap-3 py-2">
      <div className="flex w-20 shrink-0 flex-col text-xs text-muted-foreground tabular-nums">
        <span className="flex items-center gap-1">
          <CalendarBlankIcon size={11} />
          {item.date}
        </span>
        <span className="flex items-center gap-1">
          <ClockIcon size={11} />
          {item.time}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <Badge variant="outline" className="text-[0.65rem]">
            {item.country}
          </Badge>
          <span className="truncate text-sm font-medium text-foreground">{item.title}</span>
        </div>
        {(item.consensus ?? item.previous) && (
          <span className="text-xs text-muted-foreground">
            {item.consensus && <>예상 {item.consensus}</>}
            {item.consensus && item.previous && " · "}
            {item.previous && <>이전 {item.previous}</>}
          </span>
        )}
      </div>

      <Badge variant={IMPORTANCE_VARIANT[item.importance]} className="shrink-0">
        {IMPORTANCE_LABEL[item.importance]}
      </Badge>
    </li>
  )
}

/** 주요 일정 카드(#41-A) — 경제지표 발표 등 다가오는 이벤트를 시간순으로 나열한다. */
export function KeySchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>주요 일정</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col divide-y divide-border">
          {KEY_SCHEDULE.map((item) => (
            <ScheduleRow key={item.id} item={item} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
