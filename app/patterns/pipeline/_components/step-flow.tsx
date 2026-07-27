import { CheckCircleIcon, SpinnerGapIcon, XCircleIcon, CircleIcon } from "@phosphor-icons/react/dist/ssr"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type StepStatus = "done" | "running" | "error" | "idle"

interface Step {
  order: number
  label: string
  status: StepStatus
}

const STEPS: Step[] = [
  { order: 1, label: "시세수집", status: "done" },
  { order: 2, label: "뉴스수집", status: "done" },
  { order: 3, label: "NLP분석", status: "running" },
  { order: 4, label: "리포트생성", status: "idle" },
  { order: 5, label: "PDF렌더", status: "idle" },
]

const PROGRESS = 40
const PROGRESS_LABEL = "Step 3/5: NLP분석"

function StepIcon({ status }: Readonly<{ status: StepStatus }>) {
  if (status === "done") return <CheckCircleIcon size={16} weight="fill" className="text-success" />
  if (status === "running") return <SpinnerGapIcon size={16} className="animate-spin text-chart-1" />
  if (status === "error") return <XCircleIcon size={16} weight="fill" className="text-destructive" />
  return <CircleIcon size={16} className="text-muted-foreground" />
}

/** #33 스텝 플로우 — 번호 + 상태 아이콘 + 진행률 (srope StepFlow 이식). */
export function StepFlow() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">조간 리포트 파이프라인</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-1">
          {STEPS.map((step, i) => (
            <div key={step.order} className="flex items-center gap-1">
              <div className="flex items-center gap-1.5 rounded-full border border-border px-2 py-1">
                <StepIcon status={step.status} />
                <span className="text-[11px] font-medium">{step.label}</span>
              </div>
              {i < STEPS.length - 1 && <span className="text-muted-foreground">→</span>}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <Progress value={PROGRESS} />
          <p className="text-[10px] text-muted-foreground">{PROGRESS_LABEL}</p>
        </div>
      </CardContent>
    </Card>
  )
}
