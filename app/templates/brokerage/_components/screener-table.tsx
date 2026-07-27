"use client"

import { useMemo, useState } from "react"
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatWon } from "@/lib/finance/format-won"
import { rateColor, rateText } from "@/lib/finance/rate"
import {
  SCREENER_MARKET_FILTERS,
  SCREENER_SORT_TABS,
  SCREENER_STOCKS,
  type ScreenerMarketFilter,
  type ScreenerSortKey,
  type ScreenerStock,
} from "../_data/screener"

/** 로고 이니셜 도형 배경(칩과 동일하게 chart 토큰을 순환 사용 — 하드코딩 색 없음) */
const LOGO_COLORS = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"]

function logoColorFor(symbol: string): string {
  let hash = 0
  for (let i = 0; i < symbol.length; i++) hash = (hash * 31 + symbol.charCodeAt(i)) % LOGO_COLORS.length
  return LOGO_COLORS[hash]
}

function sortStocks(stocks: ScreenerStock[], sort: ScreenerSortKey): ScreenerStock[] {
  const sorted = [...stocks]
  switch (sort) {
    case "tradingValue":
      return sorted.sort((a, b) => b.tradingValue - a.tradingValue)
    case "volume":
      return sorted.sort((a, b) => b.volume - a.volume)
    case "gainers":
      return sorted.sort((a, b) => b.changePercent - a.changePercent)
    case "losers":
      return sorted.sort((a, b) => a.changePercent - b.changePercent)
    default:
      return sorted
  }
}

export interface ScreenerTableProps {
  /** 스크리너 데이터 — 생략 시 내장 가상 종목(_data/screener.ts) 사용 */
  data?: ScreenerStock[]
  /** 행 클릭 시 선택된 종목을 부모로 전달(종목 상세 패널 연동용) */
  onSelect?: (stock: ScreenerStock) => void
  /** 선택된 종목 심볼 — 지정 시 해당 행을 강조(제어형), 생략 시 컴포넌트가 내부 상태로 관리 */
  selectedSymbol?: string
}

/**
 * 실시간 랭킹 스크리너 테이블 (#41 B영역).
 * 필터칩(전체/국내/해외) + 정렬 탭(거래대금·거래량·급상승·급락) + 순위/종목/시세 테이블.
 */
export function ScreenerTable({ data, onSelect, selectedSymbol }: Readonly<ScreenerTableProps>) {
  const [market, setMarket] = useState<ScreenerMarketFilter>("all")
  const [sort, setSort] = useState<ScreenerSortKey>("tradingValue")
  const [internalSelected, setInternalSelected] = useState<string | undefined>(undefined)

  const activeSelected = selectedSymbol ?? internalSelected
  const source = data ?? SCREENER_STOCKS

  const rows = useMemo(() => {
    const filtered = market === "all" ? source : source.filter((s) => s.market === market)
    return sortStocks(filtered, sort)
  }, [source, market, sort])

  function handleSelect(stock: ScreenerStock) {
    setInternalSelected(stock.symbol)
    onSelect?.(stock)
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {SCREENER_MARKET_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              aria-pressed={market === f.key}
              onClick={() => setMarket(f.key)}
              className={cn(
                "inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-[12px] font-medium transition-colors",
                market === f.key
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-accent",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <Tabs value={sort} onValueChange={(v) => setSort(v as ScreenerSortKey)}>
          <TabsList>
            {SCREENER_SORT_TABS.map((t) => (
              <TabsTrigger key={t.key} value={t.key}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">순위</TableHead>
            <TableHead>종목</TableHead>
            <TableHead className="text-right">현재가</TableHead>
            <TableHead className="text-right">등락률</TableHead>
            <TableHead className="hidden text-right sm:table-cell">거래대금</TableHead>
            <TableHead className="hidden text-right md:table-cell">시가총액</TableHead>
            <TableHead className="hidden w-32 md:table-cell">거래비율</TableHead>
            <TableHead className="hidden lg:table-cell">산업</TableHead>
            <TableHead className="hidden lg:table-cell">AI 요약</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((stock, index) => (
            <TableRow
              key={stock.symbol}
              onClick={() => handleSelect(stock)}
              data-state={activeSelected === stock.symbol ? "selected" : undefined}
              className="cursor-pointer"
            >
              <TableCell className="tabular-nums text-muted-foreground">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-primary-foreground",
                      logoColorFor(stock.symbol),
                    )}
                    aria-hidden="true"
                  >
                    {stock.logoInitial}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{stock.name}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {stock.symbol} · {stock.market === "domestic" ? "국내" : "해외"}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {stock.price.toLocaleString()}
                {stock.market === "domestic" ? "원" : ""}
              </TableCell>
              <TableCell className={cn("text-right font-semibold tabular-nums", rateColor(stock.changePercent))}>
                {rateText(stock.changePercent)}%
              </TableCell>
              <TableCell className="hidden text-right tabular-nums sm:table-cell">
                {formatWon(stock.tradingValue)}
              </TableCell>
              <TableCell className="hidden text-right tabular-nums md:table-cell">
                {formatWon(stock.marketCap)}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <BuyRatioBar buyRatio={stock.buyRatio} />
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge variant="outline" className="text-[10px]">
                  {stock.industry}
                </Badge>
              </TableCell>
              <TableCell className="hidden max-w-48 lg:table-cell">
                <Badge variant="secondary" className="max-w-full gap-1 text-[10px]">
                  <SparkleIcon size={10} className="shrink-0" />
                  <span className="truncate">{stock.aiSummary}</span>
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/** 매수/매도 비율 양방향 바 — 매수=gain(적), 매도=loss(청) 시맨틱 토큰 */
function BuyRatioBar({ buyRatio }: Readonly<{ buyRatio: number }>) {
  const sellRatio = 100 - buyRatio
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-gain" style={{ width: `${buyRatio}%` }} />
        <div className="h-full bg-loss" style={{ width: `${sellRatio}%` }} />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
        <span className="text-gain">매수 {buyRatio}%</span>
        <span className="text-loss">매도 {sellRatio}%</span>
      </div>
    </div>
  )
}
