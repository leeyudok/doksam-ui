"use client"

import * as React from "react"
import { Star, StarHalf } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

/** 채워진 별에 적용 가능한 시맨틱 톤 토큰. */
export type RatingTone = "default" | "warning" | "destructive" | "muted"

/** 톤 토큰 → Tailwind 클래스. 동적 `text-${tone}` 대신 정적 매핑으로 클래스 인젝션을 방지한다. */
const TONE_CLASSNAMES: Record<RatingTone, string> = {
  default: "text-warning",
  warning: "text-warning",
  destructive: "text-destructive",
  muted: "text-muted-foreground",
}

function toneClassName(tone: string | undefined): string {
  return TONE_CLASSNAMES[tone as RatingTone] ?? TONE_CLASSNAMES.default
}

/**
 * severity 내장 매핑: value ≤ 1 → destructive, value == 2 → warning,
 * value == 3 → muted, value ≥ 4 → default(기존 골드).
 * 경계값(0.5 단위)은 반올림 기준으로 판정한다(예: 1.5 → round(1.5)=2 → warning,
 * 2.5 → round(2.5)=3 → muted).
 */
function severityTone(value: number): RatingTone {
  const rounded = Math.round(value)
  if (rounded <= 1) return "destructive"
  if (rounded === 2) return "warning"
  if (rounded === 3) return "muted"
  return "default"
}

export interface RatingProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** 현재 평점 값 (0.5 단위). */
  value: number
  /** 별 개수. 기본 5. */
  max?: number
  /** true면 클릭/hover 프리뷰가 비활성화되는 표시 전용 모드. */
  readOnly?: boolean
  /** 숫자 값을 별 옆에 함께 표시할지 여부. */
  showValue?: boolean
  /** 별 아이콘 크기(px). */
  size?: number
  /**
   * true면 내장 매핑으로 value에 따라 채워진 별 톤을 자동 결정한다:
   * value ≤ 1 → destructive, value == 2 → warning, value == 3 → muted,
   * value ≥ 4 → default(기존 골드). `toneByValue`가 주어지면 이 옵션보다 우선한다.
   */
  severity?: boolean
  /**
   * value → 톤 토큰명("default" | "warning" | "destructive" | "muted")을 반환하는
   * 커스텀 매핑 함수. 주어지면 `severity`보다 우선한다.
   */
  toneByValue?: (value: number) => string
  onChange?: (value: number) => void
}

function valueFromPointer(event: React.PointerEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>, index: number) {
  const { left, width } = event.currentTarget.getBoundingClientRect()
  const isHalf = event.clientX - left < width / 2
  return index + (isHalf ? 0.5 : 1)
}

/**
 * 별점 표시/선택 컴포넌트(#36) — hover 프리뷰, 반개(half star) 지원, readOnly 표시 모드.
 * 색은 시맨틱 토큰(default=--warning, warning=--warning, destructive=--destructive,
 * muted=--muted-foreground)만 사용한다. `toneByValue`가 있으면 그것이 최우선, 없고
 * `severity`면 내장 매핑, 둘 다 없으면 기존 --warning 단일톤(#38).
 */
function Rating({
  value,
  max = 5,
  readOnly = false,
  showValue = false,
  size = 20,
  severity = false,
  toneByValue,
  onChange,
  className,
  ...props
}: Readonly<RatingProps>) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)
  const displayValue = hoverValue ?? value
  const tone = toneByValue ? toneByValue(displayValue) : severity ? severityTone(displayValue) : "default"
  const filledClassName = toneClassName(tone)

  return (
    <div
      data-slot="rating"
      aria-label={readOnly ? `평점 ${value} / ${max}` : "평점 선택"}
      className={cn("inline-flex items-center gap-1", className)}
      onPointerLeave={() => setHoverValue(null)}
      {...props}
    >
      {Array.from({ length: max }, (_, index) => {
        const starValue = index + 1
        const filled = displayValue >= starValue
        const halfFilled = !filled && displayValue >= starValue - 0.5
        const star =
          halfFilled ? (
            <StarHalf size={size} weight="fill" className={filledClassName} />
          ) : (
            <Star size={size} weight={filled ? "fill" : "regular"} className={filled ? filledClassName : undefined} />
          )

        if (readOnly) {
          return (
            <span key={starValue} data-slot="rating-star" className="inline-flex text-muted-foreground">
              {star}
            </span>
          )
        }

        return (
          <button
            key={starValue}
            type="button"
            aria-label={`${starValue}점`}
            data-slot="rating-star"
            className="inline-flex cursor-pointer text-muted-foreground"
            onPointerMove={(event) => setHoverValue(valueFromPointer(event, index))}
            onClick={(event) => onChange?.(valueFromPointer(event, index))}
          >
            {star}
          </button>
        )
      })}
      {showValue && (
        <span data-slot="rating-value" className="ml-1 text-sm text-muted-foreground">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export { Rating }
