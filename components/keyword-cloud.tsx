"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** 키워드 클라우드 항목 — 클릭 시 펼쳐질 관련 항목. */
export interface KeywordCloudItem {
  /** 항목 제목. */
  title: string
  /** 항목 부가 정보(날짜·상태 등). */
  meta?: string
}

/** 키워드 클라우드 태그. */
export interface KeywordCloudKeyword {
  /** 태그에 표시할 라벨. */
  label: string
  /** 빈도수. tier 생략 시 이 값의 분위수로 티어를 자동 산정한다. */
  count: number
  /** 1(최상위)~3(하위) 강조 단계. 생략하면 count 분위수로 자동 계산한다. */
  tier?: 1 | 2 | 3
  /** 태그 클릭 시 펼쳐질 관련 항목 목록. */
  items?: KeywordCloudItem[]
}

export interface KeywordCloudProps extends Omit<React.ComponentProps<"div">, "children" | "onSelect"> {
  /** 표시할 키워드 목록. */
  keywords: KeywordCloudKeyword[]
  /** 태그 선택(토글)될 때 호출. 선택 해제 시 null. */
  onSelect?: (keyword: KeywordCloudKeyword | null) => void
}

const TIER_PILL: Record<1 | 2 | 3, string> = {
  1: "bg-primary/25 text-sm font-semibold",
  2: "bg-primary/16 text-[13px] font-medium",
  3: "bg-primary/10 text-xs font-normal",
}

/** count가 없거나 모두 같으면 중위 티어로 고정 — 빈도 위계를 3단계로 나눠 표현한다. */
function tierFor(count: number, minCount: number, maxCount: number): 1 | 2 | 3 {
  if (maxCount === minCount) return 2
  const ratio = (count - minCount) / (maxCount - minCount)
  if (ratio >= 0.66) return 1
  if (ratio >= 0.33) return 2
  return 3
}

/**
 * 티어 기반 키워드 태그 클라우드(ews RiskKeywordCloud 이식, #50) — 빈도를 3단계 티어로
 * 나눠 pill 크기·강조로 표현한다. 연속 스케일 대신 3단계 고정 티어를 쓰는 이유는 태그
 * 몇 개만 거대해지며 레이아웃이 무너지는 것을 막기 위함(원본 #42 참고). 태그를 클릭하면
 * 선택 상태로 하이라이트되고 하단에 관련 항목 리스트가 펼쳐진다. 구조 색은 시맨틱
 * 토큰(bg-primary 계열)만 사용한다.
 */
function KeywordCloud({ keywords, onSelect, className, ...props }: Readonly<KeywordCloudProps>) {
  const [selected, setSelected] = React.useState<string | null>(null)

  const counts = keywords.map((k) => k.count)
  const minCount = counts.length ? Math.min(...counts) : 0
  const maxCount = counts.length ? Math.max(...counts) : 0

  const active = selected ? keywords.find((k) => k.label === selected) ?? null : null

  const handleClick = (k: KeywordCloudKeyword) => {
    const next = selected === k.label ? null : k.label
    setSelected(next)
    onSelect?.(next ? k : null)
  }

  if (keywords.length === 0) {
    return (
      <div data-slot="keyword-cloud" className={cn("text-sm text-muted-foreground", className)} {...props}>
        표시할 키워드가 없습니다.
      </div>
    )
  }

  return (
    <div data-slot="keyword-cloud" className={cn("space-y-3", className)} {...props}>
      <div className="flex flex-wrap gap-2" role="list" aria-label="키워드 빈도">
        {keywords.map((k) => {
          const tier = k.tier ?? tierFor(k.count, minCount, maxCount)
          const isSelected = selected === k.label
          return (
            // listitem 롤은 aria-pressed 를 지원하지 않는다. 리스트 구조는 래퍼가 맡고
            // 토글 상태는 버튼의 네이티브 button 롤 위에서 표현해 둘 다 보조기술에 전달한다.
            <div key={k.label} role="listitem">
            <button
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleClick(k)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors",
                "text-foreground hover:bg-primary/30",
                TIER_PILL[tier],
                isSelected && "ring-2 ring-primary ring-offset-1 ring-offset-background",
              )}
            >
              <span>{k.label}</span>
              <span className="text-muted-foreground">{k.count}</span>
            </button>
            </div>
          )
        })}
      </div>

      {active ? (
        <div className="rounded-lg border bg-card p-3">
          <div className="mb-2 flex items-center gap-2 text-sm">
            <b className="text-foreground">{active.label}</b>
            <span className="text-muted-foreground">
              관련 항목 {active.items?.length ?? 0}건
            </span>
          </div>
          <ul className="space-y-1.5">
            {(active.items ?? []).map((item, i) => (
              <li key={`${item.title}-${i}`} className="flex items-center justify-between gap-2 text-sm">
                <span className="text-foreground">{item.title}</span>
                {item.meta && <span className="shrink-0 text-xs text-muted-foreground">{item.meta}</span>}
              </li>
            ))}
            {(!active.items || active.items.length === 0) && (
              <li className="text-sm text-muted-foreground">표시할 항목이 없습니다.</li>
            )}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">키워드를 클릭하면 관련 항목 목록을 볼 수 있습니다.</p>
      )}
    </div>
  )
}

export { KeywordCloud }
