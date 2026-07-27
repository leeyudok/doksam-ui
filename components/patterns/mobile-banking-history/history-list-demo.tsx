"use client"

import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { formatWon } from "@/lib/finance/format-won"
import { rateColor } from "@/lib/finance/rate"
import {
  TRANSACTIONS,
  TRANSACTION_TYPE_FILTERS,
  formatDateHeader,
  groupTransactionsByDate,
  type TransactionType,
} from "@/lib/patterns/mobile-banking-data"

/**
 * 거래 내역 데모 — 유형 필터 칩(전체/입금/출금/이체)으로 목록을 좁히고, 남은
 * 거래를 날짜별로 그룹핑해 그룹 헤더 아래 나열한다. 입금은 양수 금액이라
 * rateColor()가 자동으로 text-gain(적)을, 출금/이체는 음수라 text-loss(청)를 고른다.
 */
export function HistoryListDemo() {
  const [filter, setFilter] = useState<(typeof TRANSACTION_TYPE_FILTERS)[number]>("전체")

  const filtered = useMemo(() => {
    if (filter === "전체") return TRANSACTIONS
    return TRANSACTIONS.filter((tx) => tx.type === (filter as TransactionType))
  }, [filter])

  const groups = useMemo(() => groupTransactionsByDate(filtered), [filtered])

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="거래 유형 필터">
        {TRANSACTION_TYPE_FILTERS.map((type) => (
          <button
            key={type}
            type="button"
            aria-pressed={filter === type}
            onClick={() => setFilter(type)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              filter === type
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {groups.length === 0 && (
        <p className="py-6 text-center text-sm text-muted-foreground">해당 유형의 거래가 없습니다.</p>
      )}

      <div className="flex flex-col gap-4">
        {groups.map((group) => (
          <div key={group.date} className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold text-muted-foreground">{formatDateHeader(group.date)}</p>
            <ul className="flex flex-col divide-y divide-border">
              {group.items.map((tx) => (
                <li key={tx.id} className="flex items-center justify-between gap-2 py-2">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium">{tx.counterparty}</span>
                      <Badge variant="outline" className="px-1.5 py-0 text-[9px]">
                        {tx.type}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {tx.time} · {tx.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className={`text-sm font-semibold tabular-nums ${rateColor(tx.amount)}`}>
                      {tx.amount > 0 ? "+" : ""}
                      {formatWon(tx.amount)}
                    </span>
                    <span className="text-[10px] text-muted-foreground tabular-nums">
                      잔액 {formatWon(tx.balanceAfter)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
