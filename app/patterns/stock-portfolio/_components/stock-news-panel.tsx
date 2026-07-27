import { ArrowSquareOutIcon, NewspaperIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

import type { StockNewsItem } from "../_data/portfolio-data"

/** 감성 라벨 → 배지 — positive=success 톤, negative=destructive 톤, neutral=기본 outline. */
function SentimentBadge({ label }: Readonly<{ label: StockNewsItem["sentiment"] }>) {
  if (label === "positive")
    return (
      <Badge variant="outline" className="border-success/50 text-[10px] text-success">
        긍정
      </Badge>
    )
  if (label === "negative")
    return (
      <Badge variant="outline" className="border-destructive/50 text-[10px] text-destructive">
        부정
      </Badge>
    )
  return (
    <Badge variant="outline" className="text-[10px]">
      중립
    </Badge>
  )
}

/**
 * 종목 뉴스 패널 — 추천/추적 화면에서 종목 펼침 시 노출되는 뉴스 리스트.
 * dok3node customs/stock-news-panel.tsx 이식 — API 호출/로딩 상태를 걷어내고
 * items 를 props 로 받는 프레젠테이션 컴포넌트로 단순화(로딩·빈 상태는 state 패턴 참조).
 */
export function StockNewsPanel({
  items,
  periodLabel = "수집한 누적 전체",
}: Readonly<{ items: StockNewsItem[]; periodLabel?: string }>) {
  if (items.length === 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
        <NewspaperIcon aria-hidden />
        수집된 뉴스 없음
      </div>
    )
  }

  return (
    <div className="space-y-1.5 px-3 py-2">
      <div className="flex items-center gap-1.5 text-xs font-medium">
        <NewspaperIcon aria-hidden />
        뉴스 {items.length}건
        <span className="text-[10px] text-muted-foreground">({periodLabel})</span>
      </div>
      <ScrollArea className="max-h-[280px]">
        <ul className="space-y-1 pr-2">
          {items.map((n) => (
            <li key={n.id} className="flex items-start gap-2 rounded-md border bg-background px-2 py-1.5 text-xs">
              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span className="tabular-nums">{n.tradeDate}</span>
                  <span>·</span>
                  <span>{n.source}</span>
                  <SentimentBadge label={n.sentiment} />
                </div>
                <div className="line-clamp-2 leading-tight font-medium">{n.title}</div>
                {n.oneLiner ? <div className="line-clamp-2 text-[11px] text-muted-foreground">{n.oneLiner}</div> : null}
              </div>
              {n.hasUrl ? (
                <a href="#news" className="shrink-0 text-muted-foreground hover:text-foreground" aria-label="원문 열기">
                  <ArrowSquareOutIcon aria-hidden />
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
