"use client"

import * as React from "react"
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

/** 스텝의 서브탭 — 2단 레일에서 표시되는 세부 모듈. */
export interface PipelineSubTab {
  /** 고유 키(선택 콜백에 그대로 전달). */
  key: string
  /** 표시 라벨. */
  label: string
}

/** 파이프라인의 한 스텝. */
export interface PipelineStage {
  /** 고유 키(선택 콜백에 그대로 전달). */
  key: string
  /** 표시 라벨. */
  label: string
  /** 라벨 아래 보조 설명(선택). */
  sub?: string
  /** 선택 시 2단 레일에 노출할 서브탭들(선택). */
  subTabs?: PipelineSubTab[]
  /** 이번 스코프에서 제외된 단계 — 점선 노드로 비활성 표시, 클릭 불가. */
  excluded?: boolean
}

export interface PipelineRailProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** 렌더링할 전체 스텝 목록(진행 순서대로). */
  stages: PipelineStage[]
  /** 현재 선택된 스텝의 key. */
  activeStage: string
  /** 현재 선택된 서브탭의 key(있는 경우). */
  activeTab?: string
  /** 스텝 노드 클릭 시 호출. excluded 스텝에서는 호출되지 않는다. */
  onStageChange: (key: string) => void
  /** 서브탭 클릭 시 호출. */
  onTabChange?: (key: string) => void
}

/**
 * 원형 번호 노드 + 화살표로 이어지는 1단 프로세스 레일과, 선택된 스텝의
 * 서브탭을 보여주는 2단 레일. 출처: ai-sdlc PipelineRail(#50) — 원본은
 * useDashboard 컨텍스트에 결합되어 있었으나 이 버전은 순수 props 기반이며
 * lucide 아이콘을 Phosphor로, 하드코딩 색을 시맨틱 토큰으로 교체했다.
 * excluded 스텝은 점선 테두리 + "제외" 배지로 표시되고 클릭이 막힌다.
 */
function PipelineRail({
  stages,
  activeStage,
  activeTab,
  onStageChange,
  onTabChange,
  className,
  ...props
}: Readonly<PipelineRailProps>) {
  const currentStage = stages.find((s) => s.key === activeStage)
  const currentTabs = currentStage?.subTabs ?? []

  return (
    <div data-slot="pipeline-rail" className={cn("flex flex-col border-b bg-card/60", className)} {...props}>
      {/* 1단: 스텝 레일 */}
      <div className="flex w-full items-center gap-1 overflow-x-auto px-4 py-2.5">
        {stages.map((stage, i, arr) => {
          const active = stage.key === activeStage
          const excluded = stage.excluded === true

          return (
            <div key={stage.key} className="flex shrink-0 items-center">
              <button
                type="button"
                onClick={() => !excluded && onStageChange(stage.key)}
                disabled={excluded}
                aria-disabled={excluded}
                aria-current={active ? "step" : undefined}
                title={excluded ? `${stage.label} · 이번 범위에서 제외` : stage.label}
                className={cn(
                  "group flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors",
                  active ? "bg-muted" : excluded ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-muted",
                )}
              >
                <span
                  className={cn(
                    "grid size-7 place-items-center rounded-full text-[10px] font-extrabold tabular-nums transition-all",
                    active
                      ? "bg-primary text-primary-foreground"
                      : excluded
                        ? "border border-dashed border-border bg-muted text-muted-foreground"
                        : "border border-border bg-muted text-muted-foreground group-hover:border-primary/40 group-hover:text-foreground",
                  )}
                >
                  {i + 1}
                </span>

                <span className="text-left leading-tight">
                  <span
                    className={cn(
                      "flex items-center gap-1 text-xs font-bold",
                      active ? "text-primary" : excluded ? "text-muted-foreground" : "text-foreground group-hover:text-primary",
                    )}
                  >
                    {stage.label}
                    {excluded && (
                      <span className="ml-1 rounded-full border border-border px-1 py-px text-[8px] font-semibold text-muted-foreground">
                        제외
                      </span>
                    )}
                  </span>
                  {stage.sub && <span className="block text-[9px] font-medium text-muted-foreground">{stage.sub}</span>}
                </span>
              </button>

              {i < arr.length - 1 && (
                <div className="relative mx-0.5 h-px w-6 shrink-0 bg-border sm:w-10">
                  <CaretRightIcon className="absolute -right-1 top-1/2 size-2.5 -translate-y-1/2 text-muted-foreground" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 2단: 선택된 스텝의 서브탭 */}
      {currentTabs.length > 0 && (
        <div className="flex items-center justify-center border-t bg-muted/40 px-4 py-2">
          <nav className="flex w-full max-w-full justify-center gap-2 overflow-x-auto">
            {currentTabs.map((tab) => {
              const active = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onTabChange?.(tab.key)}
                  className={cn(
                    "cursor-pointer whitespace-nowrap rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-all",
                    active
                      ? "border-primary/25 bg-card font-bold text-primary shadow-sm"
                      : "border-transparent text-muted-foreground hover:bg-card hover:text-foreground",
                  )}
                >
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      )}
    </div>
  )
}

export { PipelineRail }
