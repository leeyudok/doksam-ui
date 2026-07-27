"use client"

import { RobotIcon, ChatCircleTextIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { rateColor, rateText } from "@/lib/finance/rate"
import { cn } from "@/lib/utils"
import {
  buildStockDetail,
  type Candle,
  type CommunityPost,
  type StockDetailInput,
} from "@/app/templates/brokerage/_data/detail"

const CHART_WIDTH = 560
const CHART_HEIGHT = 200
const CHART_PAD_X = 8
const CHART_PAD_TOP = 12
const CHART_PAD_BOTTOM = 36
const VOLUME_HEIGHT = 28

/** 일봉 캔들스틱 차트 — 외부 차트 라이브러리 없이 순수 SVG로 시가/고가/저가/종가 + 거래량을 그린다. */
function CandlestickChart({ candles }: Readonly<{ candles: Candle[] }>) {
  if (candles.length === 0) return null

  const drawTop = CHART_PAD_TOP
  const drawBottom = CHART_HEIGHT - CHART_PAD_BOTTOM
  const drawH = drawBottom - drawTop
  const volumeTop = drawBottom + 8
  const volumeBottom = volumeTop + VOLUME_HEIGHT

  const high = Math.max(...candles.map((c) => c.high))
  const low = Math.min(...candles.map((c) => c.low))
  const range = high - low || 1
  const pad = range * 0.08
  const yMin = low - pad
  const yMax = high + pad

  const maxVolume = Math.max(...candles.map((c) => c.volume)) || 1

  const innerWidth = CHART_WIDTH - CHART_PAD_X * 2
  const step = innerWidth / candles.length
  const bodyWidth = Math.max(step * 0.6, 2)

  const toY = (v: number) => drawTop + drawH - ((v - yMin) / (yMax - yMin)) * drawH
  const toX = (i: number) => CHART_PAD_X + step * i + step / 2

  const firstCandle = candles[0]
  const lastCandle = candles[candles.length - 1]
  const xAxisLabels = [firstCandle, candles[Math.floor(candles.length / 2)], lastCandle]

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="h-auto w-full"
      role="img"
      aria-label="일봉 캔들스틱 차트"
    >
      {[0.25, 0.5, 0.75].map((ratio) => (
        <line
          key={ratio}
          x1={CHART_PAD_X}
          x2={CHART_WIDTH - CHART_PAD_X}
          y1={drawTop + drawH * ratio}
          y2={drawTop + drawH * ratio}
          stroke="var(--border)"
          strokeWidth={1}
          strokeDasharray="2,3"
        />
      ))}

      {candles.map((candle, index) => {
        const isUp = candle.close >= candle.open
        const x = toX(index)
        const bodyTop = toY(Math.max(candle.open, candle.close))
        const bodyBottom = toY(Math.min(candle.open, candle.close))
        const bodyHeight = Math.max(bodyBottom - bodyTop, 1)
        const volH = (candle.volume / maxVolume) * VOLUME_HEIGHT

        return (
          <g key={candle.date} className={isUp ? "text-gain" : "text-loss"}>
            <line x1={x} x2={x} y1={toY(candle.high)} y2={toY(candle.low)} stroke="currentColor" strokeWidth={1} />
            <rect x={x - bodyWidth / 2} y={bodyTop} width={bodyWidth} height={bodyHeight} fill="currentColor" />
            <rect
              x={x - bodyWidth / 2}
              y={volumeBottom - volH}
              width={bodyWidth}
              height={volH}
              fill="currentColor"
              opacity={0.35}
            />
          </g>
        )
      })}

      <line x1={CHART_PAD_X} x2={CHART_WIDTH - CHART_PAD_X} y1={volumeBottom} y2={volumeBottom} stroke="var(--border)" strokeWidth={1} />

      {xAxisLabels.map((candle, i) => (
        <text
          key={`${candle.date}-${i}`}
          x={i === 0 ? CHART_PAD_X : i === xAxisLabels.length - 1 ? CHART_WIDTH - CHART_PAD_X : CHART_WIDTH / 2}
          y={CHART_HEIGHT - 4}
          fontSize={9}
          fill="var(--muted-foreground)"
          textAnchor={i === 0 ? "start" : i === xAxisLabels.length - 1 ? "end" : "middle"}
        >
          {candle.date.slice(5)}
        </text>
      ))}
    </svg>
  )
}

function CommunityFeed({ posts }: Readonly<{ posts: CommunityPost[] }>) {
  return (
    <ul className="flex flex-col divide-y divide-border">
      {posts.map((post) => (
        <li key={post.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
          <Avatar size="sm">
            <AvatarFallback aria-hidden>{post.nickname.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-sm font-medium text-foreground">{post.nickname}</span>
              <Badge variant="outline" className="text-[10px]">
                {post.assetBadge}
              </Badge>
              <span className="text-xs text-muted-foreground">{post.postedAt}</span>
            </div>
            <p className="text-sm text-foreground/90">{post.content}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <HeartIcon size={12} />
              <span>{post.likeCount}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

interface StockDetailProps {
  /** 부모(스크리너)가 선택한 종목. 생략하면 기본 종목(누리전자)을 보여준다. */
  stock?: StockDetailInput
}

/** 종목 상세 패널(C영역) — 시세 헤더 + 캔들스틱 차트 + AI 분석 카드 + 커뮤니티 피드. */
export function StockDetail({ stock: selected }: Readonly<StockDetailProps>) {
  const stock = buildStockDetail(selected)

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="gap-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <CardTitle className="text-xl">{stock.name}</CardTitle>
              <span className="text-xs text-muted-foreground">
                {stock.symbol} · {stock.market}
              </span>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold tabular-nums text-foreground">{stock.currentPrice.toLocaleString()}원</span>
            <span className={cn("text-sm font-semibold tabular-nums", rateColor(stock.changePercent))}>
              {rateText(stock.changeAmount, 0)}원 ({rateText(stock.changePercent)}%)
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <CandlestickChart candles={stock.candles} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 text-sm">
            <RobotIcon size={16} className="text-primary" weight="duotone" />
            왜 올랐을까?
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p className="text-sm leading-relaxed text-foreground/90">{stock.aiAnalysis.summary}</p>
          <span className="text-xs text-muted-foreground">AI 분석 생성 {stock.aiAnalysis.generatedAt}</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 text-sm">
            <ChatCircleTextIcon size={16} className="text-primary" weight="duotone" />
            커뮤니티
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CommunityFeed posts={stock.communityFeed} />
        </CardContent>
      </Card>
    </div>
  )
}
