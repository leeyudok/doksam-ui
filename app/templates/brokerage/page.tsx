"use client"

import { useState } from "react"

import { BrokerageNav } from "./_components/brokerage-nav"
import { KeySchedule } from "./_components/key-schedule"
import { MarketStrip } from "./_components/market-strip"
import { MarketTicker } from "./_components/market-ticker"
import { ScreenerTable } from "./_components/screener-table"
import { StockDetail } from "./_components/stock-detail"
import { WatchlistSidebar } from "./_components/watchlist-sidebar"
import type { ScreenerStock } from "./_data/screener"

export default function BrokerageHomePage() {
  const [selected, setSelected] = useState<ScreenerStock | null>(null)

  return (
    <div className="flex flex-1 flex-col">
      <BrokerageNav />

      <div className="flex flex-col gap-6 px-4 py-6 sm:px-6">
        {/* 시장 지표 + 주요 일정 */}
        <section className="grid gap-4 xl:grid-cols-[1fr_auto]">
          <MarketStrip />
          <KeySchedule />
        </section>

        {/* 실시간 랭킹 스크리너 (왼쪽) + 종목 상세 (가운데) + 관심종목 (오른쪽) */}
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.7fr)]">
          <div className="min-w-0">
            <ScreenerTable onSelect={setSelected} selectedSymbol={selected?.symbol} />
          </div>
          <StockDetail
            stock={
              selected
                ? {
                    symbol: selected.symbol,
                    name: selected.name,
                    market: selected.market === "domestic" ? "국내" : "해외",
                    currentPrice: selected.price,
                    changeAmount: selected.changeAmount,
                    changePercent: selected.changePercent,
                  }
                : undefined
            }
          />
          <WatchlistSidebar />
        </section>
      </div>

      <MarketTicker />
    </div>
  )
}
