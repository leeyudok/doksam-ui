"use client"

import * as React from "react"
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { rateText } from "@/lib/finance/rate"
import { cn } from "@/lib/utils"

import { ACTIVE_BITS, MODULE_IDS, MODULE_LABELS, type OptimRecommendation } from "../_data/portfolio-data"
import { BitGrid } from "./bit-grid"

function formatPrice(n: number): string {
  return `${n.toLocaleString("ko-KR")}원`
}

function HitBadge({ hit }: Readonly<{ hit: number | null }>) {
  if (hit == null) return <Badge variant="outline">집계전</Badge>
  if (hit === 1) return <Badge className="bg-success text-primary-foreground">적중</Badge>
  return <Badge variant="destructive">미적중</Badge>
}

function ReturnLine({ label, ret, hit }: Readonly<{ label: string; ret: number | null; hit: number | null }>) {
  const color = ret == null ? "text-muted-foreground" : ret >= 0 ? "text-success" : "text-destructive"
  return (
    <div className="flex items-center justify-between gap-2 text-xs">
      <span className="w-10 shrink-0 text-muted-foreground">{label}</span>
      <span className={cn("flex-1 font-mono tabular-nums", color)}>{ret == null ? "-" : `${rateText(ret)}%`}</span>
      <HitBadge hit={hit} />
    </div>
  )
}

function PriceRow({ label, value, color }: Readonly<{ label: string; value: string; color: string }>) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="w-14 shrink-0 text-muted-foreground">{label}</span>
      <span className={cn("font-mono tabular-nums", color)}>{value}</span>
    </div>
  )
}

/**
 * 옵티마이저 추천 종목 카드 — 5가지 가격(매수범위/익절/손절/트레일링/안전망) +
 * 추적 결과(D+1/3/5 적중 배지) + "왜 추천됐는가" 활성 비트 펼침.
 * dok3node customs/optim-recommendation-card.tsx 이식 — emerald/red/orange 하드코딩을
 * success/destructive/warning 토큰으로 치환.
 */
export function OptimRecommendationCard({ rec }: Readonly<{ rec: OptimRecommendation }>) {
  const [openBits, setOpenBits] = React.useState(false)

  return (
    <Card className="flex flex-col gap-2 overflow-hidden border-chart-1/30 p-3">
      {/* 헤더 — 종목명/코드/전일종가 + 확신도 */}
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex flex-col">
          <div className="text-base leading-tight font-bold">{rec.stockName}</div>
          <div className="font-mono text-xs text-muted-foreground">
            {rec.stockCode} · 전일 {formatPrice(rec.prevClose)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">확신도</div>
          <div className="text-lg font-bold tabular-nums">{rec.conviction}%</div>
        </div>
      </div>

      <Progress value={rec.conviction} className="h-1.5" />

      <div className="text-xs text-muted-foreground">
        비중 {Math.round(rec.positionRatio * 100)}% · {rec.reason}
      </div>

      {/* 5가지 가격 무조건 표시 */}
      <div className="grid grid-cols-1 gap-1 border-y border-border/50 py-2 text-xs">
        <PriceRow label="매수가" value={`${formatPrice(rec.entryRange[0])} ~ ${formatPrice(rec.entryRange[1])}`} color="text-foreground" />
        <PriceRow
          label="익절가"
          value={`${formatPrice(rec.partialSellPrice)} (보유의 ${Math.round(rec.partialSellRatio * 100)}% 매도)`}
          color="text-success"
        />
        <PriceRow label="손절가" value={`${formatPrice(rec.stopLossPrice)} (즉시 100%)`} color="text-destructive" />
        <PriceRow label="트레일링" value={`최고가 대비 ${rec.trailingStopPct}% 이탈 시 잔여 매도`} color="text-warning" />
        <PriceRow label="안전망" value={`시그널 미발동 시 ${rec.maxHoldingDays}영업일 후 종가 매도`} color="text-muted-foreground" />
      </div>

      {/* 추적 결과 */}
      <div className="flex flex-col gap-0.5 border-b border-border/50 pb-2">
        <div className="mb-0.5 text-xs font-semibold">추적 결과</div>
        <ReturnLine label="D+1" ret={rec.tracking.return1d} hit={rec.tracking.hit1d} />
        <ReturnLine label="D+3" ret={rec.tracking.return3d} hit={rec.tracking.hit3d} />
        <ReturnLine label="D+5" ret={rec.tracking.return5d} hit={rec.tracking.hit5d} />
      </div>

      {/* "왜 추천됐는가" 펼침 */}
      <Button variant="ghost" size="sm" onClick={() => setOpenBits((v) => !v)} className="w-full justify-between">
        <span className="text-xs">왜 추천됐는가? ({ACTIVE_BITS.length}개 비트)</span>
        {openBits ? <CaretUpIcon aria-hidden /> : <CaretDownIcon aria-hidden />}
      </Button>

      {openBits ? (
        <BitGrid moduleIds={MODULE_IDS} activeBits={ACTIVE_BITS} labels={MODULE_LABELS} orientation="vertical" />
      ) : null}
    </Card>
  )
}
