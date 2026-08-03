"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

/** 모듈 그룹 — F=필터, S=매수 시그널, X=매도 시그널, R=회전·동적. */
export type ModuleGroup = "F" | "S" | "X" | "R"

export interface ModuleLabel {
  group: ModuleGroup
  /** 셀 내부에 표시할 짧은 이름(2~5자). */
  short: string
  description: string
}

interface BitGridProps {
  moduleIds: string[]
  activeBits: string[]
  labels: Record<string, ModuleLabel>
  size?: "sm" | "md" | "lg"
  /** 각 셀 내부에 짧은 이름 표시. */
  showLabels?: boolean
  /** 수직(1비트 1행, 읽기 쉬움) / 수평(여러 시나리오 비교용). */
  orientation?: "horizontal" | "vertical"
  className?: string
}

/**
 * 그룹별 색 토큰 — 팔레트색(blue/emerald/red/violet) 하드코딩 대신
 * F=chart-1, S=success, X=destructive, R=chart-4 시맨틱 매핑.
 */
const GROUP_ON: Record<ModuleGroup, string> = {
  F: "bg-chart-1",
  S: "bg-success",
  X: "bg-destructive",
  R: "bg-chart-4",
}
const GROUP_OFF: Record<ModuleGroup, string> = {
  F: "bg-chart-1/15 border-chart-1/30",
  S: "bg-success/15 border-success/30",
  X: "bg-destructive/15 border-destructive/30",
  R: "bg-chart-4/15 border-chart-4/30",
}
const GROUP_TEXT: Record<ModuleGroup, string> = {
  F: "text-chart-1",
  S: "text-success",
  X: "text-destructive",
  R: "text-chart-4",
}

const GROUP_ORDER: ModuleGroup[] = ["F", "S", "X", "R"]
const GROUP_NAMES: Record<ModuleGroup, string> = {
  F: "필터",
  S: "매수 시그널",
  X: "매도 시그널",
  R: "회전·동적",
}

/**
 * 모듈 비트 ON/OFF 격자 시각화 — 그룹 경계 간격 + 호버 시 ID/짧은이름/설명 툴팁.
 * dok3node customs/bit-grid.tsx 이식(수평/수직 두 방향 유지).
 */
export function BitGrid({
  moduleIds,
  activeBits,
  labels,
  size = "md",
  showLabels = false,
  orientation = "horizontal",
  className,
}: BitGridProps) {
  const cellW = size === "sm" ? 22 : size === "lg" ? 56 : 32
  const cellH = size === "sm" ? 22 : size === "lg" ? 36 : 28
  const activeSet = new Set(activeBits)

  if (orientation === "vertical") {
    const grouped: Record<ModuleGroup, string[]> = {
      F: [],
      S: [],
      X: [],
      R: [],
    }
    for (const id of moduleIds) {
      const g = labels[id]?.group
      if (g) grouped[g].push(id)
    }
    return (
      <TooltipProvider delayDuration={150}>
        <div className={cn("flex flex-col gap-3", className)}>
          {GROUP_ORDER.map((g) =>
            grouped[g].length === 0 ? null : (
              <div key={g} className="flex flex-col gap-1">
                <div
                  className={cn(
                    "text-[11px] font-bold tracking-wider uppercase",
                    GROUP_TEXT[g],
                  )}
                >
                  {g} · {GROUP_NAMES[g]} (
                  {grouped[g].filter((id) => activeSet.has(id)).length}/
                  {grouped[g].length} ON)
                </div>
                <div className="flex flex-col gap-0.5">
                  {grouped[g].map((id) => {
                    const lbl = labels[id]
                    const isOn = activeSet.has(id)
                    return (
                      <Tooltip key={id}>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "grid cursor-help grid-cols-[12px_minmax(0,160px)_minmax(0,1fr)] items-center gap-x-2 rounded border px-2 py-1.5 text-xs transition-colors",
                              isOn
                                ? "border-border bg-muted/40"
                                : "border-border/40 bg-transparent opacity-60",
                            )}
                          >
                            <span
                              className={cn(
                                "h-3 w-3 rounded-sm border",
                                isOn
                                  ? cn(GROUP_ON[g], "border-transparent")
                                  : "border-muted-foreground/30 bg-transparent",
                              )}
                            />
                            <div className="flex min-w-0 flex-col">
                              <span
                                className={cn(
                                  "truncate font-semibold",
                                  isOn
                                    ? "text-foreground"
                                    : "text-muted-foreground/70",
                                )}
                              >
                                {lbl?.short ?? id}
                              </span>
                              <span
                                className={cn(
                                  "truncate font-mono text-[9px]",
                                  isOn
                                    ? GROUP_TEXT[g]
                                    : "text-muted-foreground/60",
                                )}
                              >
                                {id}
                              </span>
                            </div>
                            <span
                              className={cn(
                                "hidden truncate text-[10px] text-muted-foreground md:inline",
                                !isOn && "opacity-60",
                              )}
                            >
                              {lbl?.description ?? ""}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-xs">
                          <div className="font-mono text-xs font-semibold">
                            {id}
                          </div>
                          <div className="text-xs">
                            {lbl?.short ?? "?"} —{" "}
                            {lbl?.description ?? "설명 없음"}
                          </div>
                          <div className="text-xs opacity-70">
                            그룹 {g} · {isOn ? "ON" : "OFF"}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              </div>
            ),
          )}
        </div>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider delayDuration={150}>
      <div className={cn("inline-flex flex-row", className)}>
        {moduleIds.map((id, i) => {
          const lbl = labels[id]
          const isOn = activeSet.has(id)
          const prevGroup = i > 0 ? labels[moduleIds[i - 1]]?.group : undefined
          const nextGroup =
            i < moduleIds.length - 1
              ? labels[moduleIds[i + 1]]?.group
              : undefined
          const isGroupStart = !prevGroup || (lbl && lbl.group !== prevGroup)
          const isGroupEnd = !nextGroup || (lbl && lbl.group !== nextGroup)
          const onColor = lbl ? GROUP_ON[lbl.group] : "bg-foreground"
          const offColor = lbl ? GROUP_OFF[lbl.group] : "bg-muted"
          return (
            <Tooltip key={`${id}-${i}`}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "flex cursor-help items-center justify-center border-y font-mono select-none",
                    "transition-transform hover:z-10 hover:scale-110",
                    isOn
                      ? cn(
                          onColor,
                          "border-y-transparent text-background shadow-sm",
                        )
                      : cn(offColor, "text-muted-foreground/60"),
                    isGroupStart && "ml-3 rounded-l border-l first:ml-0",
                    isGroupEnd && "rounded-r border-r",
                    size === "lg" ? "text-[10px]" : "text-[9px]",
                  )}
                  style={{ width: cellW, height: cellH }}
                  aria-label={`${id} ${isOn ? "ON" : "OFF"}`}
                >
                  {showLabels && lbl ? lbl.short : ""}
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <div className="font-mono text-xs font-semibold">{id}</div>
                <div className="text-xs">
                  {lbl?.short ?? "?"} — {lbl?.description ?? "설명 없음"}
                </div>
                <div className="text-xs opacity-70">
                  그룹 {lbl?.group ?? "?"} · {isOn ? "ON" : "OFF"}
                </div>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
