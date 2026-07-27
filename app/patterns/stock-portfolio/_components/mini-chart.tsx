"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** 이벤트 마커 (손절/익절 발생 시각). */
interface EventMarker {
  /** prices 배열 내 인덱스. */
  index: number
  /** 표시 라벨 (예: "@14:21"). */
  label: string
  type: "stop" | "profit"
}

interface MiniChartProps {
  /** 가격 시계열 (종가). */
  prices: number[]
  /** 목표매수가 수평선 (success). */
  targetBuyPrice?: number
  /** 익절가 수평선 (gain). */
  takeProfitPrice?: number
  /** 손절가 수평선 (loss). */
  stopLossPrice?: number
  /** 이벤트 발생 시각 마커 (수직선). */
  eventMarker?: EventMarker
  /** 볼린저밴드(SMA ± 2σ) 표시. */
  showBollinger?: boolean
  bollingerPeriod?: number
  /** SVG 높이 (기본 80). */
  height?: number
  className?: string
}

const PAD_TOP = 14
const PAD_BOTTOM = 4
const W = 300

/**
 * 포트폴리오 카드용 SVG 미니 차트 — 가격 시계열 + 목표가 수평선 + 볼린저밴드.
 * dok3node customs/mini-chart.tsx 이식 — hex 하드코딩 대신 CSS 토큰
 * var(--gain)/var(--loss)/var(--success)/var(--chart-4) 로 색을 해소한다.
 */
export function MiniChart({
  prices,
  targetBuyPrice,
  takeProfitPrice,
  stopLossPrice,
  eventMarker,
  showBollinger = false,
  bollingerPeriod = 20,
  height = 80,
  className,
}: MiniChartProps) {
  const chart = React.useMemo(() => {
    if (prices.length < 2) return null

    const drawTop = PAD_TOP
    const drawBottom = height - PAD_BOTTOM
    const drawH = drawBottom - drawTop

    // 볼린저밴드 계산 (SMA ± 2σ)
    const bbUpper: number[] = []
    const bbMiddle: number[] = []
    const bbLower: number[] = []
    if (showBollinger && prices.length >= bollingerPeriod) {
      for (let i = 0; i < prices.length; i++) {
        if (i < bollingerPeriod - 1) {
          bbUpper.push(NaN)
          bbMiddle.push(NaN)
          bbLower.push(NaN)
          continue
        }
        const window = prices.slice(i - bollingerPeriod + 1, i + 1)
        const sma = window.reduce((s, v) => s + v, 0) / bollingerPeriod
        const variance = window.reduce((s, v) => s + (v - sma) ** 2, 0) / bollingerPeriod
        const stddev = Math.sqrt(variance)
        bbMiddle.push(sma)
        bbUpper.push(sma + 2 * stddev)
        bbLower.push(sma - 2 * stddev)
      }
    }

    // Y축 범위 — 가격 + 수평선 + 밴드 모두 포함
    const allValues = [...prices]
    for (const v of [targetBuyPrice, takeProfitPrice, stopLossPrice]) if (v && v > 0) allValues.push(v)
    for (const v of [...bbUpper, ...bbLower]) if (!Number.isNaN(v)) allValues.push(v)

    const minVal = Math.min(...allValues)
    const maxVal = Math.max(...allValues)
    const range = maxVal - minVal || 1
    const pad = range * 0.08
    const yMin = minVal - pad
    const yMax = maxVal + pad

    const toY = (price: number) => drawTop + drawH - ((price - yMin) / (yMax - yMin)) * drawH
    const toX = (i: number) => (i / Math.max(prices.length - 1, 1)) * W

    const lastPrice = prices[prices.length - 1]
    const isUp = lastPrice >= prices[0]

    const points = prices.map((p, i) => `${toX(i)},${toY(p)}`).join(" ")
    const areaPoints = `0,${drawBottom} ${points} ${W},${drawBottom}`
    const lastX = toX(prices.length - 1)
    const lastY = toY(lastPrice)

    const lines: { price: number; color: string; label: string; dash: string; opacity: number }[] = []
    if (targetBuyPrice && targetBuyPrice > 0)
      lines.push({ price: targetBuyPrice, color: "var(--success)", label: `매수 ${targetBuyPrice.toLocaleString()}`, dash: "4,3", opacity: 0.6 })
    if (takeProfitPrice && takeProfitPrice > 0)
      lines.push({ price: takeProfitPrice, color: "var(--gain)", label: `익절 ${takeProfitPrice.toLocaleString()}`, dash: "4,3", opacity: 0.6 })
    if (stopLossPrice && stopLossPrice > 0)
      lines.push({ price: stopLossPrice, color: "var(--loss)", label: `손절 ${stopLossPrice.toLocaleString()}`, dash: "2,2", opacity: 0.4 })

    const strokeColor = isUp ? "var(--gain)" : "var(--loss)"

    const marker = eventMarker
      ? {
          x: toX(Math.min(eventMarker.index, prices.length - 1)),
          label: eventMarker.label,
          color: eventMarker.type === "stop" ? "var(--loss)" : "var(--gain)",
        }
      : null

    // 볼린저밴드 경로 (상단→하단 역순으로 닫힌 영역)
    let bbArea: string | null = null
    let bbMiddleLine: string | null = null
    if (showBollinger && bbUpper.length > 0) {
      const validStart = bbUpper.findIndex((v) => !Number.isNaN(v))
      if (validStart >= 0) {
        const upperPts: string[] = []
        const lowerPts: string[] = []
        const midPts: string[] = []
        for (let i = validStart; i < prices.length; i++) {
          const x = toX(i)
          upperPts.push(`${x},${toY(bbUpper[i])}`)
          lowerPts.push(`${x},${toY(bbLower[i])}`)
          midPts.push(`${x},${toY(bbMiddle[i])}`)
        }
        bbArea = `${upperPts.join(" ")} ${lowerPts.reverse().join(" ")}`
        bbMiddleLine = midPts.join(" ")
      }
    }

    return { drawTop, drawBottom, points, areaPoints, lastX, lastY, lastPrice, strokeColor, lines, toY, marker, bbArea, bbMiddleLine }
  }, [prices, targetBuyPrice, takeProfitPrice, stopLossPrice, eventMarker, showBollinger, bollingerPeriod, height])

  if (!chart) {
    return (
      <div className={cn("flex items-center justify-center rounded-md bg-muted/30", className)} style={{ height }}>
        <span className="text-[10px] text-muted-foreground/50">데이터 수집 중…</span>
      </div>
    )
  }

  return (
    <div className={cn("w-full overflow-hidden rounded-md bg-muted/30", className)} style={{ height }}>
      <svg viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" className="h-full w-full" role="img" aria-label="가격 미니 차트">
        {chart.lines.map((line) => {
          const ly = chart.toY(line.price)
          return (
            <g key={line.label}>
              <line x1={0} y1={ly} x2={W} y2={ly} stroke={line.color} strokeWidth={1} strokeDasharray={line.dash} opacity={line.opacity} />
              <text x={3} y={Math.max(ly - 3, 10)} fill={line.color} fontSize={8} opacity={0.8}>
                {line.label}
              </text>
            </g>
          )
        })}

        {chart.bbArea && <polygon points={chart.bbArea} fill="var(--chart-4)" opacity={0.08} />}
        {chart.bbMiddleLine && (
          <polyline points={chart.bbMiddleLine} fill="none" stroke="var(--chart-4)" strokeWidth={0.8} strokeDasharray="3,2" opacity={0.5} />
        )}

        <polygon points={chart.areaPoints} fill={chart.strokeColor} opacity={0.08} />
        <polyline points={chart.points} fill="none" stroke={chart.strokeColor} strokeWidth={1.5} />
        <circle cx={chart.lastX} cy={chart.lastY} r={3} fill={chart.strokeColor} />
        <text x={chart.lastX - 4} y={Math.max(chart.lastY - 6, 10)} fill={chart.strokeColor} fontSize={9} fontWeight={700} textAnchor="end">
          {chart.lastPrice.toLocaleString()}
        </text>

        {chart.marker && (
          <g>
            <line
              x1={chart.marker.x}
              y1={chart.drawTop}
              x2={chart.marker.x}
              y2={chart.drawBottom}
              stroke={chart.marker.color}
              strokeWidth={1}
              strokeDasharray="3,2"
              opacity={0.7}
            />
            <text x={chart.marker.x} y={chart.drawTop - 2} fill={chart.marker.color} fontSize={7} fontWeight={600} textAnchor="middle" opacity={0.9}>
              {chart.marker.label}
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}
