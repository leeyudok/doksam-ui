import * as React from "react"

import { cn } from "@/lib/utils"

export interface CircularProgressProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** 0~100 사이의 진행률. 범위를 벗어나면 clamp된다. */
  value: number
  /** 전체 지름(px). 기본 64. */
  size?: number
  /** 링 두께(px). 기본 6. */
  strokeWidth?: number
  /** 중앙 라벨 표시 여부. 기본 true. */
  showLabel?: boolean
  /** 중앙 라벨 커스텀 콘텐츠. 생략하면 "N%"를 보여준다. */
  label?: React.ReactNode
}

/**
 * 순수 SVG 원형 진행률 링(#36) — 외부 차트 라이브러리 없이 stroke-dasharray로
 * 그린다. 트랙은 --muted, 진행 구간은 --primary 시맨틱 토큰만 사용한다.
 */
function CircularProgress({
  value,
  size = 64,
  strokeWidth = 6,
  showLabel = true,
  label,
  className,
  ...props
}: Readonly<CircularProgressProps>) {
  const clamped = Math.min(100, Math.max(0, value))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - clamped / 100)

  return (
    <div
      data-slot="circular-progress"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-muted" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-primary transition-[stroke-dashoffset] duration-300 ease-out"
        />
      </svg>
      {showLabel && (
        <span data-slot="circular-progress-label" className="absolute text-sm font-medium text-foreground">
          {label ?? `${Math.round(clamped)}%`}
        </span>
      )}
    </div>
  )
}

export { CircularProgress }
