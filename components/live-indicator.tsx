import * as React from "react"

import { cn } from "@/lib/utils"

export type LiveIndicatorStatus = "live" | "paused" | "stale" | "offline"

export interface LiveIndicatorProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** 현재 연결 상태. live=정상 수신, paused=일시정지, stale=지연, offline=끊김. */
  status: LiveIndicatorStatus
  /** 표시 라벨. 생략하면 status별 기본 라벨(LIVE/일시정지/지연/오프라인). */
  label?: string
  /** 마지막 갱신 시각. "HH:MM:SS 갱신" 고정 포맷으로 표시(로케일 비의존). */
  updatedAt?: Date | string
  /** 도트·글자 크기. 기본 default. */
  size?: "sm" | "default"
}

const DEFAULT_LABEL: Record<LiveIndicatorStatus, string> = {
  live: "LIVE",
  paused: "일시정지",
  stale: "지연",
  offline: "오프라인",
}

const DOT_CLASS: Record<LiveIndicatorStatus, string> = {
  live: "bg-success",
  paused: "bg-muted-foreground",
  stale: "bg-warning",
  offline: "bg-muted-foreground/60",
}

const TEXT_CLASS: Record<LiveIndicatorStatus, string> = {
  live: "text-success",
  paused: "text-muted-foreground",
  stale: "text-warning",
  offline: "text-muted-foreground",
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

function fmtUpdatedAt(value: Date | string): string {
  const d = typeof value === "string" ? new Date(value) : value
  if (Number.isNaN(d.getTime())) return ""
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())} 갱신`
}

/**
 * 실시간 상태 인디케이터(#50) — ews LiveSignalFeed.js의 LIVE 펄스 도트 + 갱신 시각
 * 표기부만 분리 이식. 폴링 로직은 옮기지 않고 status를 외부에서 주입받는 순수
 * 프레젠테이션 컴포넌트로 재구성했다. live 상태만 이중 원 펄스 애니메이션이 돈다
 * (CSS전용, 서버 컴포넌트로도 사용 가능). 색은 항상 시맨틱 토큰
 * (--success/--warning/--muted-foreground)만 사용한다.
 */
function LiveIndicator({
  status,
  label,
  updatedAt,
  size = "default",
  className,
  ...props
}: Readonly<LiveIndicatorProps>) {
  const text = label ?? DEFAULT_LABEL[status]
  const updatedText = updatedAt ? fmtUpdatedAt(updatedAt) : ""
  const dotSize = size === "sm" ? "size-1.5" : "size-2"
  const fontSize = size === "sm" ? "text-[11px]" : "text-xs"

  return (
    <span
      data-slot="live-indicator"
      data-status={status}
      className={cn("inline-flex items-center gap-1.5 font-medium", fontSize, TEXT_CLASS[status], className)}
      {...props}
    >
      <span className={cn("relative inline-flex", dotSize)}>
        {status === "live" && (
          <span
            className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", DOT_CLASS[status])}
          />
        )}
        <span className={cn("relative inline-flex rounded-full", dotSize, DOT_CLASS[status])} />
      </span>
      <span>
        {text}
        {updatedText ? ` · ${updatedText}` : ""}
      </span>
    </span>
  )
}

export { LiveIndicator }
