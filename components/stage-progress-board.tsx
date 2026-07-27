import * as React from "react"
import { CheckCircleIcon, CircleIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

/** 단계 내 개별 작업 항목. */
export interface StageTask {
  /** 작업 이름. */
  label: string
  /** 완료 여부. */
  done: boolean
}

/** 진행 보드에 표시할 단계 하나. */
export interface Stage {
  /** 고유 식별자(React key). */
  key: string
  /** 표시 이름. */
  label: string
  /** 단계 상태. */
  status: "done" | "active" | "pending"
  /** 0~100 진행률. */
  progress: number
  /** 단계 내 작업 체크리스트. */
  tasks: StageTask[]
}

export interface StageProgressBoardProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** 그리드로 표시할 단계 목록. */
  stages: Stage[]
}

const STATUS_META: Record<Stage["status"], { label: string; className: string }> = {
  done: { label: "완료", className: "bg-success/10 text-success" },
  active: { label: "진행중", className: "bg-primary/10 text-primary" },
  pending: { label: "대기", className: "bg-muted text-muted-foreground" },
}

/**
 * 단계별 진행률 카드 그리드(ai-sdlc StageProgressBoard, #50 이식).
 * 각 카드는 상태 배지·퍼센트 바·작업 체크리스트로 구성된다. 상태·진행률·
 * 작업은 상위에서 데이터로 주입하는 순수 프레젠테이션 컴포넌트다.
 */
function StageProgressBoard({ stages, className, ...props }: Readonly<StageProgressBoardProps>) {
  return (
    <div
      data-slot="stage-progress-board"
      className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}
      {...props}
    >
      {stages.map((stage) => {
        const meta = STATUS_META[stage.status]
        return (
          <Card key={stage.key} data-slot="stage-progress-card">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{stage.label}</CardTitle>
                <Badge className={meta.className}>{meta.label}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Progress value={stage.progress} className="flex-1" />
                <span className="w-9 shrink-0 text-right font-mono text-xs font-semibold tabular-nums text-foreground">
                  {stage.progress}%
                </span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {stage.tasks.map((task) => (
                  <li key={task.label} className="flex items-center gap-1.5 text-xs leading-tight">
                    {task.done ? (
                      <CheckCircleIcon weight="fill" className="size-3.5 shrink-0 text-success" />
                    ) : (
                      <CircleIcon className="size-3.5 shrink-0 text-muted-foreground/60" />
                    )}
                    <span className={task.done ? "text-foreground" : "text-muted-foreground"}>
                      {task.label}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export { StageProgressBoard }
