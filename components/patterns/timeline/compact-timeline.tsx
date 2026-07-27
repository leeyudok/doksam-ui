import type { Icon } from "@phosphor-icons/react"
import { CheckCircleIcon, CircleIcon, WarningCircleIcon, XCircleIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

type StepStatus = "success" | "warning" | "destructive" | "muted"

interface CompactStep {
  time: string
  status: StepStatus
  icon: Icon
  title: string
}

const STEPS: CompactStep[] = [
  { time: "09:00", status: "success", icon: CheckCircleIcon, title: "주문 접수" },
  { time: "09:12", status: "success", icon: CheckCircleIcon, title: "결제 확인" },
  { time: "10:40", status: "warning", icon: WarningCircleIcon, title: "재고 확인 지연" },
  { time: "13:05", status: "destructive", icon: XCircleIcon, title: "배송 실패 — 주소 오류" },
  { time: "—", status: "muted", icon: CircleIcon, title: "재배송 대기" },
]

const DOT_CLASS: Record<StepStatus, string> = {
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  muted: "bg-muted-foreground/40",
}

/**
 * #2 컴팩트 타임라인 — 날짜 그룹 없이 단일 프로세스(주문 처리 단계 등)의 진행 이력을
 * 좁은 폭(사이드 패널·카드 내부)에 담을 때 쓰는 축약 변형이다.
 */
export function CompactTimeline() {
  return (
    <ol className="flex max-w-sm flex-col">
      {STEPS.map((step, i) => {
        const Icon = step.icon
        return (
          <li key={step.title} className="relative flex gap-2.5 pb-4 last:pb-0">
            {i < STEPS.length - 1 && <span aria-hidden className="absolute top-4 bottom-0 left-[5px] w-px bg-border" />}
            <span className={cn("relative z-10 mt-1 flex size-2.5 shrink-0 items-center justify-center rounded-full", DOT_CLASS[step.status])} />
            <div className="flex min-w-0 flex-1 items-baseline justify-between gap-2">
              <span className="flex items-center gap-1 text-sm">
                <Icon size={13} className="shrink-0 text-muted-foreground" />
                {step.title}
              </span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{step.time}</span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
