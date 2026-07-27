import {
  CheckCircleIcon,
  CircleIcon,
  SpinnerGapIcon,
  XCircleIcon,
} from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export type StepStatus = "done" | "running" | "error" | "idle";

export interface StepFlowStep {
  label: string;
  status: StepStatus;
}

export interface StepFlowModel {
  steps: StepFlowStep[];
  progress: number;
  progressLabel: string;
}

function StepIcon({ status }: Readonly<{ status: StepStatus }>) {
  if (status === "done")
    return <CheckCircleIcon size={16} weight="fill" className="text-success" />;
  if (status === "running")
    return <SpinnerGapIcon size={16} className="animate-spin text-primary" />;
  if (status === "error")
    return <XCircleIcon size={16} weight="fill" className="text-destructive" />;
  return <CircleIcon size={16} className="text-muted-foreground" />;
}

/**
 * 스텝 플로우 — 번호 노드 + 상태 아이콘 + 화살표 + 진행률 바.
 * bizinfo admin pipeline 의 step-flow 구조·UX만 참고해 순수 프레젠테이션
 * 컴포넌트로 재구성했다(데이터는 상위에서 props 주입, 색은 시맨틱 토큰만).
 * 화살표는 wrap 되므로 모바일에서 세로로 흐른다.
 */
export function StepFlow({ steps, progress, progressLabel }: Readonly<StepFlowModel>) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-1">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1">
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors",
                step.status === "running" && "border-primary/40 bg-primary/5",
                step.status === "done" && "border-success/40 bg-success/5",
                step.status === "error" && "border-destructive/40 bg-destructive/5",
              )}
            >
              <StepIcon status={step.status} />
              <span className="text-xs font-medium">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <span aria-hidden className="text-muted-foreground">
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Progress value={progress} className="flex-1" />
          <span className="w-10 shrink-0 text-right font-mono text-xs font-semibold tabular-nums">
            {progress}%
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{progressLabel}</p>
      </div>
    </div>
  );
}
